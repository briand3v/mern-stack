const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const app = express();
const apiPort = 3000;
const db = require('./db');
const passport = require('passport');
const posts = require('./routes/post.routes');
const authentication = require('./routes/authentication.routes');
const passportMiddleware = require('./middleware/passport.middleware');
const authenticateMiddleware = require('./middleware/authenticate.middleware');

require('dotenv').config();

passportMiddleware.init();
authenticateMiddleware.init();
passportMiddleware.serializeUser();
passportMiddleware.deserializeUser();

morgan.format('myformat', '[:method :url] :status :res[content-length] - :response-time ms');
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(bodyParser.json());

app.use(passport.initialize());

app.use('/api', posts);
app.use('/api/auth', authentication);

db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.listen(apiPort, () => console.log(`Server running on port ${apiPort}`));
