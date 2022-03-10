import path from 'path'
import { createWriteStream, mkdirSync, rmSync } from 'node:fs'
import { pipeline } from 'node:stream/promises'
import got from 'got';

export interface IDownloadFile {
	fileLink: string
	filePath: string
	fileName?: string
}

export interface IDownloadResponse {
	success: boolean
	message: string
}

export default async function DLFast(param: IDownloadFile): Promise<IDownloadResponse> {
	param.fileName = param.fileName
	? `${param.fileName}${path.parse(param.fileLink).ext}`
	: `${path.basename(new URL(param.fileLink).pathname)}`

	const completePath = path.join(param.filePath, param.fileName)

	const readStream = got.stream(param.fileLink)

	const writeStream = createWriteStream(completePath)

	mkdirSync(path.join(param.filePath, '/'), { recursive: true })

	try {
		await pipeline(readStream, writeStream)

		return {
			success: true,
			message: `✅ File downloaded to ${completePath}`
		}

	} catch (error) {
		rmSync(path.join(param.filePath, '/'), { recursive: true, force: true })

		return {
			success: false,
			message: String(error)
		}
	}
}
