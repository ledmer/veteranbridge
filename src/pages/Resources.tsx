
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Heart, Brain, Users, Phone, ExternalLink, Clock, MapPin } from "lucide-react";
import Navigation from "@/components/Navigation";

const Resources = () => {
  const resources = [
    {
      title: "Veterans Crisis Line",
      description: "24/7 confidential support for veterans in crisis and their families",
      phone: "1-800-273-8255",
      website: "veteranscrisisline.net",
      category: "Crisis Support",
      icon: Phone,
      urgent: true
    },
    {
      title: "VA Mental Health Services",
      description: "Comprehensive mental health care through the Department of Veterans Affairs",
      phone: "1-877-222-8387",
      website: "va.gov/health-care/health-needs-conditions/mental-health",
      category: "Professional Care",
      icon: Heart,
    },
    {
      title: "Team Red White & Blue",
      description: "Community-based programs to help veterans stay connected",
      website: "teamrwb.org",
      category: "Community",
      icon: Users,
    },
    {
      title: "Give an Hour",
      description: "Free mental health services from volunteer professionals",
      website: "giveanhour.org",
      category: "Therapy",
      icon: Brain,
    },
    {
      title: "Operation Homefront",
      description: "Emergency financial assistance and transitional support",
      phone: "1-800-722-6098",
      website: "operationhomefront.org",
      category: "Support Services",
      icon: Heart,
    },
    {
      title: "Wounded Warrior Project",
      description: "Programs and services for wounded veterans and their families",
      phone: "1-904-296-7350",
      website: "woundedwarriorproject.org",
      category: "Comprehensive Care",
      icon: Users,
    }
  ];

  const selfCareTools = [
    "Mindfulness and meditation apps",
    "Breathing exercises for anxiety",
    "Physical fitness routines",
    "Sleep hygiene techniques",
    "Stress management strategies",
    "Journal writing prompts"
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="pt-20 pb-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Mental Health Resources</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive resources and support services designed specifically for veterans and their families
            </p>
          </div>

          {/* Emergency Banner */}
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Phone className="h-6 w-6 text-red-600" />
                <div>
                  <h3 className="font-semibold text-red-900">Crisis Support Available 24/7</h3>
                  <p className="text-red-700">If you're in crisis, call the Veterans Crisis Line immediately</p>
                </div>
              </div>
              <Button className="bg-red-600 hover:bg-red-700">
                <a href="tel:1-800-273-8255" className="flex items-center">
                  Call Now
                </a>
              </Button>
            </div>
          </div>

          {/* Resources Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {resources.map((resource, index) => {
              const IconComponent = resource.icon;
              return (
                <Card key={index} className={`hover:shadow-lg transition-shadow ${resource.urgent ? 'border-red-200 bg-red-50' : ''}`}>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <IconComponent className={`h-8 w-8 ${resource.urgent ? 'text-red-600' : 'text-blue-600'}`} />
                      <Badge variant={resource.urgent ? "destructive" : "secondary"}>
                        {resource.category}
                      </Badge>
                    </div>
                    <CardTitle className="text-lg">{resource.title}</CardTitle>
                    <CardDescription>{resource.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {resource.phone && (
                        <div className="flex items-center space-x-2">
                          <Phone className="h-4 w-4 text-gray-500" />
                          <a href={`tel:${resource.phone}`} className="text-blue-600 hover:underline">
                            {resource.phone}
                          </a>
                        </div>
                      )}
                      {resource.website && (
                        <div className="flex items-center space-x-2">
                          <ExternalLink className="h-4 w-4 text-gray-500" />
                          <a href={`https://${resource.website}`} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                            Visit Website
                          </a>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Self-Care Section */}
          <div className="bg-white rounded-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Self-Care Tools & Techniques</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {selfCareTools.map((tool, index) => (
                <div key={index} className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg">
                  <Heart className="h-5 w-5 text-green-600 flex-shrink-0" />
                  <span className="text-gray-700">{tool}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Additional Info */}
          <div className="mt-12 grid md:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <Clock className="h-8 w-8 text-blue-600 mb-2" />
                <CardTitle>When to Seek Help</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-gray-600">
                  <li>• Persistent feelings of sadness or hopelessness</li>
                  <li>• Difficulty sleeping or nightmares</li>
                  <li>• Increased substance use</li>
                  <li>• Social isolation or withdrawal</li>
                  <li>• Thoughts of self-harm</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <MapPin className="h-8 w-8 text-green-600 mb-2" />
                <CardTitle>Finding Local Support</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  Use the VA facility locator to find mental health services near you, 
                  or contact your local VFW or American Legion for community resources.
                </p>
                <Button variant="outline" className="w-full">
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Find Local VA Services
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Resources;
