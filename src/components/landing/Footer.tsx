import React from "react";
import { Button } from "@/components/ui/button";
import { Github, Twitter, Linkedin, Facebook, Instagram } from "lucide-react";

interface FooterProps {
  companyName?: string;
  socialLinks?: {
    github?: string;
    twitter?: string;
    linkedin?: string;
    facebook?: string;
    instagram?: string;
  };
  links?: {
    title: string;
    items: Array<{ label: string; href: string }>;
  }[];
}

const Footer = ({
  companyName = "CV & Cover Letter AI Assistant",
  socialLinks = {
    github: "#",
    twitter: "#",
    linkedin: "#",
    facebook: "#",
    instagram: "#",
  },
  links = [
    {
      title: "Product",
      items: [
        { label: "Features", href: "#" },
        { label: "Pricing", href: "#" },
        { label: "Templates", href: "#" },
      ],
    },
    {
      title: "Resources",
      items: [
        { label: "Blog", href: "#" },
        { label: "Help Center", href: "#" },
        { label: "Guides", href: "#" },
      ],
    },
    {
      title: "Company",
      items: [
        { label: "About", href: "#" },
        { label: "Careers", href: "#" },
        { label: "Contact", href: "#" },
      ],
    },
    {
      title: "Legal",
      items: [
        { label: "Privacy", href: "#" },
        { label: "Terms", href: "#" },
        { label: "Cookie Policy", href: "#" },
      ],
    },
  ],
}: FooterProps) => {
  return (
    <footer className="w-full bg-background border-t py-12 px-4 md:px-6 lg:px-8">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Company info */}
          <div className="lg:col-span-2">
            <h3 className="text-xl font-bold mb-4">{companyName}</h3>
            <p className="text-muted-foreground mb-4">
              Create professional CVs and custom cover letters with AI
              assistance. Stand out in your job applications with our powerful
              tools.
            </p>
            <div className="flex space-x-4">
              {socialLinks.github && (
                <a
                  href={socialLinks.github}
                  aria-label="GitHub"
                  className="text-muted-foreground hover:text-foreground"
                >
                  <Github size={20} />
                </a>
              )}
              {socialLinks.twitter && (
                <a
                  href={socialLinks.twitter}
                  aria-label="Twitter"
                  className="text-muted-foreground hover:text-foreground"
                >
                  <Twitter size={20} />
                </a>
              )}
              {socialLinks.linkedin && (
                <a
                  href={socialLinks.linkedin}
                  aria-label="LinkedIn"
                  className="text-muted-foreground hover:text-foreground"
                >
                  <Linkedin size={20} />
                </a>
              )}
              {socialLinks.facebook && (
                <a
                  href={socialLinks.facebook}
                  aria-label="Facebook"
                  className="text-muted-foreground hover:text-foreground"
                >
                  <Facebook size={20} />
                </a>
              )}
              {socialLinks.instagram && (
                <a
                  href={socialLinks.instagram}
                  aria-label="Instagram"
                  className="text-muted-foreground hover:text-foreground"
                >
                  <Instagram size={20} />
                </a>
              )}
            </div>
          </div>

          {/* Links */}
          {links.map((section, index) => (
            <div key={index}>
              <h4 className="font-medium mb-4">{section.title}</h4>
              <ul className="space-y-2">
                {section.items.map((item, itemIndex) => (
                  <li key={itemIndex}>
                    <a
                      href={item.href}
                      className="text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} {companyName}. All rights
            reserved.
          </p>
          <div className="mt-4 md:mt-0">
            <Button variant="link" size="sm" className="text-muted-foreground">
              Privacy Policy
            </Button>
            <Button variant="link" size="sm" className="text-muted-foreground">
              Terms of Service
            </Button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
