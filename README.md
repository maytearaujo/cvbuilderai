# CV Builder AI

Aplicação React para criação de currículos profissionais com preview instantâneo e aprimoramento por inteligência artificial.

## Funcionalidades

- Layout split-screen otimizado para desktop
- Formulário dinâmico: dados pessoais, habilidades e experiências
- Preview do currículo em tempo real
- Botões "Melhorar" com IA para resumo e descrições
- Validação de dados e feedback visual
- Toasts para sucesso/erro, skeleton screens e animações suaves
- Error boundaries para falhas críticas
- Segurança: variáveis de ambiente para API keys

## Instalação

1. **Clone o repositório:**
   ```
   git clone https://github.com/seu-usuario/cvbuilderai.git
   cd cvbuilderai
   ```

2. **Instale as dependências:**
   ```
   npm install
   ```

3. **Configure variáveis de ambiente:**
   - Crie um arquivo `.env.local` na raiz do projeto:
     ```
     VITE_API_KEY=your_api_key_here
     ```

4. **Execute o projeto:**
   ```
   npm run dev
   ```

## Estrutura de Pastas

```
src/
  App.tsx
  components/
    Layout/
      FormSection.tsx
      PreviewSection.tsx
    UI/
      Toast.tsx
      ErrorBoundary.tsx
  ...
.env.local
```

## Segurança

- Nunca compartilhe seu arquivo `.env.local`
- Assegure que `.env*` está no `.gitignore`

##