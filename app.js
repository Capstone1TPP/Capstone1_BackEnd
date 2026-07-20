const express = require('express')
const db = require('./db')

const PORT = 4000

const app = express()


app.use(express.json())

app.get('/health', (req,res) => {
    res.json({status: 'It works'})
})



async function startApp() {
    await db.sync()
    .then(() => {
        console.log('Connection successful')
        app.listen(PORT, () => console.log(`Server running on port http://localhost:${PORT}`))
    })

}

startApp()



