const api = require("./api/api");

// api.post("http://localhost:3000/clientes", { nome: "FAUSTO", email: "f@gmail.com", telefone: "123", nomeAnimal: "Celso", tipoAnimal: "Arara Azul" }).then(res => console.log(res.data)).catch(err => console.error(err.data))
// api.post("http://localhost:3000/clientes").then(res => console.log(res.data)).catch(err => console.error(err.data))
// api.put("http://localhost:3000/clientes/2", { nome: "Alberto" }).then(res => console.log(res.data)).catch(err => console.error(err))
api.delete("http://localhost:3000/clientes/8").then(res => console.log(res.data)).catch(err => console.error(err))

