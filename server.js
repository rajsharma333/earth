const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors')

const app = express();

// mongodb+srv://rajeev333:rajeev333@earth-sjkt1.mongodb.net/test?retryWrites=true&w=majority
const connectDB = async () => {
  try {
    await mongoose.connect('mongodb://localhost:27017/earth', {
      useNewUrlParser: true,
      useCreateIndex:true
    });
    console.log('MongoDB connected');
  } catch(err){
    console.log(err.message);
    process.exit(1);
  }
}

connectDB();

app.use(cors());

//for body parser
app.use(express.json({extended: false}));

app.get('/', (req, res) => res.send('API Running'));

//Define Routes
app.use('/api/user', require('./routes/api/user'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/jobpost', require('./routes/api/jobpost'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
