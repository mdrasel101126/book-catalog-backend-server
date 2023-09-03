# l2-b1-assignment-8

# Build a Book Catallog Backend Assignment

### Live Link: https://book-catalog-backend-server-iota.vercel.app/

### Application Routes:

#### User

- api/v1/auth/signup (POST)
- api/v1/auth/signin (POST)
- api/v1/users (GET)
- api/v1/users/a342ee2f-f1ac-4915-96be-77c0de770b84 (Single GET)
- api/v1/users/a342ee2f-f1ac-4915-96be-77c0de770b84 (PATCH)
- api/v1/users/a342ee2f-f1ac-4915-96be-77c0de770b84 (DELETE)
- api/v1/profile (GET)

### Category

- api/v1/categories/create-category (POST)
- api/v1/categories (GET)
- api/v1/categories/53ba68ac-07f2-4283-aed9-8f67eb9e958c (Single GET)
- api/v1/categories/53ba68ac-07f2-4283-aed9-8f67eb9e958c (PATCH)
- api/v1/categories/53ba68ac-07f2-4283-aed9-8f67eb9e958c (DELETE)

### Books

- api/v1/books/create-book (POST)
- api/v1/books (GET)
- api/v1/books/2239a19c-df3a-4f9b-a7ca-0ef0b493e223/category (GET)
- api/v1/books/3275c768-97ae-48f0-b487-a5097cd651bc (GET)
- api/v1/books/3275c768-97ae-48f0-b487-a5097cd651bc (PATCH)
- api/v1/books/3275c768-97ae-48f0-b487-a5097cd651bc (DELETE)

### Orders

- api/v1/orders/create-order (POST)
- api/v1/orders (GET)
- api/v1/orders/56ebbba5-bb02-4107-8792-18c05c875e59 (GET)
