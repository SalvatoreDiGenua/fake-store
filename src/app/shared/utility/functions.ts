export const randomIntFromInterval = (min: number = 0, max: number = 5) => { // min and max included 
  return Math.floor(Math.random() * (max - min + 1) + min);
}
