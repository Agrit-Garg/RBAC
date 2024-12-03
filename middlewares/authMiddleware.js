const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
    let token;
    // Get the authorization header from request headers
    let authHeader = req.headers.Authorization || req.headers.authorization; 
    
    // Check if the token is provided in the 'Bearer' format
    if (authHeader && authHeader.startsWith("Bearer")) {
        token = authHeader.split(" ")[1]; // Extract the token part
        
        // If no token is found, return 401 Unauthorized
        if (!token) {
            return res.status(401).json({ message: "Access denied. No token provided." });
        }

        try {
            // Verify the token with the secret key
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            
            // Attach the decoded user info to the request object
            req.user = decoded;
            next(); // Proceed to the next middleware or route handler
        } catch (error) {
            res.status(403).json({ message: "Invalid or expired token." }); 
        }
    } else {
        res.status(401).json({ message: "No token found." }); // Handle missing token
    }
};

module.exports = verifyToken; 
