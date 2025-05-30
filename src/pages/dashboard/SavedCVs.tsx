import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { FileText, Eye, Download, Trash2, Loader2 } from "lucide-react";
import { Link } from "react-router-dom";
import ContentArea from "@/components/dashboard/ContentArea";
import { useCV } from "@/contexts/CVContext";
import { useNavigate } from "react-router-dom";

const SavedCVs = () => {
  const { savedCVs, loading, deleteCV, fetchSavedCVs } = useCV();
  const navigate = useNavigate();

  useEffect(() => {
    fetchSavedCVs();
  }, []);

  const handleViewCV = (id: string) => {
    navigate(`/dashboard/cv/${id}`);
  };

  const handleDeleteCV = async (id: string) => {
    if (confirm("Are you sure you want to delete this CV?")) {
      await deleteCV(id);
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Saved CVs</h1>
      <p className="text-gray-500 dark:text-gray-400 mb-6">
        View and manage your saved curriculum vitae documents
      </p>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <span className="ml-2">Loading your saved CVs...</span>
        </div>
      ) : savedCVs.length === 0 ? (
        <div className="text-center p-12 border rounded-lg bg-slate-50">
          <FileText className="h-12 w-12 mx-auto text-slate-400 mb-4" />
          <h3 className="text-xl font-medium mb-2">No CVs saved yet</h3>
          <p className="text-muted-foreground mb-6">
            Create and save your first CV to see it here
          </p>
          <Button asChild>
            <Link to="/dashboard/cv">Create a CV</Link>
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {savedCVs.map((cv) => (
            <Card key={cv.id} className="overflow-hidden">
              <div className="bg-slate-100 p-4 flex items-center border-b">
                <FileText className="h-8 w-8 text-blue-600 mr-3" />
                <div>
                  <h3 className="font-medium">{cv.title}</h3>
                  <p className="text-xs text-gray-500">
                    Last modified:{" "}
                    {cv.updated_at
                      ? new Date(cv.updated_at).toLocaleDateString()
                      : "N/A"}
                  </p>
                </div>
              </div>
              <CardContent className="p-4">
                <div className="flex justify-between mt-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleViewCV(cv.id || "")}
                  >
                    <Eye className="h-4 w-4 mr-1" /> View
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-red-500 hover:text-red-700"
                    onClick={() => handleDeleteCV(cv.id || "")}
                  >
                    <Trash2 className="h-4 w-4 mr-1" /> Delete
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default SavedCVs;
