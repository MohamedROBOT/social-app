export const generateOTP = () => {
  const minNum = 100000; //min 6 digits
  const maxNum = 900000; //max 6 digits
  return Math.floor(Math.random() * minNum + maxNum);
};
