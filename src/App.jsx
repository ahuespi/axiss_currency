/* eslint-disable react/react-in-jsx-scope */
import "./App.css";
import SelectComponent from "./Components/SelectComponent";
import useCurrencyConverter from "./hooks/useCurrencyConverter";
import SwapIcon from "./Components/SwitchIcon";

function App() {
  const {
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
    handleAmount,
  } = useCurrencyConverter();

  return (
    <>
      <h1 className="title">Conversión de monedas</h1>
      <div className="main__container">
        <div className="main__content">
          <div>
            <div className="currency-converter__GridContainer">
              <label htmlFor="amount" className="currency-converter__label">
                Monto
              </label>
              <input
                type="number"
                inputMode="decimal"
                autoComplete="off"
                placeholder="1.00"
                id="amount"
                className="amount__input"
                onChange={handleAmount}
              />

              <SelectComponent
                data={data}
                handleSeleccion={handleSeleccion}
                target="from"
                toCurrency={toCurrency}
                fromCurrency={fromCurrency}
              />

              <SwapIcon handleSwitch={handleSwitch} />

              <SelectComponent
                data={data}
                handleSeleccion={handleSeleccion}
                target="to"
                toCurrency={toCurrency}
                fromCurrency={fromCurrency}
              />

              <div className="information__container">
                {!isError ? (
                  <>
                    <p className="from__currency">
                      {amount} {fromCurrency} =
                    </p>
                    <p className="to__currency">
                      {amountConverted || "Cargando..."} {toCurrency}
                    </p>
                    <p className="price__toCurrency">
                      <span>Cotización:</span> 1 {fromCurrency} ={" "}
                      {priceToCurrency || "Cargando..."} {toCurrency}
                    </p>
                  </>
                ) : (
                  <>
                    <p className="error__message">{isErrorMessage}</p>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
