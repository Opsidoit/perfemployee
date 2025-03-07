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
    id?: string;
    title?: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    city: string;
    country: string;
    summary?: string;
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
  const [showTitleInput, setShowTitleInput] = useState(true);
  const [cvTitle, setCvTitle] = useState(
    `${cvData.firstName || "My"} ${cvData.lastName || ""} CV`,
  );

  const handleDownload = () => {
    // Create a Word document using HTML content
    const preHtml =
      '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:w="urn:schemas-microsoft-com:office:word" xmlns="http://www.w3.org/TR/REC-html40"><head><meta charset="utf-8"><title>Export HTML to Word Document with JavaScript</title><style>body{font-family:Calibri,sans-serif;}</style></head><body>';
    const postHtml = "</body></html>";

    // Get the HTML content of the CV
    const cvContent = document.querySelector(".cv-content");
    if (!cvContent) {
      alert("Could not find CV content to download");
      return;
    }

    const html = preHtml + cvContent.innerHTML + postHtml;

    // Create a Blob with the HTML content
    const blob = new Blob([html], { type: "application/msword" });

    // Create a download link
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `${cvTitle || `${cvData.firstName || "CV"}_${cvData.lastName || ""}`}.doc`;

    // Trigger the download
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      await saveCV({
        ...cvData,
        title: cvTitle,
        summary: cvData.summary, // Make sure summary is included
      });
      onClose();
    } catch (error) {
      console.error("Error saving CV:", error);
    } finally {
      setSaving(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Generated CV Preview</DialogTitle>
        </DialogHeader>

        <div className="my-4 border p-4 bg-white cv-content">
          <GeneratedCV {...cvData} />
        </div>

        <div className="mb-4">
          <Label htmlFor="cv-title">CV Title</Label>
          <Input
            id="cv-title"
            value={cvTitle}
            onChange={(e) => setCvTitle(e.target.value)}
            placeholder="Enter a title for your CV"
            className="mt-1"
          />
          <p className="text-xs text-gray-500 mt-1">
            This name will be used for your saved CV and downloads
          </p>
        </div>

        <DialogFooter className="flex justify-between">
          <div className="flex space-x-2">
            <Button onClick={handleDownload}>
              <Download className="mr-2 h-4 w-4" /> Download Word
            </Button>
            <Button
              onClick={() => {
                // Get the HTML content of the CV
                const cvContent = document.querySelector(".cv-content");
                if (!cvContent) {
                  alert("Could not find CV content to download");
                  return;
                }

                // Use html2pdf directly instead of jsPDF
                const opt = {
                  margin: 10,
                  filename: `${cvTitle || `${cvData.firstName || "CV"}_${cvData.lastName || ""}`}.pdf`,
                  image: { type: "jpeg", quality: 0.98 },
                  html2canvas: { scale: 2 },
                  jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
                };

                html2pdf().set(opt).from(cvContent).save();
              }}
            >
              <Download className="mr-2 h-4 w-4" /> Download PDF
            </Button>
          </div>
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
                {showTitleInput ? "Save" : "Save CV"}
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CVPreviewModal;
