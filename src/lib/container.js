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
	const rulesToAppend = [];
	const declsToRemove = [];

	containers.forEach(( { match, target, skip, remove, result } ) => {
		let isTarget = false;

		if ( matchAny(target, rule) ) {
			result.append(rule);
			isTarget = true;
		}

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

			//TODO: make this more efficient by moving isTarget test outside loop
			if ( !isTarget && matchAny(match, decl) ) {
		rule.walkDecls(decl => {
				let newDecl = decl.clone();
				clone.append(newDecl);

				if ( remove ) {
					declsToRemove.push(decl);
				}
			}
		});

		if ( clone.nodes.length > 0 ) {
			if ( atRule ) {
				rulesToAppend.push(atRule);
				result.append(atRule);
			}
			else {
				rulesToAppend.push(clone);
				result.append(clone);
			}
		}
	});

	declsToRemove.forEach(decl => decl.remove());
};