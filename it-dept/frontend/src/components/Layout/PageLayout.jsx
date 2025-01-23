import React from "react";
import { cn } from "../../libs/utils";

const PageLayout = ({ children, className }) => {
  return (
    <main
      className={cn(
        "min-h-screen w-full px-4 py-16 sm:px-6 lg:px-8",
        "max-w-7xl mx-auto",
        className
      )}
    >
      {children}
    </main>
  );
};

export default PageLayout;
