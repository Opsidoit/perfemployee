import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Save,
  Download,
  ArrowLeft,
  Wand2,
  Sparkles,
  Plus,
  X,
} from "lucide-react";
import { Link, useParams } from "react-router-dom";
import CVPreviewModal from "@/components/cv/CVPreviewModal";
import { useCV } from "@/contexts/CVContext";
import { Loader2 } from "lucide-react";

interface ExperienceEntry {
  title: string;
  summary: string;
  startMonth: string;
  startYear: string;
  endMonth: string;
  endYear: string;
}

interface EducationEntry {
  institution: string;
  degree: string;
  grade: string;
  startMonth: string;
  startYear: string;
  endMonth: string;
  endYear: string;
}

interface ExtracurricularEntry {
  activity: string;
  description: string;
}

const CVEditor = () => {
  const { id } = useParams<{ id: string }>();
  const { getCV, loading: cvLoading } = useCV();
  const [loading, setLoading] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [skills, setSkills] = useState("");
  const [cvSummary, setCvSummary] = useState("");
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  useEffect(() => {
    if (id) {
      loadCV(id);
    }
  }, [id]);

  const loadCV = async (cvId: string) => {
    try {
      setLoading(true);
      const cvData = await getCV(cvId);

      if (cvData) {
        setFirstName(cvData.firstName || "");
        setLastName(cvData.lastName || "");
        setEmail(cvData.email || "");
        setPhone(cvData.phone || "");
        setCity(cvData.city || "");
        setCountry(cvData.country || "");
        setSkills(cvData.skills.join(", "));
        setCvSummary(cvData.summary || "");

        if (cvData.experiences && cvData.experiences.length > 0) {
          setExperienceEntries(cvData.experiences);
        }

        if (cvData.education && cvData.education.length > 0) {
          setEducationEntries(cvData.education);
        }

        if (cvData.extracurricular && cvData.extracurricular.length > 0) {
          setExtracurricularEntries(
            cvData.extracurricular.map((item) => ({
              activity: item.activity,
              description: item.role,
            })),
          );
        }
      }
    } catch (error) {
      console.error("Error loading CV:", error);
    } finally {
      setLoading(false);
    }
  };

  const [experienceEntries, setExperienceEntries] = useState<ExperienceEntry[]>(
    [
      {
        title: "",
        summary: "",
        startMonth: "January",
        startYear: "2020",
        endMonth: "Present",
        endYear: "",
      },
    ],
  );

  const [educationEntries, setEducationEntries] = useState<EducationEntry[]>([
    {
      institution: "",
      degree: "",
      grade: "",
      startMonth: "January",
      startYear: "2020",
      endMonth: "Present",
      endYear: "",
    },
  ]);

  const [extracurricularEntries, setExtracurricularEntries] = useState<
    ExtracurricularEntry[]
  >([
    {
      activity: "",
      description: "",
    },
  ]);

  const addExperienceEntry = () => {
    setExperienceEntries([
      ...experienceEntries,
      {
        title: "",
        summary: "",
        startMonth: "January",
        startYear: "2020",
        endMonth: "Present",
        endYear: "",
      },
    ]);
  };

  const addEducationEntry = () => {
    setEducationEntries([
      ...educationEntries,
      {
        institution: "",
        degree: "",
        grade: "",
        startMonth: "January",
        startYear: "2020",
        endMonth: "Present",
        endYear: "",
      },
    ]);
  };

  const addExtracurricularEntry = () => {
    setExtracurricularEntries([
      ...extracurricularEntries,
      {
        activity: "",
        description: "",
      },
    ]);
  };

  const updateExperienceEntry = (
    index: number,
    field: keyof ExperienceEntry,
    value: string,
  ) => {
    const updatedEntries = [...experienceEntries];
    updatedEntries[index][field] = value;
    setExperienceEntries(updatedEntries);
  };

  const updateEducationEntry = (
    index: number,
    field: keyof EducationEntry,
    value: string,
  ) => {
    const updatedEntries = [...educationEntries];
    updatedEntries[index][field] = value;
    setEducationEntries(updatedEntries);
  };

  const updateExtracurricularEntry = (
    index: number,
    field: keyof ExtracurricularEntry,
    value: string,
  ) => {
    const updatedEntries = [...extracurricularEntries];
    updatedEntries[index][field] = value;
    setExtracurricularEntries(updatedEntries);
  };

  const removeExperienceEntry = (index: number) => {
    const updatedEntries = [...experienceEntries];
    updatedEntries.splice(index, 1);
    setExperienceEntries(updatedEntries);
  };

  const removeEducationEntry = (index: number) => {
    const updatedEntries = [...educationEntries];
    updatedEntries.splice(index, 1);
    setEducationEntries(updatedEntries);
  };

  const removeExtracurricularEntry = (index: number) => {
    const updatedEntries = [...extracurricularEntries];
    updatedEntries.splice(index, 1);
    setExtracurricularEntries(updatedEntries);
  };

  const handleGenerateCV = () => {
    setIsPreviewOpen(true);
  };

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
    "Present",
  ];

  const years = Array.from(
    { length: new Date().getFullYear() - 1930 + 1 },
    (_, i) => (new Date().getFullYear() - i).toString(),
  );

  // Use a default title that can be overridden in the preview modal
  const cvData = {
    id,
    title: id ? `${firstName} ${lastName}'s CV` : "", // Empty title for new CVs will be set in the modal
    firstName,
    lastName,
    email,
    phone,
    city,
    country,
    summary: cvSummary,
    skills: skills
      .split(",")
      .map((skill) => skill.trim())
      .filter((skill) => skill),
    experiences: experienceEntries,
    education: educationEntries,
    extracurricular: extracurricularEntries.map(
      ({ activity, description }) => ({
        activity,
        role: description,
      }),
    ),
  };

  if (loading || cvLoading) {
    return (
      <div className="p-6 max-w-7xl mx-auto flex justify-center items-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-primary mr-2" />
        <span>Loading CV data...</span>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex items-center mb-6">
        <Button variant="ghost" size="icon" asChild className="mr-2">
          <Link to="/dashboard">
            <ArrowLeft className="h-5 w-5" />
          </Link>
        </Button>
        <h1 className="text-2xl font-bold">Edit Curriculum Vitae</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left sidebar - AI Assistant */}
        <div className="lg:col-span-1">
          <Card className="bg-gradient-to-br from-indigo-50 to-blue-50 border-blue-200 sticky top-6">
            <CardContent className="p-6">
              <div className="flex justify-center mb-4">
                <div className="p-3 bg-blue-500 rounded-full text-white">
                  <Sparkles className="h-8 w-8" />
                </div>
              </div>
              <h3 className="font-bold text-xl text-center mb-4">
                AI Resume Builder
              </h3>
              <p className="text-gray-600 mb-6 text-center">
                Let our AI craft a professional CV tailored to your industry and
                experience
              </p>
              <Button
                className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-medium py-6"
                onClick={handleGenerateCV}
              >
                <Wand2 className="mr-2 h-5 w-5" /> Generate Professional CV
              </Button>
              <div className="mt-4 text-center text-sm text-gray-500">
                <p>
                  Our AI analyzes thousands of successful resumes to create the
                  perfect CV for your target role
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main content - CV editor */}
        <div className="lg:col-span-2">
          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-4 text-[#26cef3]">
                Your Professional Profile
              </h2>
              <div className="space-y-4">
                <div className="mb-6 p-4 border rounded-md bg-blue-50">
                  <label className="block text-sm font-medium mb-1 text-blue-700">
                    Professional Summary
                  </label>
                  <textarea
                    className="w-full p-2 border rounded-md h-24"
                    placeholder="Write a brief summary of your professional background, skills, and career goals..."
                    value={cvSummary}
                    onChange={(e) => setCvSummary(e.target.value)}
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    This summary will appear at the top of your CV
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      First Name
                    </label>
                    <input
                      type="text"
                      className="w-full p-2 border rounded-md"
                      placeholder="Simone"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Last Name
                    </label>
                    <input
                      type="text"
                      className="w-full p-2 border rounded-md"
                      placeholder="Obrizzo"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Birth Date
                    </label>
                    <input
                      type="date"
                      className="w-full p-2 border rounded-md"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      className="w-full p-2 border rounded-md"
                      placeholder="+1 (555) 123-4567"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    className="w-full p-2 border rounded-md"
                    placeholder="your.mail@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      City
                    </label>
                    <input
                      type="text"
                      className="w-full p-2 border rounded-md"
                      placeholder="New York"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Country
                    </label>
                    <input
                      type="text"
                      className="w-full p-2 border rounded-md"
                      placeholder="United States"
                      value={country}
                      onChange={(e) => setCountry(e.target.value)}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">
                    Key Skills (comma separated)
                  </label>
                  <input
                    type="text"
                    className="w-full p-2 border rounded-md"
                    placeholder="Excel, JavaScript, AWS, Python, ..."
                    value={skills}
                    onChange={(e) => setSkills(e.target.value)}
                  />
                </div>

                {/* Professional Experience Section */}
                <div className="border-t pt-4 mt-6">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-medium text-[#26cef3]">
                      Professional Experience
                    </h3>
                    <Button
                      onClick={addExperienceEntry}
                      size="sm"
                      variant="outline"
                      className="flex items-center"
                    >
                      <Plus className="h-4 w-4 mr-1" /> Add Experience
                    </Button>
                  </div>

                  {experienceEntries.map((entry, index) => (
                    <div
                      key={index}
                      className="space-y-4 mb-6 p-4 border rounded-md bg-gray-50 relative"
                    >
                      <div className="flex">
                        <div className="flex-grow">
                          <label className="block text-sm font-medium mb-1">
                            Professional Title
                          </label>
                          <input
                            type="text"
                            className="w-full p-2 border rounded-md"
                            placeholder="Senior Software Engineer"
                            value={entry.title}
                            onChange={(e) =>
                              updateExperienceEntry(
                                index,
                                "title",
                                e.target.value,
                              )
                            }
                          />
                        </div>
                        <Button
                          variant="destructive"
                          size="sm"
                          className="ml-2 h-8 w-8 p-0 absolute top-4 right-4"
                          onClick={() => removeExperienceEntry(index)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-1">
                          Professional Summary
                        </label>
                        <textarea
                          className="w-full p-2 border rounded-md h-24"
                          placeholder="Write all your experience you did on the job, the skills you learned and the achievements..."
                          value={entry.summary}
                          onChange={(e) =>
                            updateExperienceEntry(
                              index,
                              "summary",
                              e.target.value,
                            )
                          }
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium mb-1">
                            Start Date
                          </label>
                          <div className="grid grid-cols-2 gap-2">
                            <select
                              className="p-2 border rounded-md"
                              value={entry.startMonth}
                              onChange={(e) =>
                                updateExperienceEntry(
                                  index,
                                  "startMonth",
                                  e.target.value,
                                )
                              }
                            >
                              {months
                                .filter((m) => m !== "Present")
                                .map((month) => (
                                  <option key={month} value={month}>
                                    {month}
                                  </option>
                                ))}
                            </select>
                            <select
                              className="p-2 border rounded-md"
                              value={entry.startYear}
                              onChange={(e) =>
                                updateExperienceEntry(
                                  index,
                                  "startYear",
                                  e.target.value,
                                )
                              }
                            >
                              {years.map((year) => (
                                <option key={year} value={year}>
                                  {year}
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-1">
                            End Date
                          </label>
                          <div className="grid grid-cols-2 gap-2">
                            <select
                              className="p-2 border rounded-md"
                              value={entry.endMonth}
                              onChange={(e) =>
                                updateExperienceEntry(
                                  index,
                                  "endMonth",
                                  e.target.value,
                                )
                              }
                            >
                              {months.map((month) => (
                                <option key={month} value={month}>
                                  {month}
                                </option>
                              ))}
                            </select>
                            {entry.endMonth !== "Present" && (
                              <select
                                className="p-2 border rounded-md"
                                value={entry.endYear}
                                onChange={(e) =>
                                  updateExperienceEntry(
                                    index,
                                    "endYear",
                                    e.target.value,
                                  )
                                }
                              >
                                {years.map((year) => (
                                  <option key={year} value={year}>
                                    {year}
                                  </option>
                                ))}
                              </select>
                            )}
                            {entry.endMonth === "Present" && (
                              <select
                                className="p-2 border rounded-md bg-gray-100 text-gray-500"
                                disabled
                              >
                                <option>Present</option>
                              </select>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Education Section */}
                <div className="border-t pt-4 mt-6">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-medium text-[#26cef3]">
                      Education
                    </h3>
                    <Button
                      onClick={addEducationEntry}
                      size="sm"
                      variant="outline"
                      className="flex items-center"
                    >
                      <Plus className="h-4 w-4 mr-1" /> Add Education
                    </Button>
                  </div>

                  {educationEntries.map((entry, index) => (
                    <div
                      key={index}
                      className="space-y-4 mb-6 p-4 border rounded-md bg-gray-50 relative"
                    >
                      <div className="flex">
                        <div className="flex-grow">
                          <label className="block text-sm font-medium mb-1">
                            Institution
                          </label>
                          <input
                            type="text"
                            className="w-full p-2 border rounded-md"
                            placeholder="University of Example"
                            value={entry.institution}
                            onChange={(e) =>
                              updateEducationEntry(
                                index,
                                "institution",
                                e.target.value,
                              )
                            }
                          />
                        </div>
                        <Button
                          variant="destructive"
                          size="sm"
                          className="ml-2 h-8 w-8 p-0 absolute top-4 right-4"
                          onClick={() => removeEducationEntry(index)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium mb-1">
                            Degree
                          </label>
                          <input
                            type="text"
                            className="w-full p-2 border rounded-md"
                            placeholder="Bachelor of Science in Computer Science"
                            value={entry.degree}
                            onChange={(e) =>
                              updateEducationEntry(
                                index,
                                "degree",
                                e.target.value,
                              )
                            }
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-1">
                            Grade
                          </label>
                          <input
                            type="text"
                            className="w-full p-2 border rounded-md"
                            placeholder="A, 3.8 GPA, First Class, etc."
                            value={entry.grade}
                            onChange={(e) =>
                              updateEducationEntry(
                                index,
                                "grade",
                                e.target.value,
                              )
                            }
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium mb-1">
                            Start Date
                          </label>
                          <div className="grid grid-cols-2 gap-2">
                            <select
                              className="p-2 border rounded-md"
                              value={entry.startMonth}
                              onChange={(e) =>
                                updateEducationEntry(
                                  index,
                                  "startMonth",
                                  e.target.value,
                                )
                              }
                            >
                              {months
                                .filter((m) => m !== "Present")
                                .map((month) => (
                                  <option key={month} value={month}>
                                    {month}
                                  </option>
                                ))}
                            </select>
                            <select
                              className="p-2 border rounded-md"
                              value={entry.startYear}
                              onChange={(e) =>
                                updateEducationEntry(
                                  index,
                                  "startYear",
                                  e.target.value,
                                )
                              }
                            >
                              {years.map((year) => (
                                <option key={year} value={year}>
                                  {year}
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-1">
                            End Date
                          </label>
                          <div className="grid grid-cols-2 gap-2">
                            <select
                              className="p-2 border rounded-md"
                              value={entry.endMonth}
                              onChange={(e) =>
                                updateEducationEntry(
                                  index,
                                  "endMonth",
                                  e.target.value,
                                )
                              }
                            >
                              {months.map((month) => (
                                <option key={month} value={month}>
                                  {month}
                                </option>
                              ))}
                            </select>
                            {entry.endMonth !== "Present" && (
                              <select
                                className="p-2 border rounded-md"
                                value={entry.endYear}
                                onChange={(e) =>
                                  updateEducationEntry(
                                    index,
                                    "endYear",
                                    e.target.value,
                                  )
                                }
                              >
                                {years.map((year) => (
                                  <option key={year} value={year}>
                                    {year}
                                  </option>
                                ))}
                              </select>
                            )}
                            {entry.endMonth === "Present" && (
                              <select
                                className="p-2 border rounded-md bg-gray-100 text-gray-500"
                                disabled
                              >
                                <option>Present</option>
                              </select>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Extracurricular Section */}
                <div className="border-t pt-4 mt-6">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-medium text-[#26cef3]">
                      Extracurricular Activities
                    </h3>
                    <Button
                      onClick={addExtracurricularEntry}
                      size="sm"
                      variant="outline"
                      className="flex items-center"
                    >
                      <Plus className="h-4 w-4 mr-1" /> Add Activity
                    </Button>
                  </div>

                  {extracurricularEntries.map((entry, index) => (
                    <div
                      key={index}
                      className="space-y-4 mb-6 p-4 border rounded-md bg-gray-50 relative"
                    >
                      <div className="flex">
                        <div className="flex-grow">
                          <label className="block text-sm font-medium mb-1">
                            Activity & Interests
                          </label>
                          <input
                            type="text"
                            className="w-full p-2 border rounded-md"
                            placeholder="Volunteer Work, Sports Team, Chess, etc."
                            value={entry.activity}
                            onChange={(e) =>
                              updateExtracurricularEntry(
                                index,
                                "activity",
                                e.target.value,
                              )
                            }
                          />
                        </div>
                        <Button
                          variant="destructive"
                          size="sm"
                          className="ml-2 h-8 w-8 p-0 absolute top-4 right-4"
                          onClick={() => removeExtracurricularEntry(index)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-1">
                          Description
                        </label>
                        <input
                          type="text"
                          className="w-full p-2 border rounded-md"
                          placeholder="Not Mandatory Description"
                          value={entry.description}
                          onChange={(e) =>
                            updateExtracurricularEntry(
                              index,
                              "description",
                              e.target.value,
                            )
                          }
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* CV Preview Modal */}
      <CVPreviewModal
        isOpen={isPreviewOpen}
        onClose={() => setIsPreviewOpen(false)}
        cvData={cvData}
      />
    </div>
  );
};

export default CVEditor;
