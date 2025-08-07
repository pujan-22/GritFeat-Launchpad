/*
Find if a duplicate exists in a list of numbers.
For eg:
const data = [1, 3, 5, 2, 4, 5];
Answer:  [5]
*/
const data = [1, 3, 5, 2, 4, 5];
const seen = new Set();
const dub = new Set();

for (const num of data) {
    if (seen.has(num)) {
        dub.add(num);
    } else {
        seen.add(num);
    }
}

console.log([...dub]);

//Time complexity O(n)