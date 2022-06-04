const { Schema, model } = require("mongoose");
const crypto = require("crypto");

const staffMemberSchema = new Schema(
    {
        title: {type: String, required: true, trim: true},
        username: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        salt: { type: String, required: true },
        fullName: { type: String, required: false },
        email: { type: String, required: true, unique: true },
        phone: { type: String, required: false },
        nic: { type: String, required: false },
        image: { type: String, required: false },
        role: {
            type: String,
            enum: ["supervisor", "co-supervisor", "panel-member", "new"],
            default: "new",
        },
        university: {
            type: String,
            required: false,
            trim: true,
        },
        department: {
            type: String,
            required: false,
            trim: true,
        },
        ResearchField: {
            type: String,
            required: false,
            trim: true,
        },
        isPendding: {
            type: Boolean,
            default: true,
        },
        isPanelMember: {
        type: String,
        default: false,
        trim: true
}
    },
    { timestamps: true }
);

staffMemberSchema.methods.setPassword = function (password) {
    this.salt = crypto.randomBytes(16).toString("hex");
    this.password = crypto
        .pbkdf2Sync(password, this.salt, 1000, 64, `sha512`)
        .toString(`hex`);
};

staffMemberSchema.methods.validPassword = function (password) {
    var password = crypto
        .pbkdf2Sync(password, this.salt, 1000, 64, `sha512`)
        .toString(`hex`);
    return this.password === password;
};

const StaffMember = model("StaffMember", staffMemberSchema);

module.exports = StaffMember;
