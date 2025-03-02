import React from "react";
import { Card, CardContent } from "../ui/card";
import { CheckCircle, FileText, PenLine, Sparkles } from "lucide-react";

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const FeatureCard = ({
  icon = <Sparkles />,
  title = "Feature Title",
  description = "Feature description goes here",
}: FeatureCardProps) => {
  return (
    <Card className="bg-white h-full transition-all duration-300 hover:shadow-lg">
      <CardContent className="p-6 flex flex-col items-center text-center">
        <div className="text-primary mb-4 p-3 bg-primary/10 rounded-full">
          {icon}
        </div>
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  );
};

const FeatureSection = () => {
  const features = [
    {
      icon: <FileText className="h-6 w-6" />,
      title: "Professional CV Templates",
      description:
        "Choose from a variety of professionally designed templates to create your perfect CV.",
    },
    {
      icon: <Sparkles className="h-6 w-6" />,
      title: "AI-Powered Assistance",
      description:
        "Get intelligent suggestions and improvements to make your CV stand out to employers.",
    },
    {
      icon: <PenLine className="h-6 w-6" />,
      title: "Custom Cover Letters",
      description:
        "Create tailored cover letters that match your CV and the job you're applying for.",
    },
    {
      icon: <CheckCircle className="h-6 w-6" />,
      title: "Easy Editing",
      description:
        "Simple and intuitive interface to edit, update, and manage your professional documents.",
    },
  ];

  return (
    <section className="py-16 px-4 bg-slate-50">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Powerful Features</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Our AI-powered platform helps you create professional CVs and cover
            letters that get you noticed by employers.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeatureSection;
