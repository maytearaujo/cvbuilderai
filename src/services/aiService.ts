import axios from 'axios';

const AI_SERVICE_URL = 'https://api.example.com/ai-enhance';

export const enhanceCVData = async (cvData) => {
    try {
        const response = await axios.post(AI_SERVICE_URL, cvData);
        return response.data;
    } catch (error) {
        console.error('Error enhancing CV data:', error);
        throw error;
    }
};