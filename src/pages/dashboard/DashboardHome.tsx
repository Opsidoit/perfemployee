import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, FileEdit, Plus } from "lucide-react";
import { Link } from "react-router-dom";

const DashboardHome = () => {
  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">
        Welcome back! Let's sharpen your applications!
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <FileText className="mr-2 h-5 w-5" />
              Curriculum Vitae
            </CardTitle>
            <CardDescription>
              Create and manage your professional CVs
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Button
                className="w-full bg-gradient-to-r from-blue-500 to-cyan-400 hover:from-blue-600 hover:to-cyan-500 text-white font-medium h-24"
                asChild
              >
                <Link to="/dashboard/cv/new">
                  <Plus className="mr-2 h-6 w-6" /> Craft Your Professional CV
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <FileEdit className="mr-2 h-5 w-5" />
              Cover Letters
            </CardTitle>
            <CardDescription>
              Create and manage your custom cover letters
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Button
                className="w-full bg-gradient-to-r from-green-500 to-emerald-400 hover:from-green-600 hover:to-emerald-500 text-white font-medium h-24"
                asChild
              >
                <Link to="/dashboard/cover-letter/new">
                  <Plus className="mr-2 h-6 w-6" /> Design Your Winning Cover
                  Letter
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DashboardHome;
