import { useState } from 'react';
import { enhanceCVData } from '../services/aiService';

const useAIEnhancement = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [enhancedData, setEnhancedData] = useState(null);

    const enhanceData = async (cvData) => {
        setLoading(true);
        setError(null);
        try {
            const result = await enhanceCVData(cvData);
            setEnhancedData(result);
        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
        }
    };

    return { enhanceData, loading, error, enhancedData };
};

export default useAIEnhancement;