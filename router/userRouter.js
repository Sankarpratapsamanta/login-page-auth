const router=require("express").Router();
const User=require("../models/userModel");
const bcrypt= require("bcrypt");
const jwt=require("jsonwebtoken");

//Register Route

router.post('/',async (req,res)=>{
    try {
        const {name, email, gender, password} = req.body;
        if(!name || !email || !password || !gender)
            return res.status(400).json({errorMsg: "Please enter all required field !"})
        
        if(password.length < 6)
            return res.status(400).json({errorMsg: "Please enter password atleast 6 characters !"})

        const existingUser=await User.findOne({email})

        if(existingUser)
            return res.status(400).json({errorMsg: "An account with this mail is already exist ! "})
        
        const salt=await bcrypt.genSalt();
        const passwordHash=await bcrypt.hash(password, salt);
        //save new user
        const newUser= new User({name,email,gender,passwordHash})
        const userSaved=await newUser.save()
        
        const token = jwt.sign({ user: userSaved._id }, process.env.SECRETKEY);

        res.cookie("token", token,{
            httpOnly:true
        }).send();

    } catch (error) {
        console.log(error)
    }
})


//Login Route

router.post('/login',async(req,res)=>{
    try {
        const {email , password}=req.body
        if(!email || !password)
        return res.status(400).json({errorMsg: "Please enter all required field !"})

        const existingUser=await User.findOne({email})
        if(!existingUser)
            return res.status(401).json({errorMsg:"Wrong Email or Password !"})

        const passwordCompare= await bcrypt.compare(password,existingUser.passwordHash)
        if(!passwordCompare)
            return res.status(401).json({errorMsg:"Wrong Email or Password !"})    

        const token = jwt.sign({ user: existingUser._id }, process.env.SECRETKEY);

        res.cookie("token", token,{
            httpOnly:true
        }).send();
    } catch (error) {
        console.log(error)
    }
})

//Logout Route

router.get('/logout',(req,res)=>{
    res.cookie("token","",{
        httpOnly:true,
        expires:new Date()
    }).send()
})

router.get('/loggedIn',(req,res)=>{
    try {
        const token= req.cookies.token;
        // console.log(token)
        if(!token) return res.json(false);

        jwt.verify(token, process.env.SECRETKEY)

        res.send(true)
    } catch (error) {
        res.json(false)
    }
})

module.exports=router