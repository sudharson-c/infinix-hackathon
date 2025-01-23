const express = require('express');
const router = express.Router();
const Lab = require('../models/Lab');

// Get all labs
router.get('/', async (req, res) => {
    try {
        const labs = await Lab.find();
        res.json(labs);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get specific lab
router.get('/:id', async (req, res) => {
    try {
        const lab = await Lab.findById(req.params.id);
        if (!lab) {
            return res.status(404).json({ message: 'Lab not found' });
        }
        res.json(lab);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Create new lab
router.post('/', async (req, res) => {
    const lab = new Lab({
        name: req.body.name,
        capacity: req.body.capacity,
        location: req.body.location,
        equipment: req.body.equipment,
        facilities: req.body.facilities,
        schedule: req.body.schedule
    });

    try {
        const newLab = await lab.save();
        res.status(201).json(newLab);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Update lab status
router.patch('/:id/status', async (req, res) => {
    try {
        const lab = await Lab.findById(req.params.id);
        if (!lab) {
            return res.status(404).json({ message: 'Lab not found' });
        }

        lab.status = req.body.status;
        lab.currentOccupancy = req.body.currentOccupancy;
        lab.lastUpdated = Date.now();

        const updatedLab = await lab.save();
        res.json(updatedLab);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Add schedule
router.post('/:id/schedule', async (req, res) => {
    try {
        const lab = await Lab.findById(req.params.id);
        if (!lab) {
            return res.status(404).json({ message: 'Lab not found' });
        }

        lab.schedule.push(req.body);
        const updatedLab = await lab.save();
        res.status(201).json(updatedLab);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Check lab availability
router.get('/:id/availability', async (req, res) => {
    try {
        const lab = await Lab.findById(req.params.id);
        if (!lab) {
            return res.status(404).json({ message: 'Lab not found' });
        }

        const { day, time } = req.query;
        const isAvailable = lab.isAvailable(day, time);
        const nextAvailable = lab.getNextAvailable(time);

        res.json({
            isAvailable,
            nextAvailable,
            currentStatus: lab.status,
            currentOccupancy: lab.currentOccupancy
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get lab schedule for a specific day
router.get('/:id/schedule/:day', async (req, res) => {
    try {
        const lab = await Lab.findById(req.params.id);
        if (!lab) {
            return res.status(404).json({ message: 'Lab not found' });
        }

        const schedule = lab.schedule.filter(slot => slot.day === req.params.day);
        res.json(schedule);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router; 