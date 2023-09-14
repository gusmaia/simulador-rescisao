import { FormProvider, useFormContext } from "../contexts/FormContext"
import { calculaSalario, calc13Prop, calcDiasAvsPrev, calcDataProje, calculaAvsPrev, calcRescAntecip, calcSalFamilia, calc13Indeni, calcFerVcd, calcFerVcd1_3, calcferPropor, calcFerPropor1_3, calcFerIndeni } from "../functions/calculo"



function ResultComponent() {
    const { formData } = useFormContext()
    console.log()

    return (
        <>
            <FormProvider>
                <div>
                    <div>
                        <table>
                            <thead>
                                <tr>
                                    <th scope="col">Proventos</th>
                                    <th scope="col">Valores</th>
                                </tr>
                            </thead>

                            <tbody>
                                <tr>
                                    <th scope="row">Saldo do Salario</th>
                                    <td>{calculaSalario().toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</td>
                                </tr>
                                <tr>
                                    <th scope="row">Aviso prévio indenizado</th>
                                    <td><span>{calculaAvsPrev().toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</span></td>
                                </tr>
                                <tr>
                                    <th scope="row">Rescisão antecipada de contrato de experiência (art. 479 CLT)</th>
                                    <td><span>{calcRescAntecip().toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</span></td>
                                </tr>
                                <tr>
                                    <th scope="row">Salário família</th>
                                    <td><span>{calcSalFamilia().toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</span></td>
                                </tr>
                                <tr>
                                    <th scope="row">13º salário Proporcional</th>
                                    <td><span>{calc13Prop().toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</span></td>
                                </tr>
                                <tr>
                                    <th scope="row">13º salário indenizado</th>
                                    <td><span>{calc13Indeni().toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</span></td>
                                </tr>
                                <tr>
                                    <th scope="row">Férias vencidas</th>
                                    <td><span>{calcFerVcd().toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</span></td>
                                </tr>
                                <tr>
                                    <th scope="row">1/3 sobre férias vencidas</th>
                                    <td><span>{calcFerVcd1_3().toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</span></td>
                                </tr>
                                <tr>
                                    <th scope="row">Férias proporcionais</th>
                                    <td><span>{calcferPropor().toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</span></td>
                                </tr>
                                <tr>
                                    <th scope="row">1/3 Sobre férias proporcionais</th>
                                    <td><span>{calcFerPropor1_3().toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</span></td>
                                </tr>
                                <tr>
                                    <th scope="row">Férias indenizadas</th>
                                    <td><span>{calcFerIndeni().toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</span></td>
                                </tr>
                                <tr>
                                    <th scope="row">1/3 Sobre férias indenizadas</th>
                                    <td><span>{calcFerVcd1_3().toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</span></td>
                                </tr>
                                <tr>
                                    <th scope="row">TOTAL DE VENCIMENTOS</th>
                                    <td><span></span></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <div>
                        <table>
                            <thead>
                                <tr>
                                    <th scope="col">Descontos</th>
                                    <th scope="col">Valores</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <th scope="row">INSS</th>
                                    <td>R$ <span></span></td>
                                </tr>
                                <tr>
                                    <th scope="row">IRRF</th>
                                    <td>R$ <span></span></td>
                                </tr>
                                <tr>
                                    <th scope="row">INSS sobre 13º salário</th>
                                    <td>R$ <span></span></td>
                                </tr>
                                <tr>
                                    <th scope="row">IRRF sobre 13º salário</th>
                                    <td>R$ <span></span></td>
                                </tr>
                                <tr>
                                    <th scope="row">Aviso prévio</th>
                                    <td>R$ <span></span></td>
                                </tr>
                                <tr>
                                    <th scope="row">Rescisão antecipada de contrato de experiência (art. 479 CLT)</th>
                                    <td>R$ <span></span></td>
                                </tr>
                                <tr>
                                    <th scope="row">TOTAL DE DESCONTOS</th>
                                    <td>R$ <span></span></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div>
                        <table>
                            <thead>
                                <tr>
                                    <th scope="col"><b>LÍQUIDO RESCISÃO</b></th>
                                    <th scope="col">R$ <span></span></th>
                                </tr>
                            </thead>
                        </table>
                    </div>
                </div>
            </FormProvider>
        </>
    )
}

export default ResultComponent