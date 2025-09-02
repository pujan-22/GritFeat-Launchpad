# MongoDB Assignment 1

Database Name: user       
Collection Name: users

Data:
```
[
  {
    username: "alex_p",
    email: "alex.p@example.com",
    age: 28,
    country: "USA",
    last_login: ISODate("2023-10-25T10:00:00Z"),
    followers: 1200,
    interests: ["programming", "hiking", "music"],
    profile: { theme: "dark", bio: "Software developer and nature enthusiast." },
    devices: [
      { type: "mobile", os: "Android", last_seen: ISODate("2023-10-25T09:55:00Z") },
      { type: "desktop", os: "Windows", last_seen: ISODate("2023-10-24T15:30:00Z") }
    ]
  },
  {
    username: "jane_doe",
    email: "jane.d@workplace.com",
    age: 34,
    country: "Canada",
    last_login: ISODate("2023-11-01T12:30:00Z"),
    followers: 850,
    interests: ["travel", "photography", "music"],
    profile: { theme: "light" },
    subscription: { tier: "premium", start_date: ISODate("2023-01-01T00:00:00Z") }
  },
  {
    username: "sam_g",
    email: "sam.g@example.com",
    age: 22,
    country: "UK",
    last_login: ISODate("2023-09-15T18:45:00Z"),
    followers: 2500,
    interests: ["gaming", "streaming"],
    profile: { theme: "dark", bio: "Pro gamer and streamer." },
    devices: [
      { type: "desktop", os: "Windows", last_seen: ISODate("2023-09-15T18:40:00Z") }
    ]
  },
  {
    username: "chris_b",
    email: "chris.b@inbox.com",
    age: 45,
    country: "Australia",
    last_login: ISODate("2023-10-30T05:00:00Z"),
    followers: 50,
    interests: ["gardening", "cooking"],
    profile: { theme: "light", bio: "Loves the outdoors." }
  },
  {
    username: "maria_s",
    email: "maria.s@example.com",
    age: 31,
    country: "Germany",
    last_login: ISODate("2023-11-02T20:00:00Z"),
    followers: 1800,
    interests: ["art", "history", "travel"],
    profile: { theme: "dark", bio: "Museum curator." },
    subscription: { tier: "premium", start_date: ISODate("2022-06-15T00:00:00Z") }
  },
  {
    username: "another_user",
    email: "another@example.com",
    age: 29,
    country: "USA",
    followers: 95,
    interests: ["music", "programming"],
    profile: "Profile setup pending"
  }
]
```

## Write queries for the given questions
1.	Find users older than 30, but only show their username and country. 
2.	Find users whose follower count is less than or equal to 100.
3.	Find all users from 'USA' or 'Canada'.
4.	Find all users who are NOT from 'USA' or the 'UK'.
5.	Find users who are from the 'USA' AND have more than 1000 followers.
6.	Find users who have more than 2000 followers OR are from 'Australia'.
7.	Find all users who have a subscription field.
8.	Find users whose profile field is a string, not an embedded document.
9.	Find users who are interested in both 'travel' AND 'music'.
10.	Find users who have used a 'mobile' device since October 1st, 2023.
11.	Find all users whose email address ends with 'workplace.com'.
12.	For user sam_g, add 50 followers and add a new interest 'coding'.
13.	For all users from the 'USA', rename the followers field to follower_count.
14.	Attempt to update user new_user; if they don't exist, insert them with default data.
15.	Delete all users who have not logged in (hint: the last_login field does not exist).
16.	Find users from the 'USA' who are either younger than 25 OR have more than 1500 followers.
17.	Find all users who have a 'desktop' device that runs 'Windows'.
18.	Update all users with a 'dark' theme profile by adding a pro_user: true flag.


# MongoDB Assignment 2 
Data

Product Collection: 
```
[{  _id: "PROD001",  name: "Acoustic Guitar",  category: "String",  brand: "GuitarCo",  price: 499.99,  stock: 15,  features: ["Solid Spruce Top", "Mahogany Back & Sides"],  reviews: [    { user: "Alice", rating: 5, comment: "Amazing sound!" },    { user: "Bob", rating: 4, comment: "Great for beginners." },  ],},{  _id: "PROD002",  name: "Electric Piano",  category: "Keyboard",  brand: "KeyMaster",  price: 799.0,  stock: 8,  features: ["88 Weighted Keys", "Multiple Voices"],  reviews: [    { user: "Charlie", rating: 5, comment: "Love the feel of the keys." },  ],},{  _id: "PROD003",  name: "Drum Kit",  category: "Percussion",  brand: "BeatKing",  price: 1200.5,  stock: 5,  features: ["5-Piece Kit", "Cymbals Included"],  reviews: [],},{  _id: "PROD004",  name: "Ukulele",  category: "String",  brand: "AlohaTune",  price: 89.99,  stock: 30,  features: ["Soprano Size", "Mahogany Body"],  reviews: [{ user: "Alice", rating: 4, comment: "Cute and fun!" }],},{  _id: "PROD005",  name: "Bass Guitar",  category: "String",  brand: "BassPro",  price: 550.0,  stock: 10,  features: ["4-String", "Active Pickups"],  reviews: [],}];
```
Order Collection:
```
[{  _id: "ORDER001",  customer_id: "CUST001",  order_date: ISODate("2023-01-10T10:00:00Z"),  items: [    { product_id: "PROD001", quantity: 1, unit_price: 499.99 },    { product_id: "PROD004", quantity: 2, unit_price: 89.99 },  ],  status: "completed",  total_amount: 679.97,},{  _id: "ORDER002",  customer_id: "CUST002",  order_date: ISODate("2023-01-15T14:30:00Z"),  items: [{ product_id: "PROD002", quantity: 1, unit_price: 799.0 }],  status: "pending",  total_amount: 799.0,},{  _id: "ORDER003",  customer_id: "CUST001",  order_date: ISODate("2023-02-01T09:00:00Z"),  items: [{ product_id: "PROD001", quantity: 1, unit_price: 499.99 }],  status: "completed",  total_amount: 499.99,},{  _id: "ORDER004",  customer_id: "CUST003",  order_date: ISODate("2023-02-05T11:45:00Z"),  items: [{ product_id: "PROD003", quantity: 1, unit_price: 1200.5 }],  status: "completed",  total_amount: 1200.5,},{  _id: "ORDER005",  customer_id: "CUST002",  order_date: ISODate("2023-03-01T16:00:00Z"),  items: [{ product_id: "PROD005", quantity: 1, unit_price: 550.0 }],  status: "pending",  total_amount: 550.0,}]
```
## Write queries for the given questions using the above data.
- Calculate Total Stock Value by Category.
- Count Products per Brand.
- Find the Average Rating for Each Product.
- Calculate Total Sales for Each Product.
- Recalculate each order's total amount using $reduce.
- Find the total quantity of 'String' products sold.
- Find the average rating for each product that has received at least one review. 
- For each product, create a summary that includes its name and price, a simple list of the usernames who reviewed it, and a list of the order IDs in which it was sold.
- Retrieve a list of all orders, but instead of just showing product IDs in the items array, replace them with a more detailed object containing the product's name, brand, and category.
- Create a profile for each customer showing a list of products they have purchased. The list should not contain duplicates and should include the product name and category.
## Create documentation on Map-Reduce and the Input-Output model in MongoDB.



