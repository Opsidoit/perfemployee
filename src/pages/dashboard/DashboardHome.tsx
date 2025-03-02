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
      <h1 className="text-3xl font-bold mb-6">Welcome back!</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
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
              <div className="border rounded-md p-4 flex justify-between items-center">
                <div>
                  <h3 className="font-medium">Software Developer CV</h3>
                  <p className="text-sm text-muted-foreground">
                    Last edited: 2 days ago
                  </p>
                </div>
                <Button variant="outline" size="sm" asChild>
                  <Link to="/dashboard/cv/1">Edit</Link>
                </Button>
              </div>

              <Button className="w-full" variant="outline" asChild>
                <Link to="/dashboard/cv/new">
                  <Plus className="mr-2 h-4 w-4" /> Create New CV
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
              <div className="border rounded-md p-4 flex justify-between items-center">
                <div>
                  <h3 className="font-medium">Google Application</h3>
                  <p className="text-sm text-muted-foreground">
                    Last edited: 1 week ago
                  </p>
                </div>
                <Button variant="outline" size="sm" asChild>
                  <Link to="/dashboard/cover-letter/1">Edit</Link>
                </Button>
              </div>

              <Button className="w-full" variant="outline" asChild>
                <Link to="/dashboard/cover-letter/new">
                  <Plus className="mr-2 h-4 w-4" /> Create New Cover Letter
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
          <CardDescription>
            Your recent document edits and activities
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="border-b pb-2">
              <p className="text-sm">
                You edited{" "}
                <span className="font-medium">Software Developer CV</span>
              </p>
              <p className="text-xs text-muted-foreground">2 days ago</p>
            </div>
            <div className="border-b pb-2">
              <p className="text-sm">
                You created{" "}
                <span className="font-medium">Google Application</span> cover
                letter
              </p>
              <p className="text-xs text-muted-foreground">1 week ago</p>
            </div>
            <div className="border-b pb-2">
              <p className="text-sm">You updated your profile information</p>
              <p className="text-xs text-muted-foreground">2 weeks ago</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardHome;
