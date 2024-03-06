const express = require('express')
const app  = express();
const routes = require("./routes/routes")
const cors = require('cors');

const PORT = process.env.PORT || 3030

app.use(express.json())
app.use(cors())


app.use('/information', routes)

app.get('/', (req, res)=>{
    res.send("YEs i am working fine")
})



app.listen(PORT, ()=>{
   console.log(`server is running on http://localhost:${PORT}`); 
});