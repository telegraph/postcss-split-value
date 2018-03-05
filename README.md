#Getting Started

```
npm install
```

## Working on the project:
```
npm run dev

```

## Using it another project (locally)
(e.g: telegraph-component)

Doing the following will allow the project referencing this to get changes as you make them here, this is really powerful when you combine it with `npm run dev`

from this project's cwd:
```
npm link 

```

from the cwd of the project to use this npm package (e.g: telegraph-component):
```
npm link postcss-split-value

```

using this package in config:
```
module.exports = {
	plugins: [
		require('postcss-split-value')({
		    outpath: dist/temp,
            files: [{
                name: 'outputFile1.css',
                match: [
                    /var\(--value-1/
                ]
            }]
        })
    ],
};

```