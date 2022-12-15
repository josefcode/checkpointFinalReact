import { useState } from "react"
import { createContext, useContext } from "react"

// Ciração do Contexto
const DarkContext = createContext()

// Criação do Provedor para o Contexto
export function DarkProvider(props) {

    // State que irá controlar qual Tema a aplicação está usando
    const [dark, setDark] = useState(false)

    // Função responsável por Trocar o Tema
    function changeDark() {
            setDark(!dark)
    }

    return(

        // Construção dos Elementos para utilizarmos o Contexto em nossa Aplicação, tudo o que for contido no "value" será exportado e poderá ser utilizado em Componentes que utilizarem o Hook Customizado "useTheme"
        <DarkContext.Provider value={{dark, changeDark}}>
            { props.children }
        </DarkContext.Provider>

    )

}

// Hook Personalizado que irá ser utilizado quando quisermos utilizar alguma das Funcionalidades contidas em nosso Contexto
export function useDark() {

    const context = useContext(DarkContext)

    return context

}