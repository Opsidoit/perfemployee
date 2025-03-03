import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Save, Download, ArrowLeft, Wand2, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

const CVEditor = () => {
  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <Button variant="ghost" size="icon" asChild className="mr-2">
            <Link to="/dashboard">
              <ArrowLeft className="h-5 w-5" />
            </Link>
          </Button>
          <h1 className="text-2xl font-bold">Edit Curriculum Vitae</h1>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" size="sm">
            <Download className="mr-2 h-4 w-4" /> Export
          </Button>
          <Button size="sm">
            <Save className="mr-2 h-4 w-4" /> Save
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left sidebar - AI Assistant */}
        <div className="lg:col-span-1">
          <Card className="bg-gradient-to-br from-indigo-50 to-blue-50 border-blue-200">
            <CardContent className="p-6">
              <div className="flex justify-center mb-4">
                <div className="p-3 bg-blue-500 rounded-full text-white">
                  <Sparkles className="h-8 w-8" />
                </div>
              </div>
              <h3 className="font-bold text-xl text-center mb-4">
                AI Resume Builder
              </h3>
              <p className="text-gray-600 mb-6 text-center">
                Let our AI craft a professional CV tailored to your industry and
                experience
              </p>
              <Button className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-medium py-6">
                <Wand2 className="mr-2 h-5 w-5" /> Generate Professional CV
              </Button>
              <div className="mt-4 text-center text-sm text-gray-500">
                <p>
                  Our AI analyzes thousands of successful resumes to create the
                  perfect CV for your target role
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main content - CV editor */}
        <div className="lg:col-span-2">
          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-4">
                Your Professional Profile
              </h2>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      First Name
                    </label>
                    <input
                      type="text"
                      className="w-full p-2 border rounded-md"
                      placeholder="John"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Last Name
                    </label>
                    <input
                      type="text"
                      className="w-full p-2 border rounded-md"
                      placeholder="Doe"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">
                    Professional Title
                  </label>
                  <input
                    type="text"
                    className="w-full p-2 border rounded-md"
                    placeholder="Senior Software Engineer"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">
                    Professional Summary
                  </label>
                  <textarea
                    className="w-full p-2 border rounded-md h-24"
                    placeholder="Experienced software engineer with 5+ years developing scalable applications..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">
                    Years of Experience
                  </label>
                  <input
                    type="number"
                    className="w-full p-2 border rounded-md"
                    placeholder="5"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">
                    Industry
                  </label>
                  <select className="w-full p-2 border rounded-md">
                    <option>Technology</option>
                    <option>Finance</option>
                    <option>Healthcare</option>
                    <option>Education</option>
                    <option>Marketing</option>
                    <option>Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">
                    Key Skills (comma separated)
                  </label>
                  <input
                    type="text"
                    className="w-full p-2 border rounded-md"
                    placeholder="JavaScript, React, Node.js, AWS, Python"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">
                    Target Job Title
                  </label>
                  <input
                    type="text"
                    className="w-full p-2 border rounded-md"
                    placeholder="Senior Frontend Developer"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CVEditor;
