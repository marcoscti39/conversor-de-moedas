import React,{useContext, useState,useEffect} from 'react'


const GlobalContext = React.createContext()

export const useGlobalContext = () =>{
    return useContext(GlobalContext)
}
export default function ContextProvider({children}) {
    const [baseCurrency, setBaseCurrency] = useState('USD')
    const [currencyData, setCurrencyData] = useState(null)
    const [currencyOptions, setCurrencyOptions] = useState(null)
    const url = `https://v6.exchangerate-api.com/v6/797b1c40afd4fc618a49f677/latest/${baseCurrency}`
    useEffect(() =>{
        const getCurrency = async () =>{
            try{
                const response = await fetch(url)
                const data = await response.json()
                const {conversion_rates} = data
                setCurrencyData(conversion_rates)
                setCurrencyOptions(Object.keys(conversion_rates))

            }catch(error){
                console.log(error)
            }
            
        }
        getCurrency()
    },[baseCurrency])
    return (
       <GlobalContext.Provider value=
       {{
           baseCurrency,
           setBaseCurrency,
           currencyData,
           currencyOptions
       }} >
           {children}
       </GlobalContext.Provider>
    )
}
