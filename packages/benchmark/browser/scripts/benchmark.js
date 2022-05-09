/* eslint-disable no-console */
/* eslint-disable no-await-in-loop */
// eslint-disable-next-line @typescript-eslint/no-var-requires
const fse = require("fs-extra");
// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require("path");
// eslint-disable-next-line @typescript-eslint/no-var-requires
const playwright = require("playwright");
// eslint-disable-next-line @typescript-eslint/no-var-requires
const handler = require("serve-handler");
// eslint-disable-next-line @typescript-eslint/no-var-requires
const http = require("http");

const PORT = 1122;

function createServer(options) {
	const { port } = options;
	const server = http.createServer((request, response) => {
		return handler(request, response, {
			public: path.resolve(__dirname, "../"),
		});
	});

	function close() {
		return new Promise((resolve, reject) => {
			server.close((error) => {
				if (error !== undefined) {
					reject(error);
				} else {
					resolve();
				}
			});
		});
	}

	return new Promise((resolve) => {
		server.listen(port, () => {
			resolve({ close });
		});
	});
}

async function createBrowser() {
	const browser = await playwright.chromium.launch();

	return {
		openPage: async (url) => {
			const page = await browser.newPage();
			await page.goto(url);

			return page;
		},
		close: () => browser.close(),
	};
}

function getMean(values) {
	const sum = values.reduce((acc, value) => acc + value, 0);
	return sum / values.length;
}

function format(time) {
	const i = Number(`${Math.round(`${time}e2`)}e-2`).toFixed(2);
	return 10 / i > 1 ? `0${i}` : i;
}

const printMeasure = (name, stats) => {
	console.log(`${name}:`);
	console.log(`${format(stats.mean)}`);
};

/**
 * @param {{ openPage: (url: any) => Promise<import('playwright').Page>}} browser
 * @param {string} testCaseName
 * @param {string} testCase
 */
async function runMeasures(browser, testCaseName, testCase) {
	const samples = [];

	for (let i = 0; i < 15; i += 1) {
		const url = `http://localhost:${PORT}/?${testCase}`;
		const page = await browser.openPage(url);
		const benchmark = await page.evaluate(() => {
			return window.timing.render;
		});
		samples.push(benchmark);
		await page.close();
	}

	const sortedSamples = [...samples.concat()].sort();

	const stats = {
		samples,
		sampleCount: samples.length,
		mean: getMean(samples),
		min: sortedSamples[0],
		max: sortedSamples[sortedSamples.length - 1],
	};

	printMeasure(testCaseName, stats);

	return stats;
}

async function run() {
	const workspaceRoot = path.resolve(__dirname, "../../");
	const outputDir = path.join(workspaceRoot, "tmp", "benchmarks");
	const [server, browser] = await Promise.all([
		createServer({ port: PORT }),
		createBrowser(),
		fse.mkdirp(outputDir),
	]);

	const outputFile = fse.createWriteStream(path.join(outputDir, "browser.log"));
	// `node benchmark.js | tee outputFile`
	// `process.stdout.pipe(outputFile)` keeps the process hanging.
	const stdoutWrite = process.stdout.write;
	process.stdout.write = function writePiped(...args) {
		stdoutWrite.apply(this, args);
		outputFile.write(...args);
	};

	try {
		const cases = [
			{
				name: "Box Baseline",
				path: "./box-baseline/index.js",
			},
			{
				name: "Box MUI",
				path: "./box-material-ui/index.js",
			},
			{
				name: "Box Chakra-UI",
				path: "./box-chakra-ui/index.js",
			},
			{
				name: "Box Poodle",
				path: "./box-poodle/index.js",
			},
		];

		for (let i = 0; i < cases.length; i += 1) {
			await runMeasures(browser, cases[i].name, cases[i].path);
		}
	} finally {
		await Promise.all([browser.close(), server.close()]);
	}
}

run().catch((error) => {
	console.error(error);
	process.exit(1);
});
