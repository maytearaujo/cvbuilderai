import axios from 'axios';
import type { FormData } from '../types/cv.types';

const AI_SERVICE_URL = 'https://api.example.com/ai-enhance';

export const enhanceCVData = async (cvData: FormData): Promise<any> => {
    try {
        const response = await axios.post(AI_SERVICE_URL, cvData);
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error('Error enhancing CV data:', error.message);
            throw new Error(error.message);
        } else {
            console.error('Error enhancing CV data:', error);
            throw error;
        }
    }
};