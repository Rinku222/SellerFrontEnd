import React from 'react';
import dayjs from 'dayjs';

const DateConvertor = (creationTS: number) => {
  //   return new Date(creationTS).toLocaleDateString('de-DE');
  return dayjs.unix(creationTS).format('DD MMM HH:MM');
};

export default DateConvertor;
