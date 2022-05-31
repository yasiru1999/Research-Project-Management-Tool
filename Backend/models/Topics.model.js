const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TopicSchema = new Schema({

    topic: {type: String, required: true, trim: true},
    groupID: {type: String, required: true, trim: true},
    field: {type: String, required: true, trim: true},
    link: {type: String, required: true, trim: true},
    submittedBy: {type: String, required: true, trim: true},
    isSupervisorAssigned: {type: Boolean, required: true},
    isCoSupervisorAssigned: {type: Boolean, required: true}

})
const Topics = mongoose.model('Topics',TopicSchema);
module.exports = Topics;