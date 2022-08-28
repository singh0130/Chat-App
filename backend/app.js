const sequelize= require('./util/database');
const cors= require('cors');
const express= require('express');
const bodyParser= require('body-parser');
const dotenv= require('dotenv');

const User= require('./models/user');

const userRoutes= require('./routes/user_routes');

const app=express();
dotenv.config();

app.use(cors());
app.use(bodyParser.json());


app.use('/user', userRoutes);

sequelize.sync()
.then(() => {
    app.listen(3000);
})
.catch((err) => {
    console.log(err);
});