import React, { useState } from 'react';
import { deleteItem } from '../../services/Fridgeservice';

export default function Confirmation(props) {
  const { message, itemId, setOpenConfirmation, refreshHandler } = props;
  const [loading, setLoading] = useState(false);

  const deleteItemHandler = async () => {
    try {
      setLoading(true);
      await deleteItem(itemId);
      setOpenConfirmation(false);
      refreshHandler();
      setLoading(false);
    } catch (error) {
      alert('Error in Delete' + error.message);
    }
  };

  return (
    <div
      className='max-w-xl p-4 m-auto text-orange-700 bg-gray-100 border border-l-4 border-sky-500'
      role='alert'
    >
      <p className='font-bold'>{message}</p>
      <button
        disabled={loading}
        className='px-5 mx-2 text-gray-300 bg-blue-500 '
        onClick={() => deleteItemHandler()}
      >
        {loading ? 'wait,,,' : 'Yes'}
      </button>
      <button
        disabled={loading}
        className='px-5 mx-2 bg-red-200'
        onClick={() => setOpenConfirmation(false)}
      >
        No
      </button>
    </div>
  );
}
