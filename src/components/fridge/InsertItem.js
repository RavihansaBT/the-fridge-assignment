import React, { useState } from 'react';
import { createNewItem, updateItem } from '../../services/Fridgeservice';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import { useSelector } from 'react-redux';

export default function InsertItem(props) {
  const {
    itemName,
    setItemName,
    expDate,
    setExpDate,
    editItem,
    itemId,
    setEditItem,
    refreshHandler,
  } = props;

  const [loading, setLoading] = useState(false);
  const [isItemExists, setIsItemExists] = useState(false);

  const itemList = useSelector((state) => state.items);

  /***
   * Check weather the item already exist in the list
   * if exist return it
   */
  const checkAvailability = (newItemTitle) => {
    let item = itemList.find((i) => i.title === newItemTitle);

    if (typeof item === 'undefined') {
      return { available: false, itemId: null };
    } else {
      return { available: true, itemId: item._id };
    }
  };

  /***
   * Save item handler
   */
  const onSaveItem = async (e) => {
    e.preventDefault();
    try {
      let itemData = {
        title: itemName,
        expiry: moment(expDate).format('YYYY-MM-DD'),
      };

      setLoading(true);
      let itemValue = checkAvailability(itemData.title);
      if (!editItem) {
        if (!itemValue.available) {
          setIsItemExists(false);
          await createNewItem(itemData);
          setToDefault(e);
        } else {
          setIsItemExists(true);
        }
      } else {
        if (!itemValue.available || itemValue.itemId === itemId) {
          setIsItemExists(false);
          await updateItem(itemId, itemData);
          setToDefault(e);
        } else {
          setIsItemExists(true);
        }
        setEditItem(false);
      }

      refreshHandler();
      setLoading(false);
    } catch (error) {
      setLoading(false);
      alert('Error in save' + error.message);
    }
  };

  /***
   * Set fields to default
   */
  const setToDefault = (e) => {
    setExpDate(null);
    setItemName('');
  };

  return (
      <form className='flex flex-wrap form-inputs items' onSubmit={onSaveItem}>
          <div className='w-1/3 w-full px-3 '>
            <label className='mb-2 input-label'>🍉 Item Name</label>
            <input
              required
              className='w-full px-4 py-3 mb-3 leading-tight appearance-none input-field focus:outline-none focus:bg-white'
              type='text'
              autoFocus
              name='itemName'
              value={itemName}
              onChange={(v) => setItemName(v.target.value)}
            />
          </div>
          <div className='w-1/3 w-full px-3'>
            <label className='mb-2 input-label'>⏰ Expiry Date</label>
            <DatePicker
              required
              className='w-full px-4 py-3 mb-3 leading-tight appearance-none input-field focus:outline-none focus:bg-white'
              selected={expDate}
              onChange={(date) => setExpDate(date)}
            />
          </div>

          <div className='w-1/3 w-full px-3'>
            <button
              disabled={loading}
              className='w-auto mt-6 text-sm font-semibold uppercase rounded submit-button'
              type='submit'
            >
              {loading ? 'Wait...' : '  Add to Fridge'}
            </button>
          </div>
          <div className='text-xs italic text-gray-500 warning-message'>
            {isItemExists && (
              <p className='ml-1'>
                ⚠️ We Don't Want More Than One Piece Of The Same Food In Our
                Fridge
              </p>
            )}
          </div>
      </form>
  );
}
