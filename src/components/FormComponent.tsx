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
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Agora, você pode fazer o que quiser com os dados do formulário
    navigate('/Result')
  };

  return (
    <>
      <form onSubmit={(e) => handleSubmit(e)}>
        <label>
          Admissão:
          <input
            type="date"
            name="admissao"
            value={formData.admissao}
            onChange={handleChange}
          />
        </label>
        <label>
          Demissão:
          <input
            type="date"
            name="demissao"
            value={formData.demissao}
            onChange={handleChange}
          />
        </label>
        <label>
          Motivo:
          <select name="motivo" id="motivo" onChange={handleChange}>
            <option value={formData.motivo = "0"}>Dispensa sem justa causa</option>
            <option value={formData.motivo = "1"}>Dispensa por justa causa</option>
            <option value={formData.motivo = "2"}>Pedido de demissão</option>
            <option value={formData.motivo = "3"}>Término do contrato de experiência</option>
            <option value={formData.motivo = "4"}>Rescisão antecipada de contrato de experiencia pelo empregador</option>
            <option value={formData.motivo = "5"}>Rescisão antecipada de contrato de experiencia pelo empregado</option>
          </select>
        </label>
        <label>
          Final do Contrato:
          <input
            type="date"
            name="final_contrato"
            value={formData.final_contrato}
            onChange={handleChange}
          />
        </label>
        <label>
          Salário:
          <input
            type='text'
            name="salario"
            value={formData.salario}
            onChange={handleChange}
          />
        </label>
        <label>
          Aviso Prévio:
          <select name="aviso" id="aviso" onChange={handleChange}>
            <option value={formData.aviso='0'}>Trabalhado</option>
            <option value={formData.aviso='1'}>Indenizado</option>
          </select>
        </label>
        <label>
          Férias Vencidas:
          <input
            type="checkbox"
            name="ferias_vencidas"
            checked={formData.ferias_vencidas}
            onChange={handleChange}
          />
        </label>
        <label>
          Dias de Férias:
          <input
            type="number"
            name="dias_ferias"
            value={formData.dias_ferias}
            onChange={handleChange}
          />
        </label>
        <label>
          Dependentes:
          <input
            type="number"
            name="dependentes"
            value={formData.dependentes}
            onChange={handleChange}
          />
        </label>
        <button type="submit">Enviar</button>
      </form>
    </>
  );
};

export default FormComponent
