import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const QuickLinks = () => {
  const links = [
    { title: "Academic Calendar", path: "/academics/calendar" },
    { title: "Time Table", path: "/academics/time-table" },
    { title: "Faculty Directory", path: "/faculty" },
    { title: "Placement Cell", path: "/placements" },
    { title: "Student Portal", path: "/students" },
    { title: "Research Publications", path: "/faculty/publications" },
  ];

  return (
    <div className="grid grid-cols-2 gap-4">
      {links.map((link, index) => (
        <motion.div
          key={index}
          whileHover={{ scale: 1.05 }}
          className="bg-black rounded-lg overflow-hidden"
        >
          <Link
            to={link.path}
            className="block p-4 text-center hover:bg-gray-800 transition-colors"
          >
            {link.title}
          </Link>
        </motion.div>
      ))}
    </div>
  );
};

export default QuickLinks;
