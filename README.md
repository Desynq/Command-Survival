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


# Additional Notes
- Make sure to only build using `npm run build` as `npm run watch` will use `var` incorrectly and lead to scoping issues

- Do not do circular imports

- Do not use `Utils.server` in the global scope or inside datapack-related events as these are loaded before the server instance is created

- Do not use the `public` or `private` keywords inside a constructors' parameters
	- Has weird issues with `var` scoping
	- Just looks unreadable in general and doesn't follow typical OOP syntax