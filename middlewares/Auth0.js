const jwt = require('jsonwebtoken');
const JWTSecret = "bfasidjhbfiudfaifhjnioaefjhiop";

function Auth0(req, res, next) {
    const authToken = req.headers['authorization'];
    if(authToken == undefined) {
        res.status(400);
        res.send('Token Require');
    } else {
        const token = authToken.split(' ');
        var tokenType = token[1];

        jwt.verify(tokenType, JWTSecret,(err, data) => {
            if(err) {
                res.status(401);
                res.send('Invalid Token')
            } else {
                req.token = token;
                req.loggedUser = data;
                next();
            }
        })
    }
}

module.exports = Auth0;