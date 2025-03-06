import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { FileText, FileEdit, Plus, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

const DashboardHome = () => {
  const { user } = useAuth();

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">
          Welcome
          {user?.user_metadata?.full_name
            ? `, ${user.user_metadata.full_name}`
            : ""}
        </h1>
        <p className="text-gray-500">
          Create and manage your professional documents with our AI-powered
          tools
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-100">
          <CardContent className="p-6">
            <div className="flex items-center mb-4">
              <div className="p-2 bg-blue-100 rounded-lg mr-4">
                <FileText className="h-8 w-8 text-blue-600" />
              </div>
              <h2 className="text-xl font-semibold">Curriculum Vitae</h2>
            </div>
            <p className="text-gray-600 mb-6">
              Create a professional CV that highlights your skills and
              experience. Our AI will help you craft the perfect resume.
            </p>
            <Button
              className="w-full bg-gradient-to-r from-blue-500 to-cyan-400 hover:from-blue-600 hover:to-cyan-500 text-white font-medium h-24"
              onClick={() => {
                // Navigate without an ID to create a new CV
                window.location.href = "/dashboard/cv";
              }}
            >
              <Plus className="mr-2 h-6 w-6" /> Craft Your Professional CV
            </Button>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-green-100">
          <CardContent className="p-6">
            <div className="flex items-center mb-4">
              <div className="p-2 bg-green-100 rounded-lg mr-4">
                <FileEdit className="h-8 w-8 text-green-600" />
              </div>
              <h2 className="text-xl font-semibold">Cover Letter</h2>
            </div>
            <p className="text-gray-600 mb-6">
              Create customized cover letters for each job application. Our AI
              will help you tailor your letter to the specific position.
            </p>
            <Button
              className="w-full bg-gradient-to-r from-green-500 to-emerald-400 hover:from-green-600 hover:to-emerald-500 text-white font-medium h-24"
              asChild
            >
              <Link to="/dashboard/cover-letter">
                <Plus className="mr-2 h-6 w-6" /> Write a Compelling Cover
                Letter
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>

      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Recent Documents</h2>
        <Card>
          <CardContent className="p-6">
            <div className="text-center py-8">
              <FileText className="h-12 w-12 mx-auto text-gray-400 mb-4" />
              <h3 className="text-lg font-medium mb-2">No recent documents</h3>
              <p className="text-gray-500 mb-6">
                Create your first CV or cover letter to see it here
              </p>
              <Button asChild variant="outline">
                <Link to="/dashboard/saved-cvs">
                  View All Documents <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <div>
        <h2 className="text-2xl font-semibold mb-4">Tips & Resources</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardContent className="p-4">
              <h3 className="font-medium mb-2">Resume Best Practices</h3>
              <p className="text-sm text-gray-500">
                Learn how to make your CV stand out to employers
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <h3 className="font-medium mb-2">Cover Letter Templates</h3>
              <p className="text-sm text-gray-500">
                Explore our library of professional templates
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <h3 className="font-medium mb-2">Interview Preparation</h3>
              <p className="text-sm text-gray-500">
                Tips to help you ace your next job interview
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;
