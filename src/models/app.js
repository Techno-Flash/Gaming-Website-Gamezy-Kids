const express = require('express');
const app = express();
const hbs = require('hbs');
const bodyParser = require('body-parser')
const bcrypt = require("bcryptjs")

const path = require('path');
const port = 3000;


require("../db/connection");
const Register = require('./registers')


app.use(bodyParser.json());    // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({ extended: true }));


const static_path = path.join(__dirname, "../../public");
const templates_path = path.join(__dirname,"../../templates/views");
const partials_path = path.join(__dirname, "../../templates/partials");
// console.log(static_path);


app.set('view engine', 'hbs');
app.set('views', templates_path);
hbs.registerPartials(partials_path);


app.use(express.static(static_path));


// routing
app.get('/', (req, res) => {
    res.status(200).render('index-base');
})

app.get('/login', (req, res) => {
    res.status(200).render('index')
})

app.get('/about',(req,res)=>{
    res.render("about")
})

app.get('/contact',(req,res)=>{
    res.render("Contact")
})

app.get('/games',(req,res)=>{
    res.render("games")
})

app.get('*',(req,res)=>{
    res.render("Not_found")
})


app.post('/signup', async (req,res) =>{
    try {

        const registerEmployee = new Register({
            name : req.body.name,
            email : req.body.email,
            password : req.body.password
        })

        const registered = await registerEmployee.save();
        res.status(200).render("games")

    }catch (error) {
        res.status(400).send(error)
    }
});


app.post("/login", async (req,res)=>{
    try{

        const email = req.body.email;
        const password = req.body.password;

        const usermail = await Register.findOne({email : email});

        // const isMatch = await bcrypt.compare(password, usermail.password);

        if(usermail.password == password){
            res.status(201).render("games");
        }else{
            res.render("invalid_login");
        }

    }catch (error){
            res.status(400).render("invalid_login")
    }

})

app.listen(port, () => {
    console.log(`Successfully running on port ${port}`);
})