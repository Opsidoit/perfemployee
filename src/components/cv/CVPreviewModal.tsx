import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Download, Save, Loader2 } from "lucide-react";
import GeneratedCV from "./GeneratedCV";
import { useCV } from "@/contexts/CVContext";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface CVPreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  cvData: {
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
  };
}

const CVPreviewModal: React.FC<CVPreviewModalProps> = ({
  isOpen,
  onClose,
  cvData,
}) => {
  const { saveCV } = useCV();
  const [saving, setSaving] = useState(false);
  const [showTitleInput, setShowTitleInput] = useState(false);
  const [cvTitle, setCvTitle] = useState(
    `${cvData.firstName || "My"} ${cvData.lastName || ""} CV`,
  );

  const handleDownload = () => {
    // In a real app, this would generate a PDF
    alert("In a production app, this would download the CV as a PDF");
  };

  const handleSave = async () => {
    if (showTitleInput) {
      try {
        setSaving(true);
        await saveCV({
          ...cvData,
          title: cvTitle,
        });
        onClose();
      } catch (error) {
        console.error("Error saving CV:", error);
      } finally {
        setSaving(false);
      }
    } else {
      setShowTitleInput(true);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Generated CV Preview</DialogTitle>
        </DialogHeader>

        <div className="my-4 border p-4 bg-white">
          <GeneratedCV {...cvData} />
        </div>

        {showTitleInput && (
          <div className="mb-4">
            <Label htmlFor="cv-title">CV Title</Label>
            <Input
              id="cv-title"
              value={cvTitle}
              onChange={(e) => setCvTitle(e.target.value)}
              placeholder="Enter a title for your CV"
              className="mt-1"
            />
          </div>
        )}

        <DialogFooter className="flex justify-between">
          <Button onClick={handleDownload}>
            <Download className="mr-2 h-4 w-4" /> Download PDF
          </Button>
          <Button
            className="bg-green-600 hover:bg-green-700"
            onClick={handleSave}
            disabled={saving}
          >
            {saving ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save className="mr-2 h-4 w-4" />
                {showTitleInput ? "Confirm Save" : "Save CV"}
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CVPreviewModal;
