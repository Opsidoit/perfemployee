import React, { useState } from "react";
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
import { Link } from "react-router-dom";

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
  role: string;
  startMonth: string;
  startYear: string;
  endMonth: string;
  endYear: string;
}

const CVEditor = () => {
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
      role: "",
      startMonth: "January",
      startYear: "2020",
      endMonth: "Present",
      endYear: "",
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
        role: "",
        startMonth: "January",
        startYear: "2020",
        endMonth: "Present",
        endYear: "",
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

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <Button variant="ghost" size="icon" asChild className="mr-2">
            <Link to="/dashboard">
              <ArrowLeft className="h-5 w-5" />
            </Link>
          </Button>
          <h1 className="text-2xl font-bold">Edit Curriculum Vitae</h1>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" size="sm">
            <Download className="mr-2 h-4 w-4" /> Export
          </Button>
          <Button size="sm">
            <Save className="mr-2 h-4 w-4" /> Save
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left sidebar - AI Assistant */}
        <div className="lg:col-span-1">
          <Card className="bg-gradient-to-br from-indigo-50 to-blue-50 border-blue-200">
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
              <Button className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-medium py-6">
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
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      First Name
                    </label>
                    <input
                      type="text"
                      className="w-full p-2 border rounded-md"
                      placeholder="Simone"
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
                            placeholder="Volunteer Work, Sports Team, Club, etc."
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
                          Role
                        </label>
                        <input
                          type="text"
                          className="w-full p-2 border rounded-md"
                          placeholder="Team Captain, Volunteer, Member, etc."
                          value={entry.role}
                          onChange={(e) =>
                            updateExtracurricularEntry(
                              index,
                              "role",
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
                                updateExtracurricularEntry(
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
                                updateExtracurricularEntry(
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
                                updateExtracurricularEntry(
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
                                  updateExtracurricularEntry(
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
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CVEditor;
