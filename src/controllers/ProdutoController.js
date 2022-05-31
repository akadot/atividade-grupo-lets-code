const { readFile, writeFile } = require("../utils/usingFiles")

class ProdutoController {
	index(req, res) {
		return readFile('./src/data/produtos.json', (data) => {
			res.end(JSON.stringify(data.produtos))
		})
	}

	store(req, res) {
		return readFile("./src/data/produtos.json", (data) => {
			req.on('data', (novoProduto) => {
				novoProduto = JSON.parse(novoProduto);
				const lastId = data.lastID;
				novoProduto.id = lastId + 1;
				data.lastID++;
				data.produtos.push(novoProduto);
				writeFile("./src/data/produtos.json", JSON.stringify(data));
				res.end("POST Successful!");
			});
		});
	}

	update(req, res) { }

	delete(req, res) { }
}

module.exports = ProdutoController;