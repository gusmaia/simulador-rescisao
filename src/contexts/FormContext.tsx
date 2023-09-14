import React, { createContext, useContext, useState, ReactNode } from 'react'

// Interface para os dados do formulário
export interface FormData {
    admissao: string
    demissao: string
    motivo: string
    final_contrato: string
    salario: string
    aviso: boolean
    dias_aviso: number
    ferias_vencidas: boolean
    dias_ferias: string
    dependentes: number
}

// Crie o contexto
const FormContext = createContext<{
    formData: FormData
    setFormData: React.Dispatch<React.SetStateAction<FormData>>} | undefined>(undefined)

// Componente de provedor de contexto
export const FormProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [formData, setFormData] = useState<FormData>({
      admissao: '',
      demissao: '',
      motivo: '',
      final_contrato: '',
      salario: '',
      aviso: false,
      dias_aviso: 0,
      ferias_vencidas: false,
      dias_ferias: '',
      dependentes: 0,
    })

    return (
        <FormContext.Provider value={{ formData, setFormData }}>
            {children}
        </FormContext.Provider>
    );
};

// Hook personalizado para acessar o contexto
export const useFormContext = () => {
    const context = useContext(FormContext)
    if (!context) {
        throw new Error("useFormContext deve ser usado dentro de um FormProvider!");
    }
    return context
}