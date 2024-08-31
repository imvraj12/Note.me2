const express = require('express');
// Importing user here
const User = require('../Models/User');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const JWT_SECRET = 'deveshisagoodb$oy';
var fetchuser = require("../Middleware/fetchuser");

// ROUTE 1: api/auth/createuser
router.post('/createuser', [
    // We will add all the validations here
    // email must be an email
    body('email', 'Enter a valid email').isEmail(),
    // password must be at least 5 chars long
    body('password', 'Password must be atleast 5 characters').isLength({ min: 5 }),
    // name must be at least 3 chars long
    body('name', 'Enter a valid name').isLength({ min: 3 }),
    ],async (req, res) => {
        success = false;
        // If there are errors, return bad request and the errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ success, errors: errors.array() });
        }

        try{
            // Check whether a user with this email already exists
            let user = await User.findOne({email: req.body.email})
            if(user){
                return res.status(400).json({ success, error: 'Email already in use.'})
            }
            
            const salt = await bcrypt.genSalt(10);
            const secPass = await bcrypt.hash(req.body.password, salt);

            // Creating a new user
            user = await User.create({
                name: req.body.name,
                password: secPass,
                email: req.body.email,
            })
            
            const data = {
                user:{
                    id: user.id
                }
            }

            const authtoken = jwt.sign(data, JWT_SECRET);
            // console.log(authtoken);
            res.json({ success: true, authtoken})
        }

        catch(error){
            console.error(error.message)
            res.status(500).send("Error occurred")
        }
        // .then(user => res.json(user)).catch(err => {console.log(err)
        //     res.json({error: 'Email already in use'});});

})

// ROUTE 1: Authenticate a user using: POST "/api/auth/login". No login required
router.post('/login', [
    // email must be an email
    body('email', 'Enter a valid email').isEmail(),
    // password cannot be blank
    body('password', 'Password cannot be blank').exists(),
    ],async (req, res) => {
        // If there are errors, return bad request and the errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const {email, password} = req.body;
        try {
            let user = await User.findOne({email});
            if (!user) {
                success = false;
                return res.status(400).json({success, error: "Invalid login credentials"});
            }

            // Comparing the password in the database and the one entered by the client
            const compare = await bcrypt.compare(password, user.password)
            if(!compare){
                success = false;
                return res.status(400).json({success, error: "Invalid login credentials"})
            }
            
            const data = {
                user:{
                    id: user.id
                }
            }
            const authtoken = jwt.sign(data, JWT_SECRET);
            success = true;
            // console.log(authtoken);
            res.json({success, authtoken})
        
        } catch (error) {
            console.error(error.message)
            res.status(500).send("Internal server error")
        }

    })

// ROUTE 3: Get details of a logged in user using POST "/api/auth/getuser". Login required
router.post('/getuser', fetchuser, async(req, res) => {
    try {
        const userid = req.user.id;
        const user = await User.findById(userid).select("-password");
        res.send({user})
    } catch (error) {
        console.error(error.message)
        res.status(500).send("Internal server error")
    }
})
module.exports = router;

