import React from 'react';

export default function Badge(props) {
  const { className, displayName } = props;

  return <div className={'item-quality-badge ' + className}>{displayName}</div>;
}
