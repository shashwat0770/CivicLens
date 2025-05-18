# 🏙️ CivicLens – Local Issue Reporting and Resolution

## 🧩 Problem Statement

Local civic issues such as potholes, broken streetlights, open drains, and garbage dumps often go unreported due to inefficient or non-transparent communication between citizens and local authorities. This results in unresolved issues and public dissatisfaction.

![Screenshot 2025-05-18 195825](https://github.com/user-attachments/assets/c1e66a6b-18d9-41f0-a10c-7cf8eabe2b48)



## 💡 Solution Overview

**CivicLens** is a full-stack web platform that allows citizens to report civic problems using images, geo-location, and detailed descriptions. The issues are tracked and visible to municipal authorities who manage their resolution by updating status, assigning technicians, and adding progress notes.

---

## 🚀 Key Features
![Screenshot 2025-05-18 195841](https://github.com/user-attachments/assets/56da7ae9-77cf-4ff0-8ed2-a5dbae646ec1)


### 👤 Citizen Portal

- Register/Login (Email & Google OAuth)
- Submit complaints with:
  - Title & Description
  - Image Upload via **Cloudinary**
![Screenshot 2025-05-18 195800](https://github.com/user-attachments/assets/0bc3f113-6f04-441a-bb53-d341ce0143ef)


![Screenshot 2025-05-18 195808](https://github.com/user-attachments/assets/24420b46-95c8-45d6-adcc-b95577f0cb90)


  - Auto-location using **Google Maps API**
- Track complaint status: `Pending`, `In Progress`, `Resolved`
- View complaint history
- Upvote/comment on neighborhood issues

---

### 🏛️ Authority/Admin Panel

- Admin login for municipal staff
- View complaints by zone or urgency

![Screenshot 2025-05-18 195737](https://github.com/user-attachments/assets/1b0b1542-bb00-4cb0-97d5-427b79306a9f)


![Screenshot 2025-05-18 195746](https://github.com/user-attachments/assets/bb446e6a-1ff9-4be9-9eec-a78439fb3794)


- Assign worker or technician
- Change status and add progress updates
- Dashboard analytics: open/resolved issues, area-wise reports

---

### 📍 Geo-Map Integration

- Interactive map with markers based on issue status
- Filter complaints by location, type, severity
- Citizens view neighborhood complaints
- Marker click reveals issue details

---



## 🛠️ Tech Stack

### 🔷 Frontend

- `React.js` – Component-based UI
- `Redux` – Global state management
- `React Router` – Client-side routing
- `Tailwind CSS` – Utility-first responsive UI
- `Axios` – API calls

### 🔷 Backend

- `Node.js + Express.js` – RESTful APIs
- `Supabase` – Realtime database & user management
- `JWT + Passport.js` – Secure authentication & authorization

### 🌐 External APIs

- `Cloudinary` – Image hosting and optimization
- `Google Maps API` – Map display & geolocation services

---
