/*
Group the related data by category 
const products = [
  { id: 1, name: 'Phone', categoryId: 2 },
  { id: 2, name: 'Shirt', categoryId: 1 },
  { id: 3, name: 'Charger', categoryId: 2 }
]
Answer: 
{
  '1': [ { id: 2, name: 'Shirt', categoryId: 1 } ],
  '2': [
    { id: 1, name: 'Phone', categoryId: 2 },
    { id: 3, name: 'Charger', categoryId: 2 }
  ]
}

*/

function groupByCategory(products) {
    const grouped = {};
    for (const product of products) {
        const key = product.categoryId;
        if (!grouped[key]) {
            grouped[key] = [];
        }
        grouped[key].push(product);
    }
    return grouped;
}

const products = [
  { id: 1, name: 'Phone', categoryId: 2 },
  { id: 2, name: 'Shirt', categoryId: 1 },
  { id: 3, name: 'Charger', categoryId: 2 }
]

console.log(groupByCategory(products));

//Time Complexity = O(n)