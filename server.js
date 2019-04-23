var express = require ('express');
var mongoose = require ('mongoose');
var bodyParser = require ('body-parser');
var passport = require ('passport');

var user = require('./routes/api/users');
var profile = require('./routes/api/profile');
var posts = require('./routes/api/posts');

var app = express();

// body parser middleware
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
// db config
var db = require('./config/keys').mongoURI;

// connect to mongo db
mongoose
  .connect(db)
  .then(() => console.log('mongoDb connected'))
  .catch(err => console.log(err));

// passport middleware
app.use(passport.initialize());

// passport config
require('./config/passport')(passport);

// use routes
app.use('/api/users', user);
app.use('/api/profile', profile);
app.use('/api/posts', posts);

var port = process.env.port || 5000;

app.listen(port, () => console.log(`server running on port ${port}`));


