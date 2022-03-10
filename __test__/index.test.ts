import DLFast from '../src/download'

const data = {
	url: {
		valid: "https://raw.githubusercontent.com/markdown-it/markdown-it-emoji/master/lib/data/full.json",
		invalid: "https://raw.githubusercontent.com/markdown-it/marit-emoji/master/lib/data/full.json"
	},
	outDir: {
		valid: "./__test__/download",
		invalid: "../../../../../../../../../../"
	},
	outName: "fileDownloadedByJest"
}

describe("File downloader", () => {
	test("valid URL without custom file name", async () => {
		const { success, message } = await DLFast({
			fileLink: data.url.valid,
			filePath: data.outDir.valid
		})

		expect(success).toBeTruthy()
		expect(message).toContain("downloaded")
	})
	test("valid URL with custom file name", async () => {
		const { success, message } = await DLFast({
			fileLink: data.url.valid,
			filePath: data.outDir.valid,
			fileName: data.outName
		})

		expect(success).toBeTruthy()
		expect(message).toContain("downloaded")
	})
})

describe("Errors catching", () => {
	test("invalid URL", async () => {
		const { success, message } = await DLFast({
			fileLink: data.url.invalid,
			filePath: data.outDir.valid,
			fileName: data.outName
		})

		expect(success).toBeFalsy()
		expect(message).toContain("HTTPError")
	})
	test("invalid outDir", async () => {
		const { success, message } = await DLFast({
			fileLink: data.url.valid,
			filePath: data.outDir.invalid
		})

		expect(success).toBeFalsy()
		expect(message).toContain("permission denied")
	})
})
