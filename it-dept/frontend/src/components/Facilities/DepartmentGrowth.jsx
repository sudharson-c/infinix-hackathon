import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import LoadingSpinner from "../LoadingSpinner";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const DepartmentGrowth = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeMetric, setActiveMetric] = useState("students");

  useEffect(() => {
    const fetchData = async () => {
      setTimeout(() => {
        setData({
          students: [
            { year: 2019, count: 180 },
            { year: 2020, count: 200 },
            { year: 2021, count: 220 },
            { year: 2022, count: 240 },
            { year: 2023, count: 260 },
          ],
          placements: [
            { year: 2019, percentage: 85 },
            { year: 2020, percentage: 88 },
            { year: 2021, percentage: 92 },
            { year: 2022, percentage: 94 },
            { year: 2023, percentage: 96 },
          ],
          research: [
            { year: 2019, papers: 25 },
            { year: 2020, papers: 30 },
            { year: 2021, papers: 35 },
            { year: 2022, papers: 40 },
            { year: 2023, papers: 45 },
          ],
        });
        setLoading(false);
      }, 1000);
    };

    fetchData();
  }, []);

  if (loading) return <LoadingSpinner />;

  const metrics = {
    students: { title: "Student Growth", dataKey: "count", color: "#00FF1A" },
    placements: {
      title: "Placement Percentage",
      dataKey: "percentage",
      color: "#FFD700",
    },
    research: { title: "Research Papers", dataKey: "papers", color: "#FF6B6B" },
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-center space-x-4">
        {Object.entries(metrics).map(([key, metric]) => (
          <button
            key={key}
            onClick={() => setActiveMetric(key)}
            className={`px-4 py-2 rounded-md transition-colors duration-200 ${
              activeMetric === key
                ? "bg-[#00FF1A] text-black"
                : "bg-gray-900 text-white hover:bg-gray-800"
            }`}
          >
            {metric.title}
          </button>
        ))}
      </div>

      <div className="bg-gray-900 p-6 rounded-lg">
        <h3 className="text-2xl font-bold text-[#00FF1A] mb-6">
          {metrics[activeMetric].title} Trends
        </h3>
        <div className="h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data[activeMetric]}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="year" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey={metrics[activeMetric].dataKey}
                stroke={metrics[activeMetric].color}
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-gray-900 p-6 rounded-lg text-center"
        >
          <h4 className="text-lg font-semibold mb-2 text-white">
            Current Students
          </h4>
          <p className="text-4xl font-bold text-[#00FF1A]">260</p>
        </motion.div>
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-gray-900 p-6 rounded-lg text-center"
        >
          <h4 className="text-lg font-semibold mb-2 text-white">
            Placement Rate
          </h4>
          <p className="text-4xl font-bold text-[#00FF1A]">96%</p>
        </motion.div>
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-gray-900 p-6 rounded-lg text-center"
        >
          <h4 className="text-lg font-semibold mb-2 text-white">
            Research Output
          </h4>
          <p className="text-4xl font-bold text-[#00FF1A]">45</p>
        </motion.div>
      </div>
    </div>
  );
};

export default DepartmentGrowth;
