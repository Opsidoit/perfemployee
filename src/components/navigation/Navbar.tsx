import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

interface NavbarProps {
  transparent?: boolean;
}

const Navbar = ({ transparent = true }: NavbarProps) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const navbarBackground = transparent
    ? isScrolled
      ? "bg-white shadow-md"
      : "bg-transparent"
    : "bg-white shadow-md";

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${navbarBackground}`}
    >
      <div className="container mx-auto px-4 h-20 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <span className="flex my-1 px-1 py-1.5 justify-center items-end text-[#9fd4ec] via-[0%] via-inherit from-[67%] from-[#353ec8] font-extrabold text-4xl leading-10 text-right tracking-wide font-sans container bg-[#NaNNaNNaN] bg-[#NaNNaNNaN] opacity-100 bg-inherit">
            Perfemployee
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-4">
          <Button variant="ghost" asChild className="bg-white">
            <Link to="/sign-in">Sign in</Link>
          </Button>
          <Button
            asChild
            className="bg-[#NaNNaNNaN] bg-gradient-to-r from-[#32d136] to-lime-300 text-[#1418d1]"
          >
            <Link to="/sign-up">Sign up</Link>
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleMobileMenu}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </Button>
        </div>
      </div>
      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white w-full py-4 px-4 shadow-md">
          <div className="flex flex-col space-y-3">
            <Button variant="ghost" className="justify-start" asChild>
              <Link to="/sign-in">Sign in</Link>
            </Button>
            <Button className="w-full" asChild>
              <Link to="/sign-up">Sign up</Link>
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
