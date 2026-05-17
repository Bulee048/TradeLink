# TradeLink - Mini Service Request Board

TradeLink is a full-stack web application designed for homeowners to post service requests and for tradespeople to browse and manage them. (Example: "Need a plumber for a leaking tap in Colombo 07"). This project was built as a technical assessment for the Full-Stack Developer Intern role at **GlobalTNA**.

## 🚀 Tech Stack

- **Frontend**: Next.js 14+ (App Router)
- **Backend**: Node.js & Express.js
- **Database**: MongoDB Atlas
- **ODM**: Mongoose
- **Styling**: Tailwind CSS

## 🛠️ Project Structure

The project is divided into two main directories:
- `/backend`: The Express.js REST API.
- `/frontend`: The Next.js web application.

## ⚙️ Setup Instructions

### 1. Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### 2. Environment Variables

Create a `.env` file in the **backend** directory:
```env
MONGO_URI=your_mongodb_atlas_connection_string
PORT=5000
```

Create a `.env.local` file in the **frontend** directory:
```env
NEXT_PUBLIC_API_URL=http://127.0.0.1:5000
```

### 3. Installation

Install dependencies for both parts:

```bash
# Backend
cd backend
npm install

# Frontend
cd ../frontend
npm install
```

## 🏃‍♂️ Run Instructions

### Start the Backend
```bash
cd backend
npm run dev
```

### Seed the Database (Optional)
To populate the database with professional Sri Lankan themed sample jobs:
```bash
cd backend
npm run seed
```

### Start the Frontend
```bash
cd frontend
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to view the app.

## 📡 API Endpoints

- `GET /api/jobs` - List all jobs (Supports filters: `category`, `status`, `search`)
- `GET /api/jobs/:id` - Get job details
- `POST /api/jobs` - Create a new job request
- `PATCH /api/jobs/:id` - Update job status
- `DELETE /api/jobs/:id` - Remove a job posting

## ✨ Key Features
- **Premium UI**: Modern glassmorphism design with responsive layouts.
- **Real-time Search**: Debounced keyword search across titles and descriptions.
- **Fail-safe Mode**: Backend includes a mock-data fallback if the database connection is slow.
- **Validation**: Strict input validation on both client and server sides.

DEMO Vedio Link
https://drive.google.com/file/d/12NSbpvA0aBYH-z3GluAtVBDonnPAsa1g/view?usp=sharing
---
Built by **Nethshan Dulmin** for the GlobalTNA Technical Assessment.
