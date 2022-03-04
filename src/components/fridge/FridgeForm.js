import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { getAllItems } from '../../services/Fridgeservice';
import FridgeTable from './FridgeTable';
import TitleBar from './TitleBar';

export default function FridgeForm() {
  const [refresh, setRefresh] = useState(false);
  let dispatch = useDispatch();

  useEffect(() => {
    // get all items on component mounting
    getAllItems()
      .then((items) => {
        dispatch({ type: 'setAllItems', payload: items.data });
      })
      .catch((e) => {
        alert('Error occured while getting all items' + e.message);
      });
  }, [refresh, dispatch]);

  const refreshHandler = () => {
    setRefresh(!refresh);
  };

  return (
    <>
      <div className='heading-area'>
        <TitleBar />
      </div>

      <div className='flex justify-center max-w-full'>
        <div className='relative flex flex-col items-center justify-center site-container'>
          <FridgeTable
            setRefresh={setRefresh}
            refresh={refresh}
            refreshHandler={refreshHandler}
          />
        </div>
      </div>
    </>
  );
}
