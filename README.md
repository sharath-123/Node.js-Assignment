
# 🧾 User Registration API with Image Upload

This project is a full-stack application that allows users to register by submitting their personal information along with a profile image. The backend is built with **Node.js**, **Express**, **MongoDB**, and **Multer** for handling image uploads. The frontend is built with **React.js**.

---

## 📌 Features

- ✅ User Registration with:
  - Name, Email, Password, Company Name, Age, Date of Birth
  - Profile Image Upload (PNG/JPEG)
- ✅ Image stored in server and path saved in MongoDB
- ✅ Email uniqueness validation
- ✅ Image preview after registration
- ✅ Account deletion feature
- ✅ Error handling and loading state

---

## 🛠️ Tech Stack

**Backend:**
- Node.js
- Express.js
- MongoDB
- Mongoose
- Multer (for image upload)

**Frontend:**
- React.js
- Axios
- React Router DOM

---

## 🚀 Getting Started

### Backend Setup

1. **Install Dependencies**

```bash
npm install
```

2. **Create Uploads Folder**

```bash
mkdir uploads
```

3. **Start Server**

```bash
node server.js
```

> Make sure MongoDB is running on your system or connected via cloud.

---

### Frontend Setup

1. Navigate to frontend directory (if separated)

```bash
cd client
npm install
npm start
```

---

## 📂 Project Structure

```
/backend
  |-- models.js        # Mongoose user schema
  |-- routes/
      |-- auth.js      # Register, login, and account routes
  |-- server.js        # Main entry point (Express app)
  |-- uploads/         # Image upload folder (served statically)

  /client              # Frontend React code (optional)
```

---


## 📬 API Endpoints

### `POST /register`

Registers a new user.

- **Body (multipart/form-data):**
  - `name`, `email`, `password`, `company`, `age`, `dob`
  - `image` (file upload)

### `POST /user-details`

Fetches user data by email.

### `POST /remove-account`

Deletes the user by email.

---

## 🧠 Learnings

- Used **Multer** for secure file upload and validation.
- Learned about serving static files with Express.
- Stored image file path instead of base64 blobs for performance.
- Full integration of backend and frontend image handling.

---

## 🧑‍💻 Author

**Sharath Chandra Akkaldevi**

---

## 📝 License

This project is part of a technical assignment and is intended for educational/demo purposes.
