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
