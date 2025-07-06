# Saraha - Anonymous Messaging API

This is a backend project that replicates the core idea behind the famous anonymous messaging platform **Saraha**.

The API allows users to:
- Register and confirm their email.
- Login securely using access and refresh tokens.
- Send and receive anonymous messages.
- Reset and update their password.

---

## 🔧 Technologies Used

- **Node.js** & **Express** – for building the server
- **MongoDB** with **Mongoose** – for data storage and modeling
- **JWT (JSON Web Tokens)** – for authentication and token handling
- **Nodemailer** – to send confirmation and reset emails
- **dotenv** – for environment variable management
- **Express Validator** – for input validation

---

## 📁 Project Structure Highlights

- `routes/` → Defines all the API endpoints.
- `controllers/` → Handles the logic behind each feature.
- `middleware/` → Authentication, authorization, error handling.
- `services/` → Token creation and email sending logic.
- `utils/` → Reusable utility functions.
- `config/` → Database connection and environment setup.

---

## 🧪 API Testing

The full API is documented and testable using the included **Postman Collection** file:  
**Saraha.postman_collection.json**

---

## 🧠 Idea Behind the Project

The goal of this project was to practice backend development by building a real-world REST API that includes:

- Authentication with token refresh flow  
- Email confirmation and password reset  
- Secure message handling  
- A clean and scalable project structure

---

## ✍️ Author

Developed by **Mohamed Nser**  
🔗 [GitHub](https://github.com/MohamedNser)
