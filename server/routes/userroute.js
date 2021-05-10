const router = require("express").Router();
const User = require('../controllers/usercontroller');
const jwt = require('jsonwebtoken');

router.post('/register', async (req, res) => {
    try {
        const saved = await User.register(req.body);
        if (saved)
            res.status(201).send(saved);
        else
        res.status(400).send('DB error while adding user. Json data is incorrect');
    }
    catch {
        res.status(500).send()
    }
})

router.post('/login', async (req, res) => {
    const user = await User.login(req.body)
    if (user == null) return res.status(401).send('Cannot find user')
    if (user.hash == null) return res.status(401).send('Wrong password')
    try {
        const token = jwt.sign({ id: user._id }, process.env.ACCESS_TOKEN_SECRET)
        res.cookie("auth-token", token, { httpOnly: true, maxAge: 600000 }).send();
    }
    catch {
        res.status(500).send()
    }    
})

router.post('/logout', async (req, res) => {
    if(req.cookies['auth-token'])
        res.cookie("auth-token", {}, {httpOnly: true, maxAge: 0}).send();
})

module.exports = router;