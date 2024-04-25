import { drop } from 'lodash';
import * as moment from 'moment';

export const randomToken = (): string => {
  return (
    Math.random().toString(36).substring(2, 15) +
    Math.random().toString(36).substring(2, 15)
  );
};

export const random3Digit = (): number => {
  return Math.floor(100 + Math.random() * 900);
};

export const getPaginatedData = (
  items: Array<any>,
  page: number,
  limit: number,
): Array<any> => {
  const pg = page;
  const pgSize = limit;
  const offset = (pg - 1) * pgSize;
  const pagedItems = drop(items, offset).slice(0, pgSize);
  return pagedItems;
};

export const cutMarketplacePercentage = (amount: number): number => {
  const percentage = 7.5;
  const cutAmount = (amount * percentage) / 100;
  const returnAmount = amount - cutAmount;
  return returnAmount;
};

export const maskChatData = (data: string, length: number): string => {
  const chatMessage = data.split(' ');
  let newMessage = '';

  for (let i = 0; i < chatMessage.length; i++) {
    const msg = chatMessage[i];
    const mask = msg.substring(0, msg.length).replace(/./g, '*');
    if (msg.length >= length) {
      newMessage = newMessage + ' ' + mask;
    } else if (msg.includes('@') || msg.includes('www')) {
      newMessage = newMessage + ' ' + mask;
    } else if (/(http(s?)):\/\//i.test(msg)) {
      newMessage = newMessage + mask;
    } else {
      newMessage = newMessage + ' ' + msg;
    }
  }
  return newMessage;
};

export const profileDescriptionFilter = (data: string): boolean => {
  const chatMessage = data.split(' ');
  const phoneRegex = /^(\+\d{1,2}\s?)?1?\-?\.?\s?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/;
  const emailRegex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
  for (let i = 0; i < chatMessage.length; i++) {
    const msg = chatMessage[i];
    if (emailRegex.test(msg)) {
      return false;
    } else if (msg.includes('www')) {
      return false;
    } else if (/(http(s?)):\/\//i.test(msg)) {
      return false;
    } else if (phoneRegex.test(msg)) {
      return false;
    }
  }
  return true;
};

export const convertToBase64 = (data: string): string => {
  const reverse = data.split('').reverse().join('');
  const baseData = Buffer.from(reverse).toString('base64');
  return baseData;
};

export const convertFromBase64 = (data: string): string => {
  const baseData = Buffer.from(data, 'base64').toString();
  const reverse = baseData.split('').reverse().join('');
  return reverse;
};

export const dateToUTC = (date: Date): Date => {
  return moment.utc(moment(date).utc()).toDate();
};
