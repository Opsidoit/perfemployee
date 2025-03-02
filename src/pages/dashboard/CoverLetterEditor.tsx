import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Save, Download, ArrowLeft, Wand2 } from "lucide-react";
import { Link } from "react-router-dom";

const CoverLetterEditor = () => {
  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <Button variant="ghost" size="icon" asChild className="mr-2">
            <Link to="/dashboard">
              <ArrowLeft className="h-5 w-5" />
            </Link>
          </Button>
          <h1 className="text-2xl font-bold">Edit Cover Letter</h1>
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
        {/* Left sidebar - Cover Letter settings */}
        <div className="lg:col-span-1">
          <Card>
            <CardContent className="p-4">
              <h3 className="font-medium mb-4">Cover Letter Details</h3>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Company Name
                  </label>
                  <input
                    type="text"
                    className="w-full p-2 border rounded-md"
                    placeholder="Google"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">
                    Position
                  </label>
                  <input
                    type="text"
                    className="w-full p-2 border rounded-md"
                    placeholder="Software Engineer"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">
                    Recipient Name
                  </label>
                  <input
                    type="text"
                    className="w-full p-2 border rounded-md"
                    placeholder="Hiring Manager"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">
                    Key Skills (comma separated)
                  </label>
                  <input
                    type="text"
                    className="w-full p-2 border rounded-md"
                    placeholder="React, TypeScript, Node.js"
                  />
                </div>

                <Button className="w-full">
                  <Wand2 className="mr-2 h-4 w-4" /> Generate with AI
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main content - Cover Letter editor */}
        <div className="lg:col-span-2">
          <Card>
            <CardContent className="p-6">
              <textarea
                className="w-full h-[500px] p-4 border rounded-md font-sans text-base"
                placeholder="Start writing your cover letter here..."
                defaultValue={`Dear Hiring Manager,

I am writing to express my interest in the Software Engineer position at Google. With my background in web development and experience with React, TypeScript, and Node.js, I believe I would be a valuable addition to your team.

In my current role at XYZ Company, I have successfully developed and maintained several web applications that have improved efficiency by 30%. I am particularly proud of implementing a new feature that reduced load times by 40% and increased user engagement.

I am excited about the opportunity to bring my technical skills and passion for creating exceptional user experiences to Google. I am particularly drawn to your company's commitment to innovation and solving complex problems.

Thank you for considering my application. I look forward to the possibility of discussing how my skills and experiences align with your team's needs.

Sincerely,
John Doe`}
              />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CoverLetterEditor;
