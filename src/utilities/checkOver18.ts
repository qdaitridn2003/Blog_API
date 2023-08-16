import moment from 'moment';

const checkOver18 = (date: Date) => {
  const checkDate = moment(date).fromNow();
  if (checkDate.includes('year')) {
    const result = checkDate.split(' ')[0];
    if (parseInt(result) >= 18) return true;
    else return false;
  } else {
    return false;
  }
};

export default checkOver18;
