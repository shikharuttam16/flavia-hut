const jwt = require('jsonwebtoken');

async function authToken(req, res, next) {
    try {
        // Get the token from cookies
        const token = req.cookies?.token;

        // If no token, return a 401 Unauthorized response
        if (!token) {
            return res.status(401).json({
                message: "Please Login...!",
                error: true,
                success: false,
            });
        }

        // Verify the token
        jwt.verify(token, process.env.TOKEN_SECRET_KEY, function (err, decoded) {
            if (err) {
                // If error in token verification, return unauthorized
                return res.status(401).json({
                    message: "Invalid or expired token.",
                    error: true,
                    success: false,
                });
            }

            // If token is valid, attach the userId to the request object
            req.userId = decoded?._id;

            // Proceed to the next middleware or route handler
            next();
        });
    } catch (err) {
        // Catch any other errors and send a 400 response
        res.status(400).json({
            message: err.message || err,
            data: [],
            error: true,
            success: false,
        });
    }
}

module.exports = authToken;
