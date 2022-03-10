import resolve from '@rollup/plugin-node-resolve';
import typescript from 'rollup-plugin-typescript2';
import { terser } from 'rollup-plugin-terser';
import { preserveShebangs } from 'rollup-plugin-preserve-shebangs'
import pkg from './package.json';

export default [{
	input: 'src/download.ts',
	output: [{
		format: 'esm',
		file: pkg.module,
		sourcemap: false,
	}, {
		format: 'cjs',
		file: pkg.main,
		sourcemap: false,
		esModule: false,
	}, {
		name: pkg['umd:name'] || pkg.name,
		format: 'umd',
		file: pkg.unpkg,
		sourcemap: false,
		esModule: false,
		plugins: [
			terser()
		]
	}],
	external: [
		...require('module').builtinModules,
		...Object.keys(pkg.dependencies || {}),
		...Object.keys(pkg.peerDependencies || {}),
	],
	plugins: [
		resolve(),
		typescript({
			useTsconfigDeclarationDir: true
		})
	]
}, {
	input: 'src/cli.ts',
	output: [{
		format: 'cjs',
		file: "dist/cli.js",
		sourcemap: false,
		esModule: false,
	}],
	external: [
		...require('module').builtinModules,
		...Object.keys(pkg.dependencies || {}),
		...Object.keys(pkg.peerDependencies || {}),
	],
	plugins: [
		resolve(),
		preserveShebangs(),
		typescript({
			useTsconfigDeclarationDir: true
		})
	]
}
]
