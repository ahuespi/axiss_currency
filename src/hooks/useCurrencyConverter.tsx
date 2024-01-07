// Archivo: useCurrencyConverter.js
import { useEffect, useState } from "react";

const useCurrencyConverter = () => {
    const [data, setData] = useState(null);
    const [amount, setAmount] = useState(1);
    const [fromCurrency, setFromCurrency] = useState("USD");
    const [toCurrency, setToCurrency] = useState("EUR");
    const [priceToCurrency, setPriceToCurrency] = useState<string | undefined>('');
    const [amountConverted, setAmountConverted] = useState<string | undefined>('');
    const [debouncedAmount, setDebouncedAmount] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const [isErrorMessage, setIsErrorMessage] = useState('');


    const getAllCurrencies = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_BASE_URL}/currencies`, {
                headers: {
                    apiKey: import.meta.env.VITE_API_KEY,
                },
            })
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const { data } = await response.json();
            const filterData: any = Object.keys(data).map((key) => data[key]).filter(
                (e) => e.code === "EUR" || e.code === "USD" || e.code === "BRL"
            );
            setData(filterData);
            setIsLoading(true)
        } catch (error) {
            setIsError(true)
            setIsErrorMessage('En este momento no es posible realizar esta operación: Intente mas tarde.')
            console.error("Error en getAllCurrencies:", error);
        }
    }

    const handleSeleccion = (event, target) => {
        target === "from"
            ? setFromCurrency(event.target.value)
            : setToCurrency(event.target.value);
    };

    const handleConverterAmounts = async (amount, fromCurrency, toCurrency) => {
        try {
            const response = await fetch(
                `${import.meta.env.VITE_BASE_URL}/latest?base_currency=${fromCurrency}&currencies=${toCurrency}`,
                {
                    headers: {
                        apiKey: import.meta.env.VITE_API_KEY,
                    },
                }
            );

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const { data } = await response.json();
            const toCurrencyValue: any[] = Object.values(data);
            const converter = amount * toCurrencyValue[0];
            const price = 1 * toCurrencyValue[0]
            setPriceToCurrency(price.toFixed(2))
            setAmountConverted(converter.toFixed(2));
        } catch (error) {
            setIsError(true)
            setIsErrorMessage('En este momento no es posible realizar esta operación: Intente mas tarde.')

            console.error("Error en la conversión:", error);
        }
    };

    const handleSwitch = () => {
        setFromCurrency(toCurrency);
        setToCurrency(fromCurrency);
        handleConverterAmounts(amount, toCurrency, fromCurrency);
    };

    const handleAmount = (e) => {
        setAmount(e.target.value);
    };



    useEffect(() => {
        if (!isLoading) {
            getAllCurrencies()
        }
    }, [isLoading])


    useEffect(() => {
        const timerId = setTimeout(() => {
            setDebouncedAmount(amount);
        }, 500); // debouncing para evitar multiples llamadas a la api.

        return () => {
            clearTimeout(timerId);
        };
    }, [amount]);

    useEffect(() => {
        handleConverterAmounts(debouncedAmount, fromCurrency, toCurrency);
    }, [debouncedAmount, fromCurrency, toCurrency]);

    return {
        amount,
        priceToCurrency,
        isError,
        isErrorMessage,
        data,
        fromCurrency,
        toCurrency,
        amountConverted,
        handleSeleccion,
        handleSwitch,
        handleAmount

    }
};

export default useCurrencyConverter;
