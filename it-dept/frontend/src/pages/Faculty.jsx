import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import PageLayout from "../components/Layout/PageLayout";
import { fetchFacultyData } from "../services/api";
import LoadingSpinner from "../components/LoadingSpinner";

const Faculty = () => {
  const [activeSection, setActiveSection] = useState("directory");
  const [selectedDesignation, setSelectedDesignation] = useState("all");
  const [facultyData, setFacultyData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadFacultyData = async () => {
      try {
        setLoading(true);
        const data = await fetchFacultyData();
        setFacultyData(data);
      } catch (err) {
        setError("Failed to load faculty data");
        console.error("Error loading faculty:", err);
      } finally {
        setLoading(false);
      }
    };

    loadFacultyData();
  }, []);

  const sections = {
    directory: {
      title: "Faculty Directory",
      content: facultyData,
    },
    research: {
      title: "Research Areas",
      content: [
        {
          title: "Data Analytics",
          description:
            "Research in big data analytics, data visualization, and predictive modeling",
        },
        {
          title: "Information Security",
          description: "Cybersecurity, cryptography, and network security",
        },
        {
          title: "Cloud Computing",
          description:
            "Distributed systems, virtualization, and cloud services",
        },
        {
          title: "Artificial Intelligence",
          description: "Machine learning, deep learning, and neural networks",
        },
      ],
    },
    publications: {
      title: "Publications",
      content: "Recent publications will be displayed here",
    },
  };

  const filteredFaculty =
    selectedDesignation === "all"
      ? facultyData
      : facultyData.filter(
          (faculty) => faculty.designation === selectedDesignation
        );

  const designations = [
    "all",
    ...new Set(facultyData.map((faculty) => faculty.designation)),
  ];

  if (loading) return <LoadingSpinner />;
  if (error) return <div className="text-red-500 text-center p-4">{error}</div>;

  return (
    <PageLayout title="Faculty">
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

      {activeSection === "directory" && (
        <div className="mb-8">
          <div className="flex justify-center flex-wrap gap-2">
            {designations.map((designation) => (
              <button
                key={designation}
                onClick={() => setSelectedDesignation(designation)}
                className={`px-3 py-1 rounded-md text-sm transition-colors duration-200 ${
                  selectedDesignation === designation
                    ? "bg-[#00FF1A] text-black"
                    : "bg-gray-800 text-white hover:bg-gray-700"
                }`}
              >
                {designation.charAt(0).toUpperCase() + designation.slice(1)}
              </button>
            ))}
          </div>
        </div>
      )}

      <AnimatePresence mode="wait">
        <motion.div
          key={activeSection}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="max-w-6xl mx-auto"
        >
          {activeSection === "directory" && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredFaculty.map((faculty, index) => (
                <motion.div
                  key={index}
                  className="bg-gray-900 rounded-lg overflow-hidden"
                  whileHover={{ scale: 1.02 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <img
                    src={faculty.image_url}
                    alt={faculty.name}
                    className="w-full h-48 object-contain"
                    onError={(e) => {
                      e.target.src = "/default-profile.png"; // Add a default image
                    }}
                  />
                  <div className="p-4">
                    <h3 className="text-xl font-bold text-[#00FF1A] mb-2">
                      {faculty.name}
                    </h3>
                    <p className="text-gray-300 mb-1">{faculty.designation}</p>
                    <p className="text-gray-400 text-sm">{faculty.email}</p>
                    {faculty.specialization && (
                      <p className="text-gray-400 text-sm mt-2">
                        {faculty.specialization.join(", ")}
                      </p>
                    )}
                    <a
                      href={faculty.profile_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-3 inline-block text-sm text-[#00FF1A] hover:underline"
                    >
                      View Profile →
                    </a>
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          {activeSection === "research" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {sections.research.content.map((area, index) => (
                <motion.div
                  key={index}
                  className="bg-gray-900 p-6 rounded-lg"
                  whileHover={{ scale: 1.01 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <h3 className="text-xl font-bold text-[#00FF1A] mb-2">
                    {area.title}
                  </h3>
                  <p className="text-gray-300">{area.description}</p>
                </motion.div>
              ))}
            </div>
          )}

          {activeSection === "publications" && (
            <div className="bg-gray-900 p-8 rounded-lg">
              <p className="text-gray-300">
                Publications section coming soon...
              </p>
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </PageLayout>
  );
};

export default Faculty;
