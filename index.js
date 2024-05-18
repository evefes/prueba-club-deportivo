const express = require('express')

const fs = require('fs/promises')

const app = express()

app.get("/",(req,res) =>{
    res.sendFile(__dirname + "/index.html")
})

app.listen(3000,() => {
    console.log("escuchando en puerto 3000")
})

// ruta agregar
app.get("/agregar", (req,res) => {
    const { nombre, precio } = req.query

    fs.readFile("./data/deportes.json", "utf-8")
    .then(data => {
        const deportesJson = JSON.parse(data)
         // deportesJson = {"deportes": []}

        //creacion de deporte
        const deporte = {
            nombre,
            precio
        }
      
        // agregar nuevo deporte al json parseado
        deportesJson.deportes.push(deporte)

        fs.writeFile("./data/deportes.json", JSON.stringify(deportes.json))
        .then(() => {
            console.log("archivo actualizado")
            res.send(deportesJson);
        })


    })
})

app.get("/editar", (req,res) => {
    const{ nombre, precio } = req.query

    fs.readFile("./data/deportes.json", "utf-8")
    .then(data => {
        const deportesJson = JSON.parse(data)

        const deportesModificados = deportesJson.deportes.map(dep => {
         if(dep.nombre == nombre) {
            dep.precio = precio
            return dep
         } else {
            return dep;
         }
        })

        deportesJson.deportes = deportesModificados;
        fs.writeFile("./data/deportes.json", JSON.stringify(deportes.json))
        .then(() => {
            console.log("deporte actualizado")
            res.send(deportesJson);
        })
    })
})

app.get("/eliminar", (req,res) => {
    const { nombre } = req.query

    fs.readFile("/data/deportes.json", "utf-8")
    .then(data => {
        const deportesJson = JSON.parse(data)
        const deportesFiltrados = deportesJson.deportes.filter( dep => {
          return dep.nombre !== nombre
        })

        deportesJson.deportes = deportesFiltrados

        fs.writeFile("./data/deportes.json", JSON.stringify(deportesJson))
        .then(() => {
            console.log("deporte eliminar")
            res.send(deportesJson);
        })
    })
})
app.use("/deportes", espress.static(__dirname + "/data/deportes.json"));
