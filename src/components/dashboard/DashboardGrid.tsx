import React from "react";
import CVSection from "./CVSection";
import CoverLetterSection from "./CoverLetterSection";
import ProfileSection from "./ProfileSection";

interface DashboardGridProps {
  onCVCreate?: () => void;
  onCVEdit?: (id: string) => void;
  onCVDownload?: (id: string) => void;
  onLetterGenerate?: (url: string) => void;
  onLetterExport?: (format: "pdf" | "docx") => void;
  isGeneratingLetter?: boolean;
  isProfileEditOpen?: boolean;
}

const DashboardGrid = ({
  onCVCreate = () => console.log("Create CV"),
  onCVEdit = (id) => console.log("Edit CV", id),
  onCVDownload = (id) => console.log("Download CV", id),
  onLetterGenerate = (url) => console.log("Generate letter for", url),
  onLetterExport = (format) => console.log("Export letter as", format),
  isGeneratingLetter = false,
  isProfileEditOpen = false,
}: DashboardGridProps) => {
  return (
    <div className="w-full h-full bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <CVSection
          onCreateNew={onCVCreate}
          onEdit={onCVEdit}
          onDownload={onCVDownload}
        />
        <CoverLetterSection
          onGenerate={onLetterGenerate}
          onExport={onLetterExport}
          isGenerating={isGeneratingLetter}
        />
        <ProfileSection isOpen={isProfileEditOpen} />
      </div>
    </div>
  );
};

export default DashboardGrid;
