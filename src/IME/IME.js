import React, { Component } from 'react';
import Constants from './IMEConstants';
import IMEOperationManager from './operation/IMEOperationManager';

class IMEKeyHandler {
	/**
	 * constructor
	 * @param {object} observer
	 */
	constructor(observer) {
		this.value = '';
		this.compositionStart = false;
		this.observer = null;

		this.startComposition = this.startComposition.bind(this);
		this.updateComposition = this.updateComposition.bind(this);
		this.endComposition = this.endComposition.bind(this);

		this.handleKeyDown = this.handleKeyDown.bind(this);
		this.handleKeyPress = this.handleKeyPress.bind(this);
		this.handleKeyUp = this.handleKeyUp.bind(this);

		this.createOperation = this.createOperation.bind(this);
		this.addObserver = this.addObserver.bind(this);
		this.removeObserver = this.removeObserver.bind(this);

		this.addObserver(observer);
	}

	/**
	 * create IME operation
	 * @param {object} e
	 * @param {string} type
	 * @param {string} data
	 * @returns {{data, type, event}}
	 */
	createOperation(e, type, data) {
		const opManager = IMEOperationManager.getInstance();
		return opManager.createOperation(e, type, data);
	}

	/**
	 *
	 * @param {object} observer
	 */
	addObserver(observer) {
		this.observer = observer;
	}

	/**
	 *
	 */
	removeObserver() {
		this.observer = null;
	}

	/**
	 * handle composition start
	 * @param e
	 */
	startComposition(e) {
		console.log('-- compositionstart --');
		console.log(e.data);
		console.log('----------------------');

		// let target = e.target;
		this.compositionStart = true;
		this.observer.startComposition(this.createOperation(e, Constants.opType.START_COMP, e.data));
	}

	/**
	 * handle composition update
	 * @param e
	 */
	updateComposition(e) {
		console.log('-- compositionupdate --');
		console.log(e.data);
		console.log('----------------------');

		let target = e.target;
		this.value = target.value;
		this.observer.updateComposition(this.createOperation(e, Constants.opType.UPDATE_COMP, e.data));
	}

	/**
	 * handle composition end
	 * @param e
	 */
	endComposition(e) {
		console.log('-- compositionend --');
		console.log(e.data);
		console.log('----------------------');

		let target = e.target;
		target.value = '';
		if (this.compositionStart) {
			this.observer.endComposition(this.createOperation(e, Constants.opType.END_COMP, e.data));
			this.compositionStart = false;
		}
	}

	/**
	 * handle key down
	 * @param e
	 */
	handleKeyDown(e) {
		let target = e.target;
		this.value = target.value;

		console.log('-- KeyDown --');
		console.log(this.value);
		console.log('-------------');

		this.observer.handleKeyDown(this.createOperation(e, Constants.opType.KEY_DOWN, e.data));
	}

	/**
	 * handle key up
	 * @param e
	 */
	handleKeyUp(e) {
		let target = e.target;
		this.value = target.value;

		console.log('-- KeyUp --');
		console.log(this.value);
		console.log('-------------');

		this.observer.handleKeyUp(this.createOperation(e, Constants.opType.KEY_UP, e.data));
	}

	/**
	 * handle key press
	 * @param e
	 */
	handleKeyPress(e) {
		let target = e.target;
		this.value = target.value;

		console.log('-- KeyPress --');
		console.log(this.value);
		console.log('-------------');

		this.observer.handleKeyPress(this.createOperation(e, Constants.opType.KEY_PRESS, e.data));
	}
}

export default IMEKeyHandler;






// var Const = {
// 	KeyCode: {
// 		BACKSPACE: 8,
// 		TAB: 9,
// 		ENTER: 13,
// 		SHIFT: 16,
// 		CTRL: 17,
// 		ALT: 18,
// 		ESC: 27,
// 		SPACE: 32,
// 		PAGEUP: 33,
// 		PAGEDOWN: 34,
// 		END: 35,
// 		HOME: 36,
// 		LEFT: 37,
// 		UP: 38,
// 		RIGHT: 39,
// 		DOWN: 40,
// 		INSERT: 45,
// 		DELETE: 46,
// 		CHAR_A: 65,
// 		CHAR_B: 66,
// 		CHAR_C: 67,
// 		CHAR_D: 68,
// 		CHAR_E: 69,
// 		CHAR_G: 71,
// 		CHAR_I: 73,
// 		CHAR_L: 76,
// 		CHAR_P: 80,
// 		CHAR_R: 82,
// 		CHAR_S: 83,
// 		CHAR_U: 85,
// 		CHAR_V: 86,
// 		CHAR_X: 88,
// 		CHAR_Y: 89,
// 		CHAR_Z: 90,
// 		LEFT_COMMAND: 91,
// 		RIGHT_COMMAND: 93,
// 		F1: 112,
// 		F2: 113,
// 		F5: 116,
// 		F10: 121,
// 		SLASH: 191,
// 		LEFT_SQUARE_BRACKET: 219,
// 		RIGHT_SQUARE_BRACKET: 221,
// 		// keyCode 229 - http://lists.w3.org/Archives/Public/www-dom/2010JulSep/att-0182/keyCode-spec.html
// 		IME_PROCESSING: 229,
// 		// IE 11 에서는 한자에 대한 keyCode 가 발생하지 않으므로,
// 		// 한글 -> 한자 변환 시 가상의 keyCode 를 넘겨주도록 한다.
// 		CHINESE_IN_HANGUL_INPUT: -229
// 	},
//
// 	Shortcut: {
// 		Text: {
// 			SELECT_ALL: 10000
// 		},
// 		Shape: {},
// 		Slide: {
// 			SELECT_ALL: 40000
// 		}
// 	},
//
// 	FontSizeList: [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 10.5, 11, 12, 14, 16, 18, 20, 24, 28, 32, 36, 40, 44, 48, 54, 60,
// 		66, 72, 80, 88, 96, 115, 138, 166, 199, 239, 287, 344, 413 ],
//
// 	ModKeyStatus: {
// 		ALT_KEY_PRESS:   0x1,
// 		CMD_KEY_PRESS:   0x2,
// 		SHIFT_KEY_PRESS: 0x4,
// 		CTRL_KEY_PRESS:  0x8
// 	},
//
// 	KEY_PRESS_NONE: 0x0
// }



// define(function (require) {
//     "use strict";
//
//     /*******************************************************************************
//      * Import
//      ******************************************************************************/
//     var $ = require("jquery"),
//         _ = require("underscore"),
//         CommonUtils = require("utils/commonUtils"),
//         Const = require("utils/commonConstants"),
//         // TODO: reconsider module dependency
//         CommonUiController = require("commonFrameJs/uiFramework/uiController");
//
//     /*******************************************************************************
//      * Private Variables
//      ******************************************************************************/
//     var _constKeyCode = Const.KeyCode,
//         _altKeyCodeStr = "" + _constKeyCode.ALT,
//         _ctrlKeyCodeStr = "" + _constKeyCode.CTRL,
//         _shiftKeyCodeStr = "" + _constKeyCode.SHIFT,
//         _leftCmdKeyCodeStr = "" + _constKeyCode.LEFT_COMMAND,
//         _platform = $.platform,
//         _browser = $.browser,
//         _modifierKeyPressMap = {},
//         _ignoreInputEvt = false,
//         _compositionEnded = false,
//         _modKeyStatus = Const.ModKeyStatus,
//         _keyPressStatus = Const.KEY_PRESS_NONE,
//         _alphabetCompositionInProgress = false,
//
//         _regHangul = /[ㄱ-ㅎㅏ-ㅣ가-힣]/g,
//         _regAlphabet = /[A-Za-z]/g,
//         _regJapanese = /[\u3000-\u303f\u3040-\u309f\u30a0-\u30ff\uff00-\uff9f\u4e00-\u9faf\u3400-\u4dbf]/g,
//
//         // range for detecting latin alphabet with diacritic
//         //   À: U+00C0, Ö: U+00D6
//         //   Ø: U+00D8, ö: U+00F6
//         //   ø: U+00F8, ɏ: U+024F
//         _regLatinWithDiacritic = /[\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u024F]/g,
//
//         _userFontStyle = {},
//         _activateOnBlur = true,
//         _isHandlingBackspace = false,
//         _isHandledDelete = false,
//         _isHandledTab = false,
//         _isComposingHanja = false,
//         _isComposingLatin = false,
//         _isComposing = false,
//         _isHanjaMode = false,
//         _lastKeyDownBufferLen = 0,
//         _isMac = !!_platform.mac,
//         _isSafari = !!_browser.safari,
//         _isChrome = !!_browser.chrome,
//         _isFirefox = !!_browser.mozilla,
//         _isMacFirefox = _isMac && _isFirefox,
//         // note: _needToFlush here is different from in KeyMgr
//         _needToFlush = !(_browser.msie || _browser.edge || _browser.mozilla || (_isMac && _browser.safari)),
//         _noop = _.noop,
//         _prevBuf = "",
//         _insertedText = false,
//         _cbMap, _keyCodeListToIgnoreInputEvt, _$ime, _$imeBox, _$document,
//         _compositionEventTrigger, _statusBarHeight;
//
//     /*******************************************************************************
//      * Private Functions
//      ******************************************************************************/
//
//     function _isEventFromUiInput(event) {
//         return (event.target instanceof HTMLInputElement && event.target.id !== "inputForCb");
//     }
//
//     // TODO: rewrite to be notified on the UI status/size change
//     function _getStatusBarHeight() {
//         if (_statusBarHeight == null) {
//             _statusBarHeight = CommonUiController.getContainerSizeInfo("status_bar").height;
//         }
//
//         return _statusBarHeight;
//     }
//
//     /**
//      * @param {number} keyCode
//      * @param {string} keyChar
//      * @param {number=} modStatus
//      * @param {object=} event - event itself is needed for Common UI key event handlers
//      *
//      * @returns {{code: (number), char: (string), modStatus: (number), event: (object) }}
//      * @private
//      */
//     function _KeyInfo(keyCode, keyChar, modStatus, event) {
//         return {
//             code: keyCode || 0,
//             char: keyChar || "",
//             modStatus: _getCurModKeyStatus(modStatus),
//             event: event || null
//         };
//     }
//
//     function _getCurModKeyStatus(modKeyStatus) {
//         return _.isUndefined(modKeyStatus) ? _keyPressStatus : modKeyStatus;
//     }
//
//     function _isImeProcessing(keyCode) {
//         return keyCode === _constKeyCode.IME_PROCESSING;
//     }
//
//     function _isRepeating(event) {
//         return event.originalEvent.repeat;
//     }
//
//     function _isLeftOrRightKey(keyCode) {
//         return keyCode === Const.KeyCode.LEFT || keyCode === Const.KeyCode.RIGHT;
//     }
//
//     function _checkLatinComposingForMac(event, keyCode, keyStr) {
//         var isCanceled;
//
//         if (!_alphabetCompositionInProgress) {
//             // composition 이벤트 발생 구간(comp start-update-end 사이클 내)에서는 _isComposingLatin 상태가 바뀔 일이 없어서 패스함
//
//             if (_isSafari) {
//                 // note: for Safari, ESC is handled as 'IME_PROCESSING' thus an extra flag is not needed.
//                 _checkLatinComposingForSafari(keyCode, keyStr);
//             } else if (_isChrome) {
//                 isCanceled = _checkLatinComposingForChrome(event, keyCode, keyStr);
//             } else if (_isFirefox) {
//                 isCanceled = _checkLatinComposingForFirefox(event, keyCode, keyStr);
//             }
//         }
//
//         return isCanceled;
//     }
//
//     function _checkLatinComposingForSafari(keyCode, keyStr) {
//         if (!_isComposingLatin && _isImeProcessing(keyCode) && _isAlphabetChar(keyStr)) {
//             _isComposingLatin = true;
//         } else if (_isComposingLatin && (!_isImeProcessing(keyCode) || keyStr === "Enter")) {
//             // é,ë 등의 알파벳이 입력 완료된 이벤트 시점에서 플래그를 끄면 좋겠으나, 완료 시의 이벤트 발생 양상이 경우에 따라 달라
//             // (예: 숫자 키로 글자 선택, 화살표 키와 엔터 키로 글자 선택, 마우스로 글자 선택) 다음번 keydown 시점에 아래 플래그를 끈다.
//             _isComposingLatin = false;
//         }
//     }
//
//     function _checkLatinComposingForChrome(event, keyCode, keyStr) {
//         var isCanceled = false;
//
//         if (!_isComposingLatin && _isRepeating(event) && _isAlphabetChar(keyStr)) {
//             _isComposingLatin = true;
//         } else if (_isComposingLatin && !_isImeProcessing(keyCode) && !_isRepeating(event) && !_isDigit(keyStr)) {
//             // é,ë 등의 알파벳이 입력 완료된 이벤트 시점에서 플래그를 끄면 좋겠으나, 완료 시의 이벤트 발생 양상이 경우에 따라 달라
//             // (예: 숫자 키로 글자 선택, 화살표 키와 엔터 키로 글자 선택, 마우스로 글자 선택) 다음번 keydown 시점에 아래 플래그를 끈다.
//             _isComposingLatin = false;
//
//             isCanceled = (keyCode === Const.KeyCode.ESC);
//         }
//
//         return isCanceled;
//     }
//
//     function _checkLatinComposingForFirefox(event, keyCode, keyStr) {
//         var isCanceled = false;
//
//         if (!_isComposingLatin && _isRepeating(event) && _isAlphabetChar(keyStr)) {
//             _isComposingLatin = true;
//         } else if (_isComposingLatin && !_isLeftOrRightKey(keyCode) && !_isRepeating(event) && !_isDigit(keyStr)) {
//             // é,ë 등의 알파벳이 입력 완료된 이벤트 시점에서 플래그를 끄면 좋겠으나, 완료 시의 이벤트 발생 양상이 경우에 따라 달라
//             // (예: 숫자 키로 글자 선택, 화살표 키와 엔터 키로 글자 선택, 마우스로 글자 선택) 다음번 keydown 시점에 아래 플래그를 끈다.
//             _isComposingLatin = false;
//
//             isCanceled = (keyCode === Const.KeyCode.ESC);
//         }
//
//         return isCanceled;
//     }
//
//     function _isControlChar(char) {
//         return char.charCodeAt(0) < 32;
//     }
//
//     function _isDigit(str) {
//         var intNum = parseInt(str, 10);
//
//         return _.isNumber(intNum) && !_.isNaN(intNum);
//     }
//
//     function _isHangul(str) {
//         return str.slice(-1).match(_regHangul);
//     }
//
//     function _isJapanese(str) {
//         return str.slice(-1).match(_regJapanese);
//     }
//
//     function _isLatinWithDiacritic(str) {
//         return str && str.match(_regLatinWithDiacritic);
//     }
//
//     function _isAlphabetChar(str) {
//         return str.length === 1 && !!str.match(_regAlphabet);
//     }
//
//     function _flushImeBuffer() {
//         _$ime && _$ime.text("");
//     }
//
//     // TODO: _needToFlush 조건 검사 필요성 재고
//     // - 가장 깔끔한 것은 글자 하나 하나 완성되면 바로 DOM 버퍼를 비워주는 것 (needToFlush === true)
//     // - 그러나 그렇게 하면 이후의 한글 입력, 또는 중국어 글자 조합 시 문제가 되는 브라우저들이 있어서 하나씩
//     //   제외하다보니, needToFlush의 예외 케이스가 늘어나게 됐음
//     // - 그래서 현재는 사실상 false인 경우가 대부분이므로, 굳이 브라우저 따지지 말고 항상 false로 여겨도 될 듯함
//     //   (즉 _needToFlush 불필요)
//     // - 단, 한글->한자 변환 등 다른 경우에 문제가 생길 수 있으니 확인해야 함
//     function _flushImeBufferIfNeeded(str) {
//         if (_needToFlush || _compositionEnded && !_isHangul(str)) {
//             _flushImeBuffer();
//         }
//     }
//
//     function _getLastHangulInImeBuffer() {
//         var bufferStr = _$ime.text();
//
//         return _isHangul(bufferStr) ? bufferStr.charAt(bufferStr.length - 1) : "";
//     }
//
//     function _executeUpdateChar(insertChar) {
//         var keyInfo = _KeyInfo(0, insertChar);
//
//         if (_prevBuf !== keyInfo.char) {
//             _cbMap.onKeyComposing(keyInfo);
//             _prevBuf = keyInfo.char;
//         }
//     }
//
//     function _executeCompleteChar(insertChar) {
//         // 입력하는 space character 에 대해, no break space(\u00a0) 는 space(\u0020) 으로 치환한다.
//         _cbMap.onKeyInput(_KeyInfo(0,
//             insertChar === Const.CHAR_CODE_NO_BREAK_SPACE ? Const.CHAR_CODE_SPACE : insertChar));
//         _prevBuf = "";
//     }
//
//     // (한글 → 한자) 변환, 알파벳 변환(예: e → é)에 쓰이는 함수
//     function _executeReplaceChar(insertChar, offset) {
//         // IE 에서는 한글 입력 도중 한자로 변환 시, 2가지 문제가 존재한다.
//         // 1. 한자에 대한 keyCode 가 들어오지 않음
//         // 2. 한자로 바꿀 한글이 먼저 complete 됨
//         // 따라서, 한자에 대한 임의의 가상 keyCode 를 보내주고, 한자로 바꿀 한글을 삭제 후 그 자리에
//         // 한자를 insert 시킨다.
//         _cbMap.onKeyInput(_KeyInfo(Const.KeyCode.CHINESE_IN_HANGUL_INPUT, insertChar), offset);
//     }
//
//     function _setToIgnoreInputEvtIfNeeded(keyCode) {
//         _ignoreInputEvt = _.contains(_keyCodeListToIgnoreInputEvt, keyCode);
//     }
//
//     function _stopPropagation(event) {
//         event.stopImmediatePropagation();
//     }
//
//     function _hideQuickMenuIfNeeded() {
//         if (CommonUiController.isShowQuickMenu()) {
//             CommonUiController.hideQuickMenu();
//         }
//     }
//
//     function _updateUserFontStyle(fontStyle) {
//         _.each(fontStyle, function (value, key) {
//             _userFontStyle[ key ] = value;
//         });
//     }
//
//     return {
//         KeyInfo: _KeyInfo,
//
//         initialize: function (cbMap) {
//             function __getVersionOfChrome() {
//                 var matchedVersionInfo = navigator.userAgent.match(/Chrome\/(.?)(.|\d+|$)/),
//                     version = -1;
//
//                 // If the version of Chrome browser is bigger than 99, below codes will cause an error.
//                 if (matchedVersionInfo) {
//                     version = (+matchedVersionInfo[ 1 ]) * 10 + (+matchedVersionInfo[ 2 ]);
//                 }
//
//                 return version;
//             }
//
//             function __isOldSafari() {
//                 var versionList, major, minor, rev;
//
//                 if (_browser.safari) {
//                     versionList = _browser.version.split(".");
//                     major = +versionList[ 0 ];
//                     minor = +versionList[ 1 ];
//                     rev = +versionList[ 2 ];
//
//                     // ref version: 603.1.30
//                     return major < 603 || major === 603 && minor < 1 || major === 603 && minor === 1 && rev < 30;
//                 } else {
//                     return false;
//                 }
//             }
//
//             // note:
//             // 이벤트의 발생 순서, 그리고 각 이벤트에서 전달해주는 데이터는 브라우저마다 다르다.(나쁘다!)
//             // 따라서 적절한 시점에 적절한 데이터를 뽑아내어 글자를 완성해서 보내기 위해 브라우저별로
//             // 핸들러 함수를 따로 구성하게 되었다.
//             //
//             // 이벤트별 기본적인 역할은,
//             // - keyInput: 영문 알파벳, 숫자 처리 (조합 필요 없는 글자)
//             // - compositionEnd, textInput: 조합 글자 완성 처리
//             // - keyUp: DOM 버퍼 비우는 역할
//             // 등이고, 조합된 글자를 얻어내기 위한 더 적절한 시점이 있다면 달라질 수 있다.
//             //
//             // ref) IME 재정리 -
//             // https://wiki.hancom.com:8443/pages/viewpage.action?pageId=11717484
//
//             // TODO: 현재 Chrome 53 버전부터 key event 의 순서가 변경되었는데, 이것이 일시적인 버그인지,
//             // 아니면 어떠한 이슈를 해결하기 위한 수정안인지 판단할 내용을 찾지 못하여
//             // 임시로 53 미만 / 이상 버전을 둘다 대응하기로 결정됨.
//             // 차후 54 버전이나 마이너 버전에서 패치가 된다면 다시 확인하고 추후 수정해야 함
//             var chromeVer = __getVersionOfChrome(),
//                 isSafariOldVer = __isOldSafari(),
//                 platformList = [ "win", "mac", "linux" ],
//                 browserList = [ "chrome", "mozilla", "msie", "edge", "safari", "opera" ],
//                 defaultHandler = {
//                     keyDown: "onKeyDown",
//                     keyInput: "onKeyInput",
//                     keyUp: "onKeyUp",
//                     blur: "onBlur",
//                     textInput: "noop",
//                     compStart: "onCompositionStart",
//                     compUpdate: "onCompositionUpdate",
//                     compEnd: "onCompositionEnd"
//                 },
//                 _chromeHandleObj = {
//                     keyDown: "onKeyDown",
//                     keyInput: chromeVer >= 53 ? "onKeyInputForChrome" : "onKeyInput",
//                     keyUp: "onKeyUpForChrome",
//                     textInput: chromeVer >= 53 ? "onTextInputForChrome" : "onTextInput",
//                     compStart: "onCompositionStart",
//                     compUpdate: "onCompositionUpdate",
//                     compEnd: "onCompositionEndForChrome"
//                 },
//                 _linuxChromeHandleObj = {
//                     keyDown: "onKeyDown",
//                     keyInput: chromeVer >= 53 ? "onKeyInputForChrome" : "onKeyInput",
//                     keyUp: "onKeyUpForChrome",
//                     textInput: chromeVer >= 53 ? "onTextInputForLinuxChrome" : "onTextInput",
//                     compStart: "onCompositionStart",
//                     compUpdate: "onCompositionUpdate",
//                     compEnd: "onCompositionEndForChrome"
//                 },
//                 _ieHandleObj = {
//                     keyDown: "onKeyDownForIE",
//                     keyInput: "onKeyInput",
//                     keyUp: "onKeyUp",
//                     textInput: "noop",
//                     compStart: "onCompositionStartForIE",
//                     compUpdate: "onCompositionUpdate",
//                     compEnd: "onCompositionEndForIE"
//                 },
//                 _edgeHandleObj = {
//                     keyDown: "onKeyDownForEdge",
//                     keyInput: "onKeyInputForEdge",
//                     keyUp: "onKeyUpForEdge",
//                     textInput: "onTextInputForEdge",
//                     compStart: "onCompositionStartForEdge",
//                     compUpdate: "onCompositionUpdateForEdge",
//                     compEnd: "onCompositionEndForEdge"
//                 },
//                 _mozillaHandleObj = {
//                     keyDown: "onKeyDownForFF",
//                     keyInput: "onKeyInput",
//                     keyUp: "onKeyUp",
//                     textInput: "noop",
//                     compStart: "onCompositionStartForFF",
//                     compUpdate: "onCompositionUpdateForFF",
//                     compEnd: "onCompositionEndForFF"
//                 },
//                 _macMozillaHandleObj = {
//                     keyDown: "onKeyDownForMacFF",
//                     keyInput: "onKeyInputForMacFF",
//                     keyUp: "onKeyUpForMacFF",
//                     textInput: "noop",
//                     compStart: "onCompositionStartForMacFF",
//                     compUpdate: "onCompositionUpdateForFF",
//                     compEnd: "onCompositionEnd"
//                 },
//                 _safariHandleObj = {
//                     keyDown: "onKeyDown",
//                     keyInput: "onKeyInputForSafari",
//                     keyUp: "onKeyUpForSafari",
//                     blur: "noop",
//                     textInput: isSafariOldVer ? "onTextInput" : "onTextInputForSafari",
//                     compStart: "onCompositionStartForSafari",
//                     compUpdate: "onCompositionUpdate",
//                     compEnd: isSafariOldVer ? "onCompositionEndForOldSafari" : "onCompositionEndForSafari"
//                 },
//                 eventHandlerMap = {
//                     win: {
//                         chrome: _chromeHandleObj,
//                         msie: _ieHandleObj,
//                         edge: _edgeHandleObj,
//                         opera: _chromeHandleObj,
//                         mozilla: _mozillaHandleObj
//                     },
//                     mac: {
//                         chrome: _chromeHandleObj,
//                         safari: _safariHandleObj,
//                         opera: _chromeHandleObj,
//                         mozilla: _macMozillaHandleObj
//                     },
//                     linux: {
//                         chrome: _linuxChromeHandleObj,
//                         mozilla: _mozillaHandleObj
//                     }
//                 },
//                 osName, brName, handler;
//
//             osName = _.find(platformList, function (platformName) {
//                 return !!_platform[ platformName ];
//             }) || "";
//
//             brName = _.find(browserList, function (browserName) {
//                 return !!_browser[ browserName ];
//             }) || "";
//
//             handler = eventHandlerMap[ osName ] && eventHandlerMap[ osName ][ brName ] || defaultHandler;
//
//             this.curStrBuf = "";
//             _$ime = $("#ime_view");
//             _$imeBox = $("#ime_box");
//             _$document = $(document);
//
//             _$ime
//                 .attr("contentEditable", "true")
//                 .on("blur", this[ handler.blur || defaultHandler.blur ].bind(this));
//
//             _$document.on({
//                 keydown: this[ handler.keyDown ].bind(this),
//                 keyup: this[ handler.keyUp ].bind(this),
//                 textInput: this[ handler.textInput ].bind(this),
//                 compositionend: this[ handler.compEnd ].bind(this),
//                 compositionstart: this[ handler.compStart ].bind(this),
//                 compositionupdate: this[ handler.compUpdate ].bind(this)
//             });
//
//             $(window).on("blur", _.bind(this._releaseModKey, this));
//
//             // FireFox에서 붙여넣기 동작시 onKeyInput 이벤트가 document에서 발생하여, 잘못된 키입력이 동작함.
//             // 예) "가(나)" 붙여넣기 -> "가(나))", ")" 문자가 추가됨.
//             (_browser.mozilla ? _$ime : _$document)
//                 .on("input", this[ handler.keyInput ].bind(this));
//
//             // TODO: macOS/WebKit 버그로 macOS 로그인 직후 composition 이벤트 발생 안 하여 한글 입력 안 됨
//             // composition 이벤트 발생 유도하는 workaround 코드를 아래에 추가하였고,
//             // 나중에 macOS/WebKit 버그 고쳐지면 아래 코드 삭제 필요
//             if (_isMac && (_browser.safari || _browser.mozilla)) {
//                 _compositionEventTrigger = {
//                     getReady: function () {
//                         _$ime.on("input", _compositionEventTrigger.handleInput);
//                     },
//
//                     stop: _.once(function () {
//                         _$ime.off("input", _compositionEventTrigger.handleInput);
//                     }),
//
//                     handleInput: function (e) {
//                         var textContent = e.target.textContent;
//
//                         if (_isHangul(textContent)) {
//                             e.target.innerHTML = "";
//                             _executeCompleteChar(textContent);
//
//                             _compositionEventTrigger.stop();
//                         }
//                     }
//                 };
//
//                 _compositionEventTrigger.getReady();
//             }
//
//             _modifierKeyPressMap = CommonUtils.makeMap([
//                     [ _constKeyCode.SHIFT, _modKeyStatus.SHIFT_KEY_PRESS ],
//                     [ _constKeyCode.CTRL, _modKeyStatus.CTRL_KEY_PRESS ],
//                     [ _constKeyCode.ALT, _modKeyStatus.ALT_KEY_PRESS ]
//                 ].concat(_isMac ? [
//                     [ _constKeyCode.LEFT_COMMAND, _modKeyStatus.CMD_KEY_PRESS ],
//                     [ _constKeyCode.RIGHT_COMMAND, _modKeyStatus.CMD_KEY_PRESS ]
//                 ] : [])
//             );
//
//             _keyCodeListToIgnoreInputEvt = [
//                 _constKeyCode.ENTER,
//                 _constKeyCode.BACKSPACE
//             ];
//
//             _cbMap = cbMap || {
//                 onKeyComposing: _noop,
//                 onKeyInput: _noop
//             };
//         },
//
//         noop: _noop,
//
//         /*******************************************************************************
//          * Event Handlers - (default)
//          ******************************************************************************/
//
//         onKeyDown: function (event) {
//             if (_isEventFromUiInput(event)) {
//                 return;
//             }
//
//             var keyCode = event.keyCode,
//                 keyChar = event.char,
//                 modKeyStatus, isLatinComposingCanceled;
//
//             _compositionEnded = false;
//
//             if (_isMac) {
//                 // macOS 에서 é,ë 등의 알파벳을 선택/입력하기 위한 별도 팝업 창이 뜬 상태인지를 판별
//                 isLatinComposingCanceled = _checkLatinComposingForMac(event, keyCode, event.key);
//             }
//
//             modKeyStatus = this._modifierKeyHandler(event);
//             if (modKeyStatus == null) {
//                 return;
//             }
//
//             if (_isImeProcessing(keyCode) || keyChar) {
//                 // chrome 에서는 글자 조합 중, 브라우저 외부의 다른 프로그램 등을 클릭 시
//                 // 글자를 complete 시키지 못하는 문제가 발생한다.
//                 // 이 문제를 해결하려고 보니, 글자 조합 중 backspace 로 인해 조합 완료 되는 상황과
//                 // 위 문제를 구분할 수 없다.
//                 // 따라서 처음에는 event.originalEvent.data 와
//                 // event.target.textContent 의 정보를 비교하여 위의 문제들을 해결하였다고 보았는데,
//                 // 이 방법도 문제가 있었다.
//                 // 따라서 두번째 방법으로 originalEvent 의 정보 중 backspace 정보를 가지고 위 문제들을 해결하였다.
//                 // 그런데 두번째 해결 방법도 정상적인 방법이 아니다.
//                 // 만약 chrome 이 버전 업을 하면서 event 내용을 바꿔버린다면, 바로 쓸 수 없는 코드가 되어버린다.
//                 // 그러나 현재로썬 이 방법 외에는 해결할 방법을 찾지 못하였으므로, 우선 두번째 방법으로
//                 // 문제를 해결하려한다.
//                 // chrome 이 버전 업을 하거나 event 의 내용을 바꾼다면, 항상 이 부분을 확인해야 한다.
//                 if (event.originalEvent.code === "Backspace") {
//                     _isHandlingBackspace = true;
//                 }
//
//                 _stopPropagation(event);
//             } else if (isLatinComposingCanceled) {
//                 // prevent ESC key propagation
//                 _stopPropagation(event);
//             } else {
//                 return _cbMap.onKeyInput(_KeyInfo(keyCode, "", modKeyStatus, event));
//             }
//         },
//
//         onKeyInput: function (event) {
//             if (_isEventFromUiInput(event)) {
//                 return;
//             }
//             // enter, backspace 등 일부 key 입력에 대해서는 input 상황에서 무시하도록 한다.
//             if (_ignoreInputEvt) {
//                 return;
//             }
//
//             var textContent = event.target.textContent,
//                 insertChar = textContent.charAt(textContent.length - 1);
//
//             //영문 알파벳, 숫자, 특수문자는 onKeyInput 처리
//             //1. composition end event 발생 직후의 onKeyInput 에서는 아무 처리도 하지 않아야 함
//             //2. 한글은 key input 에서 처리하지 않음
//             //3. 중국어 변환을 위한 알파벳 입력은 key input 에서 처리하지 않음
//             //4. 한자가 composing 중일 때, 처리하지 않음
//             if (!_compositionEnded && !insertChar.match(_regHangul) &&
//                 !_alphabetCompositionInProgress && !_isComposingHanja) {
//                 _executeCompleteChar(insertChar);
//             }
//         },
//
//         onKeyUp: function (event) {
//             if (_isEventFromUiInput(event)) {
//                 return;
//             }
//
//             var textContent = event.target.textContent;
//
//             if (!_isHangul(textContent)) {
//                 // ie 에서 space 가 들어왔거나 textContent 의 마지막 글자가 한글이 아니라면 무조건 flush 를 시켜준다.
//                 if (!_isComposing) {
//                     _flushImeBuffer();
//                 }
//             }
//
//             return this._keyUpHandler(event);
//         },
//
//         onBlur: function (/* event */) {
//             //focus 제거 시 ime 내의 내용 초기화
//             this.flushInputText();
//         },
//
//         //textInput은 windows chrome, mac chrome, safari에서만 event 발생
//         //모음 + 한자를 통한 한자(특수문자)입력, 조합 완료된 한글은 textInput에서 처리
//         onTextInput: function (event) {
//             if (_isEventFromUiInput(event)) {
//                 return;
//             }
//
//             var insertChar = event.originalEvent.data,
//                 _deletedCharOffset = 0,
//                 dataLen, curStrBufLen;
//
//             // windows chrome 에서는 한글 조합 중 브라우저 외부의 다른 곳을 클릭할 경우,
//             // composition end 와 text input event 를 발생시킨다. 이 때, event 내부의 prop 에서는
//             // 조합중인 글자 대신 빈문자열을 가지고 있다.
//             // 따라서, 이 상황에서는 ime 버퍼의 글자를 complete 시키도록 한다.
//             if (_.isEmpty(insertChar) && _.isEmpty(event.target.textContent)) {
//                 insertChar = this.curStrBuf;
//             }
//
//             if (_compositionEnded && !_isComposingHanja) {
//                 this._initializeCurBuf();
//                 _executeCompleteChar(insertChar);
//             } else if (_isComposingHanja) {
//                 curStrBufLen = this.curStrBuf.length;
//                 dataLen = insertChar.length;
//                 if (curStrBufLen < dataLen) {
//                     // Mac OS X 에서는 한자 입력 시, 입력 소스에 따라 3가지 옵션이 있다.
//                     // 1) Windows 와 동일하게 한자와 한글이 1:1 로 교체
//                     // 2) 한자(한글) 과 같이 입력됨 (ex. 韓契(한글))
//                     // 3) 한글(한자) 와 같이 입력됨 (ex. 한글(韓契))
//                     // 2) 혹은 3) 일 땐, 실제 지워야 될 글자는 2글자이지만, 삽입될 글자는 그 이상이므로
//                     // offset 을 그 차이만큼 설정해주어야 한다.
//                     _deletedCharOffset = curStrBufLen - dataLen;
//                 }
//                 this._initializeCurBuf();
//                 _executeReplaceChar(insertChar, _deletedCharOffset);
//                 _isComposingHanja = false;
//             }
//         },
//
//         onCompositionStart: function (event) {
//             if (_isEventFromUiInput(event)) {
//                 return;
//             }
//
//             //composition event 발생 동안에는 onKeyInput 관련 처리를 하지 않음
//             //이는 중국어 IME 에서 중국어를 입력하기 위해 알파벳을 적는 상태인지,
//             //순수하게 영문 입력을 위해 알파벳을 타이핑 하는 상태인지를 구분해주기 위함
//             // TODO: rename the variable to avoid confusing
//             _alphabetCompositionInProgress = true;
//             _isComposing = true;
//         },
//
//         onCompositionUpdate: function (event) {
//             if (_isEventFromUiInput(event)) {
//                 return;
//             }
//             // ie 의 경우, 한자 처리 or 특수문자 처리 시에는 빈 char 를 update 한다.
//             // chrome 의 경우에는 무시한다.(chrome 의 경우 _isComposingHanja 이 항상 false)
//             if (_isComposingHanja) {
//                 return;
//             }
//             // TODO: revise the comment above and merge the conditional expression
//             if (_isComposingLatin) {
//                 return;
//             }
//
//             var insertChar = event.originalEvent.data;
//
//             if (!_.isEmpty(insertChar)) {
//                 this.curStrBuf = insertChar;
//                 _executeUpdateChar(insertChar);
//             }
//         },
//
//         onCompositionEnd: function (event) {
//             if (_isEventFromUiInput(event)) {
//                 return;
//             }
//
//             var insertChar = event.originalEvent.data,
//                 textContent = event.target.textContent,
//                 _deletedCharOffset = 0;
//
//             this._initializeCurBuf();
//
//             _compositionEnded = true;
//             _alphabetCompositionInProgress = false;
//
//             if (_isMacFirefox && _isComposingLatin) {
//                 // complete Latin alphabet composition
//                 if (_isLatinWithDiacritic(insertChar)) {
//                     this._completeLatinComposition(insertChar);
//                 }
//             } else if (!_.isEmpty(insertChar)) {
//                 if (insertChar.match(_regHangul)) {
//                     if (!_isComposingHanja) {
//                         _executeCompleteChar(insertChar.charAt(0));
//                     } else {
//                         // 한글 조합이 완료되서 complete 시키려고 하는데 _isComposingHanja 이 true 라는 것은,
//                         // 한자키를 눌러서 한자를 선택하려다 esc 로 취소한 경우이다.
//                         // 이때에는 조합 완료된 글자를 complete 시켜줄 필요가 없다.
//                         _executeUpdateChar("");
//                     }
//                 } else {
//                     if (_isComposingHanja) {
//                         if (insertChar !== textContent) {
//                             // '한글' -> '韓글', 'ㄷㄴㄷㄹ' -> '+ㄴㄷㄹ' 의 경우에는
//                             // 적절한 글자를 한자(or 특문)로 대체시켜야 한다.
//                             // 따라서 삭제할 글자의 위치를 계산하기 위한 offset 을 계산하여 넘겨준다.
//                             _deletedCharOffset = textContent.length - 1;
//                         }
//                         _executeReplaceChar(insertChar, _deletedCharOffset);
//                     } else {
//                         _executeCompleteChar(insertChar);
//                     }
//
//                     // 한글이 아닌 조합 글자에 대한 complete 시에는 미리 버퍼를 비워준다.
//                     // 이는 keyInput 에서 한글이 아닌 이유로 마지막 글자가 한번 더 complete 되는 것을
//                     // 방지하기 위함이다.
//                     _flushImeBufferIfNeeded(insertChar);
//                 }
//             } else {
//                 _executeUpdateChar("");
//             }
//         },
//
//         /*******************************************************************************
//          * Event Handlers - (Chrome browser)
//          ******************************************************************************/
//
//         onKeyInputForChrome: function () {
//             _noop();
//         },
//
//         onTextInputForChrome: function (event) {
//             if (_isEventFromUiInput(event)) {
//                 return;
//             }
//
//             var insertChar = event.originalEvent.data;
//
//             if (_isComposingLatin && _isLatinWithDiacritic(insertChar)) {
//                 this._completeLatinComposition(insertChar);
//             } else if (insertChar !== "") {
//                 this._initializeCurBuf();
//                 _executeCompleteChar(insertChar);
//             }
//         },
//
//         onTextInputForLinuxChrome: function (event) {
//             if (_isEventFromUiInput(event)) {
//                 return;
//             }
//
//             var insertChar = event.originalEvent.data;
//
//             if (insertChar !== "") {
//                 this._initializeCurBuf();
//                 _executeCompleteChar(insertChar);
//             } else {
//                 _isHandlingBackspace = true;
//             }
//         },
//
//         onKeyUpForChrome: function (event) {
//             if (_isEventFromUiInput(event)) {
//                 return;
//             }
//
//             var keyCode = event.keyCode,
//                 keyCodeStr = "" + keyCode,
//                 textContent = event.target.textContent;
//
//             if (_compositionEnded) {
//                 // 입력된 글자를 complete 시에 flush 시키면 flush 가 정상적으로 이루어지지 않는다.
//                 // 따라서 key up 에서 DOM 의 글자를 flush 시킨다.
//                 _compositionEnded = false;
//             } else if (!this.isModKeyPressed() && !_isHangul(textContent)) {
//                 // key event 를 통해 text 를 selection 하거나 복사 붙여넣기와 같이
//                 // 특수한 상황을 제외하고선 key up 에서 buffer 를 비워준다.
//                 if (!_isComposing) {
//                     _flushImeBufferIfNeeded(textContent);
//                 }
//             }
//             _ignoreInputEvt = false;
//
//             // 중국어 조합 글자 입력 중 esc 를 눌렀을 때, 빈 문자열을 update 시켜야 한다.
//             // ex) ni'hao'ma' 입력 후, esc 누르면 ni'hao'ma' 글자가 화면에서 삭제되어야 함
//             if (keyCode === Const.KeyCode.ESC && this.curStrBuf !== "" && !this.curStrBuf.match(_regHangul)) {
//                 this._updateEmptyChar();
//             }
//
//             if (_modifierKeyPressMap[ keyCodeStr ]) {
//                 this.applyModifierKeyReleased(keyCodeStr);
//             }
//         },
//
//         onCompositionEndForChrome: function (event) {
//             if (_isEventFromUiInput(event)) {
//                 return;
//             }
//
//             _compositionEnded = true;
//             _alphabetCompositionInProgress = false;
//             _isComposing = false;
//
//             if (_isComposingLatin) {
//                 // latin alphabet with diacritic is handled in TextInput handler
//                 return;
//             }
//
//             // 일반적으로 조합완료된 글자는 text input 에서 처리하므로,
//             // text input event 를 처리하는 핸들러에서 ime 버퍼를 비워준다.
//             // 그러나 조합중 backspace 로 인해 조합중인 글자가 지워진 경우에는
//             // text input event 가 발생하지 않는다. 따라서 이 상황에서는
//             // composition end event 핸들러에서 ime 버퍼를 비워주도록 한다.
//             if (_isHandlingBackspace) {
//                 this._updateEmptyChar();
//                 _isHandlingBackspace = false;
//             }
//         },
//
//         /*******************************************************************************
//          * Event Handlers - (IE browser)
//          ******************************************************************************/
//
//         onKeyDownForIE: function (event) {
//             if (_isEventFromUiInput(event)) {
//                 return;
//             }
//
//             var keyCode = event.keyCode,
//                 keyCodeStr = "" + keyCode,
//                 keyChar = event.char,
//                 isModKeyPressed = !!(_modifierKeyPressMap[ keyCodeStr ]),
//                 insertChar, modKeyStatus;
//
//             _compositionEnded = false;
//
//             if (isModKeyPressed) {
//                 this.applyModifierKeyPressed(keyCodeStr);
//
//                 // IE 에서는 shift + alt 를 눌렀을 경우,
//                 // 입력기 변경(ex. 한국어 입력기 -> 중국어 입력기)이 일어나면서
//                 // 현재 조합 중인 글자에 대한 composition end event 가 일어나지 않음
//                 // 따라서 이러한 상황에서 조합중인 글자가 있다면 강제적으로 complete 시켜줌
//                 if (event.shiftKey && event.altKey && this.getInputTextLength() > 0) {
//                     if (this.curStrBuf.match(_regHangul)) {
//                         insertChar = this.curStrBuf;
//                         this._initializeCurBuf();
//                         _executeCompleteChar(insertChar);
//                         // 한글 입력이 완료 되어 다른 언어로 넘어갔으므로, 더이상 DOM 버퍼는 유지할 필요가 없다.
//                         // 따라서 complete 와 동시에 같이 flush 시켜준다.
//                         _flushImeBuffer();
//                     }
//                 }
//
//                 return false;
//             }
//
//             this._releaseModKeyIfNeeded(event);
//             modKeyStatus = this.getModKeyStatusFromKeyEvt(event);
//
//             _setToIgnoreInputEvtIfNeeded(_isImeProcessing(keyCode) && event.key === "Backspace" ?
//                 _constKeyCode.BACKSPACE : keyCode);
//
//             if (_isImeProcessing(keyCode)) {
//                 if (event.key === "KanjiMode") {
//                     _isHanjaMode = true;
//                 }
//                 _stopPropagation(event);
//             } else if (keyChar && !_isControlChar(keyChar)) {
//                 return _executeCompleteChar(keyChar);
//             } else {
//                 _flushImeBuffer();
//                 return _cbMap.onKeyInput(_KeyInfo(keyCode, "", modKeyStatus, event));
//             }
//         },
//
//         onCompositionStartForIE: function (event) {
//             if (_isEventFromUiInput(event)) {
//                 return;
//             }
//
//             var textContent = event.target.textContent,
//                 insertChar, partialText;
//
//             _isComposing = true;
//
//             //composition event 발생 동안에는 onKeyInput 관련 처리를 하지 않음
//             //이는 중국어 IME 에서 중국어를 입력하기 위해 알파벳을 적는 상태인지,
//             //순수하게 영문 입력을 위해 알파벳을 타이핑 하는 상태인지를 구분해주기 위함
//             _alphabetCompositionInProgress = true;
//
//             // MS 에서는 Office 를 설치할 시, IME 가 별도로 설치된다.
//             // Office IME 는 IE 에서 composition end event 를 발생시키지 않는 문제를 가지고 있다.
//             // onKeyDown 은 매번 키 입력 시 일어나는 이벤트이므로 keyDown 에서는 처리가 힘들다.
//             // 그리고 일반적인 상황에서 start 에 들어올 때에는 curStrBuf 가 항상 비어있다.
//             // 따라서 start 에서 curStrBuf 가 비었는지 확인하고, 비어있지 않다면 해당 글자를
//             // complete 시키도록 한다.
//             if (this.curStrBuf.match(_regHangul)) {
//                 // 한글 조합 완료 시 종성이 없는 경우 (ex. '닏' 에서 'ㅏ' 입력하여 '니' 가 complete 되야 하는 경우)에는
//                 // this.curStrBuf 에서 그대로 값을 가져오면 '닏' 이 들어있으므로 비정상적으로 동작한다.
//                 // 따라서 textContent 에서 complete 될 글자를 가져와서 처리한다.
//                 partialText = textContent.slice(textContent.length - 2, textContent.length - 1);
//                 insertChar = partialText;
//
//                 this._initializeCurBuf();
//                 _executeCompleteChar(insertChar);
//             }
//         },
//
//         onCompositionEndForIE: function (event) {
//             if (_isEventFromUiInput(event)) {
//                 return;
//             }
//
//             var data = event.originalEvent.data,
//                 // Retrieve text content through _$ime.text() instead of event.target.textContext.
//                 // As described in https://jira.hancom.com:8443/browse/WEBSHO-3551, only in IE,
//                 // if a user clicks menu panes or property views while processing composition,
//                 // event.target is changed to the DOM element clicked.
//                 textContent = _$ime.text(),
//                 textContentLen = textContent.length,
//                 splitContent = textContent.slice(textContentLen - data.length, textContentLen),
//                 _deletedCharOffset = 0,
//                 insertChar;
//
//             _compositionEnded = true;
//             _isComposing = false;
//
//             // MS Office IME 에서 한글조합 중 특수문자, 숫자, 알파벳 등이 들어오면 end 이벤트를 발생시킨다.
//             // 그런데, 이때 data 는 빈문자열이 들어오게 된다.
//             // 따라서, 이때에는 textContent 에서 complete 될 글자를 추출하도록 한다.
//             // MS 기본 입력기에서는 data 가 들어오기 때문에 영향이 없다.
//             if (!_.isEmpty(data)) {
//                 if (data.match(_regHangul)) {
//                     if (splitContent.match(_regHangul)) {
//                         if (!textContent.charAt(0).match(_regHangul)) {
//                             // space 없이 한글을 입력 후, 한자키를 눌러서 선택했을 경우
//                             // ex1) '한글'('글'은 조합중) 입력 중 한자 키 누르고 한자 선택 시 '韓글' 과 같이 들어옴
//                             // ex2) 'ㄷㄴㄷㄹ'('ㄹ' 조합중) 입력 중 한자 키 누르고 특수기호 선택 시 '+ㄴㄷㄹ' 로 들어옴
//                             insertChar = textContent.charAt(0);
//                             _deletedCharOffset = textContentLen - 1;
//                         } else if ((data === textContent.charAt(textContentLen - 1))) {
//                             // 한글 조합 중 숫자, 특수문자 입력 시(ex '가나' 에서 '1' 입력 하여 '나' 조합완료)
//                             insertChar = data;
//                         } else {
//                             // 일반적인 한글 조합 완료 (ex '간' 에서 'ㅏ' 입력 하여 '가' 조합완료)
//                             insertChar = textContent.charAt(textContentLen - 2);
//                         }
//                     } else {
//                         // 한자 입력이 들어올 경우, 현재 한글을 먼저 삭제시키고 나서 한자가 insert 되어야 함
//                         insertChar = splitContent;
//                     }
//                 } else if (data !== Const.CHAR_CODE_NO_BREAK_SPACE) {
//                     insertChar = data;
//                 } else {
//                     insertChar = textContent;
//                 }
//             } else {
//                 // textContent 에서 글자 추출해야 하는 경우
//                 if (textContent && !_ignoreInputEvt) {
//                     if (_isHangul(textContent[ 0 ])) {
//                         // ex1) "안" -> "안"
//                         // ex2) "안녕 " -> " "
//                         insertChar = textContent.slice(textContentLen - 1, textContentLen);
//                     } else {
//                         // 한글 외의 조합 글자 처리 (예: 중국어 입력 시, 한자어 단어 단위로 입력)
//                         insertChar = textContent;
//                     }
//                 } else {
//                     insertChar = "";
//                 }
//             }
//
//             this._initializeCurBuf();
//
//             if (!_.isEmpty(insertChar)) {
//                 if (_isComposingHanja) {
//                     // 한자 입력 완료
//                     _executeCompleteChar(insertChar);
//
//                     // 한자 입력인 경우에는 이미 마지막 글자의 조합은 완료된 상태이므로 버퍼를 비워준다.
//                     _flushImeBuffer();
//                     _isHanjaMode = false;
//                     _isComposingHanja = false;
//
//                 } else if (_isHanjaMode) {
//                     // 여기서는 '한자'키 누른(keydown) 직후에 발생한 compositionend 처리: 한자 선택 창 뜨는 시점
//                     _isComposingHanja = true;
//                 } else {
//                     // 한글 조합 완료
//                     _executeCompleteChar(insertChar);
//                 }
//             } else {
//                 _executeUpdateChar(insertChar);
//                 _flushImeBufferIfNeeded(insertChar);
//             }
//
//         },
//
//         /*******************************************************************************
//          * Event Handlers - (Edge browser)
//          *
//          * - key events sequence on typing Hangul in Edge
//          *
//          * (compositionend)   - for the previous Hangul key input. optional.
//          * (textInput)        - for the previous Hangul key input. optional.
//          *
//          * (compositionstart) - for a new Hangul(초성) key input. optional.
//          *
//          *  keydown
//          *  compositionupdate
//          *  keyup
//          *  input
//          *
//          ******************************************************************************/
//
//         onKeyDownForEdge: function (event) {
//             if (_isEventFromUiInput(event)) {
//                 return;
//             }
//
//             var keyCode = event.keyCode,
//                 modKeyStatus;
//
//             _compositionEnded = false;
//
//             modKeyStatus = this._modifierKeyHandler(event);
//             if (modKeyStatus == null) {
//                 return;
//             }
//
//             if (_isImeProcessing(keyCode)) {
//                 _lastKeyDownBufferLen = _$ime.text().length;
//                 _stopPropagation(event);
//             } else {
//                 _lastKeyDownBufferLen = 0;
//                 _flushImeBuffer();
//
//                 return _cbMap.onKeyInput(_KeyInfo(keyCode, "", modKeyStatus, event));
//             }
//         },
//
//         onKeyInputForEdge: function (event) {
//             if (_isEventFromUiInput(event)) {
//                 return;
//             }
//             if (_isComposingHanja) {
//                 return;
//             }
//
//             // TODO: Edge 41-42의 (non한글-한글) 콤보 입력 시의 버그로 인해
//             //
//             // - 한글 compositionupdate 이벤트(발생 안 함)와
//             // - event.originalEvent.data 값(쓰레기값 들어 있음)을 사용하지 못하여
//             //
//             // 항상 발생하는 input 이벤트 핸들러로 한글 조합 처리 루틴을 옮겨옴.
//             // 나중에 혹시 Edge 버그가 수정된다면 원래 자리로 돌아가는 것이 낫겠다.
//             var insertChar = _getLastHangulInImeBuffer();
//
//             if (!_.isEmpty(insertChar)) {
//                 this.curStrBuf = insertChar;
//                 _executeUpdateChar(insertChar);
//             }
//         },
//
//         onTextInputForEdge: function (event) {
//
//             // (Edge v42 + Sogou 중국어 입력기 v9) 로 중국어 입력 시,
//             // 일종의 쓰레기값이 뒤에 붙어 DOM 스트링이 못 만들어지는 경우가 있어 잘라내기 위한 함수 (WEBSHO-4868)
//             //
//             // ex1) "打的费翻\u0000\u0001\u0000eq\u0000\u0000"
//             //            ---------------------------------
//             // ex2) "撒地方萨芬\u0001\u0000\u0007\u0000\u0000\u0000"
//             //              ------------------------------------
//             // ex3) "撒地方萨芬的ᒒ翻\u0000\u0001\u0000_d\u0000\u0000"
//             //                -----------------------------------
//             //
//             // TODO: ex1)에서 "翻", ex3)에서 "ᒒ翻" 도 함께 잘라내야 하지만 패턴을 찾을 수 없어 일단 보류 (즉 이상한 글자가 붙을 수 있음)
//             function __normalizeText(str) {
//                 return str.replace(/[\u0000\u0001].*$/, "");
//             }
//
//             if (_isEventFromUiInput(event)) {
//                 return;
//             }
//
//             if (_$ime.text().length < _lastKeyDownBufferLen) {
//                 // 한글 입력/조합 도중에 backspace 키로 조합이 취소된 경우 (예: "헐ㅋ" -> "헐")
//                 _flushImeBuffer();
//                 this._updateEmptyChar();
//
//                 return;
//             }
//
//             // TODO: Edge 41-42의 (non한글-한글) 콤보 입력 시의 버그로 인해
//             //
//             // - 콤보 입력으로 인한 비정상 상황에서는 IME 버퍼의 한글이 유효하고,
//             // - 정상 상황에서는 IME 버퍼는 비어 있고, event 에 글자가 들어 있다.
//             //
//             // 나중에 혹시 Edge 버그가 수정된다면 원래처럼 event 만을 사용하는 것이 낫겠다.
//             var insertChar = _getLastHangulInImeBuffer() || event.originalEvent.data,
//                 _deletedCharOffset = 0;
//
//             if (_isControlChar(insertChar)) {
//                 // Ctrl-H, Ctrl-D 등의 단축키에 대해 엉뚱하게도 textInput 이벤트가 들어와 이상 동작하는 것을 걸러냄 (Edge v42)
//                 return;
//             }
//             if (this.curStrBuf === "" && insertChar.match(_regHangul)) {
//                 return;
//             }
//
//             this._initializeCurBuf();
//
//             _isComposingHanja = true;
//
//             // 한자가 들어왔을 경우, comp end -> text input -> key input 으로 이벤트가 종료된다.
//             // 즉 key up 이 발생하지 않으므로, key up 에서 처리하는 부분들을 처리한다.
//             if (_isHanjaMode) {
//                 _executeReplaceChar(insertChar, _deletedCharOffset);
//                 _flushImeBuffer();
//                 _isHanjaMode = _isComposingHanja = _compositionEnded = _ignoreInputEvt = false;
//
//                 if (_modifierKeyPressMap[ "" + event.keyCode ]) {
//                     this.applyModifierKeyReleased("" + event.keyCode);
//
//                     return false;
//                 }
//
//                 return;
//             }
//
//             if (!_.isEmpty(insertChar)) {
//                 _executeCompleteChar(__normalizeText(insertChar));
//             }
//         },
//
//         onKeyUpForEdge: function (event) {
//             if (_isEventFromUiInput(event)) {
//                 return;
//             }
//
//             var keyCode = event.keyCode;
//
//             if (event.key === "KanjiMode") {
//                 _isHanjaMode = true;
//             } else if (!_isImeProcessing(keyCode)) {
//                 // keyCode 가 조합중이라는 것은 한자키를 누른 후
//                 // 방향키로 한자를 선택하는 상황이므로 걸러낸다.
//                 if (event.key === "Enter") {
//                     _flushImeBuffer();
//                 }
//
//                 return this._keyUpHandler(event);
//             }
//         },
//
//         onCompositionStartForEdge: function (event) {
//             if (_isEventFromUiInput(event)) {
//                 return;
//             }
//
//             _isComposingHanja = false;
//         },
//
//         onCompositionUpdateForEdge: function (event) {
//             if (_isEventFromUiInput(event)) {
//                 return;
//             }
//             if (_isComposingHanja) {
//                 return;
//             }
//
//             // TODO: Edge 41-42의 (non한글-한글) 콤보 입력 시의 버그로 인해
//             //
//             // - 한글 compositionupdate 이벤트(발생 안 함)와
//             // - event.originalEvent.data 값(쓰레기값 들어 있음)을 사용하지 못하여
//             //
//             // 항상 발생하는 input 이벤트 핸들러로 한글 조합 처리 루틴을 가져가고,
//             // compositionupdate 이벤트는 한글 외의 글자만 처리하도록 함.
//             // 나중에 혹시 Edge 버그가 수정된다면 compositionupdate 에서 모두 처리하는 게 바람직함.
//             var insertChar = event.originalEvent.data;
//
//             if (!_.isEmpty(insertChar) && !_isHangul(insertChar)) {
//                 this.curStrBuf = insertChar;
//                 _executeUpdateChar(insertChar);
//             }
//         },
//
//         onCompositionEndForEdge: function (event) {
//             if (_isEventFromUiInput(event)) {
//                 return;
//             }
//
//             _compositionEnded = true;
//         },
//
//         /*******************************************************************************
//          * Event Handlers - (Windows mozilla firefox browser)
//          ******************************************************************************/
//
//         onKeyDownForFF: function (event) {
//             if (_isEventFromUiInput(event)) {
//                 return;
//             }
//
//             var keyCode = event.keyCode,
//                 keyChar = event.char,
//                 modKeyStatus, result;
//
//             _compositionEnded = false;
//
//             modKeyStatus = this._modifierKeyHandler(event);
//             if (modKeyStatus == null) {
//                 return;
//             }
//
//             if (_isImeProcessing(keyCode) || keyChar) {
//                 if (event.originalEvent.code === "Backspace") {
//                     _isHandlingBackspace = true;
//                 }
//
//                 _stopPropagation(event);
//             } else {
//                 modKeyStatus = this._modifierKeyHandler(event);
//                 result = _cbMap.onKeyInput(_KeyInfo(keyCode, "", modKeyStatus, event));
//
//                 if (modKeyStatus != null) {
//                     this._releaseModKey();
//                 }
//
//                 return result;
//             }
//         },
//
//         onCompositionStartForFF: function (event) {
//             if (_isEventFromUiInput(event)) {
//                 return;
//             }
//
//             var data = event.originalEvent.data;
//
//             // 한자 입력일 때에는 data 에 값이 들어있음.(평소 한글 조합때에는 data 는 빈문자열)
//             if (!_.isEmpty(data) && !_isAlphabetChar(data)) {
//                 _isComposingHanja = true;
//
//                 return false;
//             }
//
//             //composition event 발생 동안에는 onKeyInput 관련 처리를 하지 않음
//             //이는 중국어 IME 에서 중국어를 입력하기 위해 알파벳을 적는 상태인지,
//             //순수하게 영문 입력을 위해 알파벳을 타이핑 하는 상태인지를 구분해주기 위함
//             _alphabetCompositionInProgress = true;
//         },
//
//         onCompositionUpdateForFF: function (event) {
//             if (_isEventFromUiInput(event)) {
//                 return;
//             }
//             // ff 의 경우, 한자 처리 or 특수문자 처리 시에는 빈 char 를 update 한다.
//             if (_isComposingHanja) {
//                 return false;
//             }
//             // TODO: revise the comment above and merge the conditional expression
//             if (_isComposingLatin) {
//                 return;
//             }
//
//             var insertChar = event.originalEvent.data;
//
//             //한글에 대해 입력 완료 시, composition end 발생 이전에 composition update 발생
//             //ex : '가' 다음 2 를 입력하면, event.originalEvent.data = "가2"
//             //  -> 즉, 한글 글자가 들어 있다면 첫번째 글자만 선택 후 update,
//             //     그 외(한자 입력을 위한 영문 알파벳 입력)에는 전체 글자를 update
//             this.curStrBuf = insertChar.match(_regHangul) ? insertChar.charAt(0) : insertChar;
//             _executeUpdateChar(this.curStrBuf);
//         },
//
//         onCompositionEndForFF: function (event) {
//             if (_isEventFromUiInput(event)) {
//                 return;
//             }
//
//             // TODO: 이 부분은 추후 cursorGenerator 와 같이, 상속 구조로 처리할 예정이다.
//             // 이를 위해선 브라우저 별로 별도의 ime 파일로 분리하고, ime 의 default method 를
//             // 상속받도록 한 후, override 를 통해 각 브라우저 별 handler 를 구성하도록 작업해야 한다.
//             this.onCompositionEnd(event);
//
//             _isComposingHanja = false;
//         },
//
//         /*******************************************************************************
//          * Event Handlers - (Mac mozilla firefox browser)
//          ******************************************************************************/
//
//         onKeyDownForMacFF: function (event) {
//             if (_isEventFromUiInput(event)) {
//                 return;
//             }
//
//             var keyCode = event.keyCode,
//                 keyChar = event.char,
//                 modKeyStatus, isLatinComposingCanceled;
//
//             _compositionEnded = false;
//
//             // macOS 에서 é,ë 등의 알파벳을 선택/입력하기 위한 별도 팝업 창이 뜬 상태인지를 판별
//             isLatinComposingCanceled = _checkLatinComposingForMac(event, keyCode, event.key);
//
//             modKeyStatus = this._modifierKeyHandler(event);
//             if (modKeyStatus == null) {
//                 return;
//             }
//
//             if (_isImeProcessing(keyCode) || keyChar || isLatinComposingCanceled) {
//                 _stopPropagation(event);
//             } else {
//                 if (_ignoreInputEvt) {
//                     _isHandlingBackspace = true;
//                 } else if (keyCode === _constKeyCode.DELETE) {
//                     _isHandledDelete = true;
//                 } else if (keyCode === _constKeyCode.TAB) {
//                     _isHandledTab = true;
//                 }
//
//                 return _cbMap.onKeyInput(_KeyInfo(keyCode, "", modKeyStatus, event));
//             }
//         },
//
//         onKeyInputForMacFF: function (event) {
//             if (_isEventFromUiInput(event)) {
//                 return;
//             }
//             // enter, backspace 등 일부 key 입력에 대해서는 input 상황에서 무시하도록 한다.
//             if (_ignoreInputEvt) {
//                 return;
//             }
//
//             var textContent = event.target.textContent,
//                 insertChar = textContent.charAt(textContent.length - 1);
//
//             if (!insertChar.match(_regHangul) && !_alphabetCompositionInProgress && !_isComposingHanja && !_isComposingLatin) {
//                 _executeCompleteChar(insertChar);
//                 _flushImeBuffer();
//             }
//         },
//
//         onKeyUpForMacFF: function (event) {
//             if (_isEventFromUiInput(event)) {
//                 return;
//             }
//
//             var keyCode = event.keyCode;
//
//             if (_isComposingLatin && keyCode === Const.KeyCode.ENTER) {
//                 // 기호 불은 알파벳(é, ü) 팝업 창에서 화살표-엔터 키로 글자 선택 완료할 때의 엔터 처리
//                 return;
//             }
//
//             if (!_isHandlingBackspace) {
//                 _setToIgnoreInputEvtIfNeeded(keyCode);
//
//                 // 1) WEBSHO-1819: 글자 조합 중 fn + delete(windows 에서 delete 키)를 누를 경우,
//                 //     delete 에 대한 key down 이 발생하지 않기 때문에, space 를 삭제하는지에 대한 구분을 하지 못함.
//                 // 2) 그러나 일반적으로 delete 키를 쭉 누르는 경우가 있어 key down 에서 처리해야 하기 때문에,
//                 //     delete 키에 대한 처리를 key up 으로 이관할 수 없음
//                 // 우선 어쩔 수 없이 flag 로 처리하기로 함.
//                 if (_ignoreInputEvt && !_isComposingHanja || (keyCode === _constKeyCode.DELETE && !_isHandledDelete) ||
//                     (keyCode === _constKeyCode.TAB && !_isHandledTab)) {
//                     // Win FF 에서는 글자 조합 중 enter 시
//                     // composition end -> key input -> key down -> key up 순으로 event 가 발생한다.
//                     // Mac FF 에서는 키 이벤트 변경으로 인해 composition end -> key input -> key input -> key up 순으로
//                     // 키 이벤트가 발생한다. key down 에서 처리할 수 없는 상황이므로, key up 에서 처리하도록 한다.
//                     _cbMap.onKeyInput(_KeyInfo(keyCode, "", this.getModKeyStatusFromKeyEvt(event)));
//                 }
//                 _isHandledDelete = false;
//                 _isHandledTab = false;
//             } else {
//                 _isHandlingBackspace = false;
//             }
//
//             _isComposingHanja = false;
//
//             return this._keyUpHandler(event);
//         },
//
//         onCompositionStartForMacFF: function (event) {
//             // TODO: macOS/WebKit 버그로 macOS 로그인 직후 입력한 첫번째 한글 자소에 대해 composition 이벤트 발생 안 하여
//             // 첫번째 글자(예를 들어 '한'의 'ㅎ')가 사라지는 문제가 있음
//             // 나중에 macOS/WebKit 버그 고쳐지면 이 핸들러 함수 삭제 필요
//
//             _compositionEventTrigger.stop();
//
//             return this.onCompositionStartForFF(event);
//         },
//
//         /*******************************************************************************
//          * Event Handlers - (Safari browser)
//          ******************************************************************************/
//
//         onTextInputForSafari: function (event) {
//             if (_isEventFromUiInput(event)) {
//                 return;
//             }
//
//             var insertChar;
//
//             if (_isComposingLatin) {
//                 insertChar = event.originalEvent.data;
//
//                 if (_isLatinWithDiacritic(insertChar)) {
//                     this._completeLatinComposition(insertChar);
//                 }
//             }
//         },
//
//         onKeyInputForSafari: function (event) {
//             if (_isEventFromUiInput(event)) {
//                 return;
//             }
//             // enter, backspace 등 일부 key 입력에 대해서는 input 상황에서 무시하도록 한다.
//             if (_ignoreInputEvt) {
//                 return;
//             }
//
//             var insertChar = event.originalEvent.data;
//
//             if (_isComposingLatin && _isLatinWithDiacritic(insertChar)) {
//                 // composition of latin alphabet with diacritic is already handled in TextInput handler
//                 return;
//             }
//
//             //영문 알파벳, 숫자, 특수문자는 onKeyInput 처리
//             if (!_compositionEnded && !_alphabetCompositionInProgress && !_isComposingHanja) {
//                 // '글' 입력 중 space 를 누를 경우, '글 ' 로 들어옴.
//                 // 이때, 뒤의 ' ' 만 처리해주기 위하여 한글을 빈문자로 치환한다.
//                 insertChar = insertChar.replace(_regHangul, "");
//
//                 if (insertChar !== "") {
//                     _executeCompleteChar(insertChar);
//                     _flushImeBuffer();
//                 }
//             }
//         },
//
//         onKeyUpForSafari: function (event) {
//             if (_isEventFromUiInput(event)) {
//                 return;
//             }
//
//             var keyCode = event.keyCode,
//                 keyCodeStr = "" + keyCode,
//                 textContent = event.target.textContent;
//
//             if (_compositionEnded) {
//                 _flushImeBufferIfNeeded(textContent);
//                 _compositionEnded = false;
//             } else if (!this.isModKeyPressed() && !_isHangul(textContent)) {
//                 // key event 를 통해 text 를 selection 하거나 복사 붙여넣기와 같이
//                 // 특수한 상황을 제외하고선 key up 에서 buffer 를 비워준다.
//                 if (!_isComposing) {
//                     _flushImeBuffer();
//                 }
//             }
//             _ignoreInputEvt = false;
//
//             // 중국어 조합 글자 입력 중 esc 를 눌렀을 때, 빈 문자열을 update 시켜야 한다.
//             // ex) ni'hao'ma' 입력 후, esc 누르면 ni'hao'ma' 글자가 화면에서 삭제되어야 함
//             if (keyCode === Const.KeyCode.ESC && this.curStrBuf !== "" && !this.curStrBuf.match(_regHangul)) {
//                 this._updateEmptyChar();
//             }
//
//             if (_modifierKeyPressMap[ keyCodeStr ]) {
//                 this.applyModifierKeyReleased(keyCodeStr);
//             }
//         },
//
//         onCompositionStartForSafari: function (event) {
//             // TODO: macOS/WebKit 버그로 macOS 로그인 직후 composition 이벤트 발생 안 하여 한글 입력 안 됨
//             // 나중에 macOS/WebKit 버그 고쳐지면 아래 라인 삭제 필요
//             _compositionEventTrigger.stop();
//
//             if (_isEventFromUiInput(event)) {
//                 return;
//             }
//
//             var data = event.originalEvent.data;
//
//             _isComposing = true;
//
//             // 한자 입력일 때에는 data 에 값이 들어있음.(평소 한글 조합때에는 data 는 빈문자열)
//             if (!_.isEmpty(data) && data !== "Hancom WebOffice Clipboard Data") {
//                 _isComposingHanja = true;
//                 this.curStrBuf = data;
//
//                 return false;
//             }
//
//             //composition event 발생 동안에는 onKeyInput 관련 처리를 하지 않음
//             //이는 중국어 IME 에서 중국어를 입력하기 위해 알파벳을 적는 상태인지,
//             //순수하게 영문 입력을 위해 알파벳을 타이핑 하는 상태인지를 구분해주기 위함
//             _alphabetCompositionInProgress = true;
//         },
//
//         onCompositionEndForOldSafari: function (event) {
//             if (_isEventFromUiInput(event)) {
//                 return;
//             }
//
//             _compositionEnded = true;
//             _alphabetCompositionInProgress = false;
//             _isComposing = false;
//
//             // Safari 에서는 중국어 조합 글자 입력 중 backspace 키로 조합중인 글자를
//             // 모두 삭제할 때, composition end -> key down -> key up 의 순서로 이벤트가 발생한다.
//             // 이 때, composition end 에서는 backspace 가 들어왔다는 상황을 _isHandlingBackspace flag 로
//             // 알 수 없는 상황이지만, event 의 data property 가 빈문자열이 들어오는 상황으로 알 수 있다.
//             // 이 경우에는 빈 문자를 update 시켜준다.
//             if (event.originalEvent.data === "") {
//                 this._updateEmptyChar();
//             }
//         },
//
//         onCompositionEndForSafari: function (event) {
//             if (_isEventFromUiInput(event)) {
//                 return;
//             }
//
//             var insertChar = event.originalEvent.data,
//                 deletedCharOffset = 0,
//                 curStrBufLen, dataLen;
//
//             _compositionEnded = true;
//             _alphabetCompositionInProgress = false;
//             _isComposing = false;
//
//             if (_isComposingLatin) {
//                 // latin alphabet with diacritic is handled in TextInput handler
//                 return;
//             }
//
//             // Safari 에서는 중국어 조합 글자 입력 중 backspace 키로 조합중인 글자를
//             // 모두 삭제할 때, composition end -> key down -> key up 의 순서로 이벤트가 발생한다.
//             // 이 때, composition end 에서는 backspace 가 들어왔다는 상황을 _isHandlingBackspace flag 로
//             // 알 수 없는 상황이지만, event 의 data property 가 빈문자열이 들어오는 상황으로 알 수 있다.
//             // 이 경우에는 빈 문자를 update 시켜준다.
//             if (insertChar === "") {
//                 this._updateEmptyChar();
//             } else if (_compositionEnded && !_isComposingHanja) {
//                 this._initializeCurBuf();
//                 _executeCompleteChar(insertChar);
//             } else if (_isComposingHanja) {
//                 curStrBufLen = this.curStrBuf.length;
//                 dataLen = insertChar.length;
//                 if (curStrBufLen < dataLen) {
//                     // Mac OS X 에서는 한자 입력 시, 입력 소스에 따라 3가지 옵션이 있다.
//                     // 1) Windows 와 동일하게 한자와 한글이 1:1 로 교체
//                     // 2) 한자(한글) 과 같이 입력됨 (ex. 韓契(한글))
//                     // 3) 한글(한자) 와 같이 입력됨 (ex. 한글(韓契))
//                     // 2) 혹은 3) 일 땐, 실제 지워야 될 글자는 2글자이지만, 삽입될 글자는 그 이상이므로
//                     // offset 을 그 차이만큼 설정해주어야 한다.
//                     deletedCharOffset = curStrBufLen - dataLen;
//                 }
//                 this._initializeCurBuf();
//                 _executeReplaceChar(insertChar, deletedCharOffset);
//                 _isComposingHanja = false;
//             }
//         },
//
//         /*******************************************************************************
//          * Public Methods
//          ******************************************************************************/
//
//         isCtrlOrCmdKeyPressed: function (modStatus) {
//             return this.isOnlyCtrlKeyPressed(modStatus) || this.isOnlyCmdKeyPressed(modStatus);
//         },
//
//         getModKeyStatusFromKeyEvt: function (keyEvt) {
//             var curModKeyStatus = 0x00;
//
//             if (keyEvt.ctrlKey) {
//                 curModKeyStatus |= _modKeyStatus.CTRL_KEY_PRESS;
//             }
//             if (keyEvt.shiftKey) {
//                 curModKeyStatus |= _modKeyStatus.SHIFT_KEY_PRESS;
//             }
//             if (keyEvt.altKey) {
//                 curModKeyStatus |= _modKeyStatus.ALT_KEY_PRESS;
//             }
//             if (_isMac && keyEvt.metaKey) {
//                 curModKeyStatus |= _modKeyStatus.CMD_KEY_PRESS;
//             }
//
//             return curModKeyStatus;
//         },
//
//         applyModifierKeyPressed: function (keyCodeStr) {
//             _keyPressStatus |= _modifierKeyPressMap[ keyCodeStr ];
//         },
//
//         applyModifierKeyReleased: function (keyCodeStr) {
//             _keyPressStatus &= ~_modifierKeyPressMap[ keyCodeStr ];
//         },
//
//         isShiftKeyPressed: function (modKeyStatus) {
//             return !!(_getCurModKeyStatus(modKeyStatus) & _modKeyStatus.SHIFT_KEY_PRESS);
//         },
//
//         isOnlyShiftKeyPressed: function (modKeyStatus) {
//             return (_getCurModKeyStatus(modKeyStatus) === _modKeyStatus.SHIFT_KEY_PRESS);
//         },
//
//         isCtrlKeyPressed: function (modKeyStatus) {
//             return !!(_getCurModKeyStatus(modKeyStatus) & _modKeyStatus.CTRL_KEY_PRESS);
//         },
//
//         isOnlyCtrlKeyPressed: function (modKeyStatus) {
//             return (_getCurModKeyStatus(modKeyStatus) === _modKeyStatus.CTRL_KEY_PRESS);
//         },
//
//         isAltKeyPressed: function (modKeyStatus) {
//             return !!(_getCurModKeyStatus(modKeyStatus) & _modKeyStatus.ALT_KEY_PRESS);
//         },
//
//         isOptionKeyPressed: function (modKeyStatus) {
//             return _isMac && !!(_getCurModKeyStatus(modKeyStatus) & _modKeyStatus.ALT_KEY_PRESS);
//         },
//
//         isCmdKeyPressed: function (modKeyStatus) {
//             return !!(_getCurModKeyStatus(modKeyStatus) & _modKeyStatus.CMD_KEY_PRESS);
//         },
//
//         isOnlyCmdKeyPressed: function (modKeyStatus) {
//             return (_getCurModKeyStatus(modKeyStatus) === _modKeyStatus.CMD_KEY_PRESS);
//         },
//
//         isModKeyExceptShiftPressed: function (modKeyStatus) {
//             return this.isModKeyPressed(modKeyStatus) && !this.isShiftKeyPressed(modKeyStatus);
//         },
//
//         isModKeyPressed: function (modKeyStatus) {
//             return !!_getCurModKeyStatus(modKeyStatus);
//         },
//
//         /**
//          * Ime 에 들어있는 조합 중인 text 의 길이를 반환하는 함수.
//          *
//          * @return {number} Length of input text
//          */
//         getInputTextLength: function () {
//             return this.curStrBuf && this.curStrBuf.length || 0;
//         },
//
//         // TODO: 임시로 구현한 함수. 추후에 Key manager로 이관하거나 별도의 module로 구분해야 할 필요가 있다고 생각됨.
//         userFontStyle: function (fontStyle) {
//             if (!_.isUndefined(fontStyle)) {
//                 _updateUserFontStyle(fontStyle);
//             }
//
//             return _userFontStyle;
//         },
//
//         removeUserFontStyle: function () {
//             _insertedText ? _insertedText = false : _userFontStyle = {};
//         },
//
//         releaseFocus: function () {
//             _activateOnBlur = false;
//         },
//
//         holdFocus: function () {
//             _activateOnBlur = true;
//         },
//
//         focusStealed: function () {
//             return !_activateOnBlur;
//         },
//
//         clearImeBuffer: function () {
//             if (this.getInputTextLength() === 0) {
//                 _flushImeBuffer();
//             }
//         },
//
//         // TODO: make the method private; let other modules call flush() instead.
//         flushInputText: function (withoutAction) {
//             var insertChar;
//
//             if (this.getInputTextLength() > 0) {
//                 insertChar = this.curStrBuf;
//
//                 this._initializeCurBuf();
//
//                 // note:
//                 // Win10/IE 일본어 입력 시 포커스가 빠질 때에도 compositionend 이벤트가 발생한다. (한국어, 중국어에서는 발생 안 함)
//                 // 그 때문에 글자가 두 번 들어가는 문제가 있는데, (정상적인 입력 상황을 위해) compositionend 이벤트를 건너뛸 수는 없으니
//                 // focus 빠질 때 실행되는 이 함수에서 글자 조합 완료 루틴을 skip 하도록 한다.
//                 if (_browser.msie && _isJapanese(insertChar)) {
//                     // 조합 완료 처리는 안 하더라도, 그 다음 입력에서(예: space 입력) 버퍼 데이터가 중복해서 들어가지 않도록 버퍼는 비워준다.
//                     _flushImeBuffer();
//
//                     return;
//                 }
//
//                 if (!withoutAction) {
//                     _executeCompleteChar(insertChar);
//                 }
//                 _flushImeBuffer();
//                 _compositionEnded = false;
//             }
//         },
//
//         isActive: function () {
//             try {
//                 return $(document.activeElement).attr("id") === "ime_view";
//             } catch (error) {
//                 // TODO: 현재 Edge browser 에서 한글 조합 중 해당 텍스트 박스의 다른 글자에 클릭 시
//                 // "지정되지 않은 오류입니다." 라는 메세지를 출력함
//                 // 이 부분을 try catch 문을 사용하면 별다른 문제 없이 지나가게 되나,
//                 // 추후 다른 방법을 찾을 경우 수정이 필요함
//                 return false;
//             }
//         },
//
//         activate: function () {
//             // TODO: IE 에서 browser tab 클릭 시, 다시 본문 영역을 클릭해도 텍스트를 쓸 수 없는 문제 때문에 (WEBSHO-4364)
//             // IE인 경우 무조건 activate 루틴을 수행하도록 임시 조치함. 정확한 원인은 다시 조사해야 함.
//             if (!this.isActive() || $.browser.msie) {
//                 _.defer(function () {
//                     // note: relocate IME at the top-left position, not to be outside of (browser's) document area
//                     _$ime && _$ime.css({
//                         top: -_$document.height(),
//                         left: -_$document.width()
//                     })
//                         .focus();
//                 });
//
//                 return true;
//             }
//         },
//
//         deactivate: function () {
//             if (this.isActive()) {
//                 _$ime.blur();
//             }
//         },
//
//         /**
//          * flush IME input text (complete text in composition)
//          *
//          * @param {boolean=} withFocus - either with maintaining focus or not
//          */
//         flush: function (withFocus) {
//             if (_browser.safari || _browser.msie) {
//                 // in Safari, blur event handler is NOOP (WEBSHO-4652),
//                 // thus direct call of flushInputText() is required.
//                 // (in the other browsers, the method is called during the deactivating below.)
//                 // TODO: write a proper blur event handler for Safari
//
//                 // in IE, flushing by deactivating does not work properly (WEBSHO-4851),
//                 // because composition key events are not fired as expected (like Chrome).
//                 // To complete composition, flushInputText() should be called before deactivating IME.
//
//                 this.flushInputText();
//             }
//
//             // to prevent unwanted key events (textInput, compositionend, etc) after flushing,
//             // blur() by deactivating IME is needed.
//             this.deactivate();
//
//             if (withFocus) {
//                 // activate IME again to maintain focus
//                 this.activate();
//             }
//         },
//
//         /**
//          * @param {number} clientX - x position in client coordinates (from top-left)
//          * @param {number} clientY - y position in client coordinates (from top-left)
//          */
//         moveTo: function (clientX, clientY) {
//             // note:
//             // - the origin of the coordinates of IME dom node is at the BOTTOM-RIGHT. (yes, it's confusing, but should be.)
//             // - the lowest position of IME node is limited to be inside the edit area.
//             _$ime.css({
//                 top: Math.min(-_$document.height() + clientY, -_getStatusBarHeight()),
//                 left: -_$document.width() + clientX
//             });
//         },
//
//         isInsertedText: function (insertedText) {
//             if (!_.isUndefined(insertedText)) {
//                 _insertedText = insertedText;
//             }
//
//             return _insertedText;
//         },
//
//         /*******************************************************************************
//          * Private Methods (with context)
//          ******************************************************************************/
//
//         /**
//          * Initialize the string buffer.
//          * the string buffer content is used by RunView to show current input text
//          *
//          * @private
//          */
//         _initializeCurBuf: function () {
//             this.curStrBuf = "";
//         },
//
//         _updateEmptyChar: function () {
//             this._initializeCurBuf();
//             _executeUpdateChar("");
//         },
//
//         _releaseModKey: function () {
//             if (this.isAltKeyPressed()) {
//                 this.applyModifierKeyReleased(_altKeyCodeStr);
//             }
//             if (this.isCtrlKeyPressed()) {
//                 this.applyModifierKeyReleased(_ctrlKeyCodeStr);
//             }
//             if (this.isShiftKeyPressed()) {
//                 this.applyModifierKeyReleased(_shiftKeyCodeStr);
//             }
//             if (this.isCmdKeyPressed()) {
//                 this.applyModifierKeyReleased(_leftCmdKeyCodeStr);
//             }
//         },
//
//         /**
//          * mod key 가 해제될 필요가 있을 경우, 해제시키는 함수
//          *
//          * @param {object} event - current key down event
//          * @private
//          */
//         _releaseModKeyIfNeeded: function (event) {
//             // none of mod keys (alt, ctrl, shift, or cmd) is pressed
//             if (!(event.altKey || event.ctrlKey || event.shiftKey || event.metaKey)) {
//                 this._releaseModKey();
//             }
//         },
//
//         _keyUpHandler: function (event) {
//             var keyCodeStr = "" + event.keyCode;
//
//             // 입력된 글자를 complete 시에 flush 시키면 flush 가 정상적으로 이루어지지 않는다.
//             // 따라서 key up 에서 DOM 의 글자를 flush 시킨다.
//             _flushImeBufferIfNeeded(event.target.textContent);
//
//             _compositionEnded = _ignoreInputEvt = false;
//
//             if (_isHanjaMode) {
//                 _isHanjaMode = false;
//             }
//
//             if (_modifierKeyPressMap[ keyCodeStr ]) {
//                 this.applyModifierKeyReleased(keyCodeStr);
//
//                 return false;
//             }
//         },
//
//         /**
//          * key down 시 mod key 관련 처리하는 함수
//          *
//          * @param {object} event - current key down event
//          * @private
//          *
//          * @return {?number} modKeyStatus || null
//          */
//         _modifierKeyHandler: function (event) {
//             var keyCode = event.keyCode,
//                 keyCodeStr = "" + keyCode,
//                 isModKeyPressed = !!(_modifierKeyPressMap[ keyCodeStr ]),
//                 modKeyStatus;
//
//             if (isModKeyPressed) {
//                 this.applyModifierKeyPressed(keyCodeStr);
//                 _hideQuickMenuIfNeeded();
//
//                 return null;
//             }
//
//             this._releaseModKeyIfNeeded(event);
//             modKeyStatus = this.getModKeyStatusFromKeyEvt(event);
//
//             _setToIgnoreInputEvtIfNeeded(keyCode);
//
//             return modKeyStatus;
//         },
//
//         _completeLatinComposition: function (latinChar) {
//             _executeReplaceChar(latinChar);
//
//             this._initializeCurBuf();
//             _flushImeBuffer();
//         }
//
//     };
// });


