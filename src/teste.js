const api = require("./api/api");

// api.get("http://localhost:3000/clientes", { nome: "FAUSTO", email: "f@gmail.com", telefone: "123", nomeAnimal: "Celso", tipoAnimal: "Arara Azul" }).then(res => console.log(res.data)).catch(err => console.error(err.data))

// api.post("http://localhost:3000/produtos", {
// 	nome: "Shampoo",
// 	valor: 19.9,
// 	qtde: 25
// }).then(res => console.log(res.data)).catch(err => console.error(err.data))

// api.put("http://localhost:3000/produtos/1", { nome: "Ração de Gato", valor: 39.90 }).then(res => console.log(res.data)).catch(err => console.error(err))

api.delete("http://localhost:3000/produtos/1").then(res => console.log(res.data)).catch(err => console.error(err))

