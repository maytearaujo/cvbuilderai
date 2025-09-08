import React from 'react';

const Field = ({ value, placeholder }: { value: string; placeholder: string }) => (
  <span className={value ? '' : 'text-red-400 italic'}>{value || placeholder}</span>
);

const PreviewSection: React.FC<{ formData: any }> = ({ formData }) => {
  // Skeleton screen quando todos os campos principais estão vazios
  if (
    !formData.nome &&
    !formData.email &&
    !formData.telefone &&
    !formData.linkedin &&
    !formData.resumo
  ) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-8 h-full font-sans animate-pulse">
        <div className="h-8 bg-gray-200 rounded w-1/3 mb-4"></div>
        <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
        <div className="h-4 bg-gray-200 rounded w-1/4 mb-6"></div>
        <div className="h-6 bg-gray-200 rounded w-full mb-4"></div>
        <div className="h-6 bg-gray-200 rounded w-full mb-4"></div>
        <div className="h-6 bg-gray-200 rounded w-full"></div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-8 h-full font-sans transition-all duration-300 ease-in-out">
      <div className="border-b pb-4 mb-4 flex flex-col gap-2">
        <h1 className="text-3xl font-bold">
          <Field value={formData.nome} placeholder="Seu nome" />
        </h1>
        <div className="flex gap-4 text-gray-600">
          <Field value={formData.email} placeholder="Email" />
          <Field value={formData.telefone} placeholder="Telefone" />
          <Field value={formData.linkedin} placeholder="LinkedIn" />
        </div>
      </div>
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-1">Resumo Profissional</h2>
        <p className={formData.resumo ? '' : 'text-red-400 italic'}>
          {formData.resumo || 'Adicione um resumo profissional'}
        </p>
      </div>
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-1">Habilidades</h2>
        <ul className="list-disc pl-5">
          {formData.habilidades.length > 0 ? (
            formData.habilidades.map((hab: any, idx: number) => (
              <li key={idx}>
                {hab.nome} <span className="text-xs text-gray-500">({hab.nivel})</span>
              </li>
            ))
          ) : (
            <li className="text-red-400 italic">Adicione habilidades</li>
          )}
        </ul>
      </div>
      <div>
        <h2 className="text-xl font-semibold mb-1">Experiências</h2>
        <ul className="space-y-2">
          {formData.experiencias.length > 0 ? (
            formData.experiencias.map((exp: any, idx: number) => (
              <li key={idx} className="border-b pb-2">
                <div className="font-bold">{exp.empresa || <span className="text-red-400 italic">Empresa</span>}</div>
                <div>{exp.cargo || <span className="text-red-400 italic">Cargo</span>}</div>
                <div className="text-xs text-gray-500">
                  {exp.periodoInicio || 'Início'} - {exp.atual ? 'Atual' : exp.periodoFim || 'Término'}
                </div>
                <div>{exp.descricao || <span className="text-red-400 italic">Descrição das atividades</span>}</div>
              </li>
            ))
          ) : (
            <li className="text-red-400 italic">Adicione experiências profissionais</li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default PreviewSection;