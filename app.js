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



async function startApp() {
    await db.sync()
    .then(() => {
        console.log('Connection successful')
        app.listen(PORT, () => console.log(`Server running on port http://localhost:${PORT}`))
    })

}

startApp()



