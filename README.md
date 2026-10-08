# REST API and Persistent Data

## Project Description

This project is a REST API for managing internship opportunities.
It is developed using Node.js, Express.js and SQLite database.

The API supports CRUD operations:
- Create internship
- Read internship details
- Update internship
- Delete internship

## Technologies Used

- Node.js
- Express.js
- SQLite
- JavaScript
- REST API

## Database Schema

The project uses an SQLite database named `internships.db`.

### Internships Table

| Column | Type | Description |
|---|---|---|
| id | INTEGER | Primary key |
| title | TEXT | Internship title |
| company | TEXT | Company name |
| domain | TEXT | Internship domain |
| location | TEXT | Internship location |

## Sample Data

The database contains sample internship records:

1. Python Developer Intern - Tech Solutions - Python - Chennai
2. Data Analyst Intern - DataWorks - Data Analytics - Remote
3. Web Development Intern - WebTech - Full Stack Development - Bangalore

## API Endpoints

### GET All Internships

```text
GET /api/internships
POST /api/internships
Example request:
{
  "title": "SQL Developer Intern",
  "company": "TechCorp",
  "domain": "SQL",
  "location": "Chennai"
}
PUT /api/internships/:id
DELETE /api/internships/:id
Validation and Error Handling

The API validates required fields such as title, company and domain.

It uses appropriate HTTP status codes:

200 - Successful request
201 - Resource created
400 - Invalid input
404 - Internship not found
Setup Instructions
Install Node.js.
Open the project folder in VS Code.
Open the terminal.
Install dependencies:
npm install
Start the server:
node server.js
The API will run at:
http://localhost:3000
Project Structure
rest-api-internship/
│
├── server.js
├── package.json
├── package-lock.json
├── internships.db
├── node_modules/
└── README.md
Conclusion
This project demonstrates how to build a REST API with persistent SQLite storage and perform complete CRUD operations with validation and error handling.