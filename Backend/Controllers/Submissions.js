const Submissions = require('../models/Submissions.model');

const addSubmission = async (req, res) => {
    try {
        const submission = await Submissions(req.body).save();
        console.log(res)
        res.status(201).send({data: submission, message: "Submission created successfully"})
    } catch (error) {
        res.status(500).send({message: "Internal Server Error in backend"})
    }
}

// const addSubmission = async (request, response) => {
//     const submission = new Submissions(request.body);
//
//     await submission.save().
//     then((data) => {
//         console.log(data.Exp_Date)
//         response.status(200).send({
//             submissionType: data,
//             success: true
//         }).
//         catch((err) => {
//             response.status(500).send({error: err.message});
//         });
//     }).catch((err) => {
//         response.status(500).send({error: err});
//     })
// }

const getSubmission = async (req, res) => {
    try {
        const submission = await Submissions.find();
        res.status(200).send({data: submission})
    } catch (error) {
        res.status(500).send({message: "Internal Server Error"})
    }
}

module.exports = {
    addSubmission,
    getSubmission
};