const fs = require('fs');
const path = require('path');

// Prefer the Next.js standalone output in production (cPanel friendly)
const standaloneEntrypoint = path.join(process.cwd(), '.next', 'standalone', 'server.js');
if (fs.existsSync(standaloneEntrypoint)) {
	process.env.PORT = process.env.PORT || '3005';
	process.env.HOSTNAME = process.env.HOSTNAME || '0.0.0.0';
	console.log('> Starting Next.js standalone server (.next/standalone/server.js)');
	// This file includes its own Next runtime; no "next" dependency required at runtime
	require(standaloneEntrypoint);
} else {
	// Fallback: run with Next directly (requires node_modules/next to be installed)
	const { createServer } = require('http');
	const next = require('next');

	const port = parseInt(process.env.PORT, 10) || 3005;
	const hostname = '0.0.0.0';
	const app = next({ dev: false, hostname, port });
	const handle = app.getRequestHandler();

	app
		.prepare()
		.then(() => {
			createServer((req, res) => {
				handle(req, res);
			}).listen(port, hostname, () => {
				console.log(`> Saron Orthopedic running on http://localhost:${port}`);
			});
		})
		.catch((err) => {
			console.error('Error starting Next.js server:', err);
			process.exit(1);
		});
}


