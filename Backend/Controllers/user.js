const Student = require('../models/Student.model');
const Supervisor = require('../models/Supervisor.model');
const PanelMember = require('../models/PanelMember.model');
const Admin = require('../models/admin.model');


const createAdmins = async (req, res) => {
    const admin = new Admin({
        id:"admin",
        name: 'admin',
        username: 'admin',
        password: 'admin123',
        isAdmin: true
    });

    let adminData;

    await admin.save().then((data) => {
        adminData = data;
    }).catch((err) => adminData = err.message);

    const dataToSend = {
        admin: adminData
    }

    res.status(200).send(dataToSend);
}

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

const getStudents = async (req, res) => {

    Student.find().exec((err,Student) =>{
        if(err){
            return res.status(400).json({
                err:err
            });
        }
        return res.status(200).json({
            success:true,
            Student:Student
        });
    })
}

const getStudent = async (req, res) => {

    let StudentID = req.params.id;

    Student.findById(StudentID, (err, Student) => {
        if (err) {
            return res.status(400).json({success: false, err});
        }

        return res.status(200).json({
            success: true,
            Student
        })
    })

}

const updateStudent = async (req, res) => {

    Student.findByIdAndUpdate(req.params.ID,{
        $set:req.body},(err,Student)=>{
        if(err){
            console.log(err)
            return res.json({ success: false, err });
            }
        return res.status(200).json({
            success:"Update Student Successfully",
            Student:Student
        });
    });
}

const deleteStudent = async (req, res) => {
console.log(res);
    Student.findByIdAndDelete(req.params.id).exec((err,Student)=>{
        if(err) {
            console.log(err)
            return res.status(400).json({message: "Delete Unsuccessful", err});
        }
        return res.status(200).json({
            message:"Delete Student Successfully",Student
        });
});
}

const getSupervisors = async (req, res) => {

    Supervisor.find().exec((err,Supervisor) =>{
        if(err){
            return res.status(400).json({
                err:err
            });
        }
        return res.status(200).json({
            success:true,
            Supervisor:Supervisor
        });
    })
}

const getSupervisor = async (req, res) => {

    let SupervisorID = req.params.id;

    Supervisor.findById(SupervisorID, (err, Supervisor) => {
        if (err) {
            return res.status(400).json({success: false, err});
        }

        return res.status(200).json({
            success: true,
            Supervisor
        })
    })

}

const updateSupervisor = async (req, res) => {

    Supervisor.findByIdAndUpdate(req.params.ID,{
        $set:req.body},(err,Supervisor)=>{
        if(err){
            console.log(err)
            return res.json({ success: false, err });
        }
        return res.status(200).json({
            success:"Update Supervisor Successfully",
            Supervisor:Supervisor
        });
    });
}

const deleteSupervisor = async (req, res) => {
    console.log(res);
    Supervisor.findByIdAndDelete(req.params.id).exec((err,Supervisor)=>{
        if(err) {
            console.log(err)
            return res.status(400).json({message: "Delete Unsuccessful", err});
        }
            return res.status(200).json({
                message:"Delete Supervisor Successfully",Supervisor
            });
    });
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
            if (req.body.password === data.password) {
                res.status(200).send({
                    success: true,
                    message: 'Login Success',
                    user: data
                })
            } else {
                res.status(500).send({
                    success: false,
                    message: 'Invalid Password'
                })
            }
        }).catch(async () => {
            await PanelMember.findOne({id: req.body.id}).then((data) => {
                if (req.body.password === data.password) {
                    res.status(200).send({
                        success: true,
                        message: 'Login Success',
                        user: data
                    })
                } else {
                    res.status(500).send({
                        success: false,
                        message: "Invalid Password"
                    })
                }
            }).catch(async () => {
                await Admin.findOne({id: req.body.id}).then((dataToSend) => {
                    if (req.body.password === dataToSend.password) {
                        res.status(200).send({
                            success: true,
                            message: 'Login success',
                            user: dataToSend
                        })
                    } else {
                        res.status(500).send({
                            success: false,
                            message: 'Invalid password'
                        })
                    }
                }).catch((err) => {
                    res.status(500).send({
                        success: false,
                        message: "Invalid User",
                        error: err.message
                    })
                })
            })
        })
    })
}


module.exports = {
    login,
    CreateUser,
    createAdmins,
    getStudents,
    getStudent,
    updateStudent,
    deleteStudent,
    getSupervisors,
    getSupervisor,
    updateSupervisor,
    deleteSupervisor
}