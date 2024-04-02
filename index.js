//Imports
const express = require('express');
const path = require('path');
const jwt = require('jsonwebtoken')
//Initializations
const getConnection = require('./dbconnection');
const app = express();
const secretKey = "HashPassword"

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname)));
app.use(express.urlencoded({ extended: true }));


app.set('view engine','ejs')

//Will run when GET is called
app.get('/',(req,resp)=>{
    resp.render('login');
});


//Will run when POST is called
app.post('/', async (req, resp) => {
    const { email, password } = req.body;

    // Query the database to find the user with the provided email and password
    const db = await getConnection();
    const user = await db.findOne({ email, password });

    if (!user) {
        // If user not found or password doesn't match, return error
        return resp.status(401).send('Invalid email or password');
    }

    // If email and password are correct, generate JWT token
    const token = jwt.sign({ email }, secretKey, { expiresIn: '1h' });

    // Redirect to profile page with token as query parameter
    resp.redirect(`/profile?token=${token}`);
});

// Profile route (protected route)
app.get('/profile', verifyToken, (req, res) => {
    // Decode JWT token to get user information
    const decodedToken = jwt.verify(req.query.token, secretKey);
    
    // Render the profile page with user information
    res.render('profile', { email: decodedToken.email });
});

// Verify JWT middleware
function verifyToken(req, res, next) {
    const token = req.query.token;

    if (!token) {
        return res.status(403).send('Token not provided');
    }

    jwt.verify(token, secretKey, (err, decoded) => {
        if (err) {
            return res.status(401).send('Invalid token');
        }
        req.decoded = decoded;
        next();
    });
}


app.listen(4500);