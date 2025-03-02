import React from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="w-screen h-screen flex items-center justify-center flex-col gap-4 bg-background">
      <h1 className="text-3xl font-bold">Home Page</h1>
      <Button asChild>
        <Link to="/">Go to Landing Page</Link>
      </Button>
    </div>
  );
}

export default Home;
