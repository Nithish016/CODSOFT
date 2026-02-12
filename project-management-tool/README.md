# ProManage - Project Management Tool

A premium project management tool built with React, Node.js, and MongoDB.

## Features
- **Project Tracking**: Create and manage multiple projects.
- **Task Management**: Assign tasks, set priorities, and track progress.
- **Progress Visualization**: Automatic progress bars based on task completion.
- **Premium UI**: Glassmorphism design with smooth animations.
- **Responsive**: Works on desktop and mobile.

## Tech Stack
- **Frontend**: React, Vite, Framer Motion, Lucide Icons, Axios.
- **Backend**: Node.js, Express, Mongoose.
- **Database**: MongoDB.

## Getting Started

### Prerequisites
- Node.js installed
- MongoDB running locally on `mongodb://localhost:27017/`

### Installation

1. Install root dependencies:
   ```bash
   npm install
   ```

2. Install server dependencies:
   ```bash
   cd server
   npm install
   ```

3. Install client dependencies:
   ```bash
   cd client
   npm install
   ```

### Running the Application

From the root directory, run:
```bash
npm run dev
```
This will start both the server (on port 5000) and the client (usually on port 5173).

## API Endpoints
- `GET /api/projects`: Get all projects
- `POST /api/projects`: Create a project
- `GET /api/tasks/project/:projectId`: Get tasks for a project
- `POST /api/tasks`: Create a task
- `PUT /api/tasks/:id`: Update task status/priority
