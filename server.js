const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');
const session = require('express-session');
const path = require('path');

const app = express();

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/simple_social_media', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// Define user schema
const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
});
const User = mongoose.model('User', userSchema);


// Configure middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json()); // Add this line to enable JSON parsing
app.use(session({
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: false,
}));
app.use(express.static(path.join(__dirname, 'public')));

// Handle GET request to root URL /
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

app.post('/register', async (req, res) => {
  console.log(req.body); // Add this line to check the request body

  const { username, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(409).send('Email already registered');
    }

    const saltRounds = 10;
    bcrypt.genSalt(saltRounds, async (err, salt) => {
      if (err) {
        console.error('Error generating salt:', err);
        return res.status(500).send('Internal Server Error');
      }

      try {
        const hashedPassword = await bcrypt.hash(password, salt);
        const newUser = new User({
          username,
          email,
          password: hashedPassword,
        });

        const savedUser = await newUser.save();
        console.log('User saved:', savedUser);
        req.session.user = savedUser; // Store the user in the session
        res.redirect('/home.html');
      } catch (error) {
        console.error('Error saving user:', error);
        res.status(500).send('Internal Server Error');
      }
    });
  } catch (error) {
    console.error('Error during registration:', error);
    res.status(500).send('Internal Server Error');
  }
});

// Handle POST request to /login endpoint
app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).send('Email not found');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).send('Incorrect password');
    }

    req.session.user = user; // Store the user in the session
    res.redirect('/home.html');
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

// Handle GET request to /profile endpoint
app.get('/profile', async (req, res) => {
  try {
    if (!req.session.user) {
      return res.status(401).send('Unauthorized');
    }

    const user = await User.findById(req.session.user._id);

    if (!user) {
      return res.status(404).send('User not found');
    }

    res.json({ username: user.username, email: user.email });
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

const commentSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  username: String,
  commentText: String,
}, { collection: 'comments' }); // Specify the collection name as 'comments'

const Comment = mongoose.model('Comment', commentSchema);

// Handle POST request to submit a comment
app.post('/comment', async (req, res) => {
  try {
    if (!req.session.user) {
      return res.status(401).send('Unauthorized');
    }

    const { commentText } = req.body;
    const newComment = new Comment({
      _id: new mongoose.Types.ObjectId(),
      username: req.session.user.username,
      commentText,
    });

    const savedComment = await newComment.save();
    console.log('Comment saved:', savedComment);
    res.sendStatus(200);
  } catch (error) {
    console.error('Error saving comment:', error);
    res.status(500).send('Internal Server Error');
  }
});


// Handle GET request to retrieve the current username
app.get('/api/getUsername', (req, res) => {
  if (!req.session.user) {
    return res.status(401).send('Unauthorized');
  }

  res.send(req.session.user.username);
});


// Start the server
app.listen(4000, () => {
  console.log('Server started on http://localhost:4000');
});
