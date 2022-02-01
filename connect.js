const express = require("express")
const app = express()
var port = process.env.PORT || 3000

app.listen(port, function(err){
    console.log("Server started at ", port)
})

const { Client } = require('pg');

/*
const client = new Client({
    user: 'postgres',
    host: 'localhost',
    database: 'Test1',
    password: 'admin',
    port: 5432,
});
*/

const client = new Client({
    user: 'qokaxtgnwhotsn',
    host: 'ec2-3-212-143-188.compute-1.amazonaws.com',
    database: 'd2u1pvekjgigqd',
    password: 'b57dd8a60622b34977c3d2c1abb05e1a2beebd56df2f42e484783f2e2e573cf5',
    port: 5432,
});

client.connect();

app.get("/", function(req, res){
    res.send("in home page")
})

app.get("/tablecreate", function(req, res){
    //executing create table query
    var query = `
    CREATE TABLE users (
        email varchar,
        firstName varchar,
        lastName varchar,
        age int
    );`;

    client.query(query, (err, result) => {
        if (err) {
            res.send("table creation error : ", err);
            return;
        }
        res.send('Table is successfully created');
    });
})


app.get("/insertrow", function(req, res){
    //inserting data
    query = `
    INSERT INTO users (email, firstName, lastName, age)
    VALUES ('johndoe@gmail.com', 'john', 'doe', 21)
    `;

    client.query(query, (err, result) => {
        if (err) {
            res.send("row insert error : ", err);
            return;
        }
        res.send('Data insert successful');
    });
})

app.get("/getdata", function(req, res){
    var query = `
    SELECT *
    FROM users
    `;

    client.query(query, (err, result) => {
        if (err) {
            res.send("error in select : ", err);
            return;
        }
        var html = "";
        for (let row of result.rows) {
            html = html + "<br>" + row.email
        }
        res.send(html);
    });
})