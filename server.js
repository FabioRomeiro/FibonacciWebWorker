let path = require('path');
let http = require('http');
let nodeStaticAlias = require('node-static-alias');

const PORT = 4000;
const SRC_DIR = path.join(__dirname, 'src');

let httpServer = http.createServer(handleRequest);

let staticServer = new nodeStaticAlias.Server(SRC_DIR, {
	serverInfo: 'Fibonacci Web Worker',
	cache: 1
});


httpServer.listen(PORT);
console.log(`Running on http://localhost:${PORT}`);


async function handleRequest(req,res) {
	if (['GET','HEAD'].includes(req.method)) {

        if (req.url == '/favicon.ico') {
			res.writeHead(204, {
				'Content-Type': 'image/x-icon',
				'Cache-Control': 'public, max-age: 604800'
			});
			res.end();
			return;
		}

		staticServer.serve(req, res, function onStaticComplete(err){
			if (err) {
				res.writeHead(404);
				res.end();
			}
		});
	}
    else {
		res.writeHead(404);
		res.end();
	}
}