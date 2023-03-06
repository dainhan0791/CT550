import { keyframes } from '@emotion/react';

export const removeAccents = (str: string) => {
  return str
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/g, 'd')
    .replace(/Đ/g, 'D');
};

export const displayK = (number: number) => {
  if (number < 1000) {
    return number;
  }

  if (number >= 1000 && number < 1000000) {
    return `${number / 1000}k`;
  }

  if (number >= 1000000) {
    return `${number / 1000000}m`;
  }
};
