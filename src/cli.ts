#!/usr/bin/env node
import DLFast from './download'
import yargs from 'yargs'

const argv = yargs.options({
	fileLink: {
		type: 'string',
		default: '',
		alias: 'fl',
		describe: 'The URL to the file you want to download',
		demandOption: true
	},
	filePath: {
		type: 'string',
		default: '',
		alias: 'fp',
		describe: 'The folder you want to save the downloaded file',
		demandOption: true
	},
	fileName: {
		type: 'string',
		default: '',
		alias: 'fn',
		describe: 'The name you want to use for the downloaded file',
		demandOption: false
	}
}).help().argv;

(async () => {
		const { message } = await DLFast({
			fileLink: argv.fileLink,
			filePath: argv.filePath,
			fileName: argv.fileName
		})
		console.log(message);
})()
