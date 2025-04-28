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
  summary?: string;
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

// Convert to named function component with explicit export
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

      // Map database fields to our frontend model
      const mappedData = (data || []).map((cv) => ({
        id: cv.id,
        title: cv.title,
        firstName: cv.firstname || "",
        lastName: cv.lastname || "",
        email: cv.email || "",
        phone: cv.phone || "",
        city: cv.city || "",
        country: cv.country || "",
        skills: cv.skills || [],
        summary: cv.summary || "",
        experiences: cv.experiences || [],
        education: cv.education || [],
        extracurricular: cv.extracurricular || [],
        created_at: cv.created_at,
        updated_at: cv.updated_at,
      }));

      setSavedCVs(mappedData);
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

      // Map the CV data to match the database schema
      const cvToSave = {
        title,
        user_id: user.id,
        firstname: cvData.firstName,
        lastname: cvData.lastName,
        email: cvData.email,
        phone: cvData.phone,
        city: cvData.city,
        country: cvData.country,
        skills: cvData.skills,
        summary: cvData.summary,
        experiences: cvData.experiences,
        education: cvData.education,
        extracurricular: cvData.extracurricular,
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

      // Map database fields back to our frontend model
      return {
        id: data.id,
        title: data.title,
        firstName: data.firstname || "",
        lastName: data.lastname || "",
        email: data.email || "",
        phone: data.phone || "",
        city: data.city || "",
        country: data.country || "",
        skills: data.skills || [],
        summary: data.summary || "",
        experiences: data.experiences || [],
        education: data.education || [],
        extracurricular: data.extracurricular || [],
        created_at: data.created_at,
        updated_at: data.updated_at,
      };
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
