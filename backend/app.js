const express = require('express');
const cors = require('cors');
const app = express();
const Post = require('./models-schemas/post-model');
const mongoose = require('mongoose');
const Menu = require('./models-schemas/menu');
const userRoutes = require("./routes/user");
const checkAuth = require("./middleware/check-auth");

const bodyParser = require('body-parser');

// connect to dbMenu----- Pass tmMY@QaaBzz5GQ3
mongoose.connect("mongodb+srv://Luiza:tmMY@QaaBzz5GQ3@cluster0.dlhbo.mongodb.net/myFirstDatabase?retryWrites=true&w=majority", { useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
    if (err)
        console.error(err);
    else
        console.log("Connected!!!");
}); 

app.use(bodyParser.json());

app.use(cors());
// mGAD8gFTttX5Sqn

//pt menu
app.get('/menu', (req, res, next) => {
    Menu.find().
        then(list => res.send(list)).
        catch(err => console.log(err));
});

app.post('/menu', (req, res, next) => {
    const menuPost = new Menu({
        name: req.body.name,
        price: req.body.price,
        image: req.body.image,
        info: req.body.info
    });
    menuPost.save();
});
app.delete('/menu/:id', (req, res, next) => {
    const id = req.params.id;
    Menu.deleteOne({ _id: id })
        .then(result => {
            console.log(result)
            res.status(200).json({ message: "Deleted", post: result });
        })
        .catch(err => console.log(err));
});

app.put('/menu/:id', (req, res, next) => {
    const id = req.params.id;
    const menuPut = new Menu(
        {
            _id :id,
            name: req.body.name,
            price: req.body.price,
            image: req.body.image,
            info: req.body.info
        }
    ) ;
    Menu.updateOne({ _id :id, }, menuPut)
        .then(result => {
            console.log("result" +result)
            res.status(200).json({ message: "Updated", menuPut: result });
        })
        .catch(err => console.log(err));

});
app.use("/api/user", userRoutes);

app.use('/', (req, res, next) => {
    res.send('Hello 3000');
});



module.exports = app;