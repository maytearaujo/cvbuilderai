import { useState } from 'react';
import type { Habilidade, Experiencia } from '../types/cv.types';

interface PersonalInfo {
    name: string;
    email: string;
    phone: string;
}

interface CVData {
    personalInfo: PersonalInfo;
    skills: Habilidade[];
    experience: Experiencia[];
}

const initialCVData: CVData = {
    personalInfo: {
        name: '',
        email: '',
        phone: '',
    },
    skills: [],
    experience: [],
};

const useCVData = () => {
    const [cvData, setCvData] = useState<CVData>(initialCVData);

    const updatePersonalInfo = (info: Partial<PersonalInfo>) => {
        setCvData((prevData) => ({
            ...prevData,
            personalInfo: { ...prevData.personalInfo, ...info },
        }));
    };

    const addSkill = (skill: Habilidade) => {
        setCvData((prevData) => ({
            ...prevData,
            skills: [...prevData.skills, skill],
        }));
    };

    const removeSkill = (skillToRemove: Habilidade) => {
        setCvData((prevData) => ({
            ...prevData,
            skills: prevData.skills.filter(skill => skill !== skillToRemove),
        }));
    };

    const addExperience = (experience: Experiencia) => {
        setCvData((prevData) => ({
            ...prevData,
            experience: [...prevData.experience, experience],
        }));
    };

    const removeExperience = (experienceToRemove: Experiencia) => {
        setCvData((prevData) => ({
            ...prevData,
            experience: prevData.experience.filter(exp => exp !== experienceToRemove),
        }));
    };

    return {
        cvData,
        updatePersonalInfo,
        addSkill,
        removeSkill,
        addExperience,
        removeExperience,
    };
};

export default useCVData;