import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import PageLayout from "../components/Layout/PageLayout";
import BuildingLayout from "../components/BuildingLayout";

const About = () => {
  const [activeSection, setActiveSection] = useState("overview");

  const sections = {
    overview: {
      title: "Overview",
      content: `The Department of Information Technology was established in the year 1999. It has the vision of "Evolve into a Centre of Excellence for Education and Research in Information Technology" through academic excellence, collaborative research and value added courses to produce highly competent and socially conscious information technology professionals. The Department offers one UG programme BTech in Information Technology since 1999 and one PG programme in Computer Science and Information Security since 2014. The UG programme is accredited by NBA for two years.`,
    },
    visionMission: {
      title: "Vision & Mission",
      content: {
        vision:
          "Evolve into a Centre of Excellence for Education and Research in Information Technology",
        mission: [
          "Attaining academic excellence through well designed curriculum adaptable to dynamic technological needs, competent faculty and innovative teaching-learning process.",
          "Promoting collaborative research through special interest groups, state of the art research labs and Industry Institute Interactions.",
          "Facilitating value added courses to produce highly competent and socially conscious information technology professionals and entrepreneurs.",
        ],
      },
    },
    infrastructure: {
      title: "Infrastructure",
      content: {
        labs: [
          {
            name: "Programming Lab",
            capacity: "60 students",
            facilities: [
              "Modern Computers",
              "High-speed Internet",
              "Development Tools",
            ],
          },
          {
            name: "Research Lab",
            capacity: "30 students",
            facilities: [
              "Specialized Equipment",
              "Research Software",
              "Project Spaces",
            ],
          },
        ],
      },
    },
  };

  return (
    <PageLayout title="About Department">
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
          className="max-w-4xl mx-auto"
        >
          {activeSection === "overview" && (
            <div className="bg-gray-900 p-8 rounded-lg">
              <div className="bg-gray-900 p-8 rounded-lg">
                <h3 className="text-2xl font-bold text-center text-[#00FF1A] mb-8">
                  Department Building
                </h3>
                <BuildingLayout />
              </div>
              <p className="text-gray-300 leading-relaxed">
                {sections.overview.content}
              </p>
            </div>
          )}

          {activeSection === "visionMission" && (
            <div className="space-y-8">
              <motion.div
                className="bg-gray-900 p-8 rounded-lg text-center"
                whileHover={{ scale: 1.01 }}
              >
                <h3 className="text-2xl font-bold mb-4 text-[#00FF1A]">
                  Vision
                </h3>
                <p className="text-gray-300">
                  {sections.visionMission.content.vision}
                </p>
              </motion.div>

              <div className="space-y-4">
                <h3 className="text-2xl font-bold mb-4 text-center text-white">
                  Mission
                </h3>
                {sections.visionMission.content.mission.map((item, index) => (
                  <motion.div
                    key={index}
                    className="bg-gray-900 p-6 rounded-lg flex items-start gap-4"
                    whileHover={{ scale: 1.01 }}
                  >
                    <span className="text-[#00FF1A] text-xl font-bold">
                      {index + 1}
                    </span>
                    <p className="text-gray-300">{item}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {activeSection === "infrastructure" && (
            <div className="space-y-12">
              <div className="grid gap-6">
                {sections.infrastructure.content.labs.map((lab, index) => (
                  <motion.div
                    key={index}
                    className="bg-gray-900 p-6 rounded-lg"
                    whileHover={{ scale: 1.01 }}
                  >
                    <h3 className="text-xl font-bold mb-4 text-[#00FF1A]">
                      {lab.name}
                    </h3>
                    <p className="text-gray-300 mb-2">
                      Capacity: {lab.capacity}
                    </p>
                    <div className="space-y-2">
                      <h4 className="text-gray-400">Facilities:</h4>
                      <ul className="list-disc list-inside text-gray-300">
                        {lab.facilities.map((facility, idx) => (
                          <li key={idx}>{facility}</li>
                        ))}
                      </ul>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </PageLayout>
  );
};

export default About;
