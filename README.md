# My TypeScript App

This is a full-stack web application built using modern technologies. The project includes user authentication, private routes, and functionality for managing todos and notes. Below is an overview of the technologies used in this project.

---

## **Tech Stack**

### **Frontend**

- **React**: A JavaScript library for building user interfaces.
- **TypeScript**: A strongly typed programming language that builds on JavaScript.
- **Redux Toolkit**: For state management, including slices for authentication, todos, and notes.
- **React Router**: For routing and navigation between pages.
- **TailwindCSS**: A utility-first CSS framework for styling the application.

### **Backend**

- **Node.js**: A JavaScript runtime for building the server-side application.
- **Express**: A web framework for Node.js used to create RESTful APIs.
- **MongoDB**: A NoSQL database for storing user data, todos, and notes.
- **Mongoose**: An ODM (Object Data Modeling) library for MongoDB and Node.js.
- **JSON Web Tokens (JWT)**: For user authentication and authorization.
- **bcrypt.js**: For hashing user passwords.

### **Other Tools**

- **cookie-parser**: For handling cookies in the backend.
- **cors**: To enable Cross-Origin Resource Sharing between the frontend and backend.
- **redux-persist**: For persisting Redux state in local storage.
- **dotenv**: For managing environment variables.

---

## **Features**

- **User Authentication**:
  - Register, login, and logout functionality.
  - Protected routes using JWT and private route components.
- **Todos Management**:
  - Add, view, and manage todos specific to the logged-in user.
- **Notes Management**:
  - Add, view, and manage notes specific to the logged-in user.
- **Responsive Design**:
  - Styled with TailwindCSS for a modern and responsive UI.
- **State Persistence**:
  - User authentication state is persisted using `localStorage` or `redux-persist`.

---

## **How to Run the Project**

### **Prerequisites**

- Node.js installed on your machine.
- MongoDB instance running locally or in the cloud.

### **Steps**

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/your-repo/my-typescript-app.git
   cd my-typescript-app
   ```
2. **Install Dependencies**:

- For the backend:

```cd server
npm install
```

- For the frontend:

```cd client
npm install
```

3. **Set Up Environment Variables:**:

- Create a .env file in the server directory and add the following:

```PORT=3000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

4. **Run the Backend:**

```cd server
npm start
```

5. **Run the Frontend:**

```cd client
npm start
```

6. **Access the Application: Open your browser and navigate to http://localhost:5173.**

## **Folder Structure**

### **Frontend (client)**

```client/
├── src/
│   ├── components/       # Reusable React components
│   ├── pages/            # Page components (e.g., HomePage, Login, Register)
│   ├── slices/           # Redux slices for state management
│   ├── App.tsx           # Main application component
│   ├── index.tsx         # Entry point for the React app
│   └── store.ts          # Redux store configuration
```

### **Backend (server)**

```server/
├── src/
│   ├── controllers/      # API controllers for handling requests
│   ├── models/           # Mongoose models for MongoDB
│   ├── routes/           # Express routes
│   ├── server.ts         # Entry point for the backend
│   └── middleware/       # Middleware for authentication, etc.
```

### **Future Improvements**

- Add unit and integration tests.
- Implement pagination for todos and notes.
- Add support for file uploads (e.g., attachments for notes).
- Enhance error handling and validation.
