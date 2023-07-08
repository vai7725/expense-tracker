import React from 'react';
import Navbar from '../features/navbar/Navbar';
import Expense from '../features/expense/components/Expense';

const ExpensePage = () => {
  return (
    <Navbar>
      <Expense />
    </Navbar>
  );
};

export default ExpensePage;
