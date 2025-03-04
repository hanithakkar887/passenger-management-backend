# Passenger Management System

## Description
The Passenger Management System is a simple Node.js and Express-based application that allows users to add and retrieve passenger details. It also supports image uploads using Cloudinary.

## Features
- Add new passenger details with an image and ID card upload.
- Retrieve and display the list of passengers.
- Store images and ID proofs securely using Cloudinary.

## Technologies Used
- Node.js
- Express.js
- MongoDB & Mongoose
- Cloudinary (for image uploads)
- Multer (for file handling)

## Installation

1. Clone the repository:
   ```sh
   git clone <passenger-management-backend>
   ```

2. Navigate to the project directory:
   ```sh
   cd passenger-management-backend
   ```

3. Install dependencies:
   ```sh
   npm install
   ```

4. Create a `.env` file and configure the following environment variables:
   ```sh
   MONGO_URI=your_mongodb_connection_string
   CLOUDINARY_CLOUD_NAME=your_cloud_name
   CLOUDINARY_API_KEY=your_api_key
   CLOUDINARY_API_SECRET=your_api_secret
   PORT=5000
   ```

5. Start the server:
   ```sh
   npm  run start
   ```

## File Structure
```
passenger-management-backend/
│── config/
│   ├── db.js          # Database connection configuration
│   └── cloudinary.js  # Cloudinary configuration
│── models/
│   └── Passenger.js   # Mongoose schema for passenger data
│── routes/
│   └── passengerRoutes.js  # Routes for adding and fetching passengers
│── upload  |   for handling file uploads with Multer
│── .env               # Environment variables
│── server.js          # Main entry point of the application
│── package.json       # Dependencies and scripts
│── README.md          # Documentation
```

## API Endpoints

### Add a Passenger
- **Endpoint:** `POST /api/add`
- **Description:** Adds a new passenger with an image and ID card upload.
- **Request Body:** (Use `multipart/form-data`)
  | Field  | Type  | Required | Description  |
  |--------|-------|----------|--------------|
  | `name`  | String | ✅ Yes | Passenger name |
  | `age`  | Number | ✅ Yes | Passenger age  |
  | `gender` | String | ✅ Yes | Male/Female/Other |
  | `contact` | String | ✅ Yes | 10-digit phone number |
  | `email` | String | ✅ Yes | Unique email ID |
  | `photo` | File (Image) | ❌ Optional | Profile picture |
  | `idCard` | File (PDF) | ❌ Optional | ID proof |
  
- **Example Response:**  
  ```json
  {
    "message": "Passenger added successfully!",
    "passenger": {
      "name": "John Doe",
      "age": 30,
      "gender": "Male",
      "contact": "9876543210",
      "email": "john@example.com",
      "photo": "cloudinary_url",
      "idCard": "cloudinary_url"
    }
  }
  ```

### Get All Passengers
- **Endpoint:** `GET /api`


## Future Enhancements
✅ Add **Update** and **Delete** functionality  
✅ Implement **Authentication & Authorization**  
✅ Improve **Validation & Error Handling**  


