import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Button } from "../ui/button";
import { ScrollArea } from "../ui/scroll-area";
import { PlusCircle, FileText, Download } from "lucide-react";

interface CVDocument {
  id: string;
  title: string;
  lastModified: string;
  template: string;
}

interface CVSectionProps {
  documents?: CVDocument[];
  onCreateNew?: () => void;
  onEdit?: (id: string) => void;
  onDownload?: (id: string) => void;
}

const defaultDocuments: CVDocument[] = [
  {
    id: "1",
    title: "Software Developer CV",
    lastModified: "2024-03-20",
    template: "Professional",
  },
  {
    id: "2",
    title: "Project Manager CV",
    lastModified: "2024-03-19",
    template: "Executive",
  },
];

const CVSection = ({
  documents = defaultDocuments,
  onCreateNew = () => console.log("Create new CV clicked"),
  onEdit = (id) => console.log("Edit CV clicked", id),
  onDownload = (id) => console.log("Download CV clicked", id),
}: CVSectionProps) => {
  return (
    <Card className="w-full h-full bg-white">
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          <span>My CVs</span>
          <Button onClick={onCreateNew} className="flex items-center gap-2">
            <PlusCircle className="h-4 w-4" />
            Create New
          </Button>
        </CardTitle>
        <CardDescription>
          Manage and create your professional CVs
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[300px] w-full pr-4">
          <div className="space-y-4">
            {documents.map((doc) => (
              <div
                key={doc.id}
                className="p-4 border rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <FileText className="h-5 w-5 text-gray-500" />
                    <div>
                      <h3 className="font-medium">{doc.title}</h3>
                      <p className="text-sm text-gray-500">
                        Template: {doc.template} | Last modified:{" "}
                        {doc.lastModified}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onEdit(doc.id)}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onDownload(doc.id)}
                    >
                      <Download className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default CVSection;
