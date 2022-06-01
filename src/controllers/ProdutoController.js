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

	update(req, res) {
		return readFile("./src/data/produtos.json", (data) => {
			const productID = req.url.split("s/").pop();
			const productExist = data.produtos.find(produto => produto.id == productID);

			if (productExist) {
				req.on('data', (atualizaProduto) => {
					atualizaProduto = JSON.parse(atualizaProduto);
					const produtoIndex = data.produtos.indexOf(productExist);

					data.produtos[produtoIndex] = {
						id: Number(productID),
						nome: atualizaProduto.nome ? atualizaProduto.nome : data.produtos[produtoIndex]["nome"],
						valor: atualizaProduto.valor ? atualizaProduto.valor : data.produtos[produtoIndex]["valor"],
						qtde: atualizaProduto.qtde ? atualizaProduto.qtde : data.produtos[produtoIndex]["qtde"],
					};

					writeFile("./src/data/produtos.json", JSON.stringify(data));
					res.end("PUT Successful!");
				})

			} else {
				res.end("Produto não encontrado.")
			}
		})
	}

	delete(req, res) {
		return readFile("./src/data/produtos.json", (data) => {
			const productID = req.url.split("s/").pop();
			const productExist = data.produtos.find(produto => produto.id == productID);

			if (productExist) {
				const produtoIndex = data.produtos.indexOf(productExist);
				data.produtos.splice(produtoIndex, 1);
				writeFile("./src/data/produtos.json", JSON.stringify(data));
				return res.end("DELETE Successful!");
			} else {
				res.end("Produto não encontrado.")
			}
		})
	}
}

module.exports = ProdutoController;