import { useState } from 'react';

const useCVData = () => {
    const [cvData, setCvData] = useState({
        personalInfo: {
            name: '',
            email: '',
            phone: '',
        },
        skills: [],
        experience: [],
    });

    const updatePersonalInfo = (info) => {
        setCvData((prevData) => ({
            ...prevData,
            personalInfo: { ...prevData.personalInfo, ...info },
        }));
    };

    const addSkill = (skill) => {
        setCvData((prevData) => ({
            ...prevData,
            skills: [...prevData.skills, skill],
        }));
    };

    const removeSkill = (skillToRemove) => {
        setCvData((prevData) => ({
            ...prevData,
            skills: prevData.skills.filter(skill => skill !== skillToRemove),
        }));
    };

    const addExperience = (experience) => {
        setCvData((prevData) => ({
            ...prevData,
            experience: [...prevData.experience, experience],
        }));
    };

    const removeExperience = (experienceToRemove) => {
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