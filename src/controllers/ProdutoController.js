const { readFile, writeFile } = require("../utils/usingFiles")

class ProdutoController {
	index(req, res) {
		return readFile('./src/data/produtos.json', (data) => {
			console.log(data)
			res.end(JSON.stringify(data))
		})
	}

	store(req, res) { }

	update(req, res) { }

	delete(req, res) { }
}

module.exports = ProdutoController;