import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import GeneratedCV from "./GeneratedCV";

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
  const handleDownload = () => {
    // In a real app, this would generate a PDF
    alert("In a production app, this would download the CV as a PDF");
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

        <DialogFooter>
          <Button onClick={handleDownload}>
            <Download className="mr-2 h-4 w-4" /> Download PDF
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CVPreviewModal;
