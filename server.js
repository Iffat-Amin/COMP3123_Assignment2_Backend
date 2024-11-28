const mongoose = require('mongoose');
const express = require("express")
const Employee = require('./models/Employee');
const User =require('./models/Users')
const employeeRoutes = require('./routes/employeeRoutes'); 
const userRoutes = require('./routes/userRoutes');

const app = express();
app.use(express.json());


const DB_CONNECTION_STRING="mongodb+srv://iffatnabila18:Omornabila17!@cluster0.1rznu.mongodb.net/users?retryWrites=true&w=majority&appName=Cluster0"
mongoose.connect(DB_CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => {
    console.log('Connected to MongoDB');
})
.catch((err) => {
    console.error('MongoDB connection error:', err);
});

//employee route
app.use('/employees', employeeRoutes);

// user routes
app.use('/users', userRoutes);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});