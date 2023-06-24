require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');

const dbUrl = process.env.DATABASE_URL;
const routes = require('./routes/routes');

mongoose.connect(dbUrl);
const db = mongoose.connection;

db.on('error', (error)=> {
    console.log("terjadi kesalahan saat menghubungkan dengan database: ", error)
})

db.on('connected', ()=>{
    console.log('berhasil menghubungkan dengan database')
})

const app = express();
app.use(express.json());
app.use('/', routes)


app.listen(8080, ()=> {
    console.log('server running on http://localhost:8080')
})