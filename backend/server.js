const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/rentify', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// User Schema
const UserSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  phoneNumber: String,
  password: String,
});
const User = mongoose.model('User', UserSchema);

// Property Schema
const PropertySchema = new mongoose.Schema({
  title: String,
  description: String,
  place: String,
  area: Number,
  bedrooms: Number,
  bathrooms: Number,
  amenities: String,
  postedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
});
const Property = mongoose.model('Property', PropertySchema);

// Registration route
app.post('/api/register', async (req, res) => {
  const { firstName, lastName, email, phoneNumber, password } = req.body;
  const user = new User({ firstName, lastName, email, phoneNumber, password });
  await user.save();
  res.status(201).send('User registered');
});

// Login route
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email, password });
  if (!user) {
    return res.status(401).send('Invalid credentials');
  }
  res.send('User logged in');
});

// Add property route
app.post('/api/properties', async (req, res) => {
  const { title, description, place, area, bedrooms, bathrooms, amenities } = req.body;
  const property = new Property({ title, description, place, area, bedrooms, bathrooms, amenities });
  await property.save();
  res.status(201).send('Property added');
});

// Get properties route
app.get('/api/properties', async (req, res) => {
  const properties = await Property.find();
  res.json(properties);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
