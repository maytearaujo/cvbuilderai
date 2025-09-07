import React, { useState } from 'react';

const FormSection: React.FC<{ formData: any; setFormData: any }> = ({ formData, setFormData }) => {
    const [errors, setErrors] = useState({
        nome: '',
        email: '',
        telefone: '',
        linkedin: '',
    });

    // Validação simples
    const validate = (field: string, value: string) => {
        switch (field) {
            case 'nome':
                return value.length < 2 ? 'Nome deve ter ao menos 2 caracteres.' : '';
            case 'email':
                return /\S+@\S+\.\S+/.test(value) ? '' : 'Email inválido.';
            case 'telefone':
                return value.length < 8 ? 'Telefone inválido.' : '';
            case 'linkedin':
                return value && !value.startsWith('https://') ? 'URL deve começar com https://' : '';
            default:
                return '';
        }
    };

    // Atualiza formData e erros em tempo real
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        setErrors({ ...errors, [name]: validate(name, value) });
    };

    // Habilidades
    const [novaHabilidade, setNovaHabilidade] = useState({
        nome: '',
        nivel: 'Básico' as 'Básico' | 'Intermediário' | 'Avançado',
    });

    const adicionarHabilidade = () => {
        if (novaHabilidade.nome.trim() === '') return;
        setFormData({
            ...formData,
            habilidades: [...formData.habilidades, novaHabilidade],
        });
        setNovaHabilidade({ nome: '', nivel: 'Básico' });
    };

    const removerHabilidade = (index: number) => {
        setFormData({
            ...formData,
            habilidades: formData.habilidades.filter((_: any, i: number) => i !== index),
        });
    };

    // Experiências
    const [novaExperiencia, setNovaExperiencia] = useState({
        empresa: '',
        cargo: '',
        periodoInicio: '',
        periodoFim: '',
        atual: false,
        descricao: '',
    });

    const [expErrors, setExpErrors] = useState({
        empresa: '',
        cargo: '',
        periodoInicio: '',
        periodoFim: '',
    });

    const validateExp = (field: string, value: string, exp = novaExperiencia) => {
        switch (field) {
            case 'empresa':
                return value.length < 2 ? 'Empresa deve ter ao menos 2 caracteres.' : '';
            case 'cargo':
                return value.length < 2 ? 'Cargo deve ter ao menos 2 caracteres.' : '';
            case 'periodoInicio':
                return !value ? 'Informe a data de início.' : '';
            case 'periodoFim':
                if (!exp.atual && !value) return 'Informe a data de término.';
                if (!exp.atual && exp.periodoInicio && value && value < exp.periodoInicio)
                    return 'Data de término deve ser após início.';
                return '';
            default:
                return '';
        }
    };

    const handleExpChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value, type, checked } = e.target;
        const val = type === 'checkbox' ? checked : value;
        const updated = { ...novaExperiencia, [name]: val };
        setNovaExperiencia(updated);
        setExpErrors({
            ...expErrors,
            [name]: validateExp(name, val as string, updated),
        });
    };

    const adicionarExperiencia = () => {
        // Validação simples antes de adicionar
        const errs = {
            empresa: validateExp('empresa', novaExperiencia.empresa),
            cargo: validateExp('cargo', novaExperiencia.cargo),
            periodoInicio: validateExp('periodoInicio', novaExperiencia.periodoInicio),
            periodoFim: validateExp('periodoFim', novaExperiencia.periodoFim, novaExperiencia),
        };
        setExpErrors(errs);
        if (Object.values(errs).some(e => e)) return;
        setFormData({
            ...formData,
            experiencias: [...formData.experiencias, novaExperiencia],
        });
        setNovaExperiencia({
            empresa: '',
            cargo: '',
            periodoInicio: '',
            periodoFim: '',
            atual: false,
            descricao: '',
        });
        setExpErrors({
            empresa: '',
            cargo: '',
            periodoInicio: '',
            periodoFim: '',
        });
    };

    const removerExperiencia = (index: number) => {
        setFormData({
            ...formData,
            experiencias: formData.experiencias.filter((_: any, i: number) => i !== index),
        });
    };

    return (
        <div className="bg-white rounded-lg shadow-lg p-6 space-y-8">
            <h2 className="text-2xl font-bold mb-4">Dados Pessoais</h2>
            <form className="space-y-4">
                <div>
                    <input
                        className="w-full border rounded p-2"
                        type="text"
                        name="nome"
                        placeholder="Nome"
                        value={formData.nome}
                        onChange={handleChange}
                    />
                    {errors.nome && <span className="text-red-500 text-sm">{errors.nome}</span>}
                </div>
                <div>
                    <input
                        className="w-full border rounded p-2"
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleChange}
                    />
                    {errors.email && <span className="text-red-500 text-sm">{errors.email}</span>}
                </div>
                <div>
                    <input
                        className="w-full border rounded p-2"
                        type="tel"
                        name="telefone"
                        placeholder="Telefone"
                        value={formData.telefone}
                        onChange={handleChange}
                    />
                    {errors.telefone && <span className="text-red-500 text-sm">{errors.telefone}</span>}
                </div>
                <div>
                    <input
                        className="w-full border rounded p-2"
                        type="text"
                        name="linkedin"
                        placeholder="LinkedIn"
                        value={formData.linkedin}
                        onChange={handleChange}
                    />
                    {errors.linkedin && <span className="text-red-500 text-sm">{errors.linkedin}</span>}
                </div>
                <div>
                    <textarea
                        className="w-full border rounded p-2"
                        name="resumo"
                        placeholder="Resumo profissional"
                        rows={3}
                        maxLength={500}
                        value={formData.resumo}
                        onChange={handleChange}
                    />
                    <div className="flex justify-between text-sm text-gray-500 mt-1">
                        <span>Máx: 500 caracteres</span>
                        <span>{formData.resumo.length} / 500</span>
                    </div>
                </div>
            </form>
            <h2 className="text-xl font-semibold mt-6">Habilidades</h2>
            <div className="space-y-2">
                <div className="flex gap-2">
                    <input
                        className="border rounded p-2 flex-1"
                        type="text"
                        placeholder="Nome da habilidade"
                        value={novaHabilidade.nome}
                        onChange={e => setNovaHabilidade({ ...novaHabilidade, nome: e.target.value })}
                    />
                    <select
                        className="border rounded p-2"
                        value={novaHabilidade.nivel}
                        onChange={e => setNovaHabilidade({ ...novaHabilidade, nivel: e.target.value as any })}
                    >
                        <option value="Básico">Básico</option>
                        <option value="Intermediário">Intermediário</option>
                        <option value="Avançado">Avançado</option>
                    </select>
                    <button
                        type="button"
                        className="bg-blue-600 text-white rounded px-4 py-2 hover:bg-blue-700"
                        onClick={adicionarHabilidade}
                    >
                        Adicionar
                    </button>
                </div>
                <ul className="mt-2">
                    {formData.habilidades.map((hab: any, idx: number) => (
                        <li key={idx} className="flex items-center justify-between border-b py-1">
                            <span>{hab.nome} <span className="text-xs text-gray-500">({hab.nivel})</span></span>
                            <button
                                type="button"
                                className="text-red-500 hover:underline text-sm"
                                onClick={() => removerHabilidade(idx)}
                            >
                                Remover
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
            <h2 className="text-xl font-semibold mt-6">Experiências</h2>
            <div className="space-y-2">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    <div>
                        <input
                            className="border rounded p-2 w-full"
                            type="text"
                            name="empresa"
                            placeholder="Empresa"
                            value={novaExperiencia.empresa}
                            onChange={handleExpChange}
                        />
                        {expErrors.empresa && <span className="text-red-500 text-sm">{expErrors.empresa}</span>}
                    </div>
                    <div>
                        <input
                            className="border rounded p-2 w-full"
                            type="text"
                            name="cargo"
                            placeholder="Cargo"
                            value={novaExperiencia.cargo}
                            onChange={handleExpChange}
                        />
                        {expErrors.cargo && <span className="text-red-500 text-sm">{expErrors.cargo}</span>}
                    </div>
                    <div>
                        <label className="block text-sm text-gray-600 mb-1">Início</label>
                        <input
                            className="border rounded p-2 w-full"
                            type="month"
                            name="periodoInicio"
                            value={novaExperiencia.periodoInicio}
                            onChange={handleExpChange}
                        />
                        {expErrors.periodoInicio && <span className="text-red-500 text-sm">{expErrors.periodoInicio}</span>}
                    </div>
                    <div>
                        <label className="block text-sm text-gray-600 mb-1">Término</label>
                        <input
                            className="border rounded p-2 w-full"
                            type="month"
                            name="periodoFim"
                            value={novaExperiencia.periodoFim}
                            onChange={handleExpChange}
                            disabled={novaExperiencia.atual}
                        />
                        {expErrors.periodoFim && <span className="text-red-500 text-sm">{expErrors.periodoFim}</span>}
                        <label className="flex items-center mt-1 text-sm">
                            <input
                                type="checkbox"
                                name="atual"
                                checked={novaExperiencia.atual}
                                onChange={handleExpChange}
                                className="mr-2"
                            />
                            Trabalho atual
                        </label>
                    </div>
                    <div className="col-span-2">
                        <textarea
                            className="border rounded p-2 w-full"
                            name="descricao"
                            placeholder="Descrição das atividades"
                            rows={2}
                            value={novaExperiencia.descricao}
                            onChange={handleExpChange}
                        />
                    </div>
                </div>
                <button
                    type="button"
                    className="bg-blue-600 text-white rounded px-4 py-2 hover:bg-blue-700 mt-2"
                    onClick={adicionarExperiencia}
                >
                    Adicionar
                </button>
                <ul className="mt-2">
                    {formData.experiencias.map((exp: any, idx: number) => (
                        <li key={idx} className="flex flex-col md:flex-row md:items-center justify-between border-b py-1">
                            <span>
                                <strong>{exp.empresa}</strong> - {exp.cargo} (
                                {exp.periodoInicio} - {exp.atual ? 'Atual' : exp.periodoFim})
                                <br />
                                <span className="text-xs text-gray-500">{exp.descricao}</span>
                            </span>
                            <button
                                type="button"
                                className="text-red-500 hover:underline text-sm mt-2 md:mt-0"
                                onClick={() => removerExperiencia(idx)}
                            >
                                Remover
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default FormSection;