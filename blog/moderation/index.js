const express = require('express')
const axios = require('axios')

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true}))

app.post('/events', async (req, res) => {
    const { type, data } = req.body

    if (type === 'CommentCreated') {
        const status = data.content.includes('orange') ? 'rejected' : 'approved'
        console.log('CommentCreated', data)
        
        await axios.post('http://event-bus-srv:4005/events', {
            type: 'CommentModerated',
            data: { ...data, status }
        })
    }

    res.send({})
})

app.listen(4003, () => {
    console.log('Listening on 4003')
})