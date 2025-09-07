import React from 'react';

const PreviewSection: React.FC = () => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6 h-full">
      <h2 className="text-2xl font-bold mb-4">CV Preview</h2>
      {/* Adicione aqui os componentes para exibir o preview do currículo */}
      <div className="text-gray-700">
        <p>Seu currículo aparecerá aqui em tempo real.</p>
      </div>
    </div>
  );
};

export default PreviewSection;