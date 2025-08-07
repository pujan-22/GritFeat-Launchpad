/*
Filter items based on allowed keys
For eg:
const data = [
  { key: 'name', value: ‘John’},
  { key: 'email', value:’john@example.com' },
  { key: 'age', value: 20 },
]
const allowedKeys = ['name', 'age']
Answer: [ { key: 'name', value: 'John' }, { key: 'age', value: 20 } ]
*/
function allowedKey(keys, data) {
    keys = new Set(keys);
    return data.filter(item => keys.has(item.key));
}

const data = [
  { key: 'name', value: 'John' },
  { key: 'email', value: 'john@example.com' },
  { key: 'age', value: 20 },
];

const allowedKeys = ['name', 'age'];

console.log(allowedKey(allowedKeys, data));

//TIme complexity(m+n)