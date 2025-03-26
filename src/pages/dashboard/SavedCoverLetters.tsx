import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { FileEdit, Eye, Download, Trash2, Loader2 } from "lucide-react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";

interface CoverLetter {
  id?: string;
  title: string;
  content: string;
  company: string;
  position: string;
  recipient: string;
  user_id?: string;
  created_at?: string;
  updated_at?: string;
}

const SavedCoverLetters = () => {
  const [savedCoverLetters, setSavedCoverLetters] = useState<CoverLetter[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchSavedCoverLetters = async () => {
    try {
      setLoading(true);
      const { data: user } = await supabase.auth.getUser();

      if (!user.user) return;

      const { data, error } = await supabase
        .from("cover_letters")
        .select("*")
        .eq("user_id", user.user.id)
        .order("updated_at", { ascending: false });

      if (error) throw error;

      setSavedCoverLetters(data || []);
    } catch (error) {
      console.error("Error fetching cover letters:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSavedCoverLetters();
  }, []);

  const handleViewCoverLetter = (id: string) => {
    navigate(`/dashboard/cover-letter/${id}`);
  };

  const handleDeleteCoverLetter = async (id: string) => {
    if (confirm("Are you sure you want to delete this cover letter?")) {
      try {
        const { error } = await supabase
          .from("cover_letters")
          .delete()
          .eq("id", id);

        if (error) throw error;

        // Refresh the list
        fetchSavedCoverLetters();
      } catch (error) {
        console.error("Error deleting cover letter:", error);
      }
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Saved Cover Letters</h1>
      <p className="text-gray-500 dark:text-gray-400 mb-6">
        View and manage your saved cover letter documents
      </p>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <span className="ml-2">Loading your saved cover letters...</span>
        </div>
      ) : savedCoverLetters.length === 0 ? (
        <div className="text-center p-12 border rounded-lg bg-slate-50">
          <FileEdit className="h-12 w-12 mx-auto text-slate-400 mb-4" />
          <h3 className="text-xl font-medium mb-2">
            No cover letters saved yet
          </h3>
          <p className="text-muted-foreground mb-6">
            Create and save your first cover letter to see it here
          </p>
          <Button asChild>
            <Link to="/dashboard/cover-letter">Create a Cover Letter</Link>
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {savedCoverLetters.map((letter) => (
            <Card key={letter.id} className="overflow-hidden">
              <div className="bg-slate-100 p-4 flex items-center border-b">
                <FileEdit className="h-8 w-8 text-blue-600 mr-3" />
                <div>
                  <h3 className="font-medium">
                    {letter.title || letter.company}
                  </h3>
                  <p className="text-xs text-gray-500">
                    {letter.position && (
                      <span className="block">{letter.position}</span>
                    )}
                    Last modified:{" "}
                    {letter.updated_at
                      ? new Date(letter.updated_at).toLocaleDateString()
                      : "N/A"}
                  </p>
                </div>
              </div>
              <CardContent className="p-4">
                <div className="flex justify-between mt-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleViewCoverLetter(letter.id || "")}
                  >
                    <Eye className="h-4 w-4 mr-1" /> View
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-red-500 hover:text-red-700"
                    onClick={() => handleDeleteCoverLetter(letter.id || "")}
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

export default SavedCoverLetters;
