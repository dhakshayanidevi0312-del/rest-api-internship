const express = require("express");
const Database = require("better-sqlite3");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");

const app = express();
const PORT = 3000;

// Security middleware
app.use(helmet());

// Rate limiting
const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    message: {
        error: "Too many requests. Please try again later."
    }
});

app.use("/api", apiLimiter);

// JSON body parser
app.use(express.json());
// Request logging
app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
    next();
});

// Serve frontend
app.use(express.static("public"));

// Database
const db = new Database("internships.db");

// Create internships table
db.exec(`
    CREATE TABLE IF NOT EXISTS internships (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        company TEXT NOT NULL,
        domain TEXT NOT NULL,
        location TEXT
    )
`);

// Create applications table
db.exec(`
    CREATE TABLE IF NOT EXISTS applications (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        email TEXT NOT NULL,
        internship TEXT NOT NULL
    )
`);

// Add sample internship data
const count = db.prepare(
    "SELECT COUNT(*) AS count FROM internships"
).get();

if (count.count === 0) {
    const insert = db.prepare(`
        INSERT INTO internships
        (title, company, domain, location)
        VALUES (?, ?, ?, ?)
    `);

    insert.run(
        "Python Developer Intern",
        "Tech Solutions",
        "Python",
        "Chennai"
    );

    insert.run(
        "Data Analyst Intern",
        "DataWorks",
        "Data Analytics",
        "Remote"
    );

    insert.run(
        "Web Development Intern",
        "WebTech",
        "Full Stack Development",
        "Bangalore"
    );
}
app.get("/health", (req, res) => {
    res.status(200).json({
        status: "OK",
        message: "Internship Portal is healthy"
    });
});

// Home route
app.get("/", (req, res) => {
    res.sendFile(__dirname + "/public/index.html");
});

// GET all internships
app.get("/api/internships", (req, res) => {
    const internships = db
        .prepare("SELECT * FROM internships")
        .all();

    res.status(200).json(internships);
});

// GET one internship
app.get("/api/internships/:id", (req, res) => {
    const internship = db
        .prepare("SELECT * FROM internships WHERE id = ?")
        .get(req.params.id);

    if (!internship) {
        return res.status(404).json({
            error: "Internship not found"
        });
    }

    res.status(200).json(internship);
});

// POST - Create internship
app.post("/api/internships", (req, res) => {
    const { title, company, domain, location } = req.body;

    if (!title || !company || !domain) {
        return res.status(400).json({
            error: "Title, company and domain are required"
        });
    }

    const result = db
        .prepare(`
            INSERT INTO internships
            (title, company, domain, location)
            VALUES (?, ?, ?, ?)
        `)
        .run(title, company, domain, location || "");

    res.status(201).json({
        message: "Internship created successfully",
        id: result.lastInsertRowid
    });
});

// PUT - Update internship
app.put("/api/internships/:id", (req, res) => {
    const { title, company, domain, location } = req.body;

    if (!title || !company || !domain) {
        return res.status(400).json({
            error: "Title, company and domain are required"
        });
    }

    const result = db
        .prepare(`
            UPDATE internships
            SET title = ?, company = ?, domain = ?, location = ?
            WHERE id = ?
        `)
        .run(
            title,
            company,
            domain,
            location || "",
            req.params.id
        );

    if (result.changes === 0) {
        return res.status(404).json({
            error: "Internship not found"
        });
    }

    res.status(200).json({
        message: "Internship updated successfully"
    });
});

// DELETE - Delete internship
app.delete("/api/internships/:id", (req, res) => {
    const result = db
        .prepare("DELETE FROM internships WHERE id = ?")
        .run(req.params.id);

    if (result.changes === 0) {
        return res.status(404).json({
            error: "Internship not found"
        });
    }

    res.status(200).json({
        message: "Internship deleted successfully"
    });
});

// POST - Application form
app.post("/api/applications", (req, res) => {
    const { name, email, internship } = req.body;

    if (!name || !email || !internship) {
        return res.status(400).json({
            error: "Name, email and internship are required"
        });
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email)) {
        return res.status(400).json({
            error: "Please provide a valid email address"
        });
    }

    const result = db
        .prepare(`
            INSERT INTO applications
            (name, email, internship)
            VALUES (?, ?, ?)
        `)
        .run(name, email, internship);

    res.status(201).json({
        message: "Application submitted successfully",
        id: result.lastInsertRowid
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});