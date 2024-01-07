import React from 'react'

export default function SelectComponent({ data, handleSeleccion, target, fromCurrency, toCurrency }) {

    const value = target === 'from' ? fromCurrency : toCurrency
    const valueLabel = target === 'from' ? 'De: ' : 'A:'
    data = data !== null ? data : []

    return (
        <div className='select__container'>
            <label
                htmlFor={target + `Currency`}
                className="select__label"
            >
                {valueLabel}
            </label>
            <select
                name="currencies"
                id={target + `Currency`}
                value={value}
                onChange={(e) => handleSeleccion(e, target)}
                className='select__currencies'
            >
                {data.map((currency: any, index: any) => {
                    return (<option key={index} value={currency.code}>
                        {currency.name}
                    </option>)
                })}
            </select>
        </div>
    )
}
