import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api'; // Update with your backend URL

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

export const fetchFacultyData = async () => {
    try {
        const response = await api.get('/faculty');
        return response.data;
    } catch (error) {
        console.error('Error fetching faculty data:', error);
        throw error;
    }
};

export const fetchAnnouncements = async () => {
    try {
        const response = await api.get('/announcements');
        return response.data;
    } catch (error) {
        console.error('Error fetching announcements:', error);
        throw error;
    }
};

export const fetchNews = async () => {
    try {
        const response = await api.get('/news');
        return response.data;
    } catch (error) {
        console.error('Error fetching news:', error);
        throw error;
    }
};

export const fetchCourses = async () => {
    try {
        const response = await api.get('/courses');
        return response.data;
    } catch (error) {
        console.error('Error fetching courses:', error);
        throw error;
    }
};

export const fetchSyllabus = async () => {
    try {
        const response = await api.get('/syllabus');
        return response.data;
    } catch (error) {
        console.error('Error fetching syllabus:', error);
        throw error;
    }
};

export const labService = {
    getAllLabs: async () => {
        try {
            const response = await api.get('/labs');
            return response.data;
        } catch (error) {
            console.error('Error fetching labs:', error);
            throw error;
        }
    },

    getLabById: async (id) => {
        try {
            const response = await api.get(`/labs/${id}`);
            return response.data;
        } catch (error) {
            console.error('Error fetching lab details:', error);
            throw error;
        }
    },

    getLabSchedule: async (id, day) => {
        try {
            const response = await api.get(`/labs/${id}/schedule/${day}`);
            return response.data;
        } catch (error) {
            console.error('Error fetching lab schedule:', error);
            throw error;
        }
    },

    checkAvailability: async (id, day, time) => {
        try {
            const response = await api.get(`/labs/${id}/availability`, {
                params: { day, time }
            });
            return response.data;
        } catch (error) {
            console.error('Error checking lab availability:', error);
            throw error;
        }
    }
};

export const projectService = {
    getAllProjects: async (category) => {
        try {
            const response = await api.get('/projects', {
                params: { category }
            });
            return response.data;
        } catch (error) {
            console.error('Error fetching projects:', error);
            throw error;
        }
    },

    getProjectById: async (id) => {
        try {
            const response = await api.get(`/projects/${id}`);
            return response.data;
        } catch (error) {
            console.error('Error fetching project details:', error);
            throw error;
        }
    },

    createProject: async (projectData) => {
        try {
            const response = await api.post('/projects', projectData);
            return response.data;
        } catch (error) {
            console.error('Error creating project:', error);
            throw error;
        }
    },

    updateProject: async (id, projectData) => {
        try {
            const response = await api.patch(`/projects/${id}`, projectData);
            return response.data;
        } catch (error) {
            console.error('Error updating project:', error);
            throw error;
        }
    },

    deleteProject: async (id) => {
        try {
            const response = await api.delete(`/projects/${id}`);
            return response.data;
        } catch (error) {
            console.error('Error deleting project:', error);
            throw error;
        }
    }
};