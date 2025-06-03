
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Users, MessageCircle, Calendar, Shield, Star, Clock } from "lucide-react";
import Navigation from "@/components/Navigation";

const Support = () => {
  const supportGroups = [
    {
      title: "Combat Veterans Support Group",
      description: "Weekly meetings for veterans who served in combat zones",
      schedule: "Tuesdays, 7:00 PM EST",
      participants: 25,
      rating: 4.8,
      type: "Combat Veterans"
    },
    {
      title: "Women Veterans Circle",
      description: "Safe space for female veterans to share experiences and support",
      schedule: "Thursdays, 6:30 PM EST",
      participants: 18,
      rating: 4.9,
      type: "Women Veterans"
    },
    {
      title: "PTSD Recovery Group",
      description: "Peer support for veterans dealing with PTSD symptoms",
      schedule: "Mondays & Fridays, 8:00 PM EST",
      participants: 32,
      rating: 4.7,
      type: "PTSD Support"
    },
    {
      title: "Military Family Support",
      description: "Support for military families and veteran spouses",
      schedule: "Wednesdays, 7:30 PM EST",
      participants: 22,
      rating: 4.8,
      type: "Family Support"
    },
    {
      title: "Transition Support Network",
      description: "For veterans transitioning to civilian life",
      schedule: "Saturdays, 10:00 AM EST",
      participants: 28,
      rating: 4.6,
      type: "Transition"
    },
    {
      title: "Young Veterans Group",
      description: "Peer support for veterans under 35",
      schedule: "Sundays, 5:00 PM EST",
      participants: 35,
      rating: 4.9,
      type: "Young Veterans"
    }
  ];

  const mentorshipPrograms = [
    {
      title: "Buddy System",
      description: "Get paired with a veteran mentor for one-on-one support",
      icon: Users,
      features: ["Weekly check-ins", "Goal setting", "Resource guidance"]
    },
    {
      title: "Career Mentorship",
      description: "Professional guidance for career development and job searching",
      icon: Shield,
      features: ["Resume review", "Interview prep", "Networking opportunities"]
    },
    {
      title: "Peer Counseling",
      description: "Trained veteran peers provide emotional support and guidance",
      icon: MessageCircle,
      features: ["Active listening", "Crisis support", "Resource referrals"]
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="pt-20 pb-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Peer Support Network</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Connect with fellow veterans who understand your journey. Find community, share experiences, and support each other.
            </p>
          </div>

          {/* Call to Action */}
          <div className="bg-blue-600 text-white rounded-lg p-8 mb-12 text-center">
            <h2 className="text-2xl font-bold mb-4">Ready to Connect?</h2>
            <p className="text-lg opacity-90 mb-6">
              Join our supportive community of veterans helping veterans. No judgment, just understanding.
            </p>
            <Button size="lg" variant="secondary">
              Join a Support Group
            </Button>
          </div>

          {/* Support Groups */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">Support Groups</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {supportGroups.map((group, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <Users className="h-8 w-8 text-blue-600" />
                      <Badge variant="secondary">{group.type}</Badge>
                    </div>
                    <CardTitle className="text-lg">{group.title}</CardTitle>
                    <CardDescription>{group.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center space-x-2">
                        <Calendar className="h-4 w-4 text-gray-500" />
                        <span className="text-sm text-gray-600">{group.schedule}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Users className="h-4 w-4 text-gray-500" />
                        <span className="text-sm text-gray-600">{group.participants} active members</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Star className="h-4 w-4 text-yellow-500" />
                        <span className="text-sm text-gray-600">{group.rating}/5.0 rating</span>
                      </div>
                      <Button className="w-full mt-4">Join Group</Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Mentorship Programs */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">Mentorship Programs</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {mentorshipPrograms.map((program, index) => {
                const IconComponent = program.icon;
                return (
                  <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <IconComponent className="h-12 w-12 text-green-600 mx-auto mb-4" />
                      <CardTitle>{program.title}</CardTitle>
                      <CardDescription>{program.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2 text-sm text-gray-600 mb-6">
                        {program.features.map((feature, idx) => (
                          <li key={idx}>• {feature}</li>
                        ))}
                      </ul>
                      <Button variant="outline" className="w-full">
                        Learn More
                      </Button>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>

          {/* Community Guidelines */}
          <div className="bg-white rounded-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Community Guidelines</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="font-semibold text-gray-900 mb-4">Our Values</h3>
                <ul className="space-y-2 text-gray-600">
                  <li>• Respect and understanding for all experiences</li>
                  <li>• Confidentiality and privacy protection</li>
                  <li>• Non-judgmental support and listening</li>
                  <li>• Inclusive environment for all veterans</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-4">Safety First</h3>
                <ul className="space-y-2 text-gray-600">
                  <li>• Crisis resources available during all sessions</li>
                  <li>• Trained facilitators monitor discussions</li>
                  <li>• Clear reporting procedures for concerns</li>
                  <li>• Professional backup support available</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Support;
