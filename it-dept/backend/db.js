const mongoose = require('mongoose');

const facultySchema = new mongoose.Schema({
    name: String,
    designation: String,
    email: String,
    image_url: String,
    profile_url: String
});
const courseSchema = new mongoose.Schema({
    code: String,
    name: String,
    syllabus: String
});
const syllabusSchema = new mongoose.Schema({
    course_name: String,
    syllabus_link: String
});
const newsSchema = new mongoose.Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    date: { type: Date, default: Date.now },
    category: String,
    image_url: String
});
const announcementSchema = new mongoose.Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    date: { type: Date, default: Date.now },
    category: String,
    link: String
});

const Announcement = mongoose.model('Announcement', announcementSchema);

const News = mongoose.model('News', newsSchema);

const Faculty = mongoose.model('Faculty', facultySchema);

const Course = mongoose.model('Course', courseSchema);

const Syllabus = mongoose.model('Syllabus', syllabusSchema);

const connectDB = async () => {
    await mongoose.connect('mongodb://localhost:27017/it-dept');
    console.log('Connected to MongoDB');
};

module.exports = { Faculty, Course, Syllabus, News, Announcement, connectDB };