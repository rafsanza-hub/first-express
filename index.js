const express = require('express');
const db = require("./connection");
const createResponse = require('./response');
const app = express();
const port = 3000;

app.get("/", (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;

    db.query("SELECT * FROM voters LIMIT ? OFFSET ?", [limit, offset], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).send(createResponse(500, 'Database query error'));
        }
        
        db.query("SELECT COUNT(*) as total FROM voters", (err, countResult) => {
            if (err) {
                console.error(err);
                return res.status(500).send(createResponse(500, 'Database query error'));
            }

            const totalItems = countResult[0].total;
            const pagination = {
                page,
                limit,
                totalItems,
                totalPages: Math.ceil(totalItems / limit),
            };

            res.json(createResponse(200, 'voters retrieved successfully', result, pagination));
        });
    });
});

app.get("/find", (req, res) => {
    const fullname = req.query.fullname;
    db.query("SELECT * FROM voters WHERE fullname LIKE ?", [`%${fullname}%`], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).send(createResponse(500, 'Database query error'));
        }
        console.log(result);

        return res.status(200).json(createResponse(200, 'voters retrieved successfully', result))
    })
})


app.get("/i", (req, res) => {
    res.send("apa ajaaa  haahahahahahhaah hmmm enak juga yaa");
});


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
