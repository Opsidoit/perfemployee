import React, { ReactNode } from "react";
import { Card } from "../ui/card";

interface ContentAreaProps {
  children?: ReactNode;
  title?: string;
  description?: string;
}

const ContentArea = ({
  children,
  title = "Dashboard",
  description = "Manage your CV and Cover Letter content",
}: ContentAreaProps) => {
  return (
    <div className="flex-1 p-6 bg-gray-50 dark:bg-gray-900 min-h-screen overflow-auto">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            {title}
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mt-2">{description}</p>
        </div>

        <Card className="bg-white dark:bg-gray-800 shadow-sm p-6 rounded-lg">
          {children || (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="rounded-full bg-blue-100 dark:bg-blue-900 p-4 mb-4">
                <svg
                  className="h-8 w-8 text-blue-600 dark:text-blue-300"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
              </div>
              <h2 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
                Select a document to edit
              </h2>
              <p className="text-gray-500 dark:text-gray-400 max-w-md">
                Choose either CV or Cover Letter from the sidebar to start
                creating or editing your documents.
              </p>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
};

export default ContentArea;
