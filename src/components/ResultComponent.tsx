import { FormProvider, useFormContext } from "../contexts/FormContext"
import { calculaSalario } from "../functions/calculo"



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
                                    <td>R$ <span></span></td>
                                </tr>
                                <tr>
                                    <th scope="row">Rescisão antecipada de contrato de experiência (art. 479 CLT)</th>
                                    <td>R$ <span></span></td>
                                </tr>
                                <tr>
                                    <th scope="row">Salário família</th>
                                    <td>R$ <span></span></td>
                                </tr>
                                <tr>
                                    <th scope="row">13º salário Proporcional</th>
                                    <td>R$ <span></span></td>
                                </tr>
                                <tr>
                                    <th scope="row">13º salário indenizado</th>
                                    <td>R$ <span></span></td>
                                </tr>
                                <tr>
                                    <th scope="row">Férias vencidas</th>
                                    <td>R$ <span></span></td>
                                </tr>
                                <tr>
                                    <th scope="row">1/3 sobre férias vencidas</th>
                                    <td>R$ <span></span></td>
                                </tr>
                                <tr>
                                    <th scope="row">Férias proporcionais</th>
                                    <td>R$ <span></span></td>
                                </tr>
                                <tr>
                                    <th scope="row">1/3 Sobre férias proporcionais</th>
                                    <td>R$ <span></span></td>
                                </tr>
                                <tr>
                                    <th scope="row">Férias indenizadas</th>
                                    <td>R$ <span></span></td>
                                </tr>
                                <tr>
                                    <th scope="row">1/3 Sobre férias indenizadas</th>
                                    <td>R$ <span></span></td>
                                </tr>
                                <tr>
                                    <th scope="row">TOTAL DE VENCIMENTOS</th>
                                    <td>R$ <span></span></td>
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