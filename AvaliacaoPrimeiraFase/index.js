const express = require("express");
const bodyParser = require("body-parser");

const alunoRoutes = require("./routes/alunoRoutes.js");
const disciplinaRoutes = require("./routes/disciplinaRoutes.js");
const perfilRoutes = require("./routes/perfilRoutes.js");
const professorRoutes = require("./routes/professorRoutes.js");
const tarefaRoutes = require("./routes/tarefaRoutes.js");
const turmaRoutes = require("./routes/turmaRoutes.js");

const db = require("./database/db.js");

const app = express();
app.use(bodyParser.json());

app.use("/app", alunoRoutes);
app.use("/app", disciplinaRoutes);
app.use("/app", perfilRoutes);
app.use("/app", professorRoutes);
app.use("/app", tarefaRoutes);
app.use("/app", turmaRoutes);

const port = 3000;
app.listen(port, () => {
    console.log(`Hello! A aplicação está rodando na porta ${port}`);

});