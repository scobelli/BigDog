const express = require('express')

const app = express()

app.get('/big', (req, res) => res.send('big'))

app.listen(3000, () => console.log("Example app listening on port 3000"))