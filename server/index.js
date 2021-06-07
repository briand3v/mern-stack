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

// error handler
app.use((err, req, res, next) => {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    // render the error page
    res.status(err.status || 500);
    res.render('error');
});


db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.listen(apiPort, () => console.log(`Server running on port ${apiPort}`));
