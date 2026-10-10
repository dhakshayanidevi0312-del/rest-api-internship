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
## Task 4 - Secure Application Integration

### Integration
- Frontend is served using the public folder.
- Internship data is loaded from the REST API.
- Application form submits data to the application API.
- Frontend and backend are integrated successfully.

### Test Report

| Test | Result |
|---|---|
| Load internship data | Passed |
| Empty form validation | Passed |
| Invalid email validation | Passed |
| Valid application submission | Passed |
| API error handling | Passed |

### Security Checklist

- Helmet security headers enabled.
- API rate limiting enabled.
- Parameterized SQL queries used.
- Server-side input validation implemented.
- Email format validation implemented.
- Required fields are validated before database insertion.

### Task 4 Conclusion

The application successfully integrates the frontend with the REST API and SQLite database. Validation and basic security measures are implemented to improve the reliability and security of the application./
 

## Task 5: Production-Ready Capstone

### Project Overview
The Internship Board is a web application that displays internship opportunities and allows users to submit internship applications. It is developed using HTML, CSS, JavaScript, Node.js, Express.js, and SQLite.

### Key Features
- Display available internship opportunities.
- Submit internship applications through a form.
- Store application data using SQLite.
- Validate user input on the server.
- Use Helmet security headers.
- Apply rate limiting to API requests.
- Provide a health-check endpoint.
- Log incoming HTTP requests in the terminal.
- Responsive user interface for different screen sizes.

### Technologies Used
- HTML5
- CSS3
- JavaScript
- Node.js
- Express.js
- SQLite
- Helmet
- express-rate-limit

### Installation and Setup
1. Install Node.js.
2. Download or clone this repository.
3. Open the project folder in the terminal.
4. Install dependencies using `npm install`.
5. Start the server using `node server.js`.
6. Open `http://localhost:3000` in your browser.

### Health Check
Open `http://localhost:3000/health` to check the server status. The endpoint returns a JSON response indicating that the Internship Portal is healthy.

### Testing Evidence
The following checks were performed manually:

- Verified that the internship listing loads in the browser.
- Tested application submission.
- Checked invalid email validation.
- Verified the health-check endpoint.
- Confirmed that HTTP requests appear in the terminal logs.

### Security Measures
- Server-side input validation.
- Parameterized SQL queries.
- Helmet security headers.
- API rate limiting.

### Future Improvements
- Add automated unit and integration tests.
- Perform detailed accessibility and performance testing.
- Deploy the application to a public hosting platform.
- Improve application monitoring and error reporting.
