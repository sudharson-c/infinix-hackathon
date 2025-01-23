import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { HyperText } from "./ui/Hypertext";
import Announcements from "./Announcements";
import QuickLinks from "./QuickLinks";
import LatestNews from "./LatestNews";
import Waves from "./ui/Waves";

const Hero = () => {
  const announcements = [
    {
      id: 1,
      title: "NBA Accreditation",
      content:
        "Department of IT has been accredited by NBA for the academic years 2023-2025",
      date: "2024-01-15",
      type: "achievement",
    },
    {
      id: 2,
      title: "Placement Drive",
      content: "TCS recruitment drive scheduled for final year students",
      date: "2024-02-20",
      type: "placement",
    },
    {
      id: 3,
      title: "Technical Symposium",
      content: "ITRIX 2024 - Annual Technical Symposium registration open",
      date: "2024-03-10",
      type: "event",
    },
  ];

  const quickLinks = [
    {
      title: "Academic Calendar",
      url: "/academics",
      icon: "📅",
    },
    {
      title: "Faculty Directory",
      url: "/faculty",
      icon: "👥",
    },
    {
      title: "Course Syllabus",
      url: "/academics",
      icon: "📚",
    },
    {
      title: "Department Labs",
      url: "/facilities",
      icon: "💻",
    },
  ];

  const upcomingEvents = [
    {
      title: "Guest Lecture on AI",
      date: "Feb 25, 2024",
      time: "10:00 AM",
    },
    {
      title: "Workshop on Cloud Computing",
      date: "Mar 5, 2024",
      time: "9:30 AM",
    },
    {
      title: "Industrial Visit",
      date: "Mar 15, 2024",
      time: "8:00 AM",
    },
  ];

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 },
  };

  const staggerChildren = {
    animate: {
      transition: {
        staggerChildren: 0.3,
      },
    },
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="relative h-screen">
        <div className="absolute inset-0">
          <img
            src="/it-dept.jpg"
            alt="IT Department"
            className="w-full h-full object-cover opacity-50"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 to-black"></div>
        </div>

        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4">
          <div className="absolute inset-0 -z-30 w-2/3 m-auto h-1/3 rounded-full">
            <Waves lineColor="#00FF1A" style={{ borderRadius: "30vw" }} />
          </div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-7xl font-bold mb-6"
          >
            Department of
            <span className="text-[#00FF1A]">
              <HyperText>Information Technology</HyperText>
            </span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl md:text-2xl mb-8 max-w-3xl font-bold"
          >
            Established in 1999
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <div className="animate-bounce">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 14l-7 7m0 0l-7-7m7 7V3"
              />
            </svg>
          </div>
        </motion.div>
      </div>

      {/* New Sections */}
      <div className="container mx-auto px-4 py-12 space-y-16">
        <section className="bg-gray-900 rounded-lg p-6">
          <h2 className="text-3xl font-bold mb-6 text-[#00FF1A]">
            Announcements
          </h2>
          <Announcements />
        </section>

        <div className="grid md:grid-cols-2 gap-8">
          <section className="bg-gray-900 rounded-lg p-6">
            <h2 className="text-3xl font-bold mb-6 text-[#00FF1A]">
              Quick Links
            </h2>
            <QuickLinks />
          </section>

          <section className="bg-gray-900 rounded-lg p-6">
            <h2 className="text-3xl font-bold mb-6 text-[#00FF1A]">
              Latest News
            </h2>
            <LatestNews />
          </section>
        </div>

        <section className="bg-gray-900 rounded-lg p-6">
          <h2 className="text-3xl font-bold mb-6 text-[#00FF1A]">
            Department Highlights
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <HighlightCard
              title="Placements"
              value="90%+"
              description="Placement rate for 2023 batch"
            />
            <HighlightCard
              title="Research"
              value="50+"
              description="Research papers published in 2023"
            />
            <HighlightCard
              title="Projects"
              value="25+"
              description="Ongoing funded projects"
            />
          </div>
        </section>
      </div>
    </div>
  );
};

const HighlightCard = ({ title, value, description }) => (
  <motion.div
    whileHover={{ scale: 1.05 }}
    className="bg-black p-6 rounded-lg text-center"
  >
    <h3 className="text-xl font-bold mb-2">{title}</h3>
    <p className="text-4xl font-bold text-[#00FF1A] mb-2">{value}</p>
    <p className="text-gray-400">{description}</p>
  </motion.div>
);

export default Hero;
