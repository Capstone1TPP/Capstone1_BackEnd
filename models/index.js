const PollModel = require('./poll')
const OptionModel = require('./option')
const VoteModel = require('./vote')


PollModel.hasMany(OptionModel)
OptionModel.belongsTo(PollModel)

OptionModel.hasMany(VoteModel)
VoteModel.belongsTo(OptionModel)


module.exports = {
    PollModel, OptionModel, VoteModel
}