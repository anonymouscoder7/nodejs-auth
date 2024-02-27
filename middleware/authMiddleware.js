function isAuthenticated(req, res, next) {
    // console.log(req);
    // Check if user is authenticated
    if (req.isAuthenticated()) {
        // User is authenticated, proceed to the next middleware
        return next();
    }
    // User is not authenticated, redirect to login page or send 401 Unauthorized response
    res.redirect('/login');
}

function isAdmin(req, res, next) {
    // Assuming user information is stored in req.user after authentication
    if (req.user && req.user.role === 'admin') {
        // User is an admin, proceed to the next middleware
        return next();
    }
    // User is not an admin, send 403 Forbidden response
    res.status(403).send('You are not authorized to access this resource.');
}


module.exports = { isAuthenticated, isAdmin };
