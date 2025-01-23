import React from "react";
import { motion } from "framer-motion";

const LatestNews = () => {
  const news = [
    {
      id: 1,
      title: "Students Win Smart India Hackathon",
      date: "2024-01-20",
      category: "Achievement",
    },
    {
      id: 2,
      title: "New Research Lab Inauguration",
      date: "2024-01-18",
      category: "Infrastructure",
    },
    {
      id: 3,
      title: "Faculty Research Paper Published in IEEE",
      date: "2024-01-15",
      category: "Research",
    },
  ];

  return (
    <div className="space-y-4">
      {news.map((item, index) => (
        <motion.div
          key={item.id}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.1 }}
          className="bg-black p-4 rounded-lg"
        >
          <div className="flex justify-between items-start">
            <div>
              <span className="text-xs text-[#00FF1A] px-2 py-1 rounded-full bg-[#00FF1A]/10">
                {item.category}
              </span>
              <h3 className="text-lg font-semibold mt-2">{item.title}</h3>
            </div>
            <span className="text-sm text-gray-500">{item.date}</span>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default LatestNews;
