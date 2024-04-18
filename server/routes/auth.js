const router = require("express").Router();
const User = require("../models/user");
const bcrypt = require("bcrypt");
 
router.post("/register" , async (req, res) => {
    const {name , email, password} = req.body;

    console.log(req.body);
    const oldUser = await User.findOne({email: email});

    if ( oldUser){
        // return res.send({data : "User already exist"});
        return res.status(200).json({ message: "User already exist"});
    }
    const encryptedPassword = await bcrypt.hash(password , 10);
    try {
        await User.create({
            name, email, password: encryptedPassword,
        });
        // res.send({ data: "User created"})
        return res.status(200).json({ message: "User created"});
    } catch (error) {
        res.send({status: "error" , data: error})
    }
});

router.post("/signin", async (req, res) => {
    const { email, password }= req.body;
    console.log(req.body);
    const oldUser = await User.findOne({ email: email});
    if ( !oldUser ){
        return res.send({ data: "User do not exist"});
    }
    else{
        const isPasswordValid = await bcrypt.compare(password, oldUser.password);
        if ( isPasswordValid ){
            // res.send({status: "Login Successfull"});
            const { password, ...others } = oldUser._doc;
            res.status(200).json({ others, message: "Login Successfull" })
            // return res.status(200).json({ message: "Login Successfull"});
        }
        else{
            // res.send({status: "Incorrect Password"});
            return res.status(200).json({ message: "Incorrect Password"});

        }
    }
    // try {
    //     const user = await User.findOne({ email : req.body.email });
    //     if ( !user ){
    //         res.status(400).json({ message: "Please Sign Up First" })
    //     }

    //     const isPasswordCorrect = bcrypt.compareSync(
    //         req.body.password,
    //         user.password
    //     );
    //     if(!isPasswordCorrect){
    //         res.status(400).json({ message: "Password is not correct" });
    //     }
    //     else{
    //     const { password, ...others } = user._doc;
    //     res.status(200).json({ others })
    //     }
    // } catch (error) {
    //     res.status(400).json({ message: "User Already Exist" });
    // }
})

module.exports = router;