const { readFile, writeFile } = require("../utils/usingFiles")

class ClienteController {
	index(req, res) {
		return readFile('./src/data/clientes.json', (data) => {
			res.end(JSON.stringify(data.clientes))
		})
	}

	store(req, res) {
		return readFile("./src/data/clientes.json", (data) => {
			req.on('data', (novoCliente) => {
				novoCliente = JSON.parse(novoCliente);
				const lastId = data.lastID;
				novoCliente.id = lastId + 1;
				data.lastID++;
				data.clientes.push(novoCliente);
				writeFile("./src/data/clientes.json", JSON.stringify(data));
				res.end("POST Successful!");
			});
		});
	}

	update(req, res) { }

	delete(req, res) { }
}

module.exports = ClienteController;