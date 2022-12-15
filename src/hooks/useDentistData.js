import { useState, useEffect } from "react"
import { createContext, useContext } from "react"

// Ciração do Contexto
const DentistContext = createContext()

// Criação do Provedor para o Contexto
export function DentistProvider(props) {

    // State que irá controlar qual Tema a aplicação está usando
    const [dentists, setDentist] = useState([])

    const url = 'http://dhodonto.ctdprojetos.com.br/dentista'
    // Função responsável por Trocar o Tema
    useEffect(() => {
        async function fetchDentists(){
    
           const response = await fetch(url)
           if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
           const data = await response.json()
          setDentist(data)
        }
        fetchDentists()
    
      }, []
      )

    return(

        // Construção dos Elementos para utilizarmos o Contexto em nossa Aplicação, tudo o que for contido no "value" será exportado e poderá ser utilizado em Componentes que utilizarem o Hook Customizado "useTheme"
        <DentistContext.Provider value={{dentists, setDentist}}>
            { props.children }
        </DentistContext.Provider>

    )

}

// Hook Personalizado que irá ser utilizado quando quisermos utilizar alguma das Funcionalidades contidas em nosso Contexto
export function useDentistData() {

    const context = useContext(DentistContext)

    return context

}