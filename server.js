const express = require('express');
const path = require("path");

const app = express();
const PORT = process.env.PORT = 4000;

//Laden der JSON-Datei mit dem Dropdown-Menü.
const menuItems = require("../webcomponents/Dropdown/service.json")
app.get('/items', (req, res)=>{
   res.send(menuItems);
});

// The magic happens here
app.use(express.static(path.join(__dirname +'/public/src')));

app.listen(PORT, () => {
    console.log('Server is running at:',PORT);
});