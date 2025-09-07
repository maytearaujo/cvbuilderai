import React from 'react';

const ExperienceSection: React.FC<{ experiences: Array<{ jobTitle: string; company: string; duration: string; description: string }> }> = ({ experiences }) => {
    return (
        <div className="experience-section">
            <h2>Experience</h2>
            {experiences.length === 0 ? (
                <p>No experience added.</p>
            ) : (
                experiences.map((experience, index) => (
                    <div key={index} className="experience-item">
                        <h3>{experience.jobTitle}</h3>
                        <h4>{experience.company}</h4>
                        <p>{experience.duration}</p>
                        <p>{experience.description}</p>
                    </div>
                ))
            )}
        </div>
    );
};

export default ExperienceSection;