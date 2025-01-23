const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    teamMembers: [{
        name: String,
        rollNo: String,
        class: String
    }],
    category: {
        type: String,
        enum: ['Web Development', 'Mobile App', 'AI/ML', 'IoT', 'Blockchain', 'Other'],
        required: true
    },
    status: {
        type: String,
        enum: ['In Progress', 'Completed'],
        default: 'In Progress'
    },
    githubLink: {
        type: String
    },
    projectImage: {
        type: String,
        default: '/default-project.jpg'
    },
    academicYear: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Project', projectSchema); 