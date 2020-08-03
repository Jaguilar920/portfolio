/////////////////
// Constants
/////////////////
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const Character = require('./models/characters.js');
const methodOverride = require('method-override');
const characterController = require('./controllers/portfolio.js');

require('dotenv').config();
const port = process.env.PORT || 3000;
// const userController = require('./controllers/users_controller.js');
// const session = require('express-session');
// const User = require('./models/users.js');
// const bcrypt = require('bcryptjs');
const MONGODB_URI = process.env.MONGODB_URI || "localhost:3000/JAguilar";

/*  Middle */
app.use(express.static('public'));
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride('_method'));
// app.use(
//     session({
//         secret: process.env.SECRET,
//         resave: false,
//         saveUninitialized: false,
//     })
// );
app.set('view engine', 'jsx');
app.engine('jsx', require('express-react-views').createEngine());

// app.use('/user', userController);

mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useFindAndModify: true,
    useUnifiedTopology: true,
});
mongoose.connection.once('open', () => {
    console.log('mdb connect')
});

router.post('/', async (req, res) => {
    try {
        console.log(req.body);
        const createdCharacter = await Character.create(req.body);
        res.status(200).json(createdCharacter);
    } catch (error) {
        res.status(400).json(error);
    }
});

router.get('/', async (req, res) => {
    try {
        const characters = await Character.find({});
        res.status(200).json(characters);
    } catch (error) {
        res.status(400).json(error);
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const deletedCharacter = await Character.findByIdAndDelete(req.params.id);
        res.status(200).json(deletedCharacter);
    } catch (error) {
        res.status(400).json(error);
    }
});

router.put('/:id', async (req, res) => {
    try {
        const updatedCharacter = await Character.findByIdAndUpdate(
            req.params.id,
            req.body
        );
        res.status(200).json(updatedCharacter);
    } catch (error) {
        res.status(400).json(error);
    }
});


/*  authentication  */
// const isAuthenticated = (req, res, next) => {
//     if (req.session.currentUser) {
//         return next();
//     } else {
//         res.redirect('/sessions/new');
//     }
// };

/*  Log  */
// app.get('/sessions/new', (req, res) => {
//     res.render('sessions/New', { currentUser: req.session.currentUser });
// });

// /*  Authentication  */
// app.post('/sessions/', (req, res) => {
//     User.findOne({ username: req.body.username }, (err, foundUser) => {
//         if (err) {
//             res.send(err);
//         } else if (!foundUser) {
//             res.redirect('/user/new');
//         } else {
//             if (bcrypt.compareSync(req.body.password, foundUser.password)) {
//                 req.session.currentUser = foundUser.username;
//                 res.redirect('/dnd/');
//             } else {
//                 res.send('Invalid Username or Password');
//             }
//         }
//     });
// });

// app.delete('/sessions/', (req, res) => {
//     req.session.destroy(() => {
//         res.redirect('/sessions/new');
//     });
// });
const characterController = require('./controllers/portfolio.js');
app.use('/JAguilar', characterController);

app.listen(port, () => {
    console.log('listening on: ' + port);
});