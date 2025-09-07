import React, { useState } from 'react';

const Experience: React.FC = () => {
    const [experiences, setExperiences] = useState([{ jobTitle: '', company: '', startDate: '', endDate: '', description: '' }]);

    const handleChange = (index: number, event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = event.target;
        const updatedExperiences = experiences.map((experience, i) => 
            i === index ? { ...experience, [name]: value } : experience
        );
        setExperiences(updatedExperiences);
    };

    const addExperience = () => {
        setExperiences([...experiences, { jobTitle: '', company: '', startDate: '', endDate: '', description: '' }]);
    };

    const removeExperience = (index: number) => {
        const updatedExperiences = experiences.filter((_, i) => i !== index);
        setExperiences(updatedExperiences);
    };

    return (
        <div>
            <h2>Work Experience</h2>
            {experiences.map((experience, index) => (
                <div key={index}>
                    <input
                        type="text"
                        name="jobTitle"
                        placeholder="Job Title"
                        value={experience.jobTitle}
                        onChange={(event) => handleChange(index, event)}
                    />
                    <input
                        type="text"
                        name="company"
                        placeholder="Company"
                        value={experience.company}
                        onChange={(event) => handleChange(index, event)}
                    />
                    <input
                        type="text"
                        name="startDate"
                        placeholder="Start Date"
                        value={experience.startDate}
                        onChange={(event) => handleChange(index, event)}
                    />
                    <input
                        type="text"
                        name="endDate"
                        placeholder="End Date"
                        value={experience.endDate}
                        onChange={(event) => handleChange(index, event)}
                    />
                    <textarea
                        name="description"
                        placeholder="Description"
                        value={experience.description}
                        onChange={(event) => handleChange(index, event)}
                    />
                    <button onClick={() => removeExperience(index)}>Remove</button>
                </div>
            ))}
            <button onClick={addExperience}>Add Experience</button>
        </div>
    );
};

export default Experience;