import { useState,useEffect } from 'react'
import image from './image/currency-logo.png'
import './App.css'
import axios from 'axios'

function App() {

  const array =["USD", "AED", "AFN", "ALL", "AMD", "ANG", "AOA", "ARS", "AUD", "AWG", "AZN", "BAM", "BBD", "BDT", "BGN", "BHD", "BIF", "BMD", "BND",  "BOB", "BRL","BSD","BTN","XAF","XCD","XDR","XOF","XPF","YER","ZAR","ZMW","ZWL","INR"]

  const [amount, setAmount] = useState(90)
  const [fromCurrency,setFromCurrency] = useState("USD")
  const [toCurrency,setToCurrency] = useState("INR")
  const [convertAmount,setConvertAmount] = useState(null)
  const [exchangeAmount,setExchangetAmount] = useState()

  useEffect(()=>{
    const GetCurrencyName = async()=>{
     try{
      const api = `https://api.exchangerate-api.com/v4/latest/${fromCurrency}`
      const res = await axios.get(api)
      const value = res.data.rates[toCurrency]
      setExchangetAmount(value)
     }
     catch(error){
      console.log("The Error is:",error)
     }
   }
   GetCurrencyName()
  },[fromCurrency,toCurrency])

  useEffect(()=>{
    if(exchangeAmount!=null){
      setConvertAmount((amount*exchangeAmount).toFixed(2))
    }
  },[amount,exchangeAmount])
  
  function HandleFromCurrency(e){
    const from_value = e.target.value
    setFromCurrency(from_value)
  }

  function HandleToCurrency(e){
    const To_value = e.target.value
    setToCurrency(To_value)
  }
  const HandleAmount = (e)=>{
    const amt = parseFloat(e.target.value)
    setAmount(amt)
    
  }
  return (
    <>
     <div className='container-fluid d-flex justify-content-center'>
     <div className=' p-4 bg-light rounded'>
      <div className='img'><img src={image} alt="" /></div>
        <div>
           <h3 className='text-uppercase text-primary fw-semibold fs-2-1 border-primary p-2 border-start-0 border-end-0  mb-3'style={{border:"2px dashed black"}}>currency converter</h3>
           <div className='mb-3'>
              <label htmlFor="amount" className='form-label text-capitalize fw-semibold text-secondary '>amount</label>
              <input type="number"  id="amount" className="form-control border-3" value={amount} onChange={HandleAmount}/>
            </div>
            <div className='mb-3'>
              <label htmlFor="from-currency" className='form-label text-secondary fw-semibold text-capitalize'>from currency</label>
              <select id="from-currency" className='form-select border-3' value={fromCurrency} onChange={HandleFromCurrency}>
               {array.map((item,index)=>(<option key={index} value={item}>{item}</option>))}
              </select>
            </div>
            <div className='mb-3'>
              <label htmlFor="o" className='form-label text-capitalize fw-semibold text-secondary'>to currency</label>
              <select name="" id="o" className='form-select border-3' value={toCurrency} onChange={HandleToCurrency}>
              {array.map((item,index)=>(<option key={index} value={item}>{item}</option>))}
              </select>
            </div>
            <div className='mt-4 border-3 border-primary p-2 text-capitalize fw-medium text-primary text-center' style={{border:"2px dashed"}}>{amount} {fromCurrency} is equal to {convertAmount} {toCurrency}</div>
        </div>
     </div>
     </div>
    </>
  )
}

export default App
