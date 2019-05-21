import Constants from '../common/Constants';

export function updateLineHeight(id, height) {
	return {
		type: Constants.action.UPDATE_LINE_HEIGHT,
		id: id,
		height: height
	};
}

export function insertParagraph() {
	return {
		type: Constants.action.INSERT_PARAGRAPH
	};
}

export function deleteParagraph() {
	return {
		type: Constants.action.DELETE_PARAGRAPH,
	}
}


export function insertFormat() {
	return {
		type: Constants.action.INSERT_FORMAT
	}
}

export function deleteFormat() {
	return {
		type: Constants.action.DELETE_FORMAT
	}
}

export function updateSelection(top, left, height) {
	return {
		type: Constants.action.UPDATE_SELECTION,
		top : top,
		left: left,
		height: height
	}
}

export function updateAnchor(node, offset) {
	return {
		type: Constants.action.UPDATE_ANCHOR,
		node: node,
		offset: offset
	}
}

export function updateExtent(node, offset) {
	return {
		type: Constants.action.UPDATE_EXTENT,
		node: node,
		offset: offset
	}
}