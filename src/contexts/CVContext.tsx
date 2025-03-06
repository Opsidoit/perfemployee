import React, { createContext, useState, useContext, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { useAuth } from "./AuthContext";
import { useToast } from "@/components/ui/use-toast";

interface CVData {
  id?: string;
  title: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  city: string;
  country: string;
  skills: string[];
  experiences: {
    title: string;
    summary: string;
    startMonth: string;
    startYear: string;
    endMonth: string;
    endYear: string;
  }[];
  education: {
    institution: string;
    degree: string;
    grade: string;
    startMonth: string;
    startYear: string;
    endMonth: string;
    endYear: string;
  }[];
  extracurricular: {
    activity: string;
    role: string;
  }[];
  created_at?: string;
  updated_at?: string;
}

interface CVContextType {
  savedCVs: CVData[];
  loading: boolean;
  saveCV: (cvData: CVData) => Promise<void>;
  deleteCV: (id: string) => Promise<void>;
  getCV: (id: string) => Promise<CVData | null>;
  fetchSavedCVs: () => Promise<void>;
}

const CVContext = createContext<CVContextType | undefined>(undefined);

export function CVProvider({ children }: { children: React.ReactNode }) {
  const [savedCVs, setSavedCVs] = useState<CVData[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    if (user) {
      fetchSavedCVs();
    }
  }, [user]);

  const fetchSavedCVs = async () => {
    if (!user) return;

    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("cvs")
        .select("*")
        .eq("user_id", user.id)
        .order("updated_at", { ascending: false });

      if (error) throw error;

      setSavedCVs(data || []);
    } catch (error: any) {
      console.error("Error fetching CVs:", error);
      toast({
        title: "Error",
        description: "Failed to load your saved CVs",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const saveCV = async (cvData: CVData) => {
    if (!user) {
      toast({
        title: "Error",
        description: "You must be logged in to save a CV",
        variant: "destructive",
      });
      return;
    }

    try {
      setLoading(true);

      const title =
        cvData.title || `${cvData.firstName} ${cvData.lastName}'s CV`;

      const cvToSave = {
        ...cvData,
        title,
        user_id: user.id,
        updated_at: new Date().toISOString(),
      };

      let result;

      if (cvData.id) {
        // Update existing CV
        result = await supabase
          .from("cvs")
          .update(cvToSave)
          .eq("id", cvData.id)
          .eq("user_id", user.id);
      } else {
        // Insert new CV
        result = await supabase.from("cvs").insert({
          ...cvToSave,
          created_at: new Date().toISOString(),
        });
      }

      if (result.error) throw result.error;

      toast({
        title: "Success",
        description: "Your CV has been saved successfully",
      });

      // Refresh the list of saved CVs
      await fetchSavedCVs();
    } catch (error: any) {
      console.error("Error saving CV:", error);
      toast({
        title: "Error",
        description: "Failed to save your CV",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const deleteCV = async (id: string) => {
    if (!user) return;

    try {
      setLoading(true);
      const { error } = await supabase
        .from("cvs")
        .delete()
        .eq("id", id)
        .eq("user_id", user.id);

      if (error) throw error;

      setSavedCVs(savedCVs.filter((cv) => cv.id !== id));

      toast({
        title: "Success",
        description: "CV deleted successfully",
      });
    } catch (error: any) {
      console.error("Error deleting CV:", error);
      toast({
        title: "Error",
        description: "Failed to delete the CV",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const getCV = async (id: string): Promise<CVData | null> => {
    if (!user) return null;

    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("cvs")
        .select("*")
        .eq("id", id)
        .eq("user_id", user.id)
        .single();

      if (error) throw error;

      return data;
    } catch (error: any) {
      console.error("Error fetching CV:", error);
      toast({
        title: "Error",
        description: "Failed to load the CV",
        variant: "destructive",
      });
      return null;
    } finally {
      setLoading(false);
    }
  };

  return (
    <CVContext.Provider
      value={{
        savedCVs,
        loading,
        saveCV,
        deleteCV,
        getCV,
        fetchSavedCVs,
      }}
    >
      {children}
    </CVContext.Provider>
  );
}

export function useCV() {
  const context = useContext(CVContext);
  if (context === undefined) {
    throw new Error("useCV must be used within a CVProvider");
  }
  return context;
}
