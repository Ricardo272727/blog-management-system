const express = require("express");
const app = express();
const cors = require("cors");
const env = require("./env");
const routes = require("./routes");


app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/", routes);
app.use('/images/', express.static('./uploads', {
  setHeaders: function(res, path) {
    res.set("Access-Control-Allow-Origin", "*");
    res.type("image/jpg");
    res.type("image/png");
    res.type("image/jpeg");
  }
}));


app.listen(env.port, () => {
  console.log(`Server listen in port ${env.port}`);
});
