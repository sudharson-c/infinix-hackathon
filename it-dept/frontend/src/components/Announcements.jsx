import React from "react";
import { motion } from "framer-motion";

const Announcements = () => {
  const announcements = [
    {
      id: 1,
      date: "2024-01-25",
      title: "Semester Registration",
      content: "Registration for Even Semester 2024 starts from February 1st",
      link: "#",
    },
    {
      id: 2,
      date: "2024-01-23",
      title: "Technical Symposium",
      content: "SYNC 2024 - Annual Technical Symposium on March 15th",
      link: "#",
    },
    {
      id: 3,
      date: "2024-01-20",
      title: "Workshop Announcement",
      content: "Two-day workshop on Cloud Computing and DevOps",
      link: "#",
    },
  ];

  return (
    <div className="space-y-4">
      {announcements.map((announcement, index) => (
        <motion.div
          key={announcement.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="bg-black p-4 rounded-lg"
        >
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-lg font-semibold mb-2">
                {announcement.title}
              </h3>
              <p className="text-gray-400">{announcement.content}</p>
            </div>
            <span className="text-sm text-gray-500">{announcement.date}</span>
          </div>
          <a
            href={announcement.link}
            className="text-[#00FF1A] text-sm mt-2 inline-block hover:underline"
          >
            Read more →
          </a>
        </motion.div>
      ))}
    </div>
  );
};

export default Announcements;
