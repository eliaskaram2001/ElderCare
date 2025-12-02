# ElderCare

ElderCare is a web application that connects elderly customers who need help with daily activities to local businesses or individual caregivers who can provide those services. The system supports three main roles:

- **Customer** – posts requests and hires providers  
- **Business / Care provider** – offers services and applies for jobs  
- **Admin** – moderates activity and keeps the platform safe  

This repository contains both the **backend** and **frontend** code for the prototype built for the ICSI 418Y Software Engineering course.

---

## Features

### Customer

- Create an account and log in  
- Post jobs / requests for help with daily tasks  
- Browse and filter available services  
- Hire a business / provider  
- View past jobs and purchasing history  
- Leave reviews and ratings for completed jobs  
- Report businesses for inappropriate behavior  

### Business / Care provider

- Create a business profile and log in  
- Advertise services and tag jobs (e.g., cleaning, transport, groceries)  
- Browse customer job posts and apply for suitable jobs  
- View job history and income overview  
- Receive and display reviews from customers  
- Optionally review customers after a job is finished  

### Admin

- View and moderate all jobs posted on the platform  
- Review user reports and issue warnings / suspensions / bans  
- Remove inappropriate or abusive reviews  
- Correct incorrectly tagged jobs to keep listings organized  
- Monitor basic user activity to identify potential issues  

---

## Tech stack

- **Backend:** Java, Spring Boot, Maven  
- **Database:** MySQL  
- **Frontend:** JavaScript single-page application, HTML, CSS  
- **Tools:** IntelliJ IDEA / VS Code, Git, GitHub  

---

## Project structure

```text
ElderCare/
├── eldercare-backend/      # Spring Boot backend (REST API, business logic, DB access)
│   ├── src/                # Java source code
│   ├── pom.xml             # Maven configuration
│   └── sql/                # SQL scripts for schema + seed data
├── eldercare-frontend/     # Frontend project (JS, HTML, CSS)
│   ├── src/                # UI components and pages
│   └── package.json        # Frontend dependencies and scripts
├── .idea/                  # IDE metadata (can be ignored)
├── out/                    # Build output (can be ignored)
└── .DS_Store               # macOS file (should be ignored)


> In a clean setup, `.idea/`, `out/`, and `.DS_Store` can be added to `.gitignore`.
```
---
## Prerequisites

To run the full application locally, you should have:

- **Java 17+** (or the version used by your team)
- **Maven 3+**
- **Node.js + npm** (for the frontend)
- **MySQL** server

---

## Backend setup (Spring Boot + MySQL)

1. **Clone the repository**

   ```bash
   git clone https://github.com/eliaskaram2001/ElderCare.git
   cd ElderCare

---


2. **Create the database**

   ```sql
   CREATE DATABASE eldercare;
   ```

   Then run the SQL scripts in `eldercare-backend/sql/` to create tables and optional sample data.

3. **Configure database credentials**

   Edit `eldercare-backend/src/main/resources/application.properties`:

   ```properties
   spring.datasource.url=jdbc:mysql://localhost:3306/eldercare
   spring.datasource.username=YOUR_USERNAME
   spring.datasource.password=YOUR_PASSWORD
   ```

4. **Build and run the backend**

   ```bash
   cd eldercare-backend
   mvn clean install
   mvn spring-boot:run
   ```

---

## Frontend setup

1. In a new terminal:

   ```bash
   cd ElderCare/eldercare-frontend
   npm install
   npm start
   ```

2. The frontend is usually available at:

   - Frontend: `http://localhost:3000`  
   - Backend API: `http://localhost:8080`  

---

## Contributors(There is no particular order.)

- Elias Karam  
- Joe Del Balzo  
- Yanjiao Tan  
- Micah Wang  
- Lan Weiming  
- Zexin Li  
