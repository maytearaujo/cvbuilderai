import React from "react";

class ErrorBoundary extends React.Component<{ children: React.ReactNode }, { hasError: boolean }> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  componentDidCatch(error: unknown, info: unknown) {
    // Você pode logar o erro aqui
    console.error(error, info);
  }
  render() {
    if (this.state.hasError) {
      return (
        <div className="p-8 text-center text-red-600">
          <h2>Ocorreu um erro inesperado.</h2>
          <p>Tente recarregar a página ou entrar em contato com o suporte.</p>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;