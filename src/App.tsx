import { BrowserRouter, Routes, Route } from 'react-router-dom'
import FormComponent from './components/FormComponent'
import { FormProvider } from './contexts/FormContext'
import ResultComponent from './components/ResultComponent'

function App() {
  return (
    <FormProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<FormComponent />}/>
          <Route path="/Result" element={<ResultComponent />}/>
        </Routes>
      </BrowserRouter>
    </FormProvider>
  )
}

export default App