import { BrowserRouter, Routes, Route } from 'react-router-dom'
import FormComponent from './components/FormComponent'
import { FormProvider } from './contexts/FormContext'
import ResultComponent from './components/ResultComponent'

function App() {
  return (
    // Inicia o provedor de formulário, que torna os dados do formulário acessíveis a todos os componentes dentro de sua árvore de componentes.
    <FormProvider>
      <BrowserRouter>
        <Routes>
          {/* Define as rotas para a navegação usando o React Router. */}
          {/* Rota para a página inicial (FormComponent) */}
          <Route path="/" element={<FormComponent />} />
          {/* Rota para a página de resultado (ResultComponent) */}
          <Route path="/Result" element={<ResultComponent />} />
        </Routes>
      </BrowserRouter>
    </FormProvider>
  )
}

export default App