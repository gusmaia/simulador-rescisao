import { useFormContext } from '../contexts/FormContext'
import { useNavigate } from 'react-router-dom'

function FormComponent() {
  const navigate = useNavigate()
  const { formData, setFormData } = useFormContext()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
  
    if (type === 'checkbox') {
      const checkbox = e.target as HTMLInputElement;
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: checkbox.checked,
      }))
    } else if (name == 'salario') {
      const inputValue = e.target.value.replace(/\D/g, '') // Remove não números

      // Adicione zeros à esquerda para garantir que tenhamos um número com 2 casas decimais
      const paddedValue = inputValue.padStart(3, '')

      // Separe os últimos 2 dígitos (centavos) do resto do valor
      const cents = paddedValue.slice(-2)
      const dollars = paddedValue.slice(0, -2)

      // Formate os dólares com ponto e vírgula a cada 3 dígitos
      const formattedDollars = dollars.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')

      // Crie o valor final com a formatação BRL
      const formattedValue = `R$ ${formattedDollars},${cents}`

      setFormData((prevFormData => ({
        ...prevFormData,
        [name]: formattedValue
      })))
    } else {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: value,
      }))
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Agora, você pode fazer o que quiser com os dados do formulário
    navigate('/Result')
  }

  const isFinalContratoDisabled = !(formData.motivo == '4' || formData.motivo == '5')
  const isAvisoDisabled = !(formData.motivo == '0' || formData.motivo == '2')
  const isDiasFeriasDisabled = !(formData.ferias_vencidas == true)

  return (
    <>
      <div className="bg-blue-50 min-h-screen flex flex-col items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-md sm:w-96 md:w-1/2">
            <h1 className="text-4xl font-black text-center text-blue-700 mb-4">Simulador de Rescisão</h1>
            <form onSubmit={(e) => handleSubmit(e)} className="space-y-4">
                <div className="flex flex-col">
                    <label className="text-blue-700">Admissão:</label>
                    <input
                        required
                        type="date"
                        name="admissao"
                        id="admissao"
                        value={formData.admissao}
                        onChange={handleChange}
                        className="border border-blue-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500"
                    />
                </div>
                <div className="flex flex-col">
                    <label className="text-blue-700">Demissão:</label>
                    <input
                        required
                        type="date"
                        name="demissao"
                        id="demissao"
                        value={formData.demissao}
                        onChange={handleChange}
                        className="border border-blue-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500"
                    />
                </div>
                <div className="flex flex-col">
                    <label className="text-blue-700">Motivo:</label>
                    <select
                        name="motivo"
                        id="motivo"
                        value={formData.motivo}
                        onChange={handleChange}
                        className="border border-blue-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500"
                    >
                        <option value={"0"}>Dispensa sem justa causa</option>
                        <option value={"1"}>Dispensa por justa causa</option>
                        <option value={"2"}>Pedido de demissão</option>
                        <option value={"3"}>Término do contrato de experiência</option>
                        <option value={"4"}>Rescisão antecipada de contrato de experiência pelo empregador</option>
                        <option value={"5"}>Rescisão antecipada de contrato de experiência pelo empregado</option>
                    </select>
                </div>
                <div className="flex flex-col">
                    <label  className="text-blue-700">Final do Contrato:</label>
                    <input
                        required={isFinalContratoDisabled}
                        disabled={isFinalContratoDisabled}
                        type="date"
                        name="final_contrato"
                        id="final_contrato"
                        value={formData.final_contrato}
                        onChange={handleChange}
                        className="border border-blue-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500"
                    />
                </div>
                <div className="flex flex-col">
                    <label  className="text-blue-700">Salário:</label>
                    <input
                        required
                        type="text"
                        name="salario"
                        id="salario"
                        placeholder='R$ 0,00'
                        value={formData.salario}
                        onChange={handleChange}
                        className="border border-blue-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500"
                    />
                </div>
                <div className="flex flex-col">
                    <label  className="text-blue-700">Aviso Prévio:</label>
                    <select
                        disabled={isAvisoDisabled}
                        name="aviso"
                        id="aviso"
                        value={formData.aviso}
                        onChange={handleChange}
                        className="border border-blue-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500"
                    >
                        <option value={"0"}>Trabalhado</option>
                        <option value={"1"}>Indenizado</option>
                    </select>
                </div>
                <div className="flex items-center space-x-2">
                    <input
                        type="checkbox"
                        name="ferias_vencidas"
                        id="ferias_vencidas"
                        checked={formData.ferias_vencidas}
                        onChange={handleChange}
                        className="text-blue-500"
                    />
                    <label className="text-blue-700">Férias Vencidas</label>
                </div>
                <div className="flex flex-col">
                    <label className="text-blue-700">Dias de Férias:</label>
                    <input
                        required
                        disabled={isDiasFeriasDisabled}
                        type="number"
                        name="dias_ferias"
                        id="dias_ferias"
                        value={formData.dias_ferias}
                        onChange={handleChange}
                        className="border border-blue-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500"
                    />
                </div>
                <div className="flex flex-col">
                    <label  className="text-blue-700">Dependentes:</label>
                    <input
                        required
                        type="number"
                        name="dependentes"
                        id="dependentes"
                        value={formData.dependentes}
                        onChange={handleChange}
                        className="border border-blue-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500"
                    />
                </div>
                <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-600">
                    Enviar
                </button>
            </form>
        </div>
        <footer className='absolute bottom-6'>
            <pre>
                Desenvolvido por:    <a className='underline text-blue-500 hover:text-blue-700 focus:outline-none focus:text-blue-600' target='blank' href="https://github.com/gusmaia">gusmaia</a>
            </pre>
        </footer>
    </div>
    </>
  )
}

export default FormComponent
