interface Habilidade {
    nome: string;
    nivel: 'Básico' | 'Intermediário' | 'Avançado';
}

interface Experiencia {
    empresa: string;
    cargo: string;
    periodoInicio: string;
    periodoFim: string;
    atual: boolean;
    descricao: string;
}

interface FormData {
    nome: string;
    email: string;
    telefone: string;
    linkedin: string;
    resumo: string;
    habilidades: Habilidade[];
    experiencias: Experiencia[];
}

interface FormSectionProps {
    formData: FormData;
    setFormData: (data: FormData) => void;
}

export type { Habilidade, Experiencia, FormData, FormSectionProps };