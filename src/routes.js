const ClienteController = require("./controllers/ClienteController")
const ProdutoController = require("./controllers/ProdutoController")
const RegistroController = require("./controllers/RegistroController")

const Cliente = new ClienteController();
const Produto = new ProdutoController();
const Registro = new RegistroController();

function getRoute(req, res) {
	let { url, method } = req;
	switch (url) {
		case "/clientes":
			if (method == "GET") Cliente.index(req, res);
			if (method == "POST") Cliente.store(req, res);
			if (method == "PUT") Cliente.update(req, res);
			if (method == "DELETE") Cliente.delete(req, res);
			break;

		case "/produtos":
			if (method == "GET") Produto.index(req, res);
			if (method == "POST") Produto.store(req, res);
			if (method == "PUT") Produto.update(req, res);
			if (method == "DELETE") Produto.delete(req, res);
			break;

		case "/registros":
			if (method == "GET") Registro.index(req, res);
			if (method == "POST") Registro.store(req, res);
			if (method == "PUT") Registro.update(req, res);
			if (method == "DELETE") Registro.delete(req, res);
			break;

		default:
			res.writeHead(404);
			res.end("Page not found!");
			break;
	}
}

module.exports = getRoute;