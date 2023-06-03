const express = require("express")
require("dotenv").config()
const app = express()
const cors = require("cors")
const responseHandler = require('./src/helpers/responseHandler');


app.use(express.urlencoded({ extended: true }))

app.use(require("./src/routes"))
const corsOptions = {  
    origin: ["http://localhost:3000", "http://localhost:8081"],
};

const httpMethods = ["get", "post", "put","patch", "delete"];

httpMethods.forEach((method) => {
    app[method]('*',(req, res) => {
        return responseHandler(res, 404, 'Not Found');
    });
});

const { PORT } = process.env
app.options("*", cors(corsOptions));
app.listen(PORT || 5000, () => console.log(`Server running on port ${PORT}`))