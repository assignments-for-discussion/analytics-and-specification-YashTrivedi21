// eslint-disable-next-line complexity
function average(array) {
  // if NaN exist in the given array remove them, now array contains only number
  let numbers = array.filter( (value) => !Number.isNaN(value) );
  // if array is empty return NaN;
  if (!numbers.length) return NaN;

  // calculating mean of given array
  // eslint-disable-next-line max-len
  const mean = numbers.reduce((p, c)=> p + c, 0) / numbers.length;

  // transforming every number in the given array
  // taking difference from mean and squaring it
  // also storing the original array in temporary variable
  const temporary = numbers;
  numbers = numbers.map((k)=>{
    return (k - mean) ** 2;
  });

  // taking sum of the newly transformed array
  const sum = numbers.reduce((acc, curr)=> acc + curr, 0);

  // calculating standard deviation of the given array
  const dev = Math.sqrt(sum / numbers.length);

  // restoring the original array
  numbers = temporary;
  // setting a condition such that if a number is beyond
  // mean +/- standard deviation then there is a fault in the sensor
  // eslint-disable-next-line max-len
  // i have followed below link which says the accurate values of any data are within +/- 2 * standard deviation.
  // https://www.labce.com/spg49741_acceptable_standard_deviation_sd.aspx#:~:text=Statisticians%20have%20determined%20that%20values,area%20greater%20than%20%C2%B1%202SD.
  // eslint-disable-next-line max-len
  const check = (element) => (element > (mean + 2*dev) || element < (mean - 2*dev));
  // if the above condition is satisfied then return NaN else return mean
  const change = numbers.some(check);
  if (change) return NaN;
  return mean;
}

module.exports = {average};

