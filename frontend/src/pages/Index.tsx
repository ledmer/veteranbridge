import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Heart, Users, Phone, Shield, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Chatbot from "@/components/Chatbot";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50">
      <Navigation />
      
      {/* Hero Section */}
      <section className="px-4 pt-20 pb-16">
        <div className="max-w-6xl mx-auto text-center">
          <div className="flex justify-center mb-6">
            <Shield className="w-16 h-16 text-blue-600" />
          </div>
          <h1 className="mb-6 text-5xl font-bold text-gray-900">
            Veteran Bridge
          </h1>
          <p className="max-w-3xl mx-auto mb-8 text-xl text-gray-600">
            Supporting our heroes with comprehensive mental health resources, peer connections, and professional care. 
            You served with honor, now let us serve you with the support you deserve.
          </p>
          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <Button asChild size="lg" className="bg-blue-600 hover:bg-blue-700">
              <Link to="/resources">
                Find Resources
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link to="/support">Connect with Peers</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="px-4 py-16 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="mb-12 text-3xl font-bold text-center text-gray-900">
            Comprehensive Support for Veterans
          </h2>
          <div className="grid gap-8 md:grid-cols-3">
            <Card className="text-center transition-shadow hover:shadow-lg">
              <CardHeader>
                <Heart className="w-12 h-12 mx-auto mb-4 text-red-500" />
                <CardTitle>Mental Health Resources</CardTitle>
                <CardDescription>
                  Access to counseling, therapy resources, and mental health tools designed specifically for veterans
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button asChild variant="outline" className="w-full">
                  <Link to="/resources">Explore Resources</Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="text-center transition-shadow hover:shadow-lg">
              <CardHeader>
                <Users className="w-12 h-12 mx-auto mb-4 text-green-500" />
                <CardTitle>Peer Support Network</CardTitle>
                <CardDescription>
                  Connect with fellow veterans who understand your journey and can provide mutual support
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button asChild variant="outline" className="w-full">
                  <Link to="/support">Join Community</Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="text-center transition-shadow hover:shadow-lg">
              <CardHeader>
                <Phone className="w-12 h-12 mx-auto mb-4 text-blue-500" />
                <CardTitle>24/7 Crisis Support</CardTitle>
                <CardDescription>
                  Immediate access to professional crisis intervention and emergency mental health services
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button asChild variant="outline" className="w-full">
                  <span>Get Help Now</span>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="px-4 py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="mb-12 text-3xl font-bold text-gray-900">Making a Difference</h2>
          <div className="grid gap-8 md:grid-cols-3">
            <div>
              <div className="mb-2 text-4xl font-bold text-blue-600">10,000+</div>
              <div className="text-gray-600">Veterans Served</div>
            </div>
            <div>
              <div className="mb-2 text-4xl font-bold text-green-600">24/7</div>
              <div className="text-gray-600">Support Available</div>
            </div>
            <div>
              <div className="mb-2 text-4xl font-bold text-red-600">95%</div>
              <div className="text-gray-600">Satisfaction Rate</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-4 py-16 text-white bg-blue-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="mb-6 text-3xl font-bold">Ready to Take the First Step?</h2>
          <p className="mb-8 text-xl opacity-90">
            Your wellbeing matters. Connect with resources and support designed by veterans, for veterans.
          </p>
          <Button asChild size="lg" variant="secondary">
            <span>Start Your Journey</span>
          </Button>
        </div>
      </section>
      <Chatbot />
    </div>
  );
};

export default Index;