const { readFile, writeFile } = require("../utils/usingFiles")

class RegistroController {
	index(req, res) {
		return readFile('./src/data/registros.json', (data) => {
			console.log(data)
			res.end(JSON.stringify(data))
		})
	}

	store(req, res) { }

	update(req, res) { }

	delete(req, res) { }
}

module.exports = RegistroController;