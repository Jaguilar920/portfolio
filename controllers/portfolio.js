const express = require('express');
const router = express.Router();
const Character = require('../models/characters.js');

// const isAuthenticated = (req, res, next) => {
//     if (req.session.currentUser) {
//         return next();
//     } else {
//         res.redirect('/sessions/new');
//     }
// };



/////////
//ROUTES
/////////


/*  Index  */
router.get('/', (req, res) => {
    Character.find({}, (error, allCharacters) => {
        res.render('Index', {
            characters: allCharacters,
            // username: req.session.currentUser,
        });
    });
});

/*  New  */
router.get('/new', (req, res) => {
    res.render('New');
});

/*  Create  */
router.post('/', (req, res) => {
    if (req.body.track === 'on') {
        req.body.track = true;
    } else {
        req.body.track = false;
    }
    console.log(req.body)
    Character.create(req.body, (error, createdCharacter) => {
        console.log(createdCharacter)
        res.redirect('/JAguilar');
    });
});


/*  Delete  */
router.delete('/:id', (req, res) => {
    Character.findByIdAndRemove(req.params.id, (err, data) => {
        res.redirect('/JAguilar');
    });
});

/*  Show  */
router.get('/:id', (req, res) => {
    Character.findById(req.params.id, (error, foundCharacter) => {
        res.render('Show', {
            character: foundCharacter,
        });
    });
});

/*  Edit  */
router.get('/edit/:id', (req, res) => {
    Character.findById(req.params.id, (error, foundCharacter) => {
        res.render('Edit', { character: foundCharacter });
    });
});



/*  update  */
characterController.put('/edit/:id', (req, res) => {
    if (req.body.track === 'on') {
        req.body.track = true;
    } else {
        req.body.track = false;
    }
    console.log(req.body)

    Character.findByIdAndUpdate(req.params.id, req.body, {new: true}, (error, data) => {
        console.log(data)
        res.redirect('/JAguilar');
    });
});


module.exports = router;
