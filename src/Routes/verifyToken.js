const jwt = require('jsonwebtoken');


exports.isLoggedIn = (req, res, next) => {
    const token =  req.header('auth-token');
    if(!token) return res.status(401).json({error: 'Access denied'});

    try {
        const verified = jwt.verify(token, process.env.JWT_SEC_KEY);
        req.user = verified.user;
        next();
    } catch (error) {
        let message;
        if(!req.user) message = 'Session Timeout! User not found';
        else message  = error;
        res.status(500).json({error: message});
    }
};