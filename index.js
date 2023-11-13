import express from "express";
import 'dotenv/config'
import PreguntaService from "./src/services/preguntaServices.js";

const app = express();
const port = 3000;
app.use(express.json());

let svc = new PreguntaService();

app.get("/api/preguntas/:id", async (req, res) => {
  try {
    let id = req.params.id
    let respuesta = req.query.respuesta

    let get = await svc.getById(id);

    if (get != null && get != undefined) {
      res.status(200).send(get.RespuestaCorrecta == respuesta);
    } else {
      res.status(404).send("No existe la pregunta");
    }
  } catch (error) {
    res.send("error");
  }
});


app.post("/api/preguntas", async (req, res) => {
  try {
    let params = req.body
    const date = new Date();
    let Insert = await svc.insert(params.Pregunta, params.Respuesta01, params.Respuesta02, params.Respuesta03, params.Respuesta04, params.RespuestaCorrecta, date);
    res.send(Insert);
  } catch (error) {
    res.send("error");
  }
});


app.listen(port, () => {
  console.log('Example app listening on port ' + port)
})

