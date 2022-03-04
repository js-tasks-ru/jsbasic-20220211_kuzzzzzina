function getMinMax(str) {
  let array = str.split(' ');
 
  let min = +array[0];
  let max = min;
  for (let i = 0; i < array.length; i++) {
    let e = +array[i];
    if (e < min) min = e;
    if (e > max) max = e;
  }
  return {min: min, max: max};
}
