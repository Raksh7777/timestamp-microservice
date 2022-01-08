const express = require("express");
const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/api/:dateorUnixTime?", (req, res) => {
  if (req.params.dateorUnixTime === undefined) {
    res.send({
      unix: Math.floor(new Date().getTime() / 1000),
      utc: new Date().toString(),
    });
  }
  if (
    new Date(req.params.dateorUnixTime).getTime() > 0 ||
    new Date(req.params.dateorUnixTime * 1000).getTime() > 0
  ) {
    if (req.params.dateorUnixTime.includes("-")) {
      unixTime = new Date(req.params.dateorUnixTime).getTime() / 1000;
      res.send({
        unix: unixTime,
        utc: new Date(unixTime * 1000).toString(),
      });
    } else {
      newDate = new Date(req.params.dateorUnixTime * 1000).toString();

      res.send({
        unix: parseInt(req.params.dateorUnixTime),
        utc: newDate,
      });
    }
  } else {
    res.send({ error: "Invalid Date" });
  }
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
