const express = require ('express');
const path = requrie('path');

const app = express();
const PORT = process.env.PORT || 8000;

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(express.static(__dirname));

require('./Develop/routes/htmlroute')(app);

app.listen(PORT, () => function() {
    console.log("App listening to PORT: " + PORT);
});