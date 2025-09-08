import { useState } from "react";
import { enhanceCVData } from "../services/aiService";
import type { FormData } from '../types/cv.types';

const useAIEnhancement = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string|null>(null);
  const [enhancedData, setEnhancedData] = useState<FormData | null>(null);

  const enhanceData = async (cvData: FormData) => {
    setLoading(true);
    setError(null);
    try {
      const result = await enhanceCVData(cvData);
            setEnhancedData(result);
    } catch (err) {
            setError(typeof err === 'string' ? err : err instanceof Error ? err.message : JSON.stringify(err));
    } finally {
      setLoading(false);
    }
  };

  return { enhanceData, loading, error, enhancedData };
};

export default useAIEnhancement;
