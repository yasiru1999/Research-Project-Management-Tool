require('dotenv').config();
const mongoose = require("mongoose");
const StudentGroupService = require("../Controllers/StudentGroup");

describe("Get All  Student Group", () => {
    beforeAll(async () => {
        await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser:true,
            useUnifiedTopology:true,
        })
    });

    test("Get All  Student Group", async() => {
        const studentGroup = await StudentGroupService.returnStudentGroups();
        expect(studentGroup).toEqual(expect.arrayContaining(studentGroup));
    });

    afterAll(async () => {
        await mongoose.disconnect();
    });

});
