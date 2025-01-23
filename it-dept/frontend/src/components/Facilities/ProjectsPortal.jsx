import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { projectService } from "../../services/api";
import LoadingSpinner from "../LoadingSpinner";

const ProjectsPortal = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState("all");
  const [selectedProject, setSelectedProject] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        const data = await projectService.getAllProjects(
          filter !== "all" ? filter : undefined
        );
        console.log(data);
        setProjects(data);
      } catch (err) {
        setError("Failed to load projects");
        console.error("Error fetching projects:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, [filter]);

  const handleProjectClick = async (projectId) => {
    try {
      const projectDetails = await projectService.getProjectById(projectId);
      setSelectedProject(projectDetails);
    } catch (err) {
      console.error("Error fetching project details:", err);
    }
  };

  const categories = [
    "all",
    "Web Development",
    "Mobile App",
    "AI/ML",
    "IoT",
    "Blockchain",
    "Other",
  ];

  const filteredProjects = projects.filter(
    (project) =>
      project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.teamMembers.some((member) =>
        member.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
  );

  if (loading) return <LoadingSpinner />;
  if (error) return <div className="text-red-500 text-center p-4">{error}</div>;

  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <div className="max-w-md mx-auto">
          <input
            type="text"
            placeholder="Search projects, technologies, or team members..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 rounded-md bg-gray-800 text-white border border-gray-700 focus:border-[#00FF1A] focus:outline-none"
          />
        </div>

        <div className="flex justify-center flex-wrap gap-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setFilter(category)}
              className={`px-4 py-2 rounded-md transition-colors duration-200 ${
                filter === category
                  ? "bg-[#00FF1A] text-black"
                  : "bg-gray-900 text-white hover:bg-gray-800"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProjects.map((project) => (
          <motion.div
            key={project._id}
            whileHover={{ scale: 1.02 }}
            className="bg-gray-900 rounded-lg overflow-hidden cursor-pointer"
            onClick={() => handleProjectClick(project._id)}
          >
            <img
              src={project.projectImage}
              alt={project.title}
              className="w-full h-48 object-cover"
              onError={(e) => {
                e.target.src = "/default-project.jpg";
              }}
            />
            <div className="p-6">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-xl font-bold text-[#00FF1A]">
                  {project.title}
                </h3>
                <span
                  className={`px-2 py-1 rounded-full text-xs ${
                    project.status === "Completed"
                      ? "bg-green-500/20 text-green-500"
                      : "bg-yellow-500/20 text-yellow-500"
                  }`}
                >
                  {project.status}
                </span>
              </div>
              <p className="text-gray-300 mb-4 line-clamp-2">
                {project.description}
              </p>

              <div className="text-sm text-gray-400">
                {project.teamMembers.map((member) => member.name).join(", ")}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-gray-900 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            >
              <div className="p-6 space-y-4">
                <div className="flex justify-between items-start">
                  <h2 className="text-2xl font-bold text-[#00FF1A]">
                    {selectedProject.title}
                  </h2>
                  <button
                    onClick={() => setSelectedProject(null)}
                    className="text-gray-400 hover:text-white"
                  >
                    ✕
                  </button>
                </div>

                <img
                  src={selectedProject.projectImage}
                  alt={selectedProject.title}
                  className="w-full h-64 object-cover rounded-lg"
                  onError={(e) => {
                    e.target.src = "/default-project.jpg";
                  }}
                />

                <div className="space-y-4">
                  <p className="text-gray-300">{selectedProject.description}</p>

                  <div>
                    <h3 className="text-lg font-semibold mb-2">Team Members</h3>
                    <div className="grid grid-cols-2 gap-2">
                      {selectedProject.teamMembers.map((member, index) => (
                        <div key={index} className="text-gray-300">
                          <p className="font-medium">{member.name}</p>
                          <p className="text-sm text-gray-400">
                            {member.rollNo} - {member.class}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {selectedProject.githubLink && (
                    <a
                      href={selectedProject.githubLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block bg-gray-800 px-4 py-2 rounded-md text-white hover:bg-gray-700 transition-colors duration-200"
                    >
                      View on GitHub →
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ProjectsPortal;
