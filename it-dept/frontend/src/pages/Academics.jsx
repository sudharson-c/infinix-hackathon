import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import PageLayout from "../components/Layout/PageLayout";
import { fetchSyllabus } from "../services/api";
import LoadingSpinner from "../components/LoadingSpinner";

const Academics = () => {
  const [activeSection, setActiveSection] = useState("curriculum");
  const [coursesOffered, setCoursesOffered] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadSyllabus = async () => {
      try {
        setLoading(true);
        const data = await fetchSyllabus();
        setCoursesOffered(data);
      } catch (err) {
        setError("Failed to load syllabus data");
        console.error("Error loading syllabus:", err);
      } finally {
        setLoading(false);
      }
    };

    loadSyllabus();
  }, []);

  const sections = {
    curriculum: {
      title: "Curriculum",
      content: coursesOffered,
    },
    timetable: {
      title: "Time Table",
      content: "Current semester timetables",
    },
    calendar: {
      title: "Academic Calendar",
      content: "Important dates and events",
    },
  };

  if (loading) return <LoadingSpinner />;
  if (error) return <div className="text-red-500 text-center p-4">{error}</div>;

  return (
    <PageLayout title="Academics">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Academic Resources</h1>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Upload Syllabus</h2>
        </section>

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
            {activeSection === "curriculum" && (
              <div className="space-y-6">
                {coursesOffered.map((course, index) => (
                  <motion.div
                    key={index}
                    className="bg-gray-900 p-6 rounded-lg"
                    whileHover={{ scale: 1.01 }}
                  >
                    <h3 className="text-xl font-bold text-[#00FF1A] mb-3">
                      {course.course_name}
                    </h3>
                    <a
                      href={course.syllabus_link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block bg-gray-800 px-4 py-2 rounded-md text-white hover:bg-gray-700 transition-colors duration-200"
                    >
                      Download Syllabus →
                    </a>
                  </motion.div>
                ))}
              </div>
            )}

            {activeSection === "timetable" && (
              <div className="bg-gray-900 p-8 rounded-lg">
                <p className="text-gray-300">
                  Timetable section coming soon...
                </p>
              </div>
            )}

            {activeSection === "calendar" && (
              <div className="bg-gray-900 p-8 rounded-lg">
                <p className="text-gray-300">Calendar section coming soon...</p>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </PageLayout>
  );
};

export default Academics;
