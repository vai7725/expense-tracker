import axios from 'axios';

const baseURI = process.env.REACT_APP_SERVER_URI;

export const saveExpense = (expenseData) => {
  console.log(expenseData);
  return new Promise(async (resolve) => {
    const res = await axios.post(`${baseURI}/api/saveexpense`, expenseData);
    resolve(res.data);
  });
};

export const fetchExpenseRecords = (filter) => {
  return new Promise(async (resolve) => {
    const res = await axios.get(`${baseURI}/api/fetchexpenserecord`, {
      params: filter,
    });
    resolve(res.data);
  });
};

export const fetchMonths = () => {
  return new Promise(async (resolve) => {
    const res = await axios.get(`${baseURI}/api/fetchmonths`);
    resolve(res.data);
  });
};

export const fetchYears = () => {
  return new Promise(async (resolve) => {
    const res = await axios.get(`${baseURI}/api/fetchyears`);
    resolve(res.data);
  });
};
