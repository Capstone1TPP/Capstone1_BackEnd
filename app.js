const express = require('express')
const { PollModel, OptionModel, VoteModel, db} = require('./models')

const PORT = 4000

const app = express()


app.use(express.json())

app.get('/health', (req,res) => {
    res.json({status: 'It works'})
})

app.get('/polls', async (req,res) => {
    const polls = await PollModel.findAll()
    console.log(polls.poll)

    res.status(200).json(polls)
})

app.get('/polls/:id', async (req,res) => {
    const id = Number(req.params.id)

    const singlePoll = await PollModel.findByPk(id, {
        include: {
            model: OptionModel,
            include: [VoteModel]
    }})
    if(!singlePoll){
        return res.sendStatus(404);
    }
    res.status(200).json(singlePoll)


})

app.post('/polls', async(req,res) => {
    const {title, description, options} = req.body

    const newPoll = await PollModel.create({title, description})


    const createdOptions = options.map(async(option) => {

        await OptionModel.create({text: option.text , pollId: newPoll.id})
    })

    res.status(200).json(newPoll)
})


async function startApp() {
    await db.sync()
    .then(() => {
        console.log('Connection successful')
        app.listen(PORT, () => console.log(`Server running on port http://localhost:${PORT}`))
    })

}

startApp()



