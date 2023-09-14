import { useFormContext } from "../contexts/FormContext";



export function calculaSalario() {
    const { formData } = useFormContext()

    const salario = parseFloat(formData.salario.replace('R$ ', '').replace('.', '').replace(',', '.'))
    const admissao = new Date(formData.admissao)
    const demissao = new Date(formData.demissao)
    let saldo_salario = 0

    if (admissao.getMonth()+1 < demissao.getMonth()+1) {
        saldo_salario = (salario / 30) * (demissao.getDate()+1)
    } else if ((admissao.getMonth()+1 == demissao.getMonth()+1) && (admissao.getDate()+1 <= demissao.getDate()+1)) {
        saldo_salario = (salario / 30) * (demissao.getDate()+1 - admissao.getDate())
    } else {
        Error('Erro: Data de admissão maior que a data de demissão!')
    }
    return (saldo_salario)
}

