const express = require("express");
const Database = require("better-sqlite3");

const app = express();

app.use(express.json());

const db = new Database("internships.db");

// Create table
db.exec(`
    CREATE TABLE IF NOT EXISTS internships (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        company TEXT NOT NULL,
        domain TEXT NOT NULL,
        location TEXT
    )
`);

// Add sample data if database is empty
const count = db.prepare("SELECT COUNT(*) AS count FROM internships").get();

if (count.count === 0) {
    const insert = db.prepare(`
        INSERT INTO internships (title, company, domain, location)
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

// Home route
app.get("/", (req, res) => {
    res.json({
        message: "Internship REST API is running"
    });
});

// GET - Get all internships
app.get("/api/internships", (req, res) => {
    const internships = db
        .prepare("SELECT * FROM internships")
        .all();

    res.status(200).json(internships);
});

// GET - Get one internship
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

// Start server
const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});