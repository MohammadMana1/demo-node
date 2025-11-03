const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

app.get("/", (_req, res) => res.send("Hello from Jenkins CI!"));
app.listen(port, () => console.log(`Server up on :${port}`));
