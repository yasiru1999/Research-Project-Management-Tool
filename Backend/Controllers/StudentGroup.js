const StudentGroup = require("../models/StudentGroup.model");
const {request, response} = require("express");

//Add Student Group
const addStudentGroup = async (request,response) => {

    const StuGroup = new StudentGroup(request.body);
    console.log(StuGroup);

    await StuGroup.save().
        then((data) => {
            response.status(200).send({
                StuGroup:data,
                success:true
            }).
                catch((err) => {
                    console.log(err.message);
                    response.status(500).send({error: err.message});
            });
    })
}

//View Student Groups
const viewStudentGroups = async (request,response) => {
    try{
        const stuGroup = await StudentGroup.find();
        response.status(200).json({stuGroup:stuGroup});
    } catch (error) {
        response.status(401).json({message:error.message});
    }
};

module.exports = {
    addStudentGroup,
    viewStudentGroups
};

