import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Save, Download, ArrowLeft } from "lucide-react";
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
        {/* Left sidebar - CV sections */}
        <div className="lg:col-span-1">
          <Card>
            <CardContent className="p-4">
              <h3 className="font-medium mb-4">CV Sections</h3>
              <div className="space-y-2">
                <Button variant="default" className="w-full justify-start">
                  Personal Information
                </Button>
                <Button variant="ghost" className="w-full justify-start">
                  Professional Summary
                </Button>
                <Button variant="ghost" className="w-full justify-start">
                  Work Experience
                </Button>
                <Button variant="ghost" className="w-full justify-start">
                  Education
                </Button>
                <Button variant="ghost" className="w-full justify-start">
                  Skills
                </Button>
                <Button variant="ghost" className="w-full justify-start">
                  Languages
                </Button>
                <Button variant="ghost" className="w-full justify-start">
                  Certifications
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main content - CV editor */}
        <div className="lg:col-span-2">
          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-4">
                Personal Information
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
                    Job Title
                  </label>
                  <input
                    type="text"
                    className="w-full p-2 border rounded-md"
                    placeholder="Software Developer"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    className="w-full p-2 border rounded-md"
                    placeholder="john.doe@example.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">
                    Phone
                  </label>
                  <input
                    type="tel"
                    className="w-full p-2 border rounded-md"
                    placeholder="+1 (555) 123-4567"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">
                    Location
                  </label>
                  <input
                    type="text"
                    className="w-full p-2 border rounded-md"
                    placeholder="New York, NY"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">
                    LinkedIn
                  </label>
                  <input
                    type="url"
                    className="w-full p-2 border rounded-md"
                    placeholder="https://linkedin.com/in/johndoe"
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
