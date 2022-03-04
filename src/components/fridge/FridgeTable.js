import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import Confirmation from '../Alert/Confirmation';
import FridgeItemRow from './FridgeItemRow';
import InsertItem from './InsertItem';

export default function FridgeTable(props) {
  const { refreshHandler } = props;
  const [itemName, setItemName] = useState('');
  const [expDate, setExpDate] = useState(null);
  const [openConfirmation, setOpenConfirmation] = useState(false);
  const [itemId, setItemId] = useState(null);
  const [editItem, setEditItem] = useState(false);

  const tableData = useSelector((state) => state.items);

  return (
    <>
      <div className='fridge-item-form'>
        <InsertItem
          itemId={itemId}
          itemName={itemName}
          setItemName={setItemName}
          expDate={expDate}
          setExpDate={setExpDate}
          refreshHandler={refreshHandler}
          editItem={editItem}
          setEditItem={setEditItem}
        />
      </div>

      {tableData.length > 0 ? (
        <>
          {/* Delete confirmation box */}
          {openConfirmation && (
            <div className='confirmation-box'>
              <Confirmation
                refreshHandler={refreshHandler}
                itemId={itemId}
                setOpenConfirmation={setOpenConfirmation}
                message={`Are you Sure Do You want to Delete ?`}
              />
            </div>
          )}

          {/* Fridge items display area */}
          <div className='table-container'>
            <>
              <div className='w-full mb-4 text-left total-item-badge'>
                <label>
                  Total items —&nbsp;
                  {tableData.length < 10
                    ? '0' + tableData.length
                    : tableData.length}
                </label>
              </div>
              {tableData.map((item, idx) => (
                <FridgeItemRow
                  key={item._id}
                  itemName={item.title}
                  expiry={item.expiry}
                  setExpDate={setExpDate}
                  setItemName={setItemName}
                  setEditItem={setEditItem}
                  setItemId={setItemId}
                  itemId={item._id}
                  openConfirmation={openConfirmation}
                  setOpenConfirmation={setOpenConfirmation}
                />
              ))}
            </>
          </div>
        </>
      ) : (
        <div className='flex w-full h-[300px] justify-center items-center main-loading-area'>
          <p>...</p>
          <p>Loading Fridge items</p>
        </div>
      )}
    </>
  );
}
