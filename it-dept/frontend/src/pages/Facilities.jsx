import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import PageLayout from "../components/Layout/PageLayout";
import LabAvailability from "../components/Facilities/LabAvailability";
import ProjectsPortal from "../components/Facilities/ProjectsPortal";
import DepartmentGrowth from "../components/Facilities/DepartmentGrowth";

const Facilities = () => {
  const [activeSection, setActiveSection] = useState("labs");

  const sections = {
    labs: {
      title: "Lab Availability",
      component: LabAvailability,
    },
    projects: {
      title: "Student Projects",
      component: ProjectsPortal,
    },
    growth: {
      title: "Department Growth",
      component: DepartmentGrowth,
    },
  };

  return (
    <PageLayout title="Facilities & Resources">
      <div className="flex justify-center space-x-4 mb-8">
        {Object.entries(sections).map(([key, section]) => (
          <button
            key={key}
            onClick={() => setActiveSection(key)}
            className={`px-4 py-2 rounded-md transition-colors duration-200 ${
              activeSection === key
                ? "bg-[#00FF1A] text-black"
                : "bg-gray-900 text-white hover:bg-gray-800"
            }`}
          >
            {section.title}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={activeSection}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="max-w-7xl mx-auto"
        >
          {React.createElement(sections[activeSection].component)}
        </motion.div>
      </AnimatePresence>
    </PageLayout>
  );
};

export default Facilities;
