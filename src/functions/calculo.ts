import { useFormContext } from "../contexts/FormContext"
import { addDays, differenceInDays, differenceInMonths, differenceInYears, parseISO } from 'date-fns'


// Função para calcular o saldo de salário.
export function calculaSalario() {
  const { formData } = useFormContext() // Obtém os dados do formulário do contexto.

  // Converte o salário para um número e realiza algumas transformações na formatação.
  const salario = parseFloat(formData.salario.replace('R$ ', '').replace('.', '').replace(',', '.'))

  // Converte as datas de admissão e demissão para objetos Date.
  const admissao = parseISO(formData.admissao)
  const demissao = parseISO(formData.demissao)

  let saldo_salario = 0

  if (demissao.getFullYear() === admissao.getFullYear()) {
    if (demissao.getMonth() === admissao.getMonth()) {
      saldo_salario += (salario / 30) * (differenceInDays(demissao, admissao) + 1)
    } else {
      saldo_salario += (salario / 30) * demissao.getDate()
    }
  } else {
    saldo_salario += (salario / 30) * demissao.getDate()
  }

  return saldo_salario // Retorna o saldo de salário calculado.
}

// Função para calcular o 13º proporcional.
export function calc13Prop() {
  const { formData } = useFormContext() // Obtém os dados do formulário do contexto.

  if (formData.motivo !== '1') {
    const dataAdms = parseISO(formData.admissao)
    const dataRec = parseISO(formData.demissao)
    const salProp = parseFloat(formData.salario.replace('R$ ', '').replace('.', '').replace(',', '.')) / 12

    let meses = 0

    if (dataAdms.getFullYear() === dataRec.getFullYear()) {
      meses += dataRec.getMonth() - dataAdms.getMonth() - 1
      meses += dataAdms.getDate() <= 15 ? 1 : 0
      meses += dataRec.getDate() >= 15 ? 1 : 0
    } else {
      meses += dataRec.getMonth()
      meses += dataRec.getDate() >= 15 ? 1 : 0
    }

    let result = meses * salProp

    return result // Retorna o valor do 13º proporcional calculado.
  } else {
    return 0 // Retorna 0 se o motivo for diferente de '1'.
  }
}

// Função para calcular os dias de aviso prévio.
export function calcDiasAvsPrev() {
  const { formData } = useFormContext() // Obtém os dados do formulário do contexto.

  if (formData.aviso === '1') {
    const dataRec = parseISO(formData.demissao)
    const dataAdm = parseISO(formData.admissao)
    const dif = differenceInYears(dataRec, dataAdm) * 3
    let dias = 30

    if (dif > 60) {
      dias += 90
    } else {
      dias += dif
    }

    return dias // Retorna o número de dias de aviso prévio calculado.
  } else {
    return 0 // Retorna 0 se o aviso não for igual a '1'.
  }
}

// Função para calcular a data de projeção.
export function calcDataProje() {
  const { formData } = useFormContext() // Obtém os dados do formulário do contexto.

  const dataRec = parseISO(formData.demissao)

  return addDays(dataRec, calcDiasAvsPrev()) // Adiciona os dias de aviso prévio à data de rescisão.
}

// Função para calcular os avos de férias proporcionais.
export function calculaAvsPrev() {
  const { formData } = useFormContext() // Obtém os dados do formulário do contexto.

  const salario = parseFloat(formData.salario.replace('R$ ', '').replace('.', '').replace(',', '.'))

  if (formData.motivo === '0' && formData.aviso === '1') {
    return (salario / 30) * calcDiasAvsPrev() // Retorna o valor das avos de férias proporcionais calculado.
  } else {
    return 0 // Retorna 0 se o motivo não for igual a '0' ou o aviso não for igual a '1'.
  }
}

// Função para calcular a data da última perda de férias.
export function calcDataUltPerFer() {
  const { formData } = useFormContext() // Obtém os dados do formulário do contexto.

  const dataAdm = parseISO(formData.admissao)
  const dataRec = parseISO(formData.demissao)
  const data = new Date(dataRec.getFullYear(), dataAdm.getMonth(), dataAdm.getDate())

  if (data > dataRec) {
    return new Date(dataRec.getFullYear() - 1, dataAdm.getMonth(), dataAdm.getDate())
  } else {
    return new Date(dataRec.getFullYear(), dataAdm.getMonth(), dataAdm.getDate())
  }
}

// Função para calcular o salário família.
export function calcSalFamilia() {
  const { formData } = useFormContext() // Obtém os dados do formulário do contexto.

  let calAvs = calculaAvsPrev()

  if (calculaSalario() + calAvs < 1425.56) {
    let salFam = formData.dependentes * 48.62
    return salFam // Retorna o valor do salário família calculado.
  } else {
    return 0 // Retorna 0 se o valor não atender ao critério.
  }
}

// Função para calcular o 13º indenizado.
export function calc13Indeni() {
  const { formData } = useFormContext() // Obtém os dados do formulário do contexto.

  if (formData.motivo === '0' && formData.aviso === '1') {
    const dataAdms = parseISO(formData.admissao)
    const dataRec = calcDataProje()
    const dataRec1 = parseISO(formData.demissao)
    const salProp = parseFloat(formData.salario.replace('R$ ', '').replace('.', '').replace(',', '.')) / 12

    let meses = 0

    if (dataAdms.getFullYear() === dataRec.getFullYear()) {
      meses += dataRec.getMonth() - dataAdms.getMonth() - 1
      meses += dataAdms.getDate() <= 15 ? 1 : 0
      meses += dataRec.getDate() >= 15 ? 1 : 0
    } else {
      const dataB = new Date(dataRec1.getFullYear(), 0, 1)
      meses = differenceInMonths(dataRec, dataB)
      meses += dataRec.getDate() >= 15 ? 1 : 0
    }

    let result = meses * salProp - calc13Prop()

    return Math.trunc(result) === 0 ? 0 : result // Retorna o valor do 13º indenizado calculado.
  } else {
    return 0 // Retorna 0 se o motivo não for igual a '0' ou o aviso não for igual a '1'.
  }
}

// Função para calcular o valor das férias vencidas e não gozadas.
export function calcFerVcd() {
  const { formData } = useFormContext() // Obtém os dados do formulário do contexto.

  const salario = parseFloat(formData.salario.replace('R$ ', '').replace('.', '').replace(',', '.'))
  const dias_ferias = formData.dias_ferias

  if (formData.ferias_vencidas === true) {
    let ferVcd = (salario * dias_ferias) / 30
    return ferVcd // Retorna o valor das férias vencidas e não gozadas calculado.
  } else {
    return 0 // Retorna 0 se as férias vencidas não estiverem marcadas.
  }
}

// Função para calcular 1/3 das férias vencidas.
export function calcFerVcd1_3() {
    const { formData } = useFormContext() // Obtém os dados do formulário do contexto.
  
    if (formData.ferias_vencidas === true) {
      let result = calcFerVcd() / 3
      return result // Retorna 1/3 do valor das férias vencidas calculado.
    } else {
      return 0 // Retorna 0 se as férias vencidas não estiverem marcadas.
    }
}
  
  // Função para calcular a rescisão antecipada.
export function calcRescAntecip() {
    const { formData } = useFormContext() // Obtém os dados do formulário do contexto.
  
    if (formData.motivo === '4') {
      const dataRec = parseISO(formData.demissao)
      const dataPrev = parseISO(formData.final_contrato)
      const datadif = differenceInDays(dataPrev, dataRec) / 2
      const salProp = parseFloat(formData.salario.replace('R$ ', '').replace('.', '').replace(',', '.')) / 30
  
      let result = salProp * datadif
  
      return result // Retorna o valor da rescisão antecipada calculada.
    } else {
      return 0 // Retorna 0 se o motivo não for igual a '4'.
    }
}
  
  // Função para calcular as férias proporcionais.
export function calcferPropor() {
    const { formData } = useFormContext() // Obtém os dados do formulário do contexto.
  
    if (formData.motivo !== '1') {
      const dataRec = parseISO(formData.demissao)
      const dataUltPer = calcDataUltPerFer()
      const ultSal = parseFloat(formData.salario.replace('R$ ', '').replace('.', '').replace(',', '.')) / 12
  
      let result = differenceInMonths(dataRec, dataUltPer)
      let addMonth = 0
  
      if (dataRec.getDate() > dataUltPer.getDate()) {
        addMonth += differenceInDays(dataRec, dataUltPer)
      } else if (dataRec.getDate() < dataUltPer.getDate()) {
        addMonth += 30 - dataUltPer.getDate() + dataRec.getDate()
      } else {
        addMonth += 0
      }
  
      if (addMonth >= 15) {
        result += 1
      }
  
      let resu = result * ultSal
  
      return resu === 0 || isNaN(resu) ? 0 : resu // Retorna o valor das férias proporcionais calculadas.
    } else {
      return 0 // Retorna 0 se o motivo for igual a '1'.
    }
}
  
  // Função para calcular 1/3 das férias proporcionais.
export function calcFerPropor1_3() {
    if (calcferPropor() !== 0) {
      let result = calcferPropor() / 3
      return Math.trunc(result) === 0 ? 0 : result // Retorna 1/3 das férias proporcionais calculadas.
    } else {
      return 0 // Retorna 0 se as férias proporcionais forem iguais a 0.
    }
}
  
  // Função para calcular as férias indenizadas.
export function calcFerIndeni() {
    const { formData } = useFormContext() // Obtém os dados do formulário do contexto.
  
    if (formData.motivo === '0' && formData.aviso === '1') {
      const dataRec = parseISO(formData.demissao)
      const dataProje = calcDataProje()
      const ultSal = parseFloat(formData.salario.replace('R$ ', '').replace('.', '').replace(',', '.')) / 12
      const res = Math.abs(30 - dataProje.getDate() + Math.abs(30 - dataProje.getDate()))
      let meses = differenceInMonths(dataProje, dataRec)
  
      meses += res > 15 ? 1 : 0
  
      let result = ultSal * meses
  
      return result // Retorna o valor das férias indenizadas calculadas.
    } else {
      return 0 // Retorna 0 se o motivo não for igual a '0' ou o aviso não for igual a '1'.
    }
}
  
  // Função para calcular 1/3 das férias indenizadas.
export function calcFerIndeni1_3() {
    if (calcFerIndeni() !== 0) {
      let ferIndeni1_3 = calcFerIndeni() / 3
      return ferIndeni1_3 // Retorna 1/3 das férias indenizadas calculadas.
    } else {
      return 0 // Retorna 0 se as férias indenizadas forem iguais a 0.
    }
}

export function calcFGTSMes() {
  const { formData } = useFormContext()

  if (formData.motivo == '0' || formData.motivo == '3' || formData.motivo == '4') {
    let fgtsMes = calculaSalario() * 0.08
    return fgtsMes
  } else {
    return 0
  }
}

export function calcFGTSAvsIndeni() {
  const { formData } = useFormContext()

  if (formData.motivo == '0') {
    let fgtsAvsIndeni = calculaAvsPrev() * 0.08
    return fgtsAvsIndeni
  } else {
    return 0
  }
}

export function calcMultaFGTS() {
  const { formData } = useFormContext()

  if (formData.motivo == '0' || formData.motivo == '4') {
    const baseFgts = parseFloat(formData.fgts.replace('R$ ', '').replace('.', '').replace(',', '.'))
    let multaFgts = (baseFgts + calcFGTSMes() + calcFGTSAvsIndeni()) * 0.4
    return multaFgts
  } else {
    return 0
  }
}

export function getBaseFGTS() {
  const { formData } = useFormContext()

  const base = formData.fgts === '' ? 0 : parseFloat(formData.fgts.replace('R$ ', '').replace('.', '').replace(',', '.'))

  return base
}
  
  // Função para calcular o desconto do aviso prévio.
export function calcDescAvsPrev() {
    const { formData } = useFormContext() // Obtém os dados do formulário do contexto.
  
    const sal = parseFloat(formData.salario.replace('R$ ', '').replace('.', '').replace(',', '.'))
  
    if (formData.motivo === '2' && formData.aviso === '1') {
      return sal // Retorna o valor do desconto do aviso prévio calculado.
    } else {
      return 0 // Retorna 0 se o motivo não for igual a '2' ou o aviso não for igual a '1'.
    }
}
  
  // Função para calcular o desconto do INSS.
export function calcDescINSS() {
    let sal = calculaSalario()
    let inss = 0
  
    if (sal > 1320.00) {
      if (sal < 2571.30) {
        inss += sal * 0.09 - 19.80
      } else if (sal < 3856.95) {
        inss += sal * 0.12 - 96.94
      } else if (sal <= 7507.49) {
        inss += sal * 0.14 - 174.08
      } else {
        inss += 876.95
      }
    } else {
      inss += sal * 0.075
    }
  
    return inss // Retorna o valor do desconto do INSS calculado.
}
  
  // Função para calcular o desconto do IRRF.
export function calcDescIRFF() {
    const { formData } = useFormContext() // Obtém os dados do formulário do contexto.
  
    let sal = calculaSalario() - calcDescINSS() - 189.59 * formData.dependentes
  
    if (sal !== 0) {
      let irrf = 0
  
      if (sal > 2112.00) {
        if (sal < 2826.66) {
          irrf += sal * 0.075 - 158.40
        } else if (sal < 3751.06) {
          irrf += sal * 0.15 - 370.40
        } else if (sal <= 4664.68) {
          irrf += sal * 0.225 - 651.73
        } else {
          irrf += sal * 0.275 - 884.96
        }
      }
  
      return irrf // Retorna o valor do desconto do IRRF calculado.
    } else {
      return 0 // Retorna 0 se o valor do salário for igual a 0.
    }
}
  
  // Função para calcular o desconto do INSS sobre o 13º salário.
export function calcDescINSS13() {
    let sal = calc13Prop() + calc13Indeni()
  
    if (sal !== 0) {
      let inss = 0
  
      if (sal > 1320.00) {
        if (sal < 2571.30) {
          inss += sal * 0.09 - 19.80
        } else if (sal < 3856.95) {
          inss += sal * 0.12 - 96.94
        } else if (sal <= 7507.49) {
          inss += sal * 0.14 - 174.08
        } else {
          inss += 876.95
        }
      } else {
        inss += sal * 0.075
      }
  
      return inss // Retorna o valor do desconto do INSS sobre o 13º salário calculado.
    } else {
      return 0 // Retorna 0 se o valor do salário for igual a 0.
    }
}
  
  // Função para calcular o desconto do IRRF sobre o 13º salário.
export function calcDescIRFF13() {
    const { formData } = useFormContext() // Obtém os dados do formulário do contexto.
  
    let sal = calc13Prop() + calc13Indeni() - calcDescINSS13() - 189.59 * formData.dependentes
  
    if (sal !== 0) {
      let irrf = 0
  
      if (sal > 2112.00) {
        if (sal < 2826.66) {
          irrf += sal * 0.075 - 158.40
        } else if (sal < 3751.06) {
          irrf += sal * 0.15 - 370.40
        } else if (sal <= 4664.68) {
          irrf += sal * 0.225 - 651.73
        } else {
          irrf += sal * 0.275 - 884.96
        }
      }
  
      return irrf // Retorna o valor do desconto do IRRF sobre o 13º salário calculado.
    } else {
      return 0 // Retorna 0 se o valor do salário for igual a 0.
    }
}
  
  // Função para calcular o desconto da rescisão antecipada.
export function calcDescRescAntecip() {
    const { formData } = useFormContext() // Obtém os dados do formulário do contexto.
  
    if (formData.motivo === '5') {
      const dataRec = parseISO(formData.demissao)
      const dataPrev = parseISO(formData.final_contrato)
      const datadif = differenceInDays(dataPrev, dataRec) / 2
      const salProp = parseFloat(formData.salario.replace('R$ ', '').replace('.', '').replace(',', '.')) / 30
  
      let result = salProp * datadif
  
      return result // Retorna o valor do desconto da rescisão antecipada calculado.
    } else {
      return 0 // Retorna 0 se o motivo não for igual a '5'.
    }
}