import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Save, FileText, ArrowLeft, Wand2, FileDown } from "lucide-react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import jsPDF from "jspdf";

interface CoverLetterData {
  id?: string;
  title: string;
  content: string;
  company: string;
  position: string;
  recipient: string;
}

const CoverLetterEditor = () => {
  const [coverLetterText, setCoverLetterText] = useState("");
  const [title, setTitle] = useState("My Cover Letter");
  const [company, setCompany] = useState("Company Name");
  const [position, setPosition] = useState("Position Title");
  const [recipient, setRecipient] = useState("Hiring Manager");
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();

  const placeholderText = `Dear Hiring Manager,

I am writing to express my interest in the Software Engineer position at Google. With my background in web development and experience with React, TypeScript, and Node.js, I believe I would be a valuable addition to your team.

In my current role at XYZ Company, I have successfully developed and maintained several web applications that have improved efficiency by 30%. I am particularly proud of implementing a new feature that reduced load times by 40% and increased user engagement.

I am excited about the opportunity to bring my technical skills and passion for creating exceptional user experiences to Google. I am particularly drawn to your company's commitment to innovation and solving complex problems.

Thank you for considering my application. I look forward to the possibility of discussing how my skills and experiences align with your team's needs.

Sincerely,
John Doe`;

  useEffect(() => {
    if (id) {
      fetchCoverLetter();
    }
  }, [id]);

  const fetchCoverLetter = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("cover_letters")
        .select("*")
        .eq("id", id)
        .single();

      if (error) throw error;

      if (data) {
        setCoverLetterText(data.content || "");
        setTitle(data.title || "My Cover Letter");
        setCompany(data.company || "Company Name");
        setPosition(data.position || "Position Title");
        setRecipient(data.recipient || "Hiring Manager");
      }
    } catch (error) {
      console.error("Error fetching cover letter:", error);
    } finally {
      setLoading(false);
    }
  };

  const saveCoverLetter = async () => {
    try {
      setSaving(true);
      const { data: userData } = await supabase.auth.getUser();

      if (!userData.user) {
        alert("You must be logged in to save a cover letter");
        return;
      }

      const coverLetterData: CoverLetterData = {
        title: title.trim() || "My Cover Letter",
        content: coverLetterText || placeholderText,
        company,
        position,
        recipient,
      };

      let response;

      if (id) {
        // Update existing cover letter
        response = await supabase
          .from("cover_letters")
          .update(coverLetterData)
          .eq("id", id);
      } else {
        // Create new cover letter
        response = await supabase.from("cover_letters").insert([
          {
            ...coverLetterData,
            user_id: userData.user.id,
          },
        ]);
      }

      if (response.error) throw response.error;

      alert("Cover letter saved successfully!");
      navigate("/dashboard/saved-cover-letters");
    } catch (error) {
      console.error("Error saving cover letter:", error);
      alert("Failed to save cover letter. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  const exportToDocx = () => {
    const content = coverLetterText || placeholderText;
    // Create a simple HTML document with the content
    const htmlContent = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>${title}</title>
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; }
  </style>
</head>
<body>
  ${content.replace(/\n/g, "<br>")}
</body>
</html>`;

    const blob = new Blob([htmlContent], { type: "application/msword" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${title.replace(/\s+/g, "_")}.doc`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const exportToPdf = () => {
    const content = coverLetterText || placeholderText;
    const fileName = `${title.replace(/\s+/g, "_")}.pdf`;

    // Create a new PDF document
    const doc = new jsPDF();

    // Set document properties
    doc.setFont("helvetica");
    doc.setFontSize(11);

    // Calculate page width with margins
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    const margin = 25; // Increased margin for better readability
    const maxWidth = pageWidth - margin * 2;

    // Start content below title
    let yPosition = margin + 8;

    // Split the content by paragraphs (double line breaks)
    const paragraphs = content.split(/\n\s*\n/);

    // Process each paragraph
    paragraphs.forEach((paragraph) => {
      if (paragraph.trim() === "") return; // Skip empty paragraphs

      // Process the entire paragraph at once for better justification
      const splitText = doc.splitTextToSize(paragraph, maxWidth - 5); // Reduce width slightly for safety

      // Check if we need a new page
      if (yPosition + splitText.length * 7 > pageHeight - margin) {
        doc.addPage();
        yPosition = margin + 5; // Reset position with proper margin
      }

      // Add the text with justification
      doc.text(splitText, margin, yPosition, {
        align: "justify",
        maxWidth: maxWidth - 5,
      });

      // Move to next paragraph with proper spacing
      yPosition += splitText.length * 6 + 1; // Add extra space between paragraphs
    });

    // Save the PDF
    doc.save(fileName);
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <Button variant="ghost" size="icon" asChild className="mr-2">
            <Link to="/dashboard/saved-cover-letters">
              <ArrowLeft className="h-5 w-5" />
            </Link>
          </Button>
          <h1 className="text-2xl font-bold">Edit Cover Letter</h1>
        </div>
        <div className="flex space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={exportToDocx}
            className="bg-black text-white hover:bg-black/90"
          >
            <FileText className="mr-2 h-4 w-4" /> Download Word
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={exportToPdf}
            className="bg-black text-white hover:bg-black/90"
          >
            <FileDown className="mr-2 h-4 w-4" /> Download PDF
          </Button>
        </div>
      </div>

      <div className="flex justify-center">
        {/* Main content - Cover Letter editor */}
        <div className="w-full max-w-3xl">
          <Card>
            <CardContent className="p-6">
              <div className="relative">
                {coverLetterText === "" && (
                  <div className="absolute inset-0 p-4 text-gray-400 pointer-events-none whitespace-pre-wrap">
                    {placeholderText}
                  </div>
                )}
                <textarea
                  className="w-full h-[600px] p-4 border rounded-md font-sans text-base bg-transparent"
                  value={coverLetterText}
                  onChange={(e) => setCoverLetterText(e.target.value)}
                />
              </div>

              {/* Title input field */}
              <div className="mt-4">
                <label
                  htmlFor="cover-letter-title"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Cover Letter Title
                </label>
                <input
                  id="cover-letter-title"
                  type="text"
                  className="w-full p-2 border rounded-md font-sans text-base"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Enter a title for your cover letter"
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Save button at the bottom */}
      <div className="flex justify-center mt-4">
        <Button className="px-6" onClick={saveCoverLetter} disabled={saving}>
          <Save className="mr-2 h-4 w-4" /> {saving ? "Saving..." : "Save"}
        </Button>
      </div>
    </div>
  );
};

export default CoverLetterEditor;
