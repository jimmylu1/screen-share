const express = require("express");
const path = require("path");

const PORT = process.env.PORT || 3000;

const app = express();
// app.use(express.static(path.join(__dirname, "../client/dist")));
app.listen(PORT, () => console.log("Listening on port: " + PORT));

app.use(express.static(path.join(__dirname, "../client/dist")));

app.get("*", function(_, res) {
  res.sendFile(path.join(__dirname, "../client/dist/index.html"), function(
    err
  ) {
    if (err) {
      res.status(500).send(err);
    }
  });
});

