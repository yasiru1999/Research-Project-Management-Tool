const { Schema, model } = require("mongoose");

const submittedProjectsSchema = new Schema(
    {
        topic: { type: String, required: true, unique: false },
        groupID: { type: Schema.Types.ObjectId, ref: "Student" },
        grade: { type: Number, default: 0, min: 0, max: 100 },
        pdfLink: { type: String, required: true },
        isGraded: { type: Boolean, default: false },
        supervisor: { type: Schema.Types.ObjectId, ref: "StaffMember" },
        Submitted_Date:{type:String, required:true, trim:true},
        // isApproved: { type: Boolean, required: true, default: false }

    },
    { timestamps: true }
);

const SubmittedProject = model("SubmittedProject", submittedProjectsSchema);

module.exports = SubmittedProject;
