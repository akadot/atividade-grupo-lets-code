const { readFile, writeFile } = require("../utils/usingFiles")

class ClienteController {
	index(req, res) {
		return readFile('./src/data/clientes.json', (data) => {
			console.log(data)
			res.end(JSON.stringify(data))
		})
	}

	store(req, res) { }

	update(req, res) { }

	delete(req, res) { }
}

module.exports = ClienteController;