const path = require("path");
const fs = require("fs");
const ora = require("ora"); // terminal 的 loading
const rm = require("rimraf"); // 删除包
const copy = require("copy"); // 复制包
const chalk = require("chalk");
const webpack = require("webpack");

const config = require("./webpack.conf");
const pkg = require("../package.json");
const rootPath = path.resolve(__dirname, "../");
const log = console.log

new Promise((resolve, reject) => {
	// 构建全量压缩包
	let building = ora("build...");

	building.start();
	rm(path.resolve(rootPath, "dist", `${pkg.name}.min.js`), err => {
		if (err) throw err;
		webpack(config, function(err, stats) {
			if (err) throw err;
			building.stop();
			process.stdout.write(
				stats.toString({
					colors: true,
					modules: false,
					children: false,
					chunks: false,
					chunkModules: false
				}) + "\n\n"
			);
			resolve();
			console.log(chalk.cyan("	Build complete.\n"));
		});
	});
})
	.then(() => {
		// 替换模块文件
		let copying = ora("copying...");
		copying.start();
		rm("*.js", err => {
			if (err) throw err;
			let folderList = fs.readdirSync(path.resolve(rootPath, "src"));
			folderList.forEach((item, index) => {
				copy(`src/${item}/*.js`, rootPath, function(err, files) {
					if (err) throw err;
					if (index === folderList.length - 1) {
						console.log(chalk.cyan("	Copy complete.\n"));
						copying.stop();
					}
				});
			});
		});
	})
	.catch(err => {
		throw err;
	});
