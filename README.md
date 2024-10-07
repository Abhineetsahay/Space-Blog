# Space Blog

**Space Blog** is a platform designed for space enthusiasts to create, share, and engage with blogs and news related to space. With features like user authentication, daily news updates, and the ability to create and like blogs, Space Blog offers an engaging experience for anyone interested in the wonders of the universe.

## 🌟 Features

### User Authentication
- **Sign Up & Login**: Users can create an account or log in using their email.
- **Google Authentication**: Fast and secure login using Google accounts.
- **Secure Authentication**: Managed by Firebase for reliable security.

### Blog Management
- **Create Blog**: Users can create and publish their own blogs.
- **View Blogs**: Explore blogs written by other users.
- **Like Blogs**: Engage with content by liking blogs.
- **Comment on Blogs** *(Coming Soon)*: A feature to interact with blog posts through comments.

### Space News
- **Daily Updates**: Stay informed with the latest space-related news every day.
- **Bookmark News**: Save interesting news articles for later reading.
- **Manage Bookmarks**: Easily remove bookmarks when needed.

## 🛠️ Tech Stack

- **Frontend**:
  - **ReactJS**: Framework for building dynamic user interfaces.
  - **Tailwind CSS**: Utility-first CSS framework for styling.
  - **Firebase**: Authentication and real-time database for user management.

- **Backend**:
  - **Node.js**: JavaScript runtime for building server-side applications.
  - **Express.js**: Web framework for Node.js to build RESTful APIs.
  - **TypeScript**: Adds static typing to JavaScript for better code quality.
  - **MongoDB**: NoSQL database for storing user and blog data.
  - **Postman**: Tool for API testing.

## 📁 Folder Structure

```
Space-Blog/
├── node_modules/
├── public/
├── server/
├── src/
│   ├── components/
│   ├── firebase/
│   │   └── Firebase.ts
│   ├── pages/
│   ├── utils/
│   ├── App.tsx
│   ├── index.css
│   ├── index.tsx
│   └── react-app-env.d.ts
├── .env
├── .gitignore
├── package-lock.json
├── package.json
├── README.md
├── tailwind.config.js
└── tsconfig.json
```

## 📦 Installation

### Prerequisites
- **Node.js**: Ensure you have Node.js installed. [Download Node.js](https://nodejs.org/)
- **MongoDB**: Set up a MongoDB database. [Get MongoDB](https://www.mongodb.com/)

### Backend Setup
1. **Clone the Repository**
   ```bash
   git clone https://github.com/Abhineetsahay/Space-Blog.git
   cd Space-Blog/server
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Create Environment Variables**
   - Create a `.env` file in the `server` directory.
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

### Frontend Setup
1. **Navigate to Frontend Directory**
   ```bash
   cd ../src
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Create Environment Variables**
   - Create a `.env` file in the `src` directory.
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

## 📜 API Documentation

### Blog Routes
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

### User Routes
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

### Bookmark Routes
- **Add Bookmark**
  - **Endpoint**: `/api/bookmarks/addBookmark`
  - **Method**: `PUT`

- **Remove Bookmark**
  - **Endpoint**: `/api/bookmarks/removeBookmark`
  - **Method**: `DELETE`
    
## 📧 Contact

For any inquiries or feedback, please reach out to [abhineetsahay@example.com](mailto:abhineetsahay@gmail.com).

Happy Blogging! 🚀✨
