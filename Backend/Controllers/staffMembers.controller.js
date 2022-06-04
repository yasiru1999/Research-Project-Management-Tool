const StaffMember = require("../models/staffMembers.model");

async function signIn(req, res) {
    try {
        const { username, password } = req.body;
        if (!username || !password) {
            return res
                .status(401)
                .json({ msg: "password and username required" });
        } else {
            const user = await StaffMember.findOne({ username });
            if (!user) {
                return res.status(404).json({ msg: "user not found" });
            }
            if (user.validPassword(password)) {
                const { password, salt, ..._user } = user._doc;
                return res.json({ msg: "success", _user });
            } else {
                return res.status(401).json({ msg: "password incorrect" });
            }
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({ msg: "error occured" });
    }
}

async function signUp(req, res) {
    try {
        const {
            title,
            username,
            password,
            email,
            fullName,
            nic,
            phone,
            department,
            ResearchField,
            university,
        } = req.body;
        if (!username || !password || !email) {
            return res
                .status(404)
                .json({ msg: "email,password and username required" });
        } else {
            const user = new StaffMember();
            user.title = title;
            user.username = username;
            user.email = email;
            fullName ? (user.fullName = fullName) : "";
            nic ? (user.nic = nic) : "";
            phone ? (user.phone = phone) : "";
            department ? (user.department = department) : "";
            ResearchField ? (user.ResearchField = ResearchField) : "";
            university ? (user.university = ResearchField) : "";

            user.setPassword(password);

            await user.save();
            return res.json({ msg: "success" });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({ msg: "error occured" });
    }
}

module.exports = {
    signIn,
    signUp,
};
