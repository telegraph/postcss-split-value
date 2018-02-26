import fs from 'fs';

export const read = ( filePath ) => {
	return new Promise(( resolve, reject ) => {
		fs.readFile(filePath, 'utf-8', ( err, fileContents ) => {
			if ( err ) {
				reject(err);
			}
			resolve(fileContents);
		});
	});
};

export const write = ( filePath, fileContents, options ) => {
	return new Promise(( resolve, reject ) => {
		// use {'flags': 'a'} to append and {'flags': 'w'} to erase and write a new file
		let ws = fs.createWriteStream(filePath, options);
		ws.write(fileContents);
		ws.end();
		ws.on('finish', () => {
			resolve();
		});
		ws.on('error', reject);
	});
};

