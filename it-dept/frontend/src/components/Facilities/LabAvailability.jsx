import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { labService } from "../../services/api";
import LoadingSpinner from "../LoadingSpinner";

const LabAvailability = () => {
  const [labs, setLabs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedLab, setSelectedLab] = useState(null);
  const [selectedDay, setSelectedDay] = useState(getCurrentDay());
  const [schedule, setSchedule] = useState([]);

  // Get current day
  function getCurrentDay() {
    const days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    return days[new Date().getDay()];
  }

  useEffect(() => {
    const fetchLabs = async () => {
      try {
        setLoading(true);
        const data = await labService.getAllLabs();
        setLabs(data);
      } catch (err) {
        setError("Failed to load labs data");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchLabs();
  }, []);

  useEffect(() => {
    const fetchSchedule = async () => {
      if (selectedLab && selectedDay) {
        try {
          const scheduleData = await labService.getLabSchedule(
            selectedLab._id,
            selectedDay
          );
          setSchedule(scheduleData);
        } catch (err) {
          console.error("Error fetching schedule:", err);
        }
      }
    };

    fetchSchedule();
  }, [selectedLab, selectedDay]);

  if (loading) return <LoadingSpinner />;
  if (error) return <div className="text-red-500 text-center p-4">{error}</div>;

  const days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {labs.map((lab) => (
          <motion.div
            key={lab._id}
            whileHover={{ scale: 1.02 }}
            className="bg-gray-900 p-6 rounded-lg cursor-pointer"
            onClick={() => setSelectedLab(lab)}
          >
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-xl font-bold text-[#00FF1A]">{lab.name}</h3>
              <span
                className={`px-3 py-1 rounded-full text-sm ${
                  lab.status === "available"
                    ? "bg-green-500/20 text-green-500"
                    : lab.status === "maintenance"
                    ? "bg-red-500/20 text-red-500"
                    : "bg-yellow-500/20 text-yellow-500"
                }`}
              >
                {lab.status}
              </span>
            </div>
            <div className="space-y-2 text-gray-300">
              <p>
                Location: {lab.location.floor} - {lab.location.roomNumber}
              </p>
              <p>Capacity: {lab.capacity}</p>
              <p>Current Occupancy: {lab.currentOccupancy}</p>
            </div>
          </motion.div>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {selectedLab && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-gray-900 p-6 rounded-lg"
          >
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold text-[#00FF1A]">
                {selectedLab.name} Details
              </h3>
              <button
                onClick={() => setSelectedLab(null)}
                className="text-gray-400 hover:text-white"
              >
                Close
              </button>
            </div>

            <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
              {days.map((day) => (
                <button
                  key={day}
                  onClick={() => setSelectedDay(day)}
                  className={`px-4 py-2 rounded-md whitespace-nowrap ${
                    selectedDay === day
                      ? "bg-[#00FF1A] text-black"
                      : "bg-gray-800 text-white hover:bg-gray-700"
                  }`}
                >
                  {day}
                </button>
              ))}
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <h4 className="text-lg font-semibold mb-2">Equipment</h4>
                  <ul className="list-disc list-inside text-gray-300">
                    {selectedLab.equipment.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="text-lg font-semibold mb-2">Facilities</h4>
                  <ul className="list-disc list-inside text-gray-300">
                    {selectedLab.facilities.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </div>
              </div>

              <div>
                <h4 className="text-lg font-semibold mb-2">
                  Schedule for {selectedDay}
                </h4>
                {schedule.length > 0 ? (
                  <div className="space-y-3">
                    {schedule.map((slot, index) => (
                      <div key={index} className="bg-gray-800 p-3 rounded-md">
                        <div className="flex justify-between text-sm text-gray-400 mb-1">
                          <span>
                            {slot.startTime} - {slot.endTime}
                          </span>
                          <span>{slot.class}</span>
                        </div>
                        <div className="text-white">{slot.subject}</div>
                        <div className="text-sm text-gray-400">
                          {slot.faculty}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-400">
                    No classes scheduled for this day
                  </p>
                )}
              </div>
            </div>

            {selectedLab.specialFeatures &&
              selectedLab.specialFeatures.length > 0 && (
                <div className="mt-6">
                  <h4 className="text-lg font-semibold mb-2">
                    Special Features
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedLab.specialFeatures.map((feature, index) => (
                      <span
                        key={index}
                        className="bg-gray-800 px-3 py-1 rounded-full text-sm text-gray-300"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>
              )}

            {selectedLab.maintenanceHistory &&
              selectedLab.maintenanceHistory.length > 0 && (
                <div className="mt-6">
                  <h4 className="text-lg font-semibold mb-2">
                    Recent Maintenance
                  </h4>
                  <div className="space-y-2">
                    {selectedLab.maintenanceHistory
                      .slice(-2)
                      .map((record, index) => (
                        <div key={index} className="text-sm text-gray-400">
                          <span className="text-gray-300">
                            {new Date(record.date).toLocaleDateString()}:
                          </span>{" "}
                          {record.description}
                        </div>
                      ))}
                  </div>
                </div>
              )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default LabAvailability;
