const api = require("./api/api");

// api.get("http://localhost:3000/registros").then(res => console.log(res.data)).catch(err => console.error(err.data))

// api.post("http://localhost:3000/registros", {
// 	tipo: "Compra",
// 	clienteID: 1,
// 	produtoID: 8,
// 	descricao: "",
// 	data: "01-06-2022"
// }).then(res => console.log(res.data)).catch(err => console.error(err.data))

// api.put("http://localhost:3000/registros/1", { tipo: "Serviço", clienteID: 1, produtoID: 3, descricao: "Banho e Tosa para o cliente 1", data: "20-06-2022" }).then(res => console.log(res.data)).catch(err => console.error(err))

api.delete("http://localhost:3000/registros/2").then(res => console.log(res.data)).catch(err => console.error(err))

