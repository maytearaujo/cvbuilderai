import React, { useState } from 'react';
import Toast from '../UI/Toast';
import type { Experiencia, Habilidade, FormData } from '../../types/cv.types';

// Mock da chamada IA contextual
const enhanceTextAI = async (text: string, type: string, retries = 2): Promise<string> => {
    return new Promise<string>((resolve, reject) => {
        setTimeout(() => {
            if (text.trim() === "") {
                if (retries > 0) {
                    enhanceTextAI(text, type, retries - 1).then(resolve).catch(reject);
                } else {
                    reject("Campo vazio");
                }
            } else {
                let improved = text;
                if (type === "Resumo Profissional") {
                    improved =
                        `Profissional com sólida experiência e foco em resultados. ` +
                        `Palavras-chave: liderança, inovação, eficiência, colaboração. ` +
                        `Correção gramatical aplicada. Otimizado para impacto. ` +
                        improved;
                } else if (type === "Descrição") {
                    improved =
                        `• Gerenciou projetos utilizando verbos de ação e resultados quantificáveis.\n` +
                        `• Otimização de processos, aumento de produtividade em 20%.\n` +
                        `• Correção ortográfica e fluência aprimorada.\n` +
                        improved;
                }
                improved = improved.replace(/\s{2,}/g, ' ').replace('.', '.');
                resolve(`[IA] ${type}: ${improved} (melhorado)`);
            }
        }, 1200);
    });
};

interface FormSectionProps {
    formData: FormData;
    setFormData: (data: FormData) => void;
}

const FormSection: React.FC<FormSectionProps> = ({ formData, setFormData }) => {
    const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

    // Validações campos básicos
    const [errors, setErrors] = useState({
        nome: '',
        email: '',
        telefone: '',
        linkedin: '',
    });

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

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        setErrors({ ...errors, [name]: validate(name, value) });
    };

    // Estado IA feedback
    const [loadingResumo, setLoadingResumo] = useState(false);
    const [errorResumo, setErrorResumo] = useState('');
    const [loadingDescIdx, setLoadingDescIdx] = useState<number | null>(null);
    const [errorDescIdx, setErrorDescIdx] = useState<number | null>(null);

    // Funções para IA com Toast integrado
    const handleEnhanceResumo = async () => {
        setLoadingResumo(true);
        setErrorResumo('');
        try {
            const improved = await enhanceTextAI(formData.resumo, "Resumo Profissional");
            setFormData({ ...formData, resumo: improved });
            setToast({ message: 'Resumo melhorado com sucesso!', type: 'success' });
        } catch {
            setErrorResumo("Não foi possível melhorar o texto.");
            setToast({ message: 'Erro ao melhorar o resumo.', type: 'error' });
        } finally {
            setLoadingResumo(false);
        }
    };

    const handleEnhanceDescricao = async (idx: number) => {
        setLoadingDescIdx(idx);
        setErrorDescIdx(null);
        try {
            const improved = await enhanceTextAI(formData.experiencias[idx].descricao, "Descrição");
            const novasExperiencias = [...formData.experiencias];
            novasExperiencias[idx].descricao = improved;
            setFormData({ ...formData, experiencias: novasExperiencias });
            setToast({ message: 'Descrição melhorada com sucesso!', type: 'success' });
        } catch {
            setErrorDescIdx(idx);
            setToast({ message: 'Erro ao melhorar a descrição.', type: 'error' });
        } finally {
            setLoadingDescIdx(null);
        }
    };

    // Habilidades
    const [novaHabilidade, setNovaHabilidade] = useState<Habilidade>({
        nome: '',
        nivel: 'Básico',
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
            habilidades: formData.habilidades.filter((_, i) => i !== index),
        });
    };

    // Experiências
    const [novaExperiencia, setNovaExperiencia] = useState<Experiencia>({
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
        const { name, value, type } = e.target;
        const val = type === 'checkbox' && 'checked' in e.target ? (e.target as HTMLInputElement).checked : value;
        const updated = { ...novaExperiencia, [name]: val };
        setNovaExperiencia(updated);
        setExpErrors({
            ...expErrors,
            [name]: validateExp(name, val as string, updated),
        });
    };

    const adicionarExperiencia = () => {
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
            experiencias: formData.experiencias.filter((_, i) => i !== index),
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
                    <div className="flex justify-between items-center text-sm text-gray-500 mt-1">
                        <span>Máx: 500 caracteres</span>
                        <span>{formData.resumo.length} / 500</span>
                        <button
                            type="button"
                            className={`ml-2 px-3 py-1 rounded bg-green-600 text-white hover:bg-green-700 transition duration-300 ease-in-out flex items-center ${loadingResumo ? 'opacity-50 cursor-not-allowed' : ''}`}
                            onClick={handleEnhanceResumo}
                            disabled={loadingResumo}
                        >
                            {loadingResumo ? (
                                <svg className="animate-spin h-4 w-4 mr-2 text-white" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="white" strokeWidth="4" fill="none" />
                                    <path className="opacity-75" fill="white" d="M4 12a8 8 0 018-8v8z" />
                                </svg>
                            ) : null}
                            {loadingResumo ? 'Melhorando...' : 'Melhorar'}
                        </button>
                    </div>
                    {errorResumo && (
                        <span className="text-red-500 text-sm">
                            {errorResumo} Tente novamente.
                        </span>
                    )}
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
                        onChange={e => setNovaHabilidade({ ...novaHabilidade, nivel: e.target.value as Habilidade['nivel'] })}
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
                    {formData.habilidades.map((hab: Habilidade, idx: number) => (
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
                </ul>                <ul className="mt-2">
                    {formData.habilidades.map((hab: Habilidade, idx: number) => (
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
                    {formData.experiencias.map((exp: Experiencia, idx: number) => (
                        <li key={idx} className="flex flex-col md:flex-row md:items-center justify-between border-b py-1">
                            <span>
                                <strong>{exp.empresa}</strong> - {exp.cargo} (
                                {exp.periodoInicio} - {exp.atual ? 'Atual' : exp.periodoFim})
                                <br />
                                <span className="text-xs text-gray-500">{exp.descricao}</span>
                                <button
                                    type="button"
                                    className={`ml-2 px-2 py-1 rounded bg-green-600 text-white hover:bg-green-700 ${loadingDescIdx === idx ? 'opacity-50 cursor-not-allowed' : ''}`}
                                    onClick={() => handleEnhanceDescricao(idx)}
                                    disabled={loadingDescIdx === idx}
                                >
                                    {loadingDescIdx === idx ? 'Melhorando...' : 'Melhorar'}
                                </button>
                                {errorDescIdx === idx && (
                                    <span className="text-red-500 text-sm ml-2">Não foi possível melhorar.</span>
                                )}
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
            {toast && (
                <Toast
                    message={toast.message}
                    type={toast.type}
                    onClose={() => setToast({ message: 'Erro ao melhorar o resumo. Tente novamente.', type: 'error' })}
                />
            )}
        </div>
    );
};

export default FormSection;