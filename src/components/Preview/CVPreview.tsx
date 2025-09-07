import React from 'react';
import PersonalHeader from './PersonalHeader';
import SkillsSection from './SkillsSection';
import ExperienceSection from './ExperienceSection';

const CVPreview: React.FC<{ personalInfo: any; skills: any; experience: any }> = ({ personalInfo, skills, experience }) => {
    return (
        <div className="cv-preview">
            <PersonalHeader personalInfo={personalInfo} />
            <SkillsSection skills={skills} />
            <ExperienceSection experience={experience} />
        </div>
    );
};

export default CVPreview;