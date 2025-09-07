# Node.js with Mongoose - E-commerce API

A comprehensive Node.js, Express, and MongoDB RESTful API for an e-commerce platform with user management, product catalog, order processing, and reporting features.
## Features
### User Management
- User registration and profile management
- Advanced user search with multiple filters
- User CRUD operations

### Product Catalog
- Product management with categories and brands
- Product reviews and ratings
- Advanced product search and filtering

### Order Management
- Order placement with stock validation
- Order status management (pending, completed, cancelled)
- Customer order history
 
### Reporting & Analytics
- Sales revenue reports
- Top-selling products analysis
- Monthly sales reports

### Tech Stack
- Runtime: Node.js
- Framework: Express.js with TypeScript
- Database: MongoDB with Mongoose ODM
- Authentication: (Can be extended with JWT)
- Validation: Mongoose schema validation

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local installation or MongoDB Atlas account)
- npm or yarn

### Installation
1. Clone the repository:
```bash
git clone https://github.com/pujan-22/GritFeat-Launchpad/
cd node-with-mongoose
```
2. Install dependencies:
```bash
npm install
```
3. Set up environment variables:
```bash
cp .env.example .env
```
Edit .env with your configuration:

    PORT=3000
    MONGODB_URI=mongodb://localhost:27017/your-database-name
    NODE_ENV=development

4. Start the development server:
```bash
npm run dev
```
5. Seed the database with sample data (optional):
```bash
npm run seed
```
## API Documentation
### Base URL
    http://localhost:3000/api

## User Endpoints
| Method | Endpoint | Description |
| ------ | -------- | ---------- |
| POST | `/users` | Create a new user |
| GET | `/users` | Get all users (with optional filters)|
| GET | `/users/:id` | Get a specific user by ID|
| PUT | `/users/:id` | Update a user's profile|
| DELETE | `/users/:id` | Delete a user|

**User Filters:** `country`, `minFollowers`, `interest`, `profileTheme`, `subscriptionTier`, `page`, `limit`
### Product Endpoints
| Method | Endpoint	| Description |
| ------ | -------- | ----------- |
| POST | `/products` | Create a new product |
| GET | `/products` | Get all products (with optional filters) |
| POST | `/products/:id/reviews` | Add a review to a product |
| PUT | `/products/:id` | Update product details |
| DELETE | `/products/:id` | Delete a product |
| PUT | `/products/:productId/reviews/:reviewId` | Update a product review |
| DELETE | `/products/:productId/reviews/:reviewId`	|Delete a product review |

**Product Filters:** `category`, `minPrice`, `maxPrice`, `maxStock`, `hasReviews`
### Order Endpoints
| Method | Endpoint | Description |
| ------ | -------- | ----------- |
| POST | `/orders` | Place a new order|
| GET | `/orders` | Get all orders (with status filter) | 
| GET | `/orders/customer/:customerId` | Get orders for a specific customer |
| PATCH | `/orders/:id/status` | Update order status
### Report Endpoints
| Method | Endpoint | Description |
| ------ | -------- | ----------- |
| GET | `/reports/sales-revenue` | Get total sales revenue |
| GET | `/reports/top-selling-products` | Get top-selling products
| GET | `/reports/monthly-sales` | Get monthly sales report|
## Data Models
### User Schema
```javascript
{
  username: String,
  email: String,
  age: Number,
  country: String,
  last_login: Date,
  followers: Number,
  interests: [String],
  profile: {
    theme: String,
    bio: String
  },
  devices: [{
    type: String,
    os: String,
    last_seen: Date
  }],
  subscription: {
    tier: String,
    start_date: Date
  }
}
```
### Product Schema
```javascript

{
  name: String,
  category: String,
  brand: String,
  price: Number,
  stock: Number,
  features: [String],
  reviews: [{
    user: String,
    rating: Number,
    comment: String,
    createdAt: Date
  }]
}
```
### Order Schema
```javascript

{
  customer_id: ObjectId,
  order_date: Date,
  items: [{
    product_id: ObjectId,
    quantity: Number,
    unit_price: Number
  }],
  status: String,
  total_amount: Number
}
```
## Sample Usage
### Create a User
```bash

curl -X POST http://localhost:3000/api/users \
  -H "Content-Type: application/json" \
  -d '{
    "username": "john_doe",
    "email": "john@example.com",
    "age": 30,
    "country": "USA",
    "profile": {
      "theme": "dark",
      "bio": "Software developer"
    },
    "interests": ["programming", "music"]
  }'
```
### Search Products
```bash

curl "http://localhost:3000/api/products?category=String&minPrice=100&maxPrice=600"
```
### Place an Order
``` bash

curl -X POST http://localhost:3000/api/orders \
  -H "Content-Type: application/json" \
  -d '{
    "customerId": "USER_ID_HERE",
    "items": [
      {
        "productId": "PRODUCT_ID_HERE",
        "quantity": 2
      }
    ]
  }'
```
### Project Structure
```text

src/
├── config/          # Database configuration
├── controllers/     # Route controllers
├── models/          # Mongoose models
├── routes/          # Express routes
├── middleware/      # Custom middleware
└── app.ts           # Main application file
```

### Development Scripts
- `npm run dev` - Start development server with hot reload
- `npm run build` - Build TypeScript to JavaScript
- `npm start` - Start production server
- `npm run seed` - Seed database with sample data

### Error Handling
The API returns appropriate HTTP status codes:
- 200: Success
- 201: Created
- 400: Bad Request
- 404: Not Found
- 500: Internal Server Error

Errors include descriptive messages in JSON format.