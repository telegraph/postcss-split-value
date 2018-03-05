#Getting Started

```
npm install
```

## Working on the project:
```
npm run dev

```

## Using it somewhere else
(e.g: telegraph-component)

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