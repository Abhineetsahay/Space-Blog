# Space Blog

Space Blog is a dynamic platform where space enthusiasts can create, share, and engage with space-related blogs and news. Whether you're passionate about astronomy, space exploration, or the latest in space technology, Space Blog offers a seamless experience to express your thoughts and stay updated with daily space news.

## 🚀 Features

### **User Authentication**
- **Sign Up & Login**: Create an account or log in using your email.
- **Google Authentication**: Easily sign in with your Google account.
- **Secure Authentication**: Powered by Firebase for reliable security.

### **Blog Management**
- **Create Blog**: Share your thoughts by creating new blogs.
- **View Blogs**: Explore blogs created by other users.
- **Like Blogs**: Show appreciation by liking your favorite blogs.
- **Comment on Blogs** *(Coming Soon)*.

### **Space News**
- **Daily News Updates**: Stay informed with the latest space-related news every day.
- **Bookmark News**: Save your favorite news articles for easy access.
- **Manage Bookmarks**: Remove bookmarks as needed.

## 🛠️ Tech Stack

### **Frontend**
- **ReactJS**: Building dynamic user interfaces.
- **Tailwind CSS**: Styling the application with utility-first CSS framework.
- **Firebase**: Handling authentication and user management.

### **Backend**
- **Node.js & Express.js**: Creating a robust server-side application.
- **TypeScript**: Enhancing JavaScript with static typing.
- **MongoDB**: Managing data with a flexible NoSQL database.
- **REST APIs**: Facilitating communication between frontend and backend.
- **Postman**: Testing APIs to ensure reliability.

## 🔧 Installation

### **Prerequisites**
- **Node.js**: Ensure you have Node.js installed. [Download Node.js](https://nodejs.org/)
- **MongoDB**: Set up a MongoDB database. [Get MongoDB](https://www.mongodb.com/)

### **Backend Setup**
1. **Clone the Repository**
   ```bash
   git clone https://github.com/Abhineetsahay/Space-Blog.git
   cd Space-Blog/backend
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Configure Environment Variables**
   - Create a `.env` file in the `backend` directory.
   - Add the following variables:
     ```env
     PORT=5000
     MONGODB_URI=your_mongodb_connection_string
     FIREBASE_API_KEY=your_firebase_api_key
     FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
     FIREBASE_PROJECT_ID=your_firebase_project_id
     ```

4. **Run the Backend Server**
   ```bash
   npm run start
   ```

### **Frontend Setup**
1. **Navigate to Frontend Directory**
   ```bash
   cd ../frontend
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Configure Environment Variables**
   - Create a `.env` file in the `frontend` directory.
   - Add the following variables:
     ```env
     REACT_APP_FIREBASE_API_KEY=your_firebase_api_key
     REACT_APP_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
     REACT_APP_FIREBASE_PROJECT_ID=your_firebase_project_id
     REACT_APP_API_URL=http://localhost:5000
     ```

4. **Run the Frontend Application**
   ```bash
   npm start
   ```

## 📚 API Documentation

### **Blog Routes**
- **Get All Blogs**
  - **Endpoint**: `/api/blogs/getBlogs`
  - **Method**: `GET`
  - **Description**: Retrieves all blogs.

- **Add a New Blog**
  - **Endpoint**: `/api/blogs/addBlog`
  - **Method**: `POST`
  - **Body Parameters**:
    - `title` (string)
    - `content` (string)
    - `authorId` (string)
  - **Description**: Creates a new blog.

- **Add or Remove Like**
  - **Endpoint**: `/api/blogs/addRemoveLike`
  - **Method**: `POST`
  - **Body Parameters**:
    - `blogId` (string)
    - `userId` (string)
  - **Description**: Toggles like status on a blog.

### **User Routes**
- **Add a New User**
  - **Endpoint**: `/api/users/addUser`
  - **Method**: `POST`
  - **Body Parameters**:
    - `name` (string)
    - `email` (string)
    - `password` (string)
  - **Description**: Registers a new user.

- **Get User Details**
  - **Endpoint**: `/api/users/getUser`
  - **Method**: `GET`
  - **Query Parameters**:
    - `userId` (string)
  - **Description**: Retrieves user information.

- **User Login**
  - **Endpoint**: `/api/users/getUserViaLogin`
  - **Method**: `GET`
  - **Query Parameters**:
    - `email` (string)
    - `password` (string)
  - **Description**: Authenticates a user.

### **Bookmark Routes**
- **Add Bookmark**
  - **Endpoint**: `/api/bookmarks/addBookmark`
  - **Method**: `PUT`
  - 
- **Remove Bookmark**
  - **Endpoint**: `/api/bookmarks/removeBookmark`
  - **Method**: `DELETE`

## 📧 Contact

For any inquiries or feedback, please reach out to [abhineetsahay@example.com](mailto:abhineetsahay@example.com).

---

Happy Blogging! 🚀✨
