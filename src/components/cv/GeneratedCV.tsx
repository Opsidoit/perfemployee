import React from "react";

interface GeneratedCVProps {
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
}

const GeneratedCV: React.FC<GeneratedCVProps> = ({
  firstName,
  lastName,
  email,
  phone,
  city,
  country,
  skills,
  experiences,
  education,
  extracurricular,
  summary,
}) => {
  return (
    <div className="bg-white p-6 max-w-4xl mx-auto shadow-md overflow-hidden">
      {/* Header with sidebar layout */}
      <div className="flex flex-col md:flex-row">
        {/* Left sidebar with contact info */}
        <div className="bg-gray-100 p-6 md:w-1/3">
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold uppercase tracking-wider mb-1">
              {firstName || "John"} {lastName || "Doe"}
            </h1>
            <div className="text-gray-600 font-medium">
              {experiences[0]?.title || "Professional Title"}
            </div>
          </div>

          <div className="mb-6">
            <h2 className="text-lg font-bold border-b border-gray-400 mb-3 pb-1">
              CONTACT
            </h2>
            <div className="space-y-2">
              <div>
                <div className="font-semibold">Phone</div>
                <div>{phone || "+1 (555) 123-4567"}</div>
              </div>
              <div>
                <div className="font-semibold">Email</div>
                <div className="break-all">
                  {email || "john.doe@example.com"}
                </div>
              </div>
              <div>
                <div className="font-semibold">Location</div>
                <div>
                  {city || "New York"}
                  {city && country ? ", " : ""}
                  {country || "USA"}
                </div>
              </div>
            </div>
          </div>

          <div className="mb-6">
            <h2 className="text-lg font-bold border-b border-gray-400 mb-3 pb-1">
              SKILLS
            </h2>
            <ul className="list-disc pl-5 space-y-1">
              {skills.length > 0 ? (
                skills.map((skill, index) => <li key={index}>{skill}</li>)
              ) : (
                <>
                  <li>Communication</li>
                  <li>Leadership</li>
                  <li>Problem Solving</li>
                  <li>Project Management</li>
                  <li>Team Collaboration</li>
                  <li>Critical Thinking</li>
                </>
              )}
            </ul>
          </div>

          {extracurricular.length > 0 && (
            <div>
              <h2 className="text-lg font-bold border-b border-gray-400 mb-3 pb-1">
                INTERESTS
              </h2>
              <ul className="list-disc pl-5 space-y-1">
                {extracurricular.map((extra, index) => (
                  <li key={index} className="break-words whitespace-normal">
                    <span className="font-medium">{extra.activity}</span>
                    {extra.role && <div className="text-sm">{extra.role}</div>}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Main content */}
        <div className="p-6 md:w-2/3">
          {/* Summary Section */}
          <div className="mb-6">
            <h2 className="text-lg font-bold border-b-2 border-gray-300 mb-3 pb-1">
              SUMMARY
            </h2>
            <p className="break-words whitespace-normal">
              {summary ||
                experiences[0]?.summary ||
                "Results-driven professional with a proven track record of success in fast-paced environments. Skilled in developing innovative solutions and optimizing processes to drive organizational growth. Committed to delivering high-quality results while maintaining strong attention to detail."}
            </p>
          </div>

          {/* Experience Section */}
          <div className="mb-6">
            <h2 className="text-lg font-bold border-b-2 border-gray-300 mb-3 pb-1">
              PROFESSIONAL EXPERIENCE
            </h2>
            {experiences.map((exp, index) => (
              <div key={index} className="mb-4">
                <div className="font-bold">{exp.title || "Position Title"}</div>
                <div className="text-gray-600 mb-2">
                  {exp.startMonth} {exp.startYear} -{" "}
                  {exp.endMonth === "Present"
                    ? "Present"
                    : `${exp.endMonth} ${exp.endYear}`}
                </div>
                <ul className="list-disc pl-5 space-y-1">
                  {exp.summary ? (
                    exp.summary.split("\n").map((line, i) => (
                      <li key={i} className="break-words whitespace-normal">
                        {line.trim()}
                      </li>
                    ))
                  ) : (
                    <li className="break-words whitespace-normal">
                      Responsible for key initiatives and project management
                    </li>
                  )}
                </ul>
              </div>
            ))}
          </div>

          {/* Education Section */}
          <div>
            <h2 className="text-lg font-bold border-b-2 border-gray-300 mb-3 pb-1">
              EDUCATION
            </h2>
            {education.map((edu, index) => (
              <div key={index} className="mb-2">
                <div className="font-bold">
                  {edu.degree || "Bachelor's Degree"}
                </div>
                <div>{edu.institution || "University Name"}</div>
                <div className="text-gray-600">
                  {edu.startMonth} {edu.startYear} -{" "}
                  {edu.endMonth === "Present"
                    ? "Present"
                    : `${edu.endMonth} ${edu.endYear}`}
                </div>
                {edu.grade && <div>GPA: {edu.grade}</div>}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GeneratedCV;
