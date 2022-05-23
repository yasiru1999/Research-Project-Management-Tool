const Student = require('../models/Student.model');
const Supervisor = require('../models/Supervisor.model');
const PanelMember = require('../models/PanelMember.model');

//User Registration (Student, Staff)
const CreateUser = async (req, res) => {
    const user = req.body;

    if (user && user.isStudent){
        const student = new Student(user);

        await student.save().then((data) =>
            res.status(200).
            send({
                success:true,
                user: data
            })).catch((err) => res.status(500).send(err.message))
    }else if(user && user.isSupervisor){
        const supervisor = new Supervisor(user);

        await supervisor.save().then((data) =>
            res.status(200).
            send({
                success:true,
                user:data
            })).catch((err) => res.status(500).send(err.message))
    }else{
        const panelMember = new PanelMember(user);

        await panelMember.save().then((data) => res.status(200).
            send({
                success:true,
                user:data
            })).catch((err) => res.status(500).send(err.message))
    }
}

module.exports = {
    CreateUser
}