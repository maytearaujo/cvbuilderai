import FormSection from './components/Layout/FormSection';
import PreviewSection from './components/Layout/PreviewSection';

function App() {
  return (
    <div className="flex h-screen bg-gray-50">
      {/* Formulário - Esquerda */}
      <div className="w-1/2 p-8 border-r border-gray-200 overflow-y-auto">
        <FormSection />
      </div>
      {/* Preview - Direita */}
      <div className="w-1/2 p-8 overflow-y-auto">
        <PreviewSection />
      </div>
    </div>
  );
}

export default App;