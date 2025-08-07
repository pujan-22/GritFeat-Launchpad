/*
Find Common Elements Between Two Arrays

For eg:
const a1 =  [1,4,2,8,9]
const a2 = [7,5,0,4,1]
Answer: [1, 4]
*/
const a1 = [1, 4, 2, 8, 9];
const a2 = [7, 5, 0, 4, 1];

function findCommonElements(arr1, arr2) {
    const set1 = new Set(arr1);
    const common = [];

    for (const item of arr2) {
        if (set1.has(item)) {
            common.push(item);
        }
    }

    return common;
}

console.log(findCommonElements(a1, a2));

//Time complexity = O(n+m)