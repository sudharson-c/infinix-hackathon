const express = require('express');
const cors = require('cors');
const csv = require('csv-parser');
const { connectDB, Faculty, Course, Syllabus, Announcement, News } = require('./db');
const labRoutes = require('./routes/labs');
const projectRoutes = require('./routes/projects');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
connectDB();

// Routes
app.use('/api/labs', labRoutes);
app.use('/api/projects', projectRoutes);
// Faculty Routes
app.get('/api/faculty', async (req, res) => {
    try {
        const faculty = await Faculty.find().sort({ name: 1 });
        res.json(faculty);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching faculty data', error: error.message });
    }
});

app.post('/api/faculty', async (req, res) => {
    try {
        const newFaculty = new Faculty(req.body);
        await newFaculty.save();
        res.status(201).json(newFaculty);
    } catch (error) {
        res.status(400).json({ message: 'Error creating faculty', error: error.message });
    }
});

// Announcements Routes
app.get('/api/announcements', async (req, res) => {
    try {
        const announcements = await Announcement.find()
            .sort({ date: -1 })
            .limit(5);
        res.json(announcements);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching announcements', error: error.message });
    }
});

app.post('/api/announcements', async (req, res) => {
    try {
        const newAnnouncement = new Announcement(req.body);
        await newAnnouncement.save();
        res.status(201).json(newAnnouncement);
    } catch (error) {
        res.status(400).json({ message: 'Error creating announcement', error: error.message });
    }
});

// News Routes
app.get('/api/news', async (req, res) => {
    try {
        const news = await News.find()
            .sort({ date: -1 })
            .limit(5);
        res.json(news);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching news', error: error.message });
    }
});

app.post('/api/news', async (req, res) => {
    try {
        const newNews = new News(req.body);
        await newNews.save();
        res.status(201).json(newNews);
    } catch (error) {
        res.status(400).json({ message: 'Error creating news', error: error.message });
    }
});

// Update routes
app.put('/api/faculty/:id', async (req, res) => {
    try {
        const updatedFaculty = await Faculty.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        res.json(updatedFaculty);
    } catch (error) {
        res.status(400).json({ message: 'Error updating faculty', error: error.message });
    }
});

app.put('/api/announcements/:id', async (req, res) => {
    try {
        const updatedAnnouncement = await Announcement.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        res.json(updatedAnnouncement);
    } catch (error) {
        res.status(400).json({ message: 'Error updating announcement', error: error.message });
    }
});

// Delete routes
app.delete('/api/faculty/:id', async (req, res) => {
    try {
        await Faculty.findByIdAndDelete(req.params.id);
        res.json({ message: 'Faculty deleted successfully' });
    } catch (error) {
        res.status(400).json({ message: 'Error deleting faculty', error: error.message });
    }
});

app.delete('/api/announcements/:id', async (req, res) => {
    try {
        await Announcement.findByIdAndDelete(req.params.id);
        res.json({ message: 'Announcement deleted successfully' });
    } catch (error) {
        res.status(400).json({ message: 'Error deleting announcement', error: error.message });
    }
});


//Syllabus Routes
app.get('/api/syllabus', async (req, res) => {
    try {
        const syllabus = await Syllabus.find();
        res.json(syllabus);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching syllabus', error: error.message });
    }
});


app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Something went wrong!', error: err.message });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
}); 