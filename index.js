const express = require('express');
require('dotenv').config();
const app = express();
const cors = require('cors');
const helmet = require('helmet');
const Category = require('./Models/category');
const connectDB = require('./Config/db');

// Require Middleware
app.use(express.json());
app.use(cors());
app.use(helmet({
    contentSecurityPolicy: {
        directives: {
            defaultSrc: ["'self"],
            scriptSrc: ["'self"]
        }
    },
    referrerPolicy: {policy: 'same-origin'}
}));

app.get('/', (req, res) => {
    res.status(200).send('Welcome to Uplanit')
});

app.get('/category', async (req, res) => {
    const bussiness_name = req.query.b_name;
    const bussiness_description = req.query.b_desc;
    const events = req.query.events;
    const categories = req.query.categories;

    try{
        let category = new Category({
            bussiness_name,
            bussiness_description,
            events,
            categories
        });
            
        await category.save();
        return res.json({
            "message" : "Category Submitted",
            "success" : true,
            "data" : category
        })


    }
    catch(err){
       return res.status(500).send({
            success: false,
            Error: err
        })
    }
});

app.get('/get_categories',async (req, res) => {
    const categories = await Category.find();
    res.json(categories);
});


const port = process.env.PORT || 9999

// Connect Database and start Server
connectDB().then(() =>{
    app.listen( port, () => {
        console.log(`App listening on PORT ${port}`)
    });
});