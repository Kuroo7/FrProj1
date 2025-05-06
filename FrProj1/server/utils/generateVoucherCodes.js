// utils/generateVoucherCodes.js
const generateVoucherCodes = (count) => {
    const codes = new Set();
    while (codes.size < count) {
      codes.add(Math.random().toString(36).substr(2, 8).toUpperCase());
    }
    return Array.from(codes);
  };
  
  module.exports = generateVoucherCodes;
  
