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

	update(req, res) {
		return readFile("./src/data/clientes.json", (data) => {
			const clientID = req.url.split("s/").pop();
			const clientExist = data.clientes.find(cliente => cliente.id == clientID)
			if (clientExist) {
				req.on('data', (atualizaCliente) => {
					atualizaCliente = JSON.parse(atualizaCliente);
					const clientIndex = data.clientes.indexOf(clientExist)
					data.clientes[clientIndex] = {
						id: Number(clientID),
						nome: atualizaCliente.nome ? atualizaCliente.nome : data.clientes[clientIndex]["nome"],
						email: atualizaCliente.email ? atualizaCliente.email : data.clientes[clientIndex]["email"],
						telefone: atualizaCliente.telefone ? atualizaCliente.telefone : data.clientes[clientIndex]["telefone"],
						nomeAnimal: atualizaCliente.nomeAnimal ? atualizaCliente.nomeAnimal : data.clientes[clientIndex]["nomeAnimal"],
						tipoAnimal: atualizaCliente.tipoAnimal ? atualizaCliente.tipoAnimal : data.clientes[clientIndex]["tipoAnimal"],
					};

					writeFile("./src/data/clientes.json", JSON.stringify(data));
					res.end("PUT Successful!");
				});
			} else {
				res.end("Cliente não encontrado.")
			}

		});
	}

	delete(req, res) {
		return readFile("./src/data/clientes.json", (data) => {
			const clientID = req.url.split("s/").pop();
			const clientExist = data.clientes.find(cliente => cliente.id == clientID)
			if (clientExist) {
				const clientIndex = data.clientes.indexOf(clientExist)

				data.clientes.splice(clientIndex, 1);
				writeFile("./src/data/clientes.json", JSON.stringify(data));
				return res.end("DELETE Successful!");
			} else {
				res.end("Cliente não encontrado.")
			}

		});
	}
}
module.exports = ClienteController;