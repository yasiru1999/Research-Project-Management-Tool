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

//Login Registration (Student, Staff , Admin)
const login = async (req, res) => {
    await Student.findOne({id: req.body.id }).then((data) => {
        if(req.body.password === data.password){
            res.status(200).send({
                success: true,
                message: 'Login Success',
                user: data
            })
        }else{
            res.status(500).send({
                success: false,
                message: 'Invalid Password'
            })
        }
    }).catch(async () => {
        await Supervisor.findOne({id: req.body.id}).then((data) => {
            if(req.body.password === data.password){
                res.status(200).send({
                    success:true,
                    message:'Login Success',
                    user: data
                })
            }else{
                res.status(500).send({
                    success:false,
                    message:'Invalid Password'
                })
            }
        }).catch(async () => {
            await PanelMember.findOne({id:req.body.id}).then((data) => {
                if(req.body.password === data.password){
                    res.status(200).send({
                        success:true,
                        message:'Login Success',
                        user:data
                    })
                }else{
                    res.status(500).send({
                        success:false,
                        message:"Invalid Password"
                    })
                }
            }).catch((err) => {
                res.status(500).send({
                    success:false,
                    message:"Invalid User",
                    error: err.message
                })
            })
        })
    })
}


module.exports = {
    login,
    CreateUser
}