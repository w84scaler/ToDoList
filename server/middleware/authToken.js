const jwt = require('jsonwebtoken');

module.exports = function(req,res,next){
    const token = req.cookies['auth-token'];
    if (token == null) return res.sendStatus(401) 
    try{
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
            if (err) return res.sendStatus(401)
            req.user = user
            next()
        })
    } catch(err){
        res.status(401).send("Invalid token");
    }
}