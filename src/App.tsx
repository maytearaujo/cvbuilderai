import React, { useState } from 'react';
import FormSection from './components/Layout/FormSection';
import PreviewSection from './components/Layout/PreviewSection';
import ErrorBoundary from './components/UI/ErrorBoundary';


function App() {
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    telefone: '',
    linkedin: '',
    resumo: '',
    habilidades: [],
    experiencias: [],
  });

  return (
    <ErrorBoundary>

      <div className="flex h-screen bg-gray-50">
        <div className="w-1/2 h-screen overflow-y-auto border-r border-gray-200">
          <FormSection formData={formData} setFormData={setFormData} />
        </div>
        <div className="w-1/2 h-screen overflow-y-auto">
          <PreviewSection formData={formData} />
        </div>
      </div>
    </ErrorBoundary>
  );
}

export default App;