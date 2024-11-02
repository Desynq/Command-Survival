# Setting up Development Environment

1. VSCode IDE Extensions
- ProbeJS 0.1.0
- Origins Mod JSON Schemas 3.3.3

2. Generating ProbeJS Typings
- You need to generate ProbeJS typings in order to be able to see object types, methods, and other intellisense information useful for coding in KubeJS
	1. Join a singleplayer world
	2. Run `/probejs dump`
	3. Wait until ProbeJS finishes generating the typings
	4. Done.

3. Setting up KubeJS Typescript Vite
	1. Download Node Project Manager and NodeJS
	2. Install [@kubejs/plugin](https://www.npmjs.com/package/@kubejs/plugin)