const bmiCalculator = (height: number, weight: number): string => {
  const bmi = (weight * 10000) / (height * height);
  if(bmi < 25) {
    return "normal";
  } else if (bmi < 29) {
    return "overweight";
  } else {
    return "obese";
  }
};

const height = Number(process.argv[2]);
const weight = Number(process.argv[3]);
console.log(bmiCalculator(height, weight));

export default bmiCalculator;