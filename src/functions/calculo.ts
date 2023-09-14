import { useFormContext } from "../contexts/FormContext"
import { addDays, addMonths, differenceInDays, differenceInMonths, differenceInYears, getDate } from 'date-fns'


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

export function calc13Prop() {
    const { formData } = useFormContext()

    if (formData.motivo != '1') {
        const dataAdms = new Date(formData.admissao)
        const dataRec = new Date(formData.demissao)
        const salProp = (parseFloat(formData.salario.replace('R$ ', '').replace('.', '').replace(',', '.')) / 12)
        let meses = 0
        if (dataAdms.getFullYear() == dataRec.getFullYear()) {
            meses += (dataRec.getMonth()+1) - dataAdms.getMonth()
            meses += (dataAdms.getDate()+1) <= 15 ? 1 : 0
            meses += (dataRec.getDate()+1) >= 15 ? 1 : 0
        } else {
            meses += (dataRec.getDate()+1) >= 15 ? 1 : 0
            meses += dataRec.getMonth()
        }
        var result = meses * salProp

        return (result)
    } else {
        return (0)
    }
}

//CALCULA DIAS DE AVISO PREVIO INDENIZADO
export function calcDiasAvsPrev() {
    const { formData } = useFormContext()
    
    if (formData.aviso == true) {
        const dataRec = new Date(formData.demissao)
        const dataAdm = new Date(formData.admissao);
        const dif = (differenceInYears(dataRec, dataAdm) * 3)
        let dias = 30

        if (dif > 60) {
            dias += 90
        } else {
            dias += dif
        }
        return (dias)
    } else {
        return (0)
    }
}

//CALCULA DATA PROJETADA AVISO PREVIO
export function calcDataProje() {
    const { formData } = useFormContext()

    const dataRec = new Date(formData.demissao)
    return (addDays(dataRec, calcDiasAvsPrev()))    //adiciona à data de rescisao a projeção do aviso em dias
}

//CALCULA DATA INICIO ULTIMO PERIODO AQUISITIVO DE FERIAS
export function calcDataUltPerFer() {
    const { formData } = useFormContext()

    const dataAdm = new Date(formData.admissao)
    const dataRec = new Date(formData.demissao)
    const data = new Date(dataRec.getFullYear(), dataAdm.getMonth(), dataAdm.getDate())

    if (data > dataRec) {
        return (new Date((dataRec.getFullYear() - 1), dataAdm.getMonth(), dataAdm.getDate()))
    } else {
        return (new Date(dataRec.getFullYear(), dataAdm.getMonth(), dataAdm.getDate()))
    }
}

//calcula valor do aviso previo
export function calculaAvsPrev() {
    const { formData } = useFormContext()

    const salario = parseFloat(formData.salario.replace('R$ ', '').replace('.', '').replace(',', '.'))
    if (formData.motivo == '0' && formData.aviso == true) {
        return ((salario / 30) * calcDiasAvsPrev())
    } else {
        return (0)
    }
}

export function calcSalFamilia() {
    const { formData } = useFormContext()

    let calAvs = calculaAvsPrev() == 0 ? 0 : calculaAvsPrev()
    if (calculaSalario() + calAvs < 1425.56) {
        let salFam = formData.dependentes * 48.62
        if(salFam == 0){
            return (0)
        }else{
            return salFam
        }
    } else {
        return (0)
    }
}

//calcula 13 salario indenizado
export function calc13Indeni() {
    const { formData } = useFormContext()

    if (formData.motivo == '0' && formData.aviso == true) {
        const dataAdms = new Date(formData.admissao)
        const dataRec = calcDataProje()
        const dataRec1 = new Date(formData.demissao)
        const salProp = (parseFloat(formData.salario.replace('R$ ', '').replace('.', '').replace(',', '.')) / 12)
        let meses = 0
        if (dataAdms.getFullYear() == dataRec.getFullYear()) {
            meses += (dataRec.getMonth() + 1) - dataAdms.getMonth()
            meses += (dataAdms.getDate()+1) <= 15 ? 1 : 0
            meses += (dataRec.getDate()+1) >= 15 ? 1 : 0

        } else {
            const dataB = new Date(dataRec1.getFullYear(), 0, 0)
            let meses = differenceInMonths(dataRec, dataB)
            meses += (dataRec.getDate()+1) >= 15 ? 1 : 0
        }
        let result = (meses * salProp) - calc13Prop()
        return (Math.trunc(result) == 0 ? 0 : result)
    } else {
        return (0)
    }
}

//calcula ferias vencidas
export function calcFerVcd() {
    const { formData } = useFormContext()

    const salario = parseFloat(formData.salario.replace('R$ ', '').replace('.', '').replace(',', '.'))
    const dias_ferias = formData.dias_ferias

    if (formData.ferias_vencidas == true) {
            let ferVcd = (salario * dias_ferias) / 30
            return (ferVcd)
        } else {
            return (0)
    }
}

//calcula 1/3 das ferias
export function calcFerVcd1_3() {
    const { formData } = useFormContext()

    if (formData.ferias_vencidas == true) {
        let result = calcFerVcd() / 3
        return (result)
    } else {
        return (0)
    }
}

//calcula rescisão antecipada por parte do empregador
export function calcRescAntecip() {
    const { formData } = useFormContext()

    if (formData.motivo == '4') {
        const dataRec = new Date(formData.demissao)
        const dataPrev = new Date(formData.final_contrato)
        const datadif = differenceInMonths(dataPrev, dataRec)
        let sumMonths= datadif * 30

        if (dataPrev.getDate()+1 > dataRec.getDate()+1){
          sumMonths += differenceInDays(dataPrev, dataRec)
        } else if (dataPrev.getDate()+1 < dataRec.getDate()+1) {
            sumMonths += 30 - (addDays(dataRec, dataPrev.getDate()).getDate()+1)
        } else {
            sumMonths += 0
        }
        const salProp = (parseFloat(formData.salario.replace('R$ ', '').replace('.', '').replace(',', '.')) / 60)
        let result = sumMonths * salProp;
        return (result)
    } else {
        return (0)
    }
}

//calcula ferias proporcionais
export function calcferPropor() {
    const { formData } = useFormContext()

    if (formData.motivo != '1') {
        const dataRec = new Date(formData.demissao)
        const dataUltPer = calcDataUltPerFer()
        const ultSal = (parseFloat(formData.salario.replace('R$ ', '').replace('.', '').replace(',', '.')) / 12)
        let result = differenceInMonths(dataRec, dataUltPer)
        let addMonth = 0

        if (dataRec.getDate()+1 > dataUltPer.getDate()+1) {
           addMonth += differenceInDays(dataRec, dataUltPer)
        } else if (dataRec.getDate()+1 < dataUltPer.getDate()+1) {
            addMonth += 30 - (addDays(dataUltPer, dataRec.getDate()).getDate()+1)
        } else {
            addMonth += 0
        }

        if (addMonth >= 15) {
            result += 1
            let resu = result * ultSal
            return (resu == 0 || isNaN(resu) ? 0 : resu)
        } else {
            let resu = result * ultSal
            return (resu == 0 || isNaN(resu) ? 0 : resu)
        }
    } else {
        return (0)
    }
}

//calcula 1/3 das ferias proporcionais
export function calcFerPropor1_3() {
    const { formData } = useFormContext()

    if(calcferPropor() != 0){
        let result = calcferPropor() / 3
        return (Math.trunc(result) == 0 ? 0 : result)
    }else{
        return (0)
    }
}

//calcula ferias indenizadas
export function calcFerIndeni() {
    const { formData } = useFormContext()

    if (formData.motivo == '0' && formData.aviso == true) {
        const dataRec = new Date(formData.demissao)
        const dataProje = calcDataProje()
        const ultSal = (parseFloat(formData.salario.replace('R$ ', '').replace('.', '').replace(',', '.')) / 12)
        const res = Math.abs(30 - dataProje.getDate()+1) + Math.abs(30 - dataProje.getDate()+1)
        let meses = differenceInMonths(dataProje, dataRec.getMonth()+1)

        meses += res > 15 ? 1 : 0

        let result = ultSal * meses
        return (result)
    } else {
        return (0)
    }
}

//calcula 1/3 das ferias indenizadas
export function calcFerIndeni1_3() {
    const { formData } = useFormContext()

    if (calcFerIndeni() != 0) {
        let ferIndeni1_3 = calcFerIndeni() / 3
        return (ferIndeni1_3)
    } else {
        return (0)
    }
}


/*


//calcula desconto do INSS
export function calcDescINSS() {
    const { formData } = useFormContext()

    var sal = this.calculaSal();
    var resultado = 0;
    if (sal >= 1045.00) {
        resultado += 78.38;
        sal -= 1045.00
        if (sal >= 1044.6) {
            resultado += 94.01
            sal -= 1044.6
            if (sal >= 1044.8) {
                resultado += 125.38;
                sal -= 1044.8
                if (sal >= 2966.66) {
                    resultado += 415.33;
                    sal -= 1044.8
                } else {
                    resultado += sal * 0.14;
                }
            } else {
                resultado += sal * 0.12;
            }
        } else {
            resultado += sal * 0.09;
        }
    } else {
        resultado += sal * 0.075;
    }
    return resultado != '' ? resultado.toFixed(2) : '-'
}

//calcula desconto do IRFF
export function calcDescIRFF() {
    const { formData } = useFormContext()

    var sal = this.calculaSal() - parseFloat(this.calcDescINSS());
    var salDesc = sal;
    var resultado = 0;
    if (sal >= 1903.98) {
        resultado += 0;
        sal -= 1903.98
        if (sal >= 922.67) {
            resultado += 69.20
            sal -= 922.67
            if (sal >= 924.40) {
                resultado += 138.66;
                sal -= 924.40
                if (sal >= 913.63) {
                    resultado += 205.57;
                    sal -= 913.63
                    if(sal >=4622.22){
                        resultado += sal * 0.275;
                    }else{
                        resultado += sal * 0.275;
                    }
                } else {
                    resultado += sal * 0.225;
                }
            } else {
                resultado += sal * 0.15;
            }
        } else {
            resultado += sal * 0.075;
        }
    } else {
        resultado += sal * 0;
    }
    return resultado != ''  && resultado != 0 ? resultado.toFixed(2) : '-'
}

//calcula inss do 13 
export function calcDescINSS13() {
    const { formData } = useFormContext()

    var sal = this.calc13Prop();
    if(sal != '-'){
    var resultado = 0;

    if (sal >= 1045.00) {
        resultado += 78.38;
        sal -= 1045.00
        if (sal >= 1044.6) {
            resultado += 94.01
            sal -= 1044.6
            if (sal >= 1044.8) {
                resultado += 125.38;
                sal -= 1044.8
                if (sal >= 2966.66) {
                    resultado += 415.33;
                    sal -= 1044.8
                } else {
                    resultado += sal * 0.14;
                }
            } else {
                resultado += sal * 0.12;
            }
        } else {
            resultado += sal * 0.09;
        }
    } else {
        resultado += sal * 0.075;
    }
    return resultado != '' ? resultado.toFixed(2) : '-'
    }else{
        return '-';
    }

}

//calcula irff do 13 
export function calcDescIRFF13() {
    const { formData } = useFormContext()

    var sal = (parseFloat(this.calc13Prop()) + parseFloat(this.calc13Indeni() == '-'? 0 : this.calc13Indeni())) -
        parseFloat(this.calcDescINSS13());
    var salDesc = sal;
    var resultado = 0;
    if(sal != '-' && !isNaN(sal)){
    if (sal >= 1903.98) {
        resultado += 0;
        sal -= 1903.98
        if (sal >= 922.67) {
            resultado += 69.20
            sal -= 922.67
            if (sal >= 924.40) {
                resultado += 138.66;
                sal -= 924.40
                if (sal >= 913.63) {
                    resultado += 205.57;
                    sal -= 913.63
                    if(sal >=4622.22){
                        resultado += sal * 0.275;
                    }
                    else{
                        resultado += sal * 0.275;
                    }
                } else {
                    resultado += sal * 0.225;
                }
            } else {
                resultado += sal * 0.15;
            }
        } else {
            resultado += sal * 0.075;
        }
    } else {
        resultado += sal * 0;
    }
    return resultado != ''  && resultado != 0 ? resultado.toFixed(2) : '-'
    }else{
        return '-';
    }
}

//arrumar
export function calcDescAvsPrev() {
    const { formData } = useFormContext()

    if (this.calc.motResc == 'pediDemiss') {
        return parseFloat(this.calc.ultSal).toFixed(2);
    } else {
        return '-';
    }
}

export function calcDescRescAntecip() {
    const { formData } = useFormContext()

        if (this.calc.motResc == 'rescAntFunc') {
            var dataRec = moment(this.calc.dataRec);
            var dataPrev = moment(this.calc.dataPrev);
            var datadif = dataPrev.diff(dataRec, 'months');
            var sumMonths= datadif * 30;

            if(moment(this.calc.dataPrev).format('DD') > moment(this.calc.dataRec).format('DD')){

              sumMonths +=  parseInt(moment(this.calc.dataPrev).format('DD')) - parseInt(moment(this.calc.dataRec).format('DD'));

            }else if(moment(this.calc.dataPrev).format('DD') < moment(this.calc.dataRec).format('DD')){
                sumMonths += 30 - parseInt(moment(this.calc.dataRec).format('DD')) + parseInt(moment(this.calc.dataPrev).format('DD'));
            }else{
                sumMonths += 0;
            }
            var salProp = this.calc.ultSal / 60;
            var result = sumMonths * salProp;
            return result.toFixed(2);

        } else {
            return "-";
        }
}

*/