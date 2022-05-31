const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const bodyParser = require('body-parser');

const userRoute = require('./routes/User.route');
const StudentGroupRoute = require('./routes/StudentGroup.route');
const submissionType = require('./routes/SubmissionType.route');
const Topics = require('./routes/Topics.route');

dotenv.config();
const app = express();
app.use(cors());
app.use(bodyParser.json());

const PORT = process.env.PORT || 8080;
const MONGODB_URI = process.env.MONGODB_URI;

mongoose.connect(MONGODB_URI,{
    useNewUrlParser:true,
    useUnifiedTopology:true
},(error) => {
    if (error){
        console.log('Error occurred when connecting to the Database: ',error.message);
    }
});

mongoose.connection.once('open',() => {
    console.log('Database connected successfully');
})

app.route('/').get((req,res) => {
    res.send('Test API call');
})

app.use('/user',userRoute());
app.use('/submissionT',submissionType());
app.use('/studentGroup',StudentGroupRoute());
app.use('/TopicSubmit',Topics());

app.use('/submissionTypeUpload', express.static('submissionTypeUpload'));
app.use('/TopicDocUpload', express.static('TopicDocUpload'));


app.listen(PORT,() => {
    console.log(`Server is up and running on port ${PORT}`);
})