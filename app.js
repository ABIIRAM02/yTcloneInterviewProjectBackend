const express = require('express')
const app = express()
const cors = require('cors')
const PORT = 2001

const mongoose = require('mongoose')
mongoose.set('strictQuery', false)

app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use(cors())

let DBURI = 'mongodb://localhost:27017/Youtube'
mongoose.connect(DBURI)
.then(()=>
{
    console.log("connected to database");
})

let user = require('./Models/user')

app.post('/signup' , async (req ,res)=>
{
    let person = await user.findOne({email:req.body.email}).exec()

    if(person)
    {
        res.send({message:"user already present"})
    }else{
        let userData = new user({
            name:req.body.name,
            email:req.body.email,
            password:req.body.name
        })
        await userData.save()
        res.send({message: "new user created" })
    }
})

app.post('/login' ,async (req ,res)=>
{
    let loginPerson = await user.findOne({email:req.body.email}).exec()
    console.log(loginPerson.password == req.body.password);

    if(loginPerson)
    {
        if(loginPerson.password == req.body.password)
        {
            res.send({message:"Login Successfull" , userData : loginPerson})
        }else{
            res.send({message:"Incorrect password"})
        }

    }
})

app.listen( PORT ,  ()=>
{
    console.log(`listening to ${PORT}`);
})