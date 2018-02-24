import postcss from 'postcss';

export const createContainer = option => {
	return { ...option, result: postcss.root() };
};

export const matchAll = ( arr, str ) => {
	return arr.filter(regex => {
			return regex.test(str)
		}).length === arr.length;
};

export const matchAny = ( arr, str ) => {
	return !!arr.find(regex => {
		return regex.test(str)
	});
};

export const createUpdaterFn = containers => rule => {
	const declsToRemove = [];

	containers.forEach(( { skip, match, result } ) => {
		if ( matchAny(skip, rule) ) {
			return;
		}

		let clone = rule.clone();
		clone.removeAll();

		let atRule = rule.parent.type == 'atrule' ? rule.parent.clone() : null;

		if ( atRule ) {
			atRule.removeAll();
			atRule.append(clone);
		}

		rule.walkDecls(decl => {
			if ( matchAny(match, decl) ) {
				let newDecl = decl.clone();
				clone.append(newDecl);
				declsToRemove.push(decl);
			}
		});

		if ( clone.nodes.length > 0 ) {
			if ( atRule ) {
				result.append(atRule);
			}
			else {
				result.append(clone);
			}
		}
	});

	declsToRemove.forEach(decl => decl.remove());
};