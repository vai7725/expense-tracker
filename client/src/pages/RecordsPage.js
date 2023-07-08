import React from 'react';
import Records from '../features/expense/components/Records';
import Navbar from '../features/navbar/Navbar';

const RecordsPage = () => {
  return (
    <Navbar>
      <Records />
    </Navbar>
  );
};

export default RecordsPage;
