const express = require('express');
const path = require("path");

const app = express();
const PORT = process.env.PORT = 4000;

//Laden der JSON-Datei mit dem Dropdown-Menü.
/*const menuItems = require("../BA_Webkomponent/public/src/webcomponents/Dropdown/service.json");
//der JSON-datei wird bereitgestellt
app.get('/items', (req, res)=>{
   res.send(menuItems);
});*/

app.use(express.static(path.join(__dirname +'/public/src')));

app.listen(PORT, () => {
    console.log('Server is running at:',PORT);
});