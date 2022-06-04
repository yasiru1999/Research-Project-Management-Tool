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

const updateStudentGroups = async (req, res) => {

    StudentGroup.findByIdAndUpdate(req.params.ID,{
        $set:req.body},(err,StudentGroup)=>{
        if(err){
            console.log(err)
            return res.json({ success: false, err });
        }
        return res.status(200).json({
            success:"Update Supervisor Successfully",
            studentGroup:StudentGroup
        });
    });
}

module.exports = {
    addStudentGroup,
    viewStudentGroups,
    updateStudentGroups
};

