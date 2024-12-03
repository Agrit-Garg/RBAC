const authorizeRoles = (...allowedRoles) => {
    return (req, res, next) => {
        // Check if the user's role is in the allowed roles
        if (!allowedRoles.includes(req.user.role)) {
            return res.status(403).json({ message: "Access Denied" }); 
        }
        next(); // Proceed to the next middleware or route handler
    };
};

module.exports = authorizeRoles; // Export the middleware
