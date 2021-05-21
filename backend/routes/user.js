const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


const User = require("../models-schemas/user");

router.post("/signup", (req, res, next) => {
    bcrypt.hash(req.body.password, 10)
        .then(hash => {
            const newUser = new User({
                email: req.body.email,
                password: hash
            });
            newUser.save()
                .then(result => {
                    res.status(201).json({
                        message: "User created!",
                        result: result
                    });
                })
                .catch(err => {
                    console.log(err);
            })
    })
   
});

router.post("/login", (req, res, next) => {
    let fetchedUser;
    User.findOne({ email: req.body.email }).then(user => {
        console.log("User finded: " + user.password);
        if (!user) {
            return res.status(401).json({
                message: "Auth failed"
            });
        }
        fetchedUser = user;
        return bcrypt.compare(req.body.password, user.password);
    })
        .then(result => {
            console.log("Result: " + result);
            if (!result) {
                return res.status(401).json({
                    message: "Auth failed"
                });
            }
            const token = jwt.sign(
                { email: fetchedUser.email, userId: fetchedUser._id },
                'top_secret',
                { expiresIn: "1h" }
            );
            
            res.status(200).json({
                token: token,
                expiresIn: 600
            })
            console.log("token: " + token);
        })
        .catch(err => {
            console.log(err);
            return res.status(401).json({
                message: "Auth failed"
            });
        })
    
});

router.get("/us", (req, res, next) => {
    User.find().
        then(users => {
            res.send(users);
            console.log(users);
        }).
        catch(err => console.log(err));
});

router.put("/us", (req, res, next) => {
    bcrypt.hash(req.body.password, 10).then(
        hash => {
            User.findByIdAndUpdate(req.body._id, { password: hash }).
                then(result => {
                    res.send(result);
                    console.log(result);
                }).
                catch(err => console.log(err));
        }
    ).catch(err => {
        console.log(err);
    });
   
})

module.exports = router;

// BFEC2DC193AFDD4E782E1F7375D55935056E elasticemailpassword