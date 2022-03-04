import moment from 'moment';
import React from 'react';
import { QUALITY_LABELS } from '../../constant/label';
import Badge from './Badge';
import BinIcon from '../../assests/icons/re-bin.png';
import { getItemById } from '../../services/Fridgeservice';

export default function FridgeItemRow(props) {
  const {
    itemName,
    expiry,
    setItemId,
    itemId,
    setOpenConfirmation,
    openConfirmation,
    //
    setExpDate,
    setItemName,
    setEditItem,
  } = props;

  /**
   * Create table data component (expiry date column)
   * by passing expiry date
   * @param {*} expDate
   * @returns
   */
  const checkQuality = (expDate) => {
    let expiry = moment(expDate);

    if (expiry < moment(new Date())) {
      return (
        <Badge className='expired-badge' displayName={QUALITY_LABELS.Expired} />
      );
    }

    if (expiry <= moment(new Date()).add(1, 'month')) {
      return (
        <Badge
          className='expire-soon-badge'
          displayName={QUALITY_LABELS.ExpireSoon}
        />
      );
    }

    if (expiry.add(1, 'month') > moment(new Date())) {
      return (
        <Badge className='healthy-badge' displayName={QUALITY_LABELS.Healthy} />
      );
    }
  };

  /***
   * When Edit, need to get item by Id,
   * Then pass it to Insert item component
   */
  const onEditHandlet = async (id) => {
    try {
      let res = await getItemById(id);
      console.log();
      let expiry = new Date(res.data?.expiry);
      setExpDate(expiry);
      setItemName(res.data?.title);
      setItemId(id);
      setEditItem(true);
    } catch (error) {
      alert('Error in get by Id' + error.message);
    }
  };

  /***
   * Open confirmation model without loading form data
   */
  const openModelHandler = (e) => {
    e.stopPropagation();
    setItemId(itemId);
    setOpenConfirmation(!openConfirmation);
  };

  return (
    // <div className=''>
    <ul className='table-view'>
      <li className='table-row' onClick={() => onEditHandlet(itemId)}>
        <div className='col col-1'>{itemName}</div>
        <div className='col col-2'>Expiry Date - {expiry}</div>
        <div className='col col-3'>{checkQuality(expiry)}</div>
        <div className='col col-4'>
          <img
            alt='delete-icon'
            src={BinIcon}
            onClick={(e) => openModelHandler(e)}
          />
        </div>
      </li>
    </ul>
    // </div>
  );
}
