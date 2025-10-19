import express from "express";
import bodyParser from "body-parser";
import nocache from "nocache";

const port = 8001;
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.raw({ type: ["*/*"] }));
app.use(nocache());

app.listen(port, () => console.log(`Example app listening on port ${port}!`));

app.get('/hello', (req, res) => res.status(200).send({ res: 'Hello World' }));


// curl --request GET -H "Content-Type: application/json" -H "Accept-Language: en" http://localhost:8001/hello
