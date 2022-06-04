require('dotenv').config();
const mongoose = require("mongoose");
const SubmissionTypeService = require("../Controllers/SubmissionType");

describe("Get All Submissions", () => {
    beforeAll(async () => {
        await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser:true,
            useUnifiedTopology:true,
        })
    });

    test("Get all Submissions", async() => {
        const submissionType = await SubmissionTypeService.returnSubmissionType();
        expect(submissionType).toEqual(expect.arrayContaining(submissionType));
    });

    afterAll(async () => {
        await mongoose.disconnect();
    });

});
