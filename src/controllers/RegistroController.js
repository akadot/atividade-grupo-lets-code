const { readFile, writeFile } = require("../utils/usingFiles")
const api = require("../api/api");
class RegistroController {
	index(req, res) {
		return readFile('./src/data/registros.json', (data) => {
			res.end(JSON.stringify(data.registros))
		})
	}

	store(req, res) {
		return readFile("./src/data/registros.json", (data) => {
			req.on('data', async (novoRegistro) => {
				novoRegistro = JSON.parse(novoRegistro);

				const clientData = await api.get("http://localhost:3000/clientes").then((res) => {
					return res.data
				}).catch(err => console.error(err));

				const productData = await api.get("http://localhost:3000/produtos").then((res) => {
					return res.data
				}).catch(err => console.error(err));

				const isCliente = await clientData.find(cliente => cliente.id == novoRegistro.clienteID)
				const isProduct = await productData.find(produto => produto.id == novoRegistro.produtoID)
				if (isCliente && isProduct) {
					const lastId = data.lastID;
					novoRegistro.id = lastId + 1;
					data.lastID++;
					data.registros.push(novoRegistro);
					writeFile("./src/data/registros.json", JSON.stringify(data));
					res.end("POST Successful!");
				} else {
					res.end(`ERRO: Cliente ou Produto não encontrado.\n Cliente: ${isCliente} \n Produto: ${isProduct}`)
				}
			})
		})
	}

	update(req, res) {
		return readFile("./src/data/registros.json", (data) => {
			const registroID = req.url.split("s/").pop();
			const registroExist = data.registros.find(registro => registro.id == registroID)
			if (registroExist) {
				req.on('data', (atualizaRegistro) => {
					atualizaRegistro = JSON.parse(atualizaRegistro);
					const registroIndex = data.registros.indexOf(registroExist)
					data.registros[registroIndex] = {
						id: Number(registroID),
						tipo: atualizaRegistro.tipo ? atualizaRegistro.tipo : data.registros[registroIndex]["tipo"],
						clienteID: atualizaRegistro.clienteID ? atualizaRegistro.clienteID : data.registros[registroIndex]["clienteID"],
						produtoID: atualizaRegistro.produtoID ? atualizaRegistro.produtoID : data.registros[registroIndex]["produtoID"],
						descricao: atualizaRegistro.descricao ? atualizaRegistro.descricao : data.registros[registroIndex]["descricao"],
						data: atualizaRegistro.data ? atualizaRegistro.data : data.registros[registroIndex]["data"],
					};

					writeFile("./src/data/registros.json", JSON.stringify(data));
					res.end("PUT Successful!");
				});
			} else {
				res.end("Registro não encontrado.")
			}

		});
	}

	delete(req, res) {
		return readFile("./src/data/registros.json", (data) => {
			const registroID = req.url.split("s/").pop();
			const registroExist = data.registros.find(registro => registro.id == registroID)
			if (registroExist) {
				const registroIndex = data.registros.indexOf(registroExist)

				data.registros.splice(registroIndex, 1);
				writeFile("./src/data/registros.json", JSON.stringify(data));
				return res.end("DELETE Successful!");
			} else {
				res.end("Registro não encontrado.")
			}

		});
	}
}

module.exports = RegistroController;