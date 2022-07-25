import React, {useState, useEffect} from 'react'
import { useGlobalContext } from '../context'

export default function Conversor() {
    const [currencyToConvert, setCurrencyToConvert] = useState('BRL')
    const [moneyAmount, setMoneyAmount] = useState(0)
    const [stringFormated , setStringFormated] = useState('')
    const [result, setResult] = useState(0)

    const {currencyData, currencyOptions, baseCurrency, setBaseCurrency} = useGlobalContext()

    useEffect(() =>{
        if(currencyData){
            const AmountConverted = currencyData[currencyToConvert] * parseInt(moneyAmount)
            setResult(AmountConverted.toFixed(2))
            setStringFormated(`1 ${currencyOptions[0]} = ${currencyData[currencyToConvert]} ${currencyToConvert}`)

        }

        
    },[moneyAmount, currencyToConvert, baseCurrency])


    return (
        <main className="main">
            <div className="select-wrapper">
                <select name="" id="" onChange={(e) => setBaseCurrency(e.target.value)} >
                    {currencyOptions?.map((item,index) =>(

                        <option key={index} value={item}>{item}</option>

                    ))}


                </select>

                <select name="" id="" onChange={(e) => setCurrencyToConvert(e.target.value)}>
                    <option value={currencyToConvert}>{currencyToConvert}</option>

                    {currencyOptions?.map((item,index) =>(

                        <option key={index} value={item}>{item}</option>

                    ))}
                </select>

            </div>

            <div className='result-wrapper'>
                <input className='input-number' type="number" min={0} value={moneyAmount} 
                onInput={(e) => setMoneyAmount(e.target.value)}/>

                <div className="show-result">
                    {result}
                </div>
            </div>

            <span className="currency-comparison">
                 {stringFormated}
              </span>

        </main>
    )
}
