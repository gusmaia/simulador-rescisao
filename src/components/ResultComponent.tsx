import { useNavigate } from "react-router-dom"
import { FormProvider } from "../contexts/FormContext"
import { calculaSalario, calc13Prop, calculaAvsPrev, calcRescAntecip, calcSalFamilia, calc13Indeni, calcFerVcd, calcFerVcd1_3, calcferPropor, calcFerPropor1_3, calcFerIndeni, calcFerIndeni1_3, calcDescINSS, calcDescIRFF, calcDescINSS13, calcDescIRFF13, calcDescAvsPrev, calcDescRescAntecip } from "../functions/calculo"



function ResultComponent() {
    const navigate = useNavigate()

    const redirect = () => {
        navigate('/')
        navigate(0)
    }

    const proventos = () => {
        const resultado = calculaSalario() + calc13Prop() + calculaAvsPrev() + calcRescAntecip() + calcSalFamilia() + calc13Indeni() + calcFerVcd() + calcFerVcd1_3() + calcferPropor() + calcFerIndeni() + calcFerIndeni1_3()
        return (resultado)
    }

    const descontos = () => {
        const resultado = calcDescAvsPrev() + calcDescINSS() + calcDescINSS13() + calcDescIRFF() + calcDescIRFF13() + calcDescRescAntecip()
        return (resultado)
    }
    return (
        <>
            <FormProvider>
                <div className="bg-blue-50 min-h-screen flex items-center justify-center">
                    <div className="bg-white p-8 rounded-lg shadow-md sm:w-96 md:w-1/2">
                        <div>
                            <h1 className="text-2xl font-semibold text-blue-700 mb-4">Resultado</h1>
                            <table className="w-full border-collapse border border-blue-300">
                                <thead>
                                    <tr className="bg-blue-100">
                                        <th scope="col" className="p-2 border border-blue-300">Proventos</th>
                                        <th scope="col" className="p-2 border border-blue-300">Valores</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <th scope="row" className="p-2 border border-blue-300">Saldo do Salario</th>
                                        <td className="p-2 border border-blue-300">{calculaSalario().toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</td>
                                    </tr>
                                    <tr>
                                        <th scope="row" className="p-2 border border-blue-300">Aviso prévio indenizado</th>
                                        <td className="p-2 border border-blue-300"><span>{calculaAvsPrev().toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</span></td>
                                    </tr>
                                    <tr>
                                        <th scope="row" className="p-2 border border-blue-300">Rescisão antecipada de contrato de experiência (art. 479 CLT)</th>
                                        <td className="p-2 border border-blue-300"><span>{calcRescAntecip().toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</span></td>
                                    </tr>
                                    <tr>
                                        <th scope="row" className="p-2 border border-blue-300">Salário família</th>
                                        <td className="p-2 border border-blue-300"><span>{calcSalFamilia().toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</span></td>
                                    </tr>
                                    <tr>
                                        <th scope="row" className="p-2 border border-blue-300">13º salário Proporcional</th>
                                        <td className="p-2 border border-blue-300"><span>{calc13Prop().toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</span></td>
                                    </tr>
                                    <tr>
                                        <th scope="row" className="p-2 border border-blue-300">13º salário indenizado</th>
                                        <td className="p-2 border border-blue-300"><span>{calc13Indeni().toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</span></td>
                                    </tr>
                                    <tr>
                                        <th scope="row" className="p-2 border border-blue-300">Férias vencidas</th>
                                        <td className="p-2 border border-blue-300"><span>{calcFerVcd().toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</span></td>
                                    </tr>
                                    <tr>
                                        <th scope="row" className="p-2 border border-blue-300">1/3 sobre férias vencidas</th>
                                        <td className="p-2 border border-blue-300"><span>{calcFerVcd1_3().toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</span></td>
                                    </tr>
                                    <tr>
                                        <th scope="row" className="p-2 border border-blue-300">Férias proporcionais</th>
                                        <td className="p-2 border border-blue-300"><span>{calcferPropor().toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</span></td>
                                    </tr>
                                    <tr>
                                        <th scope="row" className="p-2 border border-blue-300">1/3 Sobre férias proporcionais</th>
                                        <td className="p-2 border border-blue-300"><span>{calcFerPropor1_3().toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</span></td>
                                    </tr>
                                    <tr>
                                        <th scope="row" className="p-2 border border-blue-300">Férias indenizadas</th>
                                        <td className="p-2 border border-blue-300"><span>{calcFerIndeni().toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</span></td>
                                    </tr>
                                    <tr>
                                        <th scope="row" className="p-2 border border-blue-300">1/3 Sobre férias indenizadas</th>
                                        <td className="p-2 border border-blue-300"><span>{calcFerIndeni1_3().toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</span></td>
                                    </tr>
                                    <tr>
                                        <th scope="row" className="p-2 border border-blue-300">TOTAL DE PROVENTOS</th>
                                        <td className="p-2 border border-blue-300"><span>{proventos().toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</span></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <div className="mt-8">
                            <table className="w-full border-collapse border border-blue-300">
                                <thead>
                                    <tr className="bg-blue-100">
                                        <th scope="col" className="p-2 border border-blue-300">Descontos</th>
                                        <th scope="col" className="p-2 border border-blue-300">Valores</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <th scope="row" className="p-2 border border-blue-300">INSS</th>
                                        <td className="p-2 border border-blue-300"><span>{calcDescINSS().toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</span></td>
                                    </tr>
                                    <tr>
                                        <th scope="row" className="p-2 border border-blue-300">IRRF</th>
                                        <td className="p-2 border border-blue-300"><span>{calcDescIRFF().toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</span></td>
                                    </tr>
                                    <tr>
                                        <th scope="row" className="p-2 border border-blue-300">INSS sobre 13º salário</th>
                                        <td className="p-2 border border-blue-300"><span>{calcDescINSS13().toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</span></td>
                                    </tr>
                                    <tr>
                                        <th scope="row" className="p-2 border border-blue-300">IRRF sobre 13º salário</th>
                                        <td className="p-2 border border-blue-300"><span>{calcDescIRFF13().toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</span></td>
                                    </tr>
                                    <tr>
                                        <th scope="row" className="p-2 border border-blue-300">Aviso prévio</th>
                                        <td className="p-2 border border-blue-300"><span>{calcDescAvsPrev().toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</span></td>
                                    </tr>
                                    <tr>
                                        <th scope="row" className="p-2 border border-blue-300">Rescisão antecipada de contrato de experiência (art. 479 CLT)</th>
                                        <td className="p-2 border border-blue-300"><span>{calcDescRescAntecip().toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</span></td>
                                    </tr>
                                    <tr>
                                        <th scope="row" className="p-2 border border-blue-300">TOTAL DE DESCONTOS</th>
                                        <td className="p-2 border border-blue-300"><span>{descontos().toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</span></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <div className="mt-8">
                            <table className="w-full border-collapse border border-blue-300">
                                <thead>
                                    <tr className="bg-blue-100">
                                        <th scope="col" className="p-2 border border-blue-300"><b>LÍQUIDO RESCISÃO</b></th>
                                        <th scope="col" className="p-2 border border-blue-300"><span>{(proventos() - descontos()).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</span></th>
                                    </tr>
                                </thead>
                            </table>
                        </div>

                        <div className="mt-8 flex justify-between">
                            <button onClick={redirect} className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-600">Voltar</button>
                            <button onClick={window.print} className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-600">Imprimir</button>
                        </div>
                    </div>
                </div>
            </FormProvider>
        </>
    )
}

export default ResultComponent