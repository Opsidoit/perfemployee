import React from "react";

interface GeneratedCVProps {
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
}) => {
  return (
    <div className="bg-white p-8 max-w-4xl mx-auto shadow-lg">
      {/* Header */}
      <div className="text-center mb-6">
        <h1 className="text-3xl font-bold mb-2">
          {firstName} {lastName}
        </h1>
        <div className="text-sm">
          {phone} |{" "}
          <a href={`mailto:${email}`} className="text-blue-600 hover:underline">
            {email}
          </a>{" "}
          | {city}, {country}
        </div>
      </div>

      {/* Summary */}
      <div className="mb-6">
        <h2 className="text-lg font-bold border-b-2 border-gray-300 mb-2">
          Summary
        </h2>
        <p className="text-sm">
          {experiences[0]?.summary ||
            "Collaborative, ambitious problem-solver with inclusive leadership qualities, seeking internship position in Communication, Marketing, or Media. Prioritizes attention to detail, thoroughness, and aesthetic appeal. Energized by forming connections, learning from others, and embracing creativity."}
        </p>
      </div>

      {/* Education */}
      <div className="mb-6">
        <h2 className="text-lg font-bold border-b-2 border-gray-300 mb-2">
          Education
        </h2>
        {education.map((edu, index) => (
          <div key={index} className="mb-2">
            <div className="flex justify-between">
              <div className="font-bold">
                {edu.institution ||
                  "North Carolina State University, Raleigh, NC"}
              </div>
              <div>
                {edu.startMonth} {edu.startYear} -{" "}
                {edu.endMonth === "Present"
                  ? "Present"
                  : `${edu.endMonth} ${edu.endYear}`}
              </div>
            </div>
            <div>{edu.degree || "Bachelor of Arts in Communication"}</div>
            {edu.grade && <div>GPA: {edu.grade}</div>}
          </div>
        ))}
      </div>

      {/* Skills */}
      <div className="mb-6">
        <h2 className="text-lg font-bold border-b-2 border-gray-300 mb-2">
          Skills and Coursework
        </h2>
        <div className="grid grid-cols-3 gap-4">
          {skills.length > 0 ? (
            skills.map((skill, index) => (
              <div key={index} className="text-sm">
                - {skill.trim()}
              </div>
            ))
          ) : (
            <>
              <div className="text-sm">- Communication Theory</div>
              <div className="text-sm">- Creative Thinking</div>
              <div className="text-sm">- Canva</div>
              <div className="text-sm">- Newsletter Writing</div>
              <div className="text-sm">- Relationship Building</div>
              <div className="text-sm">- Adobe Illustrator</div>
              <div className="text-sm">- Academic Writing</div>
              <div className="text-sm">- Psychology</div>
              <div className="text-sm">- iMovie</div>
            </>
          )}
        </div>
      </div>

      {/* Experience */}
      <div className="mb-6">
        <h2 className="text-lg font-bold border-b-2 border-gray-300 mb-2">
          Experience
        </h2>
        {experiences.map((exp, index) => (
          <div key={index} className="mb-4">
            <div className="flex justify-between">
              <div className="font-bold">
                {exp.title || "Social Media Chair"}, {city}
              </div>
              <div>
                {exp.startMonth} {exp.startYear} -{" "}
                {exp.endMonth === "Present"
                  ? "Present"
                  : `${exp.endMonth} ${exp.endYear}`}
              </div>
            </div>
            <ul className="list-disc pl-5 text-sm">
              {exp.summary.split("\n").map((line, i) => (
                <li key={i}>{line.trim()}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Extracurricular */}
      {extracurricular.length > 0 && (
        <div className="mb-6">
          <h2 className="text-lg font-bold border-b-2 border-gray-300 mb-2">
            Extracurricular and Service
          </h2>
          <ul className="list-disc pl-5 text-sm">
            {extracurricular.map((extra, index) => (
              <li key={index}>
                {extra.activity}
                {extra.role ? `, ${extra.role}` : ""}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default GeneratedCV;
