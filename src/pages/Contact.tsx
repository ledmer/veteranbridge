
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Phone, Mail, Clock, MapPin, AlertTriangle, MessageCircle } from "lucide-react";
import Navigation from "@/components/Navigation";

const Contact = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="pt-20 pb-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Get Professional Help</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Reach out for immediate support, schedule an appointment, or connect with our professional mental health team
            </p>
          </div>

          {/* Emergency Section */}
          <div className="bg-red-50 border-2 border-red-200 rounded-lg p-8 mb-12">
            <div className="text-center">
              <AlertTriangle className="h-12 w-12 text-red-600 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-red-900 mb-4">In Crisis? Get Immediate Help</h2>
              <p className="text-red-700 mb-6">
                If you're having thoughts of suicide or immediate danger, don't wait. Call now.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-red-600 hover:bg-red-700">
                  <Phone className="mr-2 h-5 w-5" />
                  <a href="tel:988">Call 988 - Suicide & Crisis Lifeline</a>
                </Button>
                <Button size="lg" variant="outline" className="border-red-200 text-red-700 hover:bg-red-50">
                  <Phone className="mr-2 h-5 w-5" />
                  <a href="tel:1-800-273-8255">Veterans Crisis Line</a>
                </Button>
              </div>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <MessageCircle className="mr-2 h-6 w-6 text-blue-600" />
                    Request Support
                  </CardTitle>
                  <CardDescription>
                    Fill out this form and a mental health professional will contact you within 24 hours
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="firstName">First Name</Label>
                      <Input id="firstName" placeholder="John" />
                    </div>
                    <div>
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input id="lastName" placeholder="Doe" />
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="email">Email Address</Label>
                    <Input id="email" type="email" placeholder="john.doe@example.com" />
                  </div>
                  
                  <div>
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input id="phone" type="tel" placeholder="(555) 123-4567" />
                  </div>
                  
                  <div>
                    <Label htmlFor="service">Service Branch</Label>
                    <select id="service" className="w-full h-10 px-3 py-2 border border-input bg-background rounded-md">
                      <option value="">Select your service branch</option>
                      <option value="army">Army</option>
                      <option value="navy">Navy</option>
                      <option value="airforce">Air Force</option>
                      <option value="marines">Marines</option>
                      <option value="coastguard">Coast Guard</option>
                      <option value="spaceforce">Space Force</option>
                    </select>
                  </div>
                  
                  <div>
                    <Label htmlFor="urgency">How urgent is your need for support?</Label>
                    <select id="urgency" className="w-full h-10 px-3 py-2 border border-input bg-background rounded-md">
                      <option value="">Select urgency level</option>
                      <option value="immediate">Immediate (within 24 hours)</option>
                      <option value="soon">Soon (within a week)</option>
                      <option value="routine">Routine (within a month)</option>
                    </select>
                  </div>
                  
                  <div>
                    <Label htmlFor="message">Tell us how we can help</Label>
                    <Textarea 
                      id="message" 
                      placeholder="Please describe what kind of support you're looking for..."
                      className="min-h-[120px]"
                    />
                  </div>
                  
                  <div className="text-sm text-gray-600 bg-gray-50 p-4 rounded-md">
                    <p><strong>Privacy Notice:</strong> Your information is confidential and protected by HIPAA. 
                    We will only use it to provide you with mental health support services.</p>
                  </div>
                  
                  <Button className="w-full" size="lg">
                    Submit Request
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Contact Information */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Direct Contact</CardTitle>
                  <CardDescription>
                    Speak directly with our mental health professionals
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <Phone className="h-5 w-5 text-blue-600" />
                    <div>
                      <p className="font-medium">Main Support Line</p>
                      <p className="text-gray-600">(555) 123-HELP (4357)</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Mail className="h-5 w-5 text-blue-600" />
                    <div>
                      <p className="font-medium">Email Support</p>
                      <p className="text-gray-600">support@veteranwellbeing.org</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Clock className="h-5 w-5 text-blue-600" />
                    <div>
                      <p className="font-medium">Hours of Operation</p>
                      <p className="text-gray-600">Monday - Friday: 8 AM - 8 PM EST</p>
                      <p className="text-gray-600">Weekend emergency support available</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>What to Expect</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <div className="bg-blue-100 text-blue-600 rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">1</div>
                      <div>
                        <p className="font-medium">Initial Contact</p>
                        <p className="text-sm text-gray-600">We'll reach out within 24 hours to discuss your needs</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="bg-blue-100 text-blue-600 rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">2</div>
                      <div>
                        <p className="font-medium">Assessment</p>
                        <p className="text-sm text-gray-600">Brief assessment to understand your situation and goals</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="bg-blue-100 text-blue-600 rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">3</div>
                      <div>
                        <p className="font-medium">Support Plan</p>
                        <p className="text-sm text-gray-600">Personalized plan with resources and next steps</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Location</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-start space-x-3">
                    <MapPin className="h-5 w-5 text-blue-600 mt-1" />
                    <div>
                      <p className="font-medium">Veteran Wellbeing Center</p>
                      <p className="text-gray-600">1234 Support Street<br />Hope City, HC 12345</p>
                      <p className="text-sm text-gray-500 mt-2">
                        *Also available via telehealth sessions
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
