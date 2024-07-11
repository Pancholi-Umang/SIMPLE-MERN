import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import { UserModel } from './Models/User.js';

const app = express()
app.use(cors())
app.use(express.json())

mongoose.connect("mongodb://127.0.0.1:27017/ecommerce", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})

app.get('/', async (req, res) => {
    try {
        const users = await UserModel.find({});
        res.status(200)?.json(users);
    } catch (err) {
        res.status(500)?.json(err);
    }
});

app.get('/singleUser/:id', async (req, res) => {
    //if you use id using destructure so you can must write in obj 
    // like this UserModel.findById({id}) 
    try {
        const user = await UserModel.findById(req?.params?.id);
        res.status(200)?.json(user);
    } catch (err) {
        res.status(500)?.json(err);
    }
})

app.delete('/deleteUser/:id', async (req, res) => {
    const id = req?.params?.id;
    try {
        const user = await UserModel.findByIdAndDelete({ _id: id }, req?.body, { new: true });
        res.status(200)?.json(user);
    } catch (err) {
        res.status(500)?.json(err);
    }
})

app.put('/updateUser/:id', async (req, res) => {
    const id = req?.params?.id;
    //{ new: true } aano use no karvathi record update kari nakhe chhe but response ma to juno j data aape chhe
    // updateOne method thi aknowledgement truw lakhelu aavse
    try {
        const data = await UserModel?.findByIdAndUpdate({ _id: id }, req?.body, { new: true });
        res.status(200)?.json(data);
    } catch (err) {
        res.status(500)?.json({ message: "Something went wrong" });
    }
})

// create User post Api
app.post("/createUser", async (req, res) => {
    //if you use singleUser using destructure OR variable so you can must write in obj 
    // const singleUser = req.body
    // like this UserModel.create({singleUser}) 
    try {
        const user = await UserModel.create(req.body);
        res.status(200)?.json(user);
    } catch (err) {
        res.status(500)?.json(err);
    }
})

app.listen(3001, () => {
    console.log('Server is running on port 3001')
})
