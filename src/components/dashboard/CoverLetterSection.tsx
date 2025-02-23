import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { FileDown, Link as LinkIcon, Wand2 } from "lucide-react";

interface CoverLetterSectionProps {
  jobUrl?: string;
  onGenerate?: (url: string) => void;
  onExport?: (format: "pdf" | "docx") => void;
  isGenerating?: boolean;
  generatedContent?: string;
}

const CoverLetterSection = ({
  jobUrl = "",
  onGenerate = () => {},
  onExport = () => {},
  isGenerating = false,
  generatedContent = "Your generated cover letter will appear here. The AI will analyze the job posting and create a personalized letter matching your profile with the job requirements.",
}: CoverLetterSectionProps) => {
  const [url, setUrl] = useState(jobUrl);
  const [tone, setTone] = useState("professional");

  return (
    <Card className="w-[460px] h-[400px] bg-white">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <LinkIcon className="h-5 w-5" />
          Cover Letter Generator
        </CardTitle>
        <CardDescription>
          Generate custom cover letters from job postings
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Input
            placeholder="Paste job posting URL here"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
          <div className="flex gap-2">
            <Select value={tone} onValueChange={setTone}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select tone" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="professional">Professional</SelectItem>
                <SelectItem value="friendly">Friendly</SelectItem>
                <SelectItem value="confident">Confident</SelectItem>
              </SelectContent>
            </Select>
            <Button
              onClick={() => onGenerate(url)}
              disabled={isGenerating || !url}
              className="flex-1"
            >
              <Wand2 className="mr-2 h-4 w-4" />
              Generate
            </Button>
          </div>
        </div>

        <Textarea
          className="h-[160px] resize-none"
          placeholder="Generated content will appear here"
          value={generatedContent}
          readOnly
        />

        <div className="flex justify-end gap-2">
          <Button
            variant="outline"
            onClick={() => onExport("pdf")}
            disabled={
              !generatedContent || generatedContent.includes("will appear here")
            }
          >
            <FileDown className="mr-2 h-4 w-4" />
            Export PDF
          </Button>
          <Button
            variant="outline"
            onClick={() => onExport("docx")}
            disabled={
              !generatedContent || generatedContent.includes("will appear here")
            }
          >
            <FileDown className="mr-2 h-4 w-4" />
            Export DOCX
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default CoverLetterSection;
