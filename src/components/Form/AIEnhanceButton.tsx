import React from 'react';

const AIEnhanceButton: React.FC<{ onEnhance: () => void }> = ({ onEnhance }) => {
    return (
        <button onClick={onEnhance} className="ai-enhance-button">
            Enhance CV with AI
        </button>
    );
};

export default AIEnhanceButton;