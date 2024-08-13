---

# Express.js Learning Journey

## Overview

This repository is a log of my learning journey in mastering Express.js. It contains tutorial practice codes that cover various key concepts and features of Express.js. The repository is structured to help you understand and practice essential Express.js functionalities by providing hands-on examples.

## File Structure

The project is organized into several directories:

- **src/mongoose/schemas/**: Contains Mongoose schemas, including GitHub OAuth and user schema.
- **src/routes/**: Contains route definitions for authentication, cart management, cities, users, and other general routes.
- **src/strategies/**: Contains Passport.js strategies for GitHub and local authentication.
- **utils/**: Contains utility modules for data mimicking, helpers, middlewares, and schema validation. Additionally, it contains HTML files for error and index pages.

## Key Concepts Covered

### HTTP Methods
- **GET**: Retrieve data from the server.
- **POST**: Send data to the server to create a resource.
- **PUT**: Update an existing resource on the server.
- **PATCH**: Partially update an existing resource.
- **DELETE**: Remove a resource from the server.

### Routing
- **Route Handling**: Define routes to handle different HTTP methods and endpoints.
- **Query Parameters**: Handle and validate query parameters in requests.

### Middleware
- **Middleware Functions**: Use `app.use(middleware(req, res, next))` to handle requests.
  - Middleware functions can be used multiple times for different purposes.

### Validation
- **express-validator**: Perform server-side validation.
  - **Query Validation**: Validate query parameters using `query("filtername").chainedMethods()`.
  - **Body Validation**: Validate request body data using `body("fieldname").chainedMethods()`.
  - **ValidationResult**: Access validation results with `validationResult(req)`.
  - **matchedData**: Extract validated data from requests.
  - **Validation Schema**: Define and apply validation schemas for complex validation.

### Router
- Modularize routes using the Express Router to create separate route handlers.

### Cookies
- **cookie-parser**: Handle cookies in requests.
  - **Unsigned Cookies**: Basic cookie management.
  - **Signed Cookies**: Secure cookie management with a secret.

### Session Management
- **Session ID**: Manage session identifiers with `session.id`.
- **req.session**: Access and manipulate session data.
- **Session Store**: Store session data using `connect-mongo` with MongoDB.

### Passport.js
- **Serialization**: Manage user data serialization.
- **Deserialization**: Handle user data deserialization.
- **Strategies**: Use Passport strategies like GitHub OAuth and Local Strategy.
- **Initialization**: Initialize Passport and session handling in Express.

### Mongoose
- **Mongoose Connect**: Connect to a MongoDB database.
- **Schema Definition**: Define schemas to structure data in MongoDB.

### Password Hashing
- **bcrypt**: Securely hash passwords before storing them in the database.

### Session Store with MongoDB
- **connect-mongo**: Use MongoDB as a session store.
  - **Store**: Integrate with MongoDB to store session data.
  - **Client**: Manage session data through a MongoDB client.

## How to Use

1. Clone the repository:

   ```bash
   git clone https://github.com/NeerajVermaGPS/ExpressApp.git
   cd ExpressApp
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Run the application:

   ```bash
   node src/index.js
   ```

4. Explore different routes and functionalities implemented in the project.

## Contributing

Feel free to fork this repository and submit pull requests if you'd like to add more examples or improve the existing ones.

---
