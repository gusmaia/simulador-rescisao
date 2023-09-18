import { useNavigate } from "react-router-dom"
import { FormProvider } from "../contexts/FormContext"
import { calculaSalario, calc13Prop, calculaAvsPrev, calcRescAntecip, calcSalFamilia, calc13Indeni, calcFerVcd, calcFerVcd1_3, calcferPropor, calcFerPropor1_3, calcFerIndeni, calcFerIndeni1_3, calcDescINSS, calcDescIRFF, calcDescINSS13, calcDescIRFF13, calcDescAvsPrev, calcDescRescAntecip } from "../functions/calculo"



function ResultComponent() {
    const navigate = useNavigate() // Importa o hook de navegação do React Router.
  
    // Função para redirecionar para a página inicial.
    const redirect = () => {
      navigate('/') // Navega para a rota '/'
      navigate(0)   // Refresh na pagina.
    }
  
    // Função para calcular o valor total dos proventos.
    const proventos = () => {
      // Aqui, você chama várias funções de cálculo e soma seus resultados.
      const resultado =
        calculaSalario() +
        calc13Prop() +
        calculaAvsPrev() +
        calcRescAntecip() +
        calcSalFamilia() +
        calc13Indeni() +
        calcFerVcd() +
        calcFerVcd1_3() +
        calcferPropor() +
        calcFerIndeni() +
        calcFerIndeni1_3()
  
      return resultado // Retorna o valor total dos proventos.
    }
  
    // Função para calcular o valor total dos descontos.
    const descontos = () => {
      // Aqui, você chama várias funções de cálculo e soma seus resultados.
      const resultado =
        calcDescAvsPrev() +
        calcDescINSS() +
        calcDescINSS13() +
        calcDescIRFF() +
        calcDescIRFF13() +
        calcDescRescAntecip()
  
      return resultado // Retorna o valor total dos descontos.
    }

    return (
        <>
            <FormProvider>
                <div className="bg-blue-50 min-h-screen flex flex-col items-center justify-center">
                    <div className="bg-white p-8 md:mt-6 rounded-lg shadow-md w-full md:w-1/2">
                        <div>
                            <h1 className="text-4xl font-black text-blue-700 mb-4 text-center">Resultado</h1>
                            <table className="w-full border-collapse border border-blue-300">
                                <thead>
                                    <tr className="bg-blue-100">
                                        <th scope="col" className="text-xl p-2 border border-blue-300">Proventos</th>
                                        <th scope="col" className="text-xl p-2 border border-blue-300">Valores</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <th scope="row" className="font-medium p-2 border border-blue-300">Saldo do Salario</th>
                                        <td className="p-2 border border-blue-300">{calculaSalario().toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</td>
                                    </tr>
                                    <tr>
                                        <th scope="row" className="font-medium p-2 border border-blue-300">Aviso prévio indenizado</th>
                                        <td className="p-2 border border-blue-300"><span>{calculaAvsPrev().toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</span></td>
                                    </tr>
                                    <tr>
                                        <th scope="row" className="font-medium p-2 border border-blue-300">Rescisão antecipada de contrato de experiência (art. 479 CLT)</th>
                                        <td className="p-2 border border-blue-300"><span>{calcRescAntecip().toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</span></td>
                                    </tr>
                                    <tr>
                                        <th scope="row" className="font-medium p-2 border border-blue-300">Salário família</th>
                                        <td className="p-2 border border-blue-300"><span>{calcSalFamilia().toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</span></td>
                                    </tr>
                                    <tr>
                                        <th scope="row" className="font-medium p-2 border border-blue-300">13º salário Proporcional</th>
                                        <td className="p-2 border border-blue-300"><span>{calc13Prop().toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</span></td>
                                    </tr>
                                    <tr>
                                        <th scope="row" className="font-medium p-2 border border-blue-300">13º salário indenizado</th>
                                        <td className="p-2 border border-blue-300"><span>{calc13Indeni().toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</span></td>
                                    </tr>
                                    <tr>
                                        <th scope="row" className="font-medium p-2 border border-blue-300">Férias vencidas</th>
                                        <td className="p-2 border border-blue-300"><span>{calcFerVcd().toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</span></td>
                                    </tr>
                                    <tr>
                                        <th scope="row" className="font-medium p-2 border border-blue-300">1/3 sobre férias vencidas</th>
                                        <td className="p-2 border border-blue-300"><span>{calcFerVcd1_3().toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</span></td>
                                    </tr>
                                    <tr>
                                        <th scope="row" className="font-medium p-2 border border-blue-300">Férias proporcionais</th>
                                        <td className="p-2 border border-blue-300"><span>{calcferPropor().toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</span></td>
                                    </tr>
                                    <tr>
                                        <th scope="row" className="font-medium p-2 border border-blue-300">1/3 Sobre férias proporcionais</th>
                                        <td className="p-2 border border-blue-300"><span>{calcFerPropor1_3().toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</span></td>
                                    </tr>
                                    <tr>
                                        <th scope="row" className="font-medium p-2 border border-blue-300">Férias indenizadas</th>
                                        <td className="p-2 border border-blue-300"><span>{calcFerIndeni().toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</span></td>
                                    </tr>
                                    <tr>
                                        <th scope="row" className="font-medium p-2 border border-blue-300">1/3 Sobre férias indenizadas</th>
                                        <td className="p-2 border border-blue-300"><span>{calcFerIndeni1_3().toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</span></td>
                                    </tr>
                                    <tr>
                                        <th scope="row" className="text-xl p-2 border border-blue-300">Total de Proventos</th>
                                        <td className="font-semibold p-2 border border-blue-300"><span>{proventos().toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</span></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <div className="mt-8">
                            <table className="w-full border-collapse border border-blue-300">
                                <thead>
                                    <tr className="bg-blue-100">
                                        <th scope="col" className="text-xl p-2 border border-blue-300">Descontos</th>
                                        <th scope="col" className="text-xl p-2 border border-blue-300">Valores</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <th scope="row" className="font-medium p-2 border border-blue-300">INSS</th>
                                        <td className="p-2 border border-blue-300"><span>{calcDescINSS().toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</span></td>
                                    </tr>
                                    <tr>
                                        <th scope="row" className="font-medium p-2 border border-blue-300">IRRF</th>
                                        <td className="p-2 border border-blue-300"><span>{calcDescIRFF().toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</span></td>
                                    </tr>
                                    <tr>
                                        <th scope="row" className="font-medium p-2 border border-blue-300">INSS sobre 13º salário</th>
                                        <td className="p-2 border border-blue-300"><span>{calcDescINSS13().toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</span></td>
                                    </tr>
                                    <tr>
                                        <th scope="row" className="font-medium p-2 border border-blue-300">IRRF sobre 13º salário</th>
                                        <td className="p-2 border border-blue-300"><span>{calcDescIRFF13().toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</span></td>
                                    </tr>
                                    <tr>
                                        <th scope="row" className="font-medium p-2 border border-blue-300">Aviso prévio</th>
                                        <td className="p-2 border border-blue-300"><span>{calcDescAvsPrev().toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</span></td>
                                    </tr>
                                    <tr>
                                        <th scope="row" className="font-medium p-2 border border-blue-300">Rescisão antecipada de contrato de experiência (art. 479 CLT)</th>
                                        <td className="p-2 border border-blue-300"><span>{calcDescRescAntecip().toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</span></td>
                                    </tr>
                                    <tr>
                                        <th scope="row" className="text-xl p-2 border border-blue-300">Total de Descontos</th>
                                        <td className="font-semibold p-2 border border-blue-300"><span>{descontos().toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</span></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <div className="mt-8">
                            <table className="w-full border-collapse border border-blue-300">
                                <thead>
                                    <tr className="bg-blue-100">
                                        <th scope="col" className="text-xl p-2 border border-blue-300"><b>LÍQUIDO RESCISÃO</b></th>
                                        <th scope="col" className="text-xl p-2 border border-blue-300"><span>{(proventos() - descontos()).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</span></th>
                                    </tr>
                                </thead>
                            </table>
                        </div>

                        <div className="mt-8 flex justify-between">
                            <button onClick={redirect} className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700 focus:outline-none focus:bg-blue-600">Voltar</button>
                            <button onClick={window.print} className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700 focus:outline-none focus:bg-blue-600">Imprimir</button>
                        </div>
                    </div>
                    <footer className="m-6">
                        <pre>
                            Desenvolvido por:    <a className='underline text-blue-500 hover:text-blue-700 focus:outline-none focus:text-blue-600' target='blank' href="https://github.com/gusmaia">gusmaia</a>
                        </pre>
                    </footer>
                </div>
            </FormProvider>
        </>
    )
}

export default ResultComponent