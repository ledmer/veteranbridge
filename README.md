
# 🪖 Veteran Bridge – Hackathon Application

**LLaMA-powered Veteran Wellness and Support Matcher**

Veteran Bridge is an AI-driven system that intelligently connects veterans to personalized support groups, peer mentors, and community services based on individual wellness profiles. Using a token-based system, similarity matching, and emotion-aware messaging, this project ensures veterans receive relevant, timely, and compassionate support.

---

## 🔧 Key Features

### 🧠 LLaMA-Powered Dynamic Grouping
- **User Tokens Generator**: Encodes veteran profiles into structured tokens.
- **Group Tokens Generator**: Represents the makeup and capacity of groups.
- **Similarity & Compatibility Matching**: Aligns veterans with compatible groups and peers based on shared experiences and support capabilities.

### 🤖 Emotion Detection & Support Agent Trigger
- **Automatic Emotion Detection**: Analyzes user input (text) for emotional cues (e.g. distress, frustration, loneliness).
- **Agent Trigger System**: Activates a live or AI support agent when emotional states such as *crisis*, *suicidal ideation*, or *high anxiety* are detected.
- **Sentiment-Adaptive Messaging**: Personalized messages adapt tone and content to the user's detected emotional state to provide reassurance or urgency.

### 🤝 Support Taker ⇄ Giver Matching
- Matches veterans seeking help with those who are equipped to offer support.
- Encourages safe, reciprocal relationships within groups.

### 📩 Personalized Veteran Group Recommendations
- Dynamic group and service suggestions.
- Outreach messages crafted based on profile tags and emotional context.

### 🔁 Dynamic Weights & Feedback Loop
- Adjusts priority tags using a machine learning feedback mechanism.

```python
self.priority_weights = {
    'Suicidal risk': 10,
    'Crisis risk': 10,
    'Homeless': 9,
    'Substance use': 8,
    'PTSD': 7,
    'Unemployed': 7,
    'Recently transitioned': 6,
    'Depression': 6,
    'Anxiety': 5,
    'Disabled': 5,
    'Job training': 4,
    'Seeking therapy': 4
}

