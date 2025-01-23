const mongoose = require('mongoose');

const timeSlotSchema = new mongoose.Schema({
    day: {
        type: String,
        enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        required: true
    },
    startTime: {
        type: String,
        required: true
    },
    endTime: {
        type: String,
        required: true
    },
    subject: {
        type: String,
        required: true
    },
    faculty: {
        type: String,
        required: true
    },
    class: {
        type: String,
        required: true
    }
});

const labSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    capacity: {
        type: Number,
        required: true
    },
    location: {
        floor: {
            type: String,
            required: true
        },
        roomNumber: {
            type: String,
            required: true
        }
    },
    equipment: [{
        type: String
    }],
    facilities: [{
        type: String
    }],
    status: {
        type: String,
        enum: ['available', 'in-use', 'maintenance'],
        default: 'available'
    },
    currentOccupancy: {
        type: Number,
        default: 0
    },
    schedule: [timeSlotSchema],
    specialFeatures: [{
        type: String
    }],
    maintenanceHistory: [{
        date: Date,
        description: String,
        technician: String
    }],
    lastUpdated: {
        type: Date,
        default: Date.now
    }
});

labSchema.methods.isAvailable = function (day, time) {
    const currentSchedule = this.schedule.find(slot =>
        slot.day === day &&
        time >= slot.startTime &&
        time <= slot.endTime
    );
    return !currentSchedule;
};

labSchema.methods.getNextAvailable = function (currentTime) {
};

module.exports = mongoose.model('Lab', labSchema); 
