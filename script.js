const x = 'honyarara'

// (1)
const data1 = {};
data1[x] = 'honya';
console.log('data1', data1);
// data1 {honyarara: "honya"}

// (2)
const data2 = { [x]: 'honya' };
console.log('data2', data2);
// data2 {honyarara: "honya"}