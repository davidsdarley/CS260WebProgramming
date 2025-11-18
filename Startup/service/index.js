const cookieParser = require('cookie-parser');
const bcrypt = require('bcryptjs');
const express = require('express');
const uuid = require('uuid');
const app = express();

const authCookieName = 'token';


/////////////GENERAL APP SETUP STUFF. GOOD FOR OTHER PROJECTS///////////////////
  // The service port. In production the front-end code is statically hosted by the service on the same port.
const port = process.argv.length > 2 ? process.argv[2] : 3000;
  // JSON body parsing using built-in middleware
app.use(express.json());
  // Use the cookie parser middleware for tracking authentication tokens
app.use(cookieParser());
  // Serve up the front-end static content hosting
app.use(express.static('public'));

// Router for service endpoints
var apiRouter = express.Router();
app.use(`/api`, apiRouter);

//Debugging messages
app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next();
  });
////////////////////////////////////////////////////////////////////////////////////


//Eventually replace as we get the database set up
let users = [];


// CreateAuth a new user
apiRouter.post(`/auth/create`, async (req, res) => {
    if (await findUser('username', req.body.username)) {
      res.status(409).send({ msg: 'Existing user' });
    } else {
      const user = await createUser(req.body.username, req.body.password);
  
      setAuthCookie(res, user.token);
      res.send({ username: user.username });
    }
});
  

////////LOGIN LOGOUT STUFF stolen mostly from simon, then adapted to my site////////////////////////////////////////
// GetAuth login an existing user
apiRouter.post('/auth/login', async (req, res) => {
    const user = await findUser('username', req.body.username);
    if (user) {
        if (await bcrypt.compare(req.body.password, user.password)) {
        user.token = uuid.v4();
        setAuthCookie(res, user.token);
        res.send({ username: user.username });
        return;
        }
}
res.status(401).send({ msg: 'Unauthorized' });
});

// DeleteAuth logout a user
apiRouter.delete('/auth/logout', async (req, res) => {
    const user = await findUser('token', req.cookies[authCookieName]);
    if (user) {
        delete user.token;
    }
    res.clearCookie(authCookieName);
    res.status(204).end();
});
////////////////////////////////////////////////////////////////////

//Will need some fanangling to make it work but security is important and we definitely want this to work.
const verifyAuth = async (req, res, next) => {
    const user = await findUser('token', req.cookies[authCookieName]);
    if (user) {
        next();
    } else {
        res.status(401).send({ msg: 'Unauthorized' });
}
};

// Default error handler seemed good to have so I stole it.
app.use(function (err, req, res, next) {
    res.status(500).send({ type: err.name, message: err.message });
  });
// Also seemed like a good default to take so `\ *_* /`
app.use((_req, res) => {
    res.sendFile('index.html', { root: 'public' });
});

///////////// FUNCTIONS FOR USE IN OTHER PLACES /////////////////
async function createUser(username, password) {    //for login and create
    const passwordHash = await bcrypt.hash(password, 10);

    const user = {
        username: username,
        password: passwordHash,
        token: uuid.v4(),
    };
    users.push(user);   // replace with DB stuff

    return user;
}

async function findUser(field, value) {     // rewrite for DB
    if (!value) return null;
  
    return users.find((u) => u[field] === value);
}

function setAuthCookie(res, authToken) {
    res.cookie(authCookieName, authToken, {
      maxAge: 1000 * 60 * 60 * 24 * 365,
      secure: true,
      httpOnly: true,
      sameSite: 'strict',
    });
  }
  
///////////////// And we officially start listening//////////////////
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
  });
  