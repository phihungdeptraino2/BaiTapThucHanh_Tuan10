"use client";

import { useSelector, useDispatch } from "react-redux";
import {
  setCalculatorType,
  updateBmiHeight,
  updateBmiWeight,
  calculateBmi,
  updateTaxIncome,
  updateTaxRate,
  calculateTax,
  resetCalculator,
} from "../../store/slices/calculatorSlice";
import "./Calculator.css";

function Calculator() {
  const dispatch = useDispatch();
  const { calculatorType, bmi, tax } = useSelector((state) => state.calculator);

  const handleCalculate = () => {
    if (calculatorType === "bmi") {
      dispatch(calculateBmi());
    } else {
      dispatch(calculateTax());
    }
  };

  const handleReset = () => {
    dispatch(resetCalculator());
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(value);
  };

  return (
    <div className="calculator">
      <div className="calculator-tabs">
        <button
          className={`tab-button ${calculatorType === "bmi" ? "active" : ""}`}
          onClick={() => dispatch(setCalculatorType("bmi"))}
        >
          Tính BMI
        </button>
        <button
          className={`tab-button ${calculatorType === "tax" ? "active" : ""}`}
          onClick={() => dispatch(setCalculatorType("tax"))}
        >
          Tính Thuế
        </button>
      </div>

      <div className="calculator-content">
        {calculatorType === "bmi" ? (
          <div className="bmi-calculator">
            <div className="form-group">
              <label htmlFor="height">Chiều cao (cm)</label>
              <input
                type="number"
                id="height"
                value={bmi.height}
                onChange={(e) => dispatch(updateBmiHeight(e.target.value))}
                min="1"
              />
            </div>

            <div className="form-group">
              <label htmlFor="weight">Cân nặng (kg)</label>
              <input
                type="number"
                id="weight"
                value={bmi.weight}
                onChange={(e) => dispatch(updateBmiWeight(e.target.value))}
                min="1"
              />
            </div>

            {bmi.result !== null && (
              <div className="result-container">
                <div className="result-value">
                  <span>Chỉ số BMI:</span>
                  <strong>{bmi.result}</strong>
                </div>
                <div
                  className={`result-category ${bmi.category
                    .toLowerCase()
                    .replace(/\s+/g, "-")}`}
                >
                  {bmi.category}
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="tax-calculator">
            <div className="form-group">
              <label htmlFor="income">Thu nhập (VND)</label>
              <input
                type="number"
                id="income"
                value={tax.income}
                onChange={(e) => dispatch(updateTaxIncome(e.target.value))}
                min="0"
                step="100000"
              />
            </div>

            <div className="form-group">
              <label htmlFor="taxRate">Thuế suất (%)</label>
              <input
                type="number"
                id="taxRate"
                value={tax.taxRate}
                onChange={(e) => dispatch(updateTaxRate(e.target.value))}
                min="0"
                max="100"
                step="0.1"
              />
            </div>

            {tax.result !== null && (
              <div className="result-container">
                <div className="result-value">
                  <span>Tiền thuế:</span>
                  <strong>{formatCurrency(tax.result)}</strong>
                </div>
                <div className="result-value">
                  <span>Thu nhập sau thuế:</span>
                  <strong>{formatCurrency(tax.income - tax.result)}</strong>
                </div>
              </div>
            )}
          </div>
        )}

        <div className="calculator-actions">
          <button className="calculate-button" onClick={handleCalculate}>
            Tính toán
          </button>
          <button className="reset-button" onClick={handleReset}>
            Đặt lại
          </button>
        </div>
      </div>
    </div>
  );
}

export default Calculator;
