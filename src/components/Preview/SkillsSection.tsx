import React from 'react';

const SkillsSection: React.FC<{ skills: string[] }> = ({ skills }) => {
    return (
        <div className="skills-section">
            <h2>Skills</h2>
            <ul>
                {skills.map((skill, index) => (
                    <li key={index}>{skill}</li>
                ))}
            </ul>
        </div>
    );
};

export default SkillsSection;