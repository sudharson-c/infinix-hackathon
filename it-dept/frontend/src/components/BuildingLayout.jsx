import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const BuildingLayout = () => {
  const [activeFloor, setActiveFloor] = useState("first");

  const floorData = {
    third: {
      name: "Second Floor",
      rooms: [
        "Data Analytics Lab",
        "Mobile App Development Lab",
        "IS1 to IS4",
        "Restroom",
      ],
    },
    second: {
      name: "First Floor",
      rooms: [
        "IT Office",
        "Motorola Lab",
        "IOT (Honeywell) Lab",
        "Machine Learning Lab",
        "Seminar Hall",
        "IF1 to IF4",
        "Restroom",
      ],
    },
    first: {
      name: "Ground Floor",
      rooms: ["Staff Room", "IG1 to IG8", "MCA", "Restroom"],
    },
  };

  return (
    <div className="relative w-full max-w-4xl mx-auto">
      <div className="flex gap-8">
        <div className="w-3/4">
          <svg viewBox="0 0 400 500" className="w-full h-auto">
            <motion.g
              onHoverStart={() => setActiveFloor("third")}
              onHoverEnd={() => setActiveFloor(null)}
              whileHover={{ scale: 1.02 }}
              className="cursor-pointer"
            >
              <rect
                x="70"
                y="70"
                width="260"
                height="120"
                fill={activeFloor === "third" ? "#00FF1A" : "#1F2937"}
                stroke="white"
                strokeWidth="2"
              />
              <rect
                x="95"
                y="95"
                width="40"
                height="50"
                fill="#111827"
                stroke="white"
              />
              <rect
                x="155"
                y="95"
                width="40"
                height="50"
                fill="#111827"
                stroke="white"
              />
              <rect
                x="215"
                y="95"
                width="40"
                height="50"
                fill="#111827"
                stroke="white"
              />
              <rect
                x="275"
                y="95"
                width="40"
                height="50"
                fill="#111827"
                stroke="white"
              />
              <text
                x="200"
                y="165"
                fill={activeFloor === "third" ? "black" : "white"}
                className="text-base font-semibold"
                textAnchor="middle"
              >
                Second Floor
              </text>
            </motion.g>

            <motion.g
              onHoverStart={() => setActiveFloor("second")}
              onHoverEnd={() => setActiveFloor(null)}
              whileHover={{ scale: 1.02 }}
              className="cursor-pointer"
            >
              <rect
                x="70"
                y="190"
                width="260"
                height="120"
                fill={activeFloor === "second" ? "#00FF1A" : "#1F2937"}
                stroke="white"
                strokeWidth="2"
              />

              <rect
                x="95"
                y="215"
                width="40"
                height="50"
                fill="#111827"
                stroke="white"
              />
              <rect
                x="155"
                y="215"
                width="40"
                height="50"
                fill="#111827"
                stroke="white"
              />
              <rect
                x="215"
                y="215"
                width="40"
                height="50"
                fill="#111827"
                stroke="white"
              />
              <rect
                x="275"
                y="215"
                width="40"
                height="50"
                fill="#111827"
                stroke="white"
              />
              <text
                x="200"
                y="285"
                fill={activeFloor === "second" ? "black" : "white"}
                className="text-base font-semibold"
                textAnchor="middle"
              >
                First Floor
              </text>
            </motion.g>

            <motion.g
              onHoverStart={() => setActiveFloor("first")}
              onHoverEnd={() => setActiveFloor(null)}
              whileHover={{ scale: 1.02 }}
              className="cursor-pointer"
            >
              <rect
                x="70"
                y="310"
                width="260"
                height="120"
                fill={activeFloor === "first" ? "#00FF1A" : "#1F2937"}
                stroke="white"
                strokeWidth="2"
              />

              <rect
                x="95"
                y="335"
                width="40"
                height="50"
                fill="#111827"
                stroke="white"
              />
              <rect
                x="155"
                y="335"
                width="40"
                height="50"
                fill="#111827"
                stroke="white"
              />

              <rect
                x="215"
                y="335"
                width="40"
                height="50"
                fill="#111827"
                stroke="white"
              />

              <rect
                x="275"
                y="335"
                width="40"
                height="50"
                fill="#111827"
                stroke="white"
              />
              <text
                x="200"
                y="405"
                fill={activeFloor === "first" ? "black" : "white"}
                className="text-base font-semibold"
                textAnchor="middle"
              >
                Ground Floor
              </text>
            </motion.g>

            <rect
              x="60"
              y="430"
              width="280"
              height="15"
              fill="#374151"
              stroke="white"
            />
            <rect
              x="50"
              y="445"
              width="300"
              height="20"
              fill="#374151"
              stroke="white"
            />

            <path
              d="M60 70 L200 30 L340 70"
              fill="#374151"
              stroke="white"
              strokeWidth="2"
            />

            <rect
              x="60"
              y="70"
              width="10"
              height="360"
              fill="#374151"
              stroke="white"
            />
            <rect
              x="330"
              y="70"
              width="10"
              height="360"
              fill="#374151"
              stroke="white"
            />
          </svg>
        </div>

        <div className="w-full">
          <AnimatePresence mode="wait">
            {activeFloor && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="bg-gray-900 p-6 rounded-lg shadow-lg"
              >
                <h3 className="text-2xl font-bold text-[#00FF1A] mb-4">
                  {floorData[activeFloor].name}
                </h3>
                <ul className="space-y-3">
                  {floorData[activeFloor].rooms.map((room, index) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="text-gray-300 flex items-center gap-2"
                    >
                      <span className="text-[#00FF1A]">•</span>
                      <span>{room}</span>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default BuildingLayout;
