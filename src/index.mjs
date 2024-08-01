import express from "express"

const app = express()

const PORT = process.env.PORT || 3000

app.get('/', (req, res) => {
    res.status(200).send({msg: "Hello Madam!"})
})
 
app.listen(PORT, ()=>{
    console.log(`Server listening on port ${PORT}`)
})