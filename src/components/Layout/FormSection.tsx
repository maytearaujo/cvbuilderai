import React from 'react';

const FormSection: React.FC = () => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6 space-y-8">
      <h2 className="text-2xl font-bold mb-4">Dados Pessoais</h2>
      <form className="space-y-4">
        <input className="w-full border rounded p-2" type="text" placeholder="Nome" />
        <input className="w-full border rounded p-2" type="email" placeholder="Email" />
        <input className="w-full border rounded p-2" type="tel" placeholder="Telefone" />
        <input className="w-full border rounded p-2" type="text" placeholder="LinkedIn" />
        <textarea className="w-full border rounded p-2" placeholder="Resumo profissional" rows={3} />
      </form>
      <h2 className="text-xl font-semibold mt-6">Habilidades</h2>
      {/* Adicione aqui a lista dinâmica de habilidades */}
      <h2 className="text-xl font-semibold mt-6">Experiências</h2>
      {/* Adicione aqui a lista dinâmica de experiências */}
      <button className="mt-6 bg-blue-600 text-white rounded px-4 py-2 hover:bg-blue-700">
        Aprimorar com IA
      </button>
    </div>
  );
};

export default FormSection;