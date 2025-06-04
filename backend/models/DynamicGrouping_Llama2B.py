import json
import re
from typing import Dict, List, Set, Any, Optional
from dataclasses import dataclass, asdict
from datetime import datetime, timedelta
import requests
import numpy as np

@dataclass
class VeteranProfile:
    """Veteran profile data structure"""
    # Basic Info
    full_name: str
    email: str
    phone: str = ""
    username: str = ""
    profile_photo: str = ""
    
    # Military History
    branch_of_service: str = ""
    rank_at_discharge: str = ""
    mos_job_title: str = ""
    years_of_service: int = 0
    discharge_status: str = ""
    discharge_date: str = ""
    deployment_history: str = ""
    
    # Location & Housing
    zip_code: str = ""
    city: str = ""
    housing_status: str = ""
    willing_to_relocate: bool = False
    
    # Mental Health & Wellness
    receiving_mental_health_support: bool = False
    sleep_issues: bool = False
    substance_use: bool = False
    comfort_level_peer_support: int = 3
    daily_wellness_checkins: bool = False
    
    # Goals & Interests
    looking_for: List[str] = None
    career_interests: List[str] = None
    willing_to_mentor: bool = False
    topics_of_interest: List[str] = None
    
    # Additional Data
    consent_anonymized_data: bool = False
    emergency_contact: str = ""
    privacy_settings: str = "Private"
    two_factor_auth: bool = False
    dd214_uploaded: bool = False
    resume_uploaded: bool = False
    mood_tracker_optin: bool = False

class LlamaVeteranGrouper:
    """Dynamic veteran grouping system using Llama LLM"""
    
    def __init__(self, llama_endpoint: str = "http://localhost:11434", model_name: str = "llama2"):
        """
        Initialize with Llama connection
        
        Args:
            llama_endpoint: Ollama API endpoint (default local installation)
            model_name: Llama model to use (llama2, llama2:13b, codellama, etc.)
        """
        self.llama_endpoint = llama_endpoint
        self.model_name = model_name
        self.available_tags = [
            # Employment
            'Job', 'Unemployed', 'Employed', 'Underemployed', 'Job training', 'In education',
            'Retired', 'Remote worker', 'Full-time', 'Part-time', 'Skilled trade', 'Office worker',
            'Tech worker', 'Federal job', 'Career changer', 'Entrepreneur',
            
            # Mental Health
            'Mental health', 'PTSD', 'Depression', 'Anxiety', 'Suicidal risk', 'Trauma survivor',
            'Anger issues', 'Cognitive issues', 'Dual diagnosis', 'Seeking therapy', 'In therapy',
            'Stable mental health', 'Mental wellness focus',
            
            # Wellness
            'Wellness', 'Chronic illness', 'Disabled', 'Substance use', 'Overweight', 'Nutrition issues',
            'Smoker', 'In recovery', 'Sleep issues', 'Poor sleep', 'Pain issues', 'Vision/hearing loss',
            'Post-surgery', 'High stress', 'Poor self-care', 'Healthy habits',
            
            # Engagement
            'Engagement', 'Not engaged', 'Active lifestyle', 'Community active', 'Family engaged',
            'Peer support', 'Volunteer', 'Attends events', 'In support group', 'Socially active',
            'Civic active', 'Mentoring others',
            
            # Transition
            'Recently transitioned', 'VA user', 'Needs VA care', 'Uses multiple systems',
            'Needs assessment', 'Needs resume help', 'Needs interview prep', 'Seeking promotion',
            'Seeking connection',
            
            # Access
            'Rural isolated', 'Urban underserved', 'No internet', 'Digital user', 'Online only',
            'Low health literacy', 'Low trust', 'Isolation',
            
            # Care
            'Regular checkups', 'Missed appointments', 'Medication noncompliant', 'Crisis risk',
            'Holistic care user', 'Preventive care gap', 'Faith-based'
        ]
        
        self.priority_weights = {
            'Suicidal risk': 10, 'Crisis risk': 10, 'Homeless': 9, 'Substance use': 8,
            'PTSD': 7, 'Unemployed': 7, 'Recently transitioned': 6, 'Depression': 6,
            'Anxiety': 5, 'Disabled': 5, 'Job training': 4, 'Seeking therapy': 4
        }
    
    def call_llama(self, prompt: str, system_prompt: str = "") -> str:
        """
        Make API call to Llama model via Ollama
        
        Args:
            prompt: User prompt
            system_prompt: System instruction
            
        Returns:
            Llama's response text
        """
        try:
            payload = {
                "model": self.model_name,
                "prompt": prompt,
                "system": system_prompt,
                "stream": False,
                "options": {
                    "temperature": 0.1,  # Low temperature for consistent analysis
                    "top_p": 0.9,
                    "max_tokens": 1000
                }
            }
            
            response = requests.post(
                f"{self.llama_endpoint}/api/generate",
                json=payload,
                headers={"Content-Type": "application/json"},
                timeout=30
            )
            
            if response.status_code == 200:
                return response.json().get("response", "")
            else:
                print(f"Llama API error: {response.status_code}")
                return ""
                
        except requests.exceptions.RequestException as e:
            print(f"Error connecting to Llama: {e}")
            return ""
    
    def analyze_veteran_with_llama(self, profile: VeteranProfile) -> Dict[str, Any]:
        """
        Use Llama to analyze veteran profile and generate groupings
        """
        
        # Prepare profile data for Llama
        profile_text = self._format_profile_for_llama(profile)
        
        # System prompt for Llama
        system_prompt = f"""You are a veteran services specialist with expertise in mental health, career counseling, and veteran support services. Your task is to analyze veteran profiles and provide structured assessments.

Available tags for classification: {', '.join(self.available_tags)}

Respond with a JSON object containing:
- primary_tags: Most important 3-5 tags that define this veteran's immediate needs
- secondary_tags: Additional 2-4 tags for supplementary characteristics  
- risk_level: "Critical", "High", "Medium", or "Low"
- priority_score: Integer 1-20 based on urgency of needs
- intervention_needed: true/false for immediate crisis intervention
- recommended_groups: List of 2-4 specific support group names
- resource_priorities: List of 3-5 prioritized resources/services
- reasoning: Brief explanation of your assessment

Focus on identifying veterans who need immediate support, those at risk, and matching them with appropriate peer groups and resources."""

        # Main analysis prompt
        analysis_prompt = f"""Analyze this veteran's profile and provide a comprehensive assessment:

{profile_text}

Consider:
1. Mental health indicators and crisis risk factors
2. Employment and career transition needs  
3. Social support and engagement levels
4. Housing stability and basic needs
5. Military background and discharge timing
6. Expressed interests and goals

Provide your analysis as a valid JSON object only."""

        # Get Llama's analysis
        llama_response = self.call_llama(analysis_prompt, system_prompt)
        
        # Parse Llama's response
        try:
            # Clean response to extract JSON
            json_start = llama_response.find('{')
            json_end = llama_response.rfind('}') + 1
            
            if json_start != -1 and json_end > json_start:
                json_str = llama_response[json_start:json_end]
                analysis = json.loads(json_str)
            else:
                # Fallback if JSON parsing fails
                analysis = self._fallback_analysis(profile)
            
        except (json.JSONDecodeError, ValueError):
            print("Failed to parse Llama response, using fallback analysis")
            analysis = self._fallback_analysis(profile)
        
        # Enhance analysis with additional processing
        analysis = self._enhance_llama_analysis(analysis, profile)
        
        return analysis
    
    def _format_profile_for_llama(self, profile: VeteranProfile) -> str:
        """Format veteran profile for Llama analysis"""
        
        # Calculate time since discharge
        discharge_recency = ""
        if profile.discharge_date:
            try:
                discharge_date = datetime.strptime(profile.discharge_date, '%Y-%m-%d')
                days_since = (datetime.now() - discharge_date).days
                if days_since < 365:
                    discharge_recency = f"Recently discharged ({days_since} days ago)"
                else:
                    discharge_recency = f"Discharged {days_since // 365} years ago"
            except:
                pass
        
        profile_text = f"""
VETERAN PROFILE ANALYSIS REQUEST

=== BASIC INFORMATION ===
Name: {profile.full_name}
Contact: {profile.email}

=== MILITARY SERVICE ===
Branch: {profile.branch_of_service}
Rank at Discharge: {profile.rank_at_discharge}
MOS/Job: {profile.mos_job_title}
Years of Service: {profile.years_of_service}
Discharge Status: {profile.discharge_status}
Discharge Date: {profile.discharge_date} {discharge_recency}
Deployment History: {profile.deployment_history or 'Not specified'}

=== CURRENT SITUATION ===
Location: {profile.city}, {profile.zip_code}
Housing Status: {profile.housing_status}
Willing to Relocate: {'Yes' if profile.willing_to_relocate else 'No'}

=== MENTAL HEALTH & WELLNESS ===
Currently Receiving Mental Health Support: {'Yes' if profile.receiving_mental_health_support else 'No'}
Sleep Issues: {'Yes' if profile.sleep_issues else 'No'}
Substance Use Issues: {'Yes' if profile.substance_use else 'No'}
Comfort Level with Peer Support (1-5): {profile.comfort_level_peer_support}
Daily Wellness Check-ins: {'Opted in' if profile.daily_wellness_checkins else 'Not opted in'}
Mood Tracker: {'Opted in' if profile.mood_tracker_optin else 'Not opted in'}

=== GOALS & INTERESTS ===
Looking For: {', '.join(profile.looking_for) if profile.looking_for else 'Not specified'}
Career Interests: {', '.join(profile.career_interests) if profile.career_interests else 'Not specified'}
Willing to Mentor Others: {'Yes' if profile.willing_to_mentor else 'No'}
Topics of Interest: {', '.join(profile.topics_of_interest) if profile.topics_of_interest else 'Not specified'}

=== ENGAGEMENT INDICATORS ===
Privacy Settings: {profile.privacy_settings}
DD-214 Uploaded: {'Yes' if profile.dd214_uploaded else 'No'}
Resume Uploaded: {'Yes' if profile.resume_uploaded else 'No'}
Consent to Share Data: {'Yes' if profile.consent_anonymized_data else 'No'}
Emergency Contact Provided: {'Yes' if profile.emergency_contact else 'No'}
"""
        return profile_text.strip()
    
    def _fallback_analysis(self, profile: VeteranProfile) -> Dict[str, Any]:
        """Fallback analysis if Llama fails"""
        tags = []
        
        # Basic rule-based analysis
        if profile.looking_for and 'Jobs' in profile.looking_for:
            tags.append('Job')
        if profile.substance_use:
            tags.append('Substance use')
        if profile.sleep_issues:
            tags.append('Sleep issues')
        if profile.receiving_mental_health_support:
            tags.append('In therapy')
        
        return {
            'primary_tags': tags[:3],
            'secondary_tags': tags[3:],
            'risk_level': 'Medium',
            'priority_score': 5,
            'intervention_needed': False,
            'recommended_groups': ['General Support Group'],
            'resource_priorities': ['Basic Services'],
            'reasoning': 'Fallback analysis - Llama unavailable'
        }
    
    def _enhance_llama_analysis(self, analysis: Dict, profile: VeteranProfile) -> Dict[str, Any]:
        """Enhance Llama's analysis with additional logic"""
        
        # Validate and clean tags
        if 'primary_tags' in analysis:
            analysis['primary_tags'] = [tag for tag in analysis['primary_tags'] 
                                      if tag in self.available_tags]
        
        if 'secondary_tags' in analysis:
            analysis['secondary_tags'] = [tag for tag in analysis['secondary_tags'] 
                                        if tag in self.available_tags]
        
        # Recalculate priority score based on tags
        priority_score = 0
        all_tags = analysis.get('primary_tags', []) + analysis.get('secondary_tags', [])
        for tag in all_tags:
            priority_score += self.priority_weights.get(tag, 1)
        
        analysis['calculated_priority_score'] = priority_score
        
        # Add geographic grouping
        if profile.city and 'recommended_groups' in analysis:
            analysis['recommended_groups'].append(f"{profile.city} Local Veterans")
        
        # Add metadata
        analysis['analysis_timestamp'] = datetime.now().isoformat()
        analysis['llama_model_used'] = self.model_name
        
        return analysis
    
    def generate_personalized_outreach(self, profile: VeteranProfile, analysis: Dict) -> str:
        """Use Llama to generate personalized outreach message"""
        
        system_prompt = """You are a veteran peer support specialist writing personalized, empathetic outreach messages. Write in a warm, respectful, veteran-to-veteran tone. Keep messages concise (2-3 paragraphs) and actionable."""
        
        outreach_prompt = f"""Write a personalized welcome message for this veteran based on their profile and needs assessment:

Veteran: {profile.full_name}
Service: {profile.branch_of_service} ({profile.years_of_service} years)
Current needs: {', '.join(analysis.get('primary_tags', []))}
Risk level: {analysis.get('risk_level', 'Unknown')}
Recommended groups: {', '.join(analysis.get('recommended_groups', []))}

The message should:
1. Acknowledge their service
2. Address their specific needs identified in the analysis
3. Invite them to relevant support groups
4. Provide next steps
5. Be encouraging and non-judgmental

Write the message directly without quotes or formatting."""

        return self.call_llama(outreach_prompt, system_prompt)

def setup_llama_instructions():
    """Instructions for setting up Llama locally"""
    return """
=== LLAMA SETUP INSTRUCTIONS ===

To use this system with Llama, you need to install Ollama:

1. INSTALL OLLAMA:
   - Visit: https://ollama.ai
   - Download for your OS (Windows/Mac/Linux)
   - Follow installation instructions

2. DOWNLOAD LLAMA MODEL:
   Open terminal/command prompt and run:
   
   # For Llama 2 (7B - faster, less accurate)
   ollama pull llama2
   
   # For Llama 2 13B (slower, more accurate)  
   ollama pull llama2:13b
   
   # For Code Llama (better for structured outputs)
   ollama pull codellama

3. START OLLAMA SERVER:
   ollama serve
   
   This runs on http://localhost:11434 by default

4. ALTERNATIVE CLOUD OPTIONS:
   - Use Llama via Hugging Face API
   - Use Llama via Replicate API  
   - Use Llama via Together AI
   - Use Llama via AWS Bedrock

5. UPDATE CODE FOR CLOUD APIs:
   Modify the call_llama() method to use your preferred API endpoint.

=== EXAMPLE USAGE ===
"""

def create_sample_veterans() -> List[VeteranProfile]:
    """Create sample veteran profiles for testing"""
    return [
        VeteranProfile(
            full_name="John Smith",
            email="john.smith@email.com",
            branch_of_service="Army",
            rank_at_discharge="E-5",
            mos_job_title="Infantry",
            years_of_service=8,
            discharge_status="Honorable",
            discharge_date="2024-03-15",
            city="Washington",
            zip_code="20001",
            housing_status="Rent",
            receiving_mental_health_support=True,
            sleep_issues=True,
            substance_use=False,
            comfort_level_peer_support=3,
            looking_for=["Jobs", "Therapy"],
            topics_of_interest=["PTSD", "resume help", "anxiety"],
            willing_to_mentor=False,
            dd214_uploaded=False,
            resume_uploaded=False
        ),
        VeteranProfile(
            full_name="Sarah Johnson", 
            email="sarah.j@email.com",
            branch_of_service="Navy",
            rank_at_discharge="O-3",
            mos_job_title="Intelligence Officer",
            years_of_service=12,
            discharge_status="Honorable", 
            discharge_date="2020-08-20",
            city="Arlington",
            zip_code="22201",
            housing_status="Own",
            receiving_mental_health_support=False,
            sleep_issues=False,
            substance_use=False,
            comfort_level_peer_support=5,
            looking_for=["All"],
            career_interests=["Technology", "Leadership", "Consulting"],
            topics_of_interest=["community events", "volunteer", "mentoring"],
            willing_to_mentor=True,
            dd214_uploaded=True,
            resume_uploaded=True
        )
    ]

def main():
    """Main demonstration function"""
    
    print(setup_llama_instructions())
    
    # Initialize the Llama-powered grouper
    # NOTE: This requires Ollama to be running locally
    grouper = LlamaVeteranGrouper(
        llama_endpoint="http://localhost:11434",
        model_name="llama2"  # Change to your preferred model
    )
    
    # Create sample veterans
    veterans = create_sample_veterans()
    
    print("=== LLAMA-POWERED VETERAN GROUPING SYSTEM ===\n")
    
    for i, veteran in enumerate(veterans, 1):
        print(f"--- VETERAN {i}: {veteran.full_name} ---")
        print(f"Service: {veteran.branch_of_service} ({veteran.years_of_service} years)")
        print(f"Location: {veteran.city}")
        print(f"Looking for: {', '.join(veteran.looking_for) if veteran.looking_for else 'Not specified'}")
        print()
        
        # Analyze with Llama
        print("🤖 Analyzing with Llama...")
        analysis = grouper.analyze_veteran_with_llama(veteran)
        
        print("LLAMA ANALYSIS RESULTS:")
        print(f"  Risk Level: {analysis.get('risk_level', 'Unknown')}")
        print(f"  Priority Score: {analysis.get('priority_score', 0)}")
        print(f"  Intervention Needed: {'YES' if analysis.get('intervention_needed') else 'No'}")
        print()
        
        print("PRIMARY TAGS (Llama identified):")
        for tag in analysis.get('primary_tags', []):
            print(f"  • {tag}")
        print()
        
        print("RECOMMENDED GROUPS (Llama suggested):")
        for group in analysis.get('recommended_groups', []):
            print(f"  → {group}")
        print()
        
        print("RESOURCE PRIORITIES (Llama ranked):")
        for j, resource in enumerate(analysis.get('resource_priorities', []), 1):
            print(f"  {j}. {resource}")
        print()
        
        if analysis.get('reasoning'):
            print(f"LLAMA'S REASONING: {analysis['reasoning']}")
            print()
        
        # Generate personalized outreach
        print("🤖 Generating personalized outreach with Llama...")
        outreach_message = grouper.generate_personalized_outreach(veteran, analysis)
        
        if outreach_message:
            print("PERSONALIZED OUTREACH MESSAGE:")
            print(f'"{outreach_message}"')
        print()
        
        print("="*60 + "\n")
    
    print("=== SYSTEM BENEFITS WITH LLAMA ===")
    print("✓ Natural language understanding of complex veteran situations")
    print("✓ Contextual analysis beyond simple keyword matching") 
    print("✓ Personalized outreach messages in veteran-appropriate tone")
    print("✓ Flexible reasoning that adapts to unique circumstances")
    print("✓ Continuous learning from veteran feedback")
    print("✓ Nuanced risk assessment considering multiple factors")

if __name__ == "__main__":
    main()