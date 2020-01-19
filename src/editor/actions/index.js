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

export function updateParagraph() {
	return {
		type: Constants.action.UPDATE_PARAGRAPH
	}
}

export function deleteParagraph() {
	return {
		type: Constants.action.DELETE_PARAGRAPH
	}
}



export function insertText(pId, offset, value) {
	return {
		type: Constants.action.INSERT_TEXT,
		payload: {
			pId,
			offset,
			value
		}
	}
}

export function updateText(pId, offset, value) {
	return {
		type: Constants.action.UPDATE_TEXT,
		payload: {
			pId,
			offset,
			value
		}
	}
}

export function deleteText(pId, offset) {
	return {
		type: Constants.action.DELETE_TEXT,
		payload: {
			pId,
			offset
		}
	}
}



// insert span
export function insertFormat() {
	return {
		type: Constants.action.INSERT_FORMAT
	}
}
// update span
export function updateFormat() {
	return {
		type: Constants.action.UPDATE_FORMAT
	}
}
// delete span
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

export function updateSelectionType(selectionType, isReverse) {
	return {
		type: Constants.action.UPDATE_SELECTION_TYPE,
		selectionType: selectionType,
		reverse: isReverse,
	}
}


// ui
export function updateUISelectionFlicker(flicker) {
	return {
		type: Constants.action.UI_UPDATE_SELECTION_FLICKER,
		flicker: flicker,
	}
}