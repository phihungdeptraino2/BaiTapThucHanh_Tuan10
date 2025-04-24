import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  calculatorType: "bmi", // 'bmi' or 'tax'
  bmi: {
    height: 170, // cm
    weight: 70, // kg
    result: null,
    category: "",
  },
  tax: {
    income: 10000000, // VND
    taxRate: 10, // percentage
    result: null,
  },
};

export const calculatorSlice = createSlice({
  name: "calculator",
  initialState,
  reducers: {
    setCalculatorType: (state, action) => {
      state.calculatorType = action.payload;
    },
    updateBmiHeight: (state, action) => {
      state.bmi.height = Number(action.payload);
    },
    updateBmiWeight: (state, action) => {
      state.bmi.weight = Number(action.payload);
    },
    calculateBmi: (state) => {
      const heightInMeters = state.bmi.height / 100;
      const bmiValue = state.bmi.weight / (heightInMeters * heightInMeters);
      state.bmi.result = Math.round(bmiValue * 10) / 10; // Round to 1 decimal place

      // Determine BMI category
      if (bmiValue < 18.5) {
        state.bmi.category = "Thiếu cân";
      } else if (bmiValue < 25) {
        state.bmi.category = "Bình thường";
      } else if (bmiValue < 30) {
        state.bmi.category = "Thừa cân";
      } else {
        state.bmi.category = "Béo phì";
      }
    },
    updateTaxIncome: (state, action) => {
      state.tax.income = Number(action.payload);
    },
    updateTaxRate: (state, action) => {
      state.tax.taxRate = Number(action.payload);
    },
    calculateTax: (state) => {
      state.tax.result = (state.tax.income * state.tax.taxRate) / 100;
    },
    resetCalculator: (state) => {
      if (state.calculatorType === "bmi") {
        state.bmi = { ...initialState.bmi };
      } else {
        state.tax = { ...initialState.tax };
      }
    },
  },
});

export const {
  setCalculatorType,
  updateBmiHeight,
  updateBmiWeight,
  calculateBmi,
  updateTaxIncome,
  updateTaxRate,
  calculateTax,
  resetCalculator,
} = calculatorSlice.actions;

export default calculatorSlice.reducer;
