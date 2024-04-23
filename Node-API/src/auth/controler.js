const jwt = require('./JWTconf');

exports.verifyToken = (req, res) => {
    const token = req.headers.authorization?.split(' ')[1];
    console.log(token);
    if (!token) {
        return res.status(403).send({connected : false});
    }

    let result=jwt.controllerToken(token);

    if(result.connected)
    {
        // console.log("Token is valid");
        res.status(200).send(result);
    }
    else
    {
        // console.log("Token is invalid");
        res.status(401).send(result);
    }
}