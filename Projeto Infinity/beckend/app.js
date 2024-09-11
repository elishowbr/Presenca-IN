require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const uuid = require("uuid")

const app = express()

// Config JSON response
app.use(express.json())

//Models
const Monitor = require('./models/Monitor')

// Open Route - Public Route
app.get('/', (req, res) =>{
    res.status(200).json({msg: 'Bem vindo a nossa API!'})
})

// Register Monitor
app.post('/auth/register', async(req, res)=>{

    const {name, email, password, confirmpassword, cargo} = req.body

    // validations
    if(!name) {
        return res.status(422).json({msg: "O nome é obrigatório!"})
    }
    if(!password) {
        return res.status(422).json({msg: "A senha é obrigatório!"})
    }
    if(!email) {
        return res.status(422).json({msg: "O email é obrigatório!"})
    }

    if(password !== confirmpassword){
        return res.status(422).json({ msg: "As senha não conferem" })
    } 

    // check if user exists
    const userExists = await Monitor.findOne({email: email})

    if (userExists){
        return res.status(422).json({ msg: "O email já está cadastrado" })
    }

    // create password
    const salt = await bcrypt.genSalt(12)
    const passwordHash = await bcrypt.hash(password, salt)
    // create user
    const user = new Monitor({
        name,
        email,
        password: passwordHash,
        cargo
    })

    try {
        await user.save()

        res.status(201).json({msg:"Usuario criado com sucesso", user})
    }catch(error){
        console.log(error)

        res.status(500).json({msg: "TOOOO FRACOOOO"})
    }
})
    // Login Monitor
    app.post("/auth/login", async (req, res) => {

        const {email, password} = req.body

        //validations
        if (!password) {
            return res.status(422).json({ msg: "A senha é obrigatório!" })
        }
        if (!email) {
            return res.status(422).json({ msg: "O email é obrigatório!" })
        }

        // check if user exist
        const user = await Monitor.findOne({ email: email })
        console.log(user)
        if(!user){
            return res.status(404).json({msg:"Email não cadastrado"})
        }

        // check if password match
        const  checkPassword = await bcrypt.compare(password, user.password)
        if (!checkPassword) {
            return res.status(422).json({ msg: "Senha inválida" })
        }
        try {
            res.status(201).json({ msg: "Bem vindo"})
        } catch (error) {
            console.log(error)

            res.status(500).json({ msg: "TOOOO FRACOOOO" })
        }
    })

// Credencials
const dbUser = process.env.DB_USER
const dbPassword = process.env.DB_PASS

mongoose
    .connect(`mongodb+srv://${dbUser}:${dbPassword}@infinitychamada.795abbk.mongodb.net/?retryWrites=true&w=majority&appName=InfinityChamada`)
    .then(() => {
        app.listen(3000)
        console.log('Conectou ao banco!')
    })
    .catch((err)=> console.log(err))



    ijfhalsojkhdlojkaslkhabslasdhgfliuaf
    fçukasdyhfulikasdfghbd