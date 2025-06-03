
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Heart, Users, Brain, Briefcase, Home, Activity } from "lucide-react";
import { toast } from "sonner";

interface InterestsFormProps {
    onComplete: () => void;
}

const InterestsForm = ({ onComplete }: InterestsFormProps) => {
    const [selectedInterests, setSelectedInterests] = useState<string[]>([]);

    const interestGroups = [
    {
        category: "Job",
        icon: Briefcase,
        items: [
        { id: "unemployed", label: "Unemployed" },
        { id: "employed", label: "Employed" },
        { id: "underemployed", label: "Underemployed" },
        { id: "job-training", label: "Job training" },
        { id: "in-education", label: "In education" },
        { id: "recently-transitioned", label: "Recently transitioned" },
        { id: "retired", label: "Retired" },
        { id: "disabled", label: "Disabled" },
        { id: "entrepreneur", label: "Entrepreneur" },
        { id: "remote-worker", label: "Remote worker" },
        { id: "full-time", label: "Full-time" },
        { id: "part-time", label: "Part-time" },
        { id: "skilled-trade", label: "Skilled trade" },
        { id: "office-worker", label: "Office worker" },
        { id: "tech-worker", label: "Tech worker" },
        { id: "federal-job", label: "Federal job" },
        { id: "career-changer", label: "Career changer" },
        { id: "needs-resume-help", label: "Needs resume help" },
        { id: "needs-interview-prep", label: "Needs interview prep" },
        { id: "seeking-promotion", label: "Seeking promotion" },
        ],
    },
    {
        category: "Mental Health",
        icon: Brain,
        items: [
        { id: "ptsd", label: "PTSD" },
        { id: "depression", label: "Depression" },
        { id: "anxiety", label: "Anxiety" },
        { id: "substance-use", label: "Substance use" },
        { id: "suicidal-risk", label: "Suicidal risk" },
        { id: "trauma-survivor", label: "Trauma survivor" },
        { id: "isolation", label: "Isolation" },
        { id: "anger-issues", label: "Anger issues" },
        { id: "sleep-issues", label: "Sleep issues" },
        { id: "cognitive-issues", label: "Cognitive issues" },
        { id: "in-therapy", label: "In therapy" },
        { id: "no-diagnosis", label: "No diagnosis" },
        { id: "peer-support", label: "Peer support" },
        { id: "high-stress", label: "High stress" },
        { id: "needs-assessment", label: "Needs assessment" },
        { id: "dual-diagnosis", label: "Dual diagnosis" },
        { id: "medication-noncompliant", label: "Medication noncompliant" },
        { id: "crisis-risk", label: "Crisis risk" },
        { id: "seeking-therapy", label: "Seeking therapy" },
        { id: "stable-mental-health", label: "Stable mental health" },
        ],
    },
    {
        category: "Wellness",
        icon: Heart,
        items: [
        { id: "chronic-illness", label: "Chronic illness" },
        { id: "disabled-wellness", label: "Disabled" },
        { id: "active-lifestyle", label: "Active lifestyle" },
        { id: "overweight", label: "Overweight" },
        { id: "nutrition-issues", label: "Nutrition issues" },
        { id: "smoker", label: "Smoker" },
        { id: "in-recovery", label: "In recovery" },
        { id: "pain-issues", label: "Pain issues" },
        { id: "poor-sleep", label: "Poor sleep" },
        { id: "vision-hearing-loss", label: "Vision/hearing loss" },
        { id: "post-surgery", label: "Post-surgery" },
        { id: "healthy-habits", label: "Healthy habits" },
        { id: "low-health-literacy", label: "Low health literacy" },
        { id: "poor-self-care", label: "Poor self-care" },
        { id: "regular-checkups", label: "Regular checkups" },
        { id: "missed-appointments", label: "Missed appointments" },
        { id: "mental-wellness-focus", label: "Mental wellness focus" },
        { id: "holistic-care-user", label: "Holistic care user" },
        { id: "preventive-care-gap", label: "Preventive care gap" },
        ],
    },
    {
        category: "Engagement",
        icon: Users,
        items: [
        { id: "va-user", label: "VA user" },
        { id: "not-engaged", label: "Not engaged" },
        { id: "peer-support-engagement", label: "Peer support" },
        { id: "community-active", label: "Community active" },
        { id: "volunteer", label: "Volunteer" },
        { id: "family-engaged", label: "Family engaged" },
        { id: "no-internet", label: "No internet" },
        { id: "digital-user", label: "Digital user" },
        { id: "attends-events", label: "Attends events" },
        { id: "in-support-group", label: "In support group" },
        { id: "rural-isolated", label: "Rural isolated" },
        { id: "urban-underserved", label: "Urban underserved" },
        { id: "faith-based", label: "Faith-based" },
        { id: "civic-active", label: "Civic active" },
        { id: "low-trust", label: "Low trust" },
        { id: "socially-active", label: "Socially active" },
        { id: "mentoring-others", label: "Mentoring others" },
        { id: "needs-va-care", label: "Needs VA care" },
        { id: "uses-multiple-systems", label: "Uses multiple systems" },
        { id: "online-only", label: "Online only" },
        { id: "seeking-connection", label: "Seeking connection" },
        ],
    },
    ];

    const handleInterestChange = (interestId: string, checked: boolean) => {
        if (checked) {
            setSelectedInterests([...selectedInterests, interestId]);
        } else {
            setSelectedInterests(selectedInterests.filter(id => id !== interestId));
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (selectedInterests.length === 0) {
            toast.error("Please select at least one area of interest");
            return;
        }

        console.log("Selected interests:", selectedInterests);
        toast.success("Your preferences have been saved! Welcome to Veterans Bridge.");
        onComplete();
    };

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                <CardHeader>
                    <CardTitle className="text-2xl text-center">Welcome to Veterans Bridge!</CardTitle>
                    <CardDescription className="text-center">
                        Help us personalize your experience by selecting the areas you're most interested in.
                        This will help us recommend the most relevant resources for you.
                    </CardDescription>
                </CardHeader>
                <CardContent>
<form onSubmit={handleSubmit} className="space-y-6">

<div className="grid gap-4">
    {interestGroups.map((group) => {
      const IconComponent = group.icon;
      return (
        <div key={group.category} className="border rounded-lg p-4">
          <div className="flex items-center gap-2 mb-3">
            <IconComponent className="h-5 w-5 text-blue-600" />
            <h2 className="text-lg font-semibold">{group.category}</h2>
          </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 pl-7">
        {group.items.map((item) => (
            <div key={item.id} className="flex items-center space-x-2">
            <Checkbox
                id={item.id}
                checked={selectedInterests.includes(item.id)}
                onCheckedChange={(checked) =>
                handleInterestChange(item.id, checked as boolean)
                }
                className="text-primary border-gray-600 data-[state=checked]:bg-primary"
            />
            <label htmlFor={item.id} className="text-sm text-gray-700">
                {item.label}
            </label>
            </div>
        ))}
        </div>

        </div>
      );
    })}
  </div>
                        <div className="flex justify-between pt-4">
                            <Button
                                type="button"
                                variant="outline"
                                onClick={onComplete}
                            >
                                Skip for now
                            </Button>
                            <Button
                                type="submit"
                                className="bg-blue-600 hover:bg-blue-700"
                                disabled={selectedInterests.length === 0}
                            >
                                Save Preferences ({selectedInterests.length} selected)
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
};

export default InterestsForm;