"use strict";
exports.id = "component---src-pages-index-jsx";
exports.ids = ["component---src-pages-index-jsx"];
exports.modules = {

/***/ "./src/pages/index.jsx?export=default":
/*!********************************************!*\
  !*** ./src/pages/index.jsx?export=default ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Head: () => (/* binding */ Head),
/* harmony export */   "default": () => (/* binding */ IndexPage)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _static_ranch2_jpg__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../static/ranch2.jpg */ "./static/ranch2.jpg");
/* harmony import */ var _static_ranch_water2_png__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../static/ranch_water2.png */ "./static/ranch_water2.png");
/* harmony import */ var _static_cigarette2_png__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../static/cigarette2.png */ "./static/cigarette2.png");
/* harmony import */ var _static_alp2_png__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../static/alp2.png */ "./static/alp2.png");





const ALL_PROMPTS = ["Stubbing your toe", "Getting a day off work", "Finding $20 in your pocket", "Missing your alarm", "A perfect slice of pizza", "Sitting in traffic for an hour", "Getting a surprise hug", "Stepping on a LEGO", "A hot shower after a long day", "Winning a board game", "Running out of phone battery", "Watching a great sunset", "Spilling coffee on yourself while you're wearing white", "Getting a compliment from a stranger", "Forgetting someone's name mid-conversation", "Finishing a really good book", "A mosquito bite on your ankle", "Finding the perfect parking spot", "Dropping your food on the floor", "Waking up before your alarm naturally", "Slow internet when you need it most", "A dog greeting you at the door", "Having your card declined in public", "Getting the window seat on a flight", "A song stuck in your head all day", "First bite of Thanksgiving dinner", "Accidentally liking an old photo while snooping", "Fresh bedsheets after a shower", "Replying 'you too' when the waiter says enjoy your meal", "Finding out your favorite show has a new season", "Burning your tongue on hot food", "Fracturing your cock", "When you try to quietly fart in a meeting but it comes out as a long wet trumpet solo", "Accidentally playing porn through the bluetooth speaker at a family gathering", "Somebody bringing you coffee exactly how you like it without you asking", "When your team pulls off a miracle comeback in the last seconds of the game", "When the vending machine drops two snacks instead of one", "When your mom likes a thirst comment you left on an instagram model's photo", "When you pull down your pants to poop and the seat is already warm from the last person"];
function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// ── SOUNDS ───────────────────────────────────────────────────────────────────
function makeCtx() {
  return new (window.AudioContext || window.webkitAudioContext)();
}

// Woody clunk — slot pick
function playClick() {
  try {
    const ctx = makeCtx();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.type = "sine";
    osc.frequency.setValueAtTime(220, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(110, ctx.currentTime + 0.08);
    gain.gain.setValueAtTime(0.35, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.18);
    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + 0.18);
  } catch (e) {}
}

// Triumphant chord — final pick / game over
function playFinal() {
  try {
    const ctx = makeCtx();
    const notes = [261, 329, 392];
    notes.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.type = "triangle";
      osc.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.06);
      gain.gain.setValueAtTime(0, ctx.currentTime + idx * 0.06);
      gain.gain.linearRampToValueAtTime(0.2, ctx.currentTime + idx * 0.06 + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + idx * 0.06 + 0.4);
      osc.start(ctx.currentTime + idx * 0.06);
      osc.stop(ctx.currentTime + idx * 0.06 + 0.4);
    });
  } catch (e) {}
}

// Soft pop — nav/menu buttons
function playPop() {
  try {
    const ctx = makeCtx();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.type = "sine";
    osc.frequency.setValueAtTime(400, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(200, ctx.currentTime + 0.06);
    gain.gain.setValueAtTime(0.2, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.12);
    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + 0.12);
  } catch (e) {}
}

// Rising whoosh — start game
function playWhoosh() {
  try {
    const ctx = makeCtx();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.type = "sawtooth";
    osc.frequency.setValueAtTime(150, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(600, ctx.currentTime + 0.2);
    gain.gain.setValueAtTime(0.15, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.25);
    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + 0.25);
  } catch (e) {}
}

// Ride again — descending bounce
function playRideAgain() {
  try {
    const ctx = makeCtx();
    const notes = [523, 440, 349];
    notes.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.type = "sine";
      osc.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.07);
      gain.gain.setValueAtTime(0.18, ctx.currentTime + idx * 0.07);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + idx * 0.07 + 0.15);
      osc.start(ctx.currentTime + idx * 0.07);
      osc.stop(ctx.currentTime + idx * 0.07 + 0.15);
    });
  } catch (e) {}
}

// ── SCREENS ──────────────────────────────────────────────────────────────────

function MenuScreen({
  onRandom,
  onCustom
}) {
  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      var _document$documentEle, _document$documentEle2;
      (_document$documentEle = (_document$documentEle2 = document.documentElement).requestFullscreen) === null || _document$documentEle === void 0 ? void 0 : _document$documentEle.call(_document$documentEle2);
    } else {
      var _document$exitFullscr, _document;
      (_document$exitFullscr = (_document = document).exitFullscreen) === null || _document$exitFullscr === void 0 ? void 0 : _document$exitFullscr.call(_document);
    }
    playPop();
  };
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "shareplayBanner"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", null, "Mirror your screen to a TV for group play"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("button", {
    className: "shareplayBtn",
    onClick: toggleFullscreen
  }, "TV Mode")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "card"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "cardLabel"
  }, "\u2605 Choose Your Path \u2605"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("p", {
    className: "modeIntro"
  }, "How do you want to play tonight, partner?"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "modeButtons"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("button", {
    className: "modeBtn",
    onClick: () => {
      playPop();
      onCustom();
    }
  }, "Enter Your Own Prompts", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", {
    className: "btnSub"
  }, "Type in 10 of your own")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("button", {
    className: "modeBtn",
    onClick: () => {
      playWhoosh();
      onRandom();
    }
  }, "Randomize", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", {
    className: "btnSub"
  }, "Draw from the deck")))));
}
function CustomScreen({
  onBack,
  onStart
}) {
  const {
    0: inputs,
    1: setInputs
  } = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(Array(10).fill(""));
  const handleChange = (i, val) => {
    const next = [...inputs];
    next[i] = val;
    setInputs(next);
  };
  const allFilled = inputs.every(v => v.trim().length > 0);
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("button", {
    className: "backBtn",
    onClick: () => {
      playPop();
      onBack();
    }
  }, "\u2190 Back"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "card"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "cardLabel"
  }, "\u2605 Your Prompts \u2605"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("p", {
    className: "customInstructions"
  }, "Fill in all 10 to begin"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "promptInputs"
  }, inputs.map((val, i) => /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "promptInputRow",
    key: i
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", {
    className: "promptNumLabel"
  }, i + 1), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("input", {
    className: "promptInput",
    type: "text",
    maxLength: 60,
    placeholder: `Prompt #${i + 1}...`,
    value: val,
    onChange: e => handleChange(i, e.target.value)
  })))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("button", {
    className: "startBtn",
    disabled: !allFilled,
    onClick: () => {
      playWhoosh();
      onStart(inputs.map(v => v.trim()));
    }
  }, "Deal the Cards")));
}
function GameScreen({
  prompts,
  slots,
  currentIndex,
  onPick
}) {
  const filled = slots.filter(s => s !== null).length;
  const prompt = prompts[currentIndex];
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "progressBar"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "progressFill",
    style: {
      width: `${filled * 10}%`
    }
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("p", {
    className: "howto"
  }, "Use the buttons below to place this prompt \u2014 no take-backs!"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "card"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "cardLabel"
  }, "\u2605 Current Prompt \u2605"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "promptNumber"
  }, "Prompt ", currentIndex + 1, " of 10"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "promptText"
  }, "\"", prompt, "\""), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "promptInstruction"
  }, "\u2014 Where does this land? \u2014")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "card"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "ratingSelectLabel"
  }, "Tap a number to rank this prompt"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "ratingButtons"
  }, slots.map((item, i) => /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("button", {
    key: i,
    className: "ratingBtn",
    disabled: item !== null,
    onClick: () => onPick(i)
  }, i + 1)))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "divider"
  }, "\u2726 ranked so far \u2726"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    style: {
      marginBottom: "20px"
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "slotsLabel"
  }, "Your Rankings So Far"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "rankedList"
  }, slots.map((item, i) => /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    key: i,
    className: `rankedRow${item === null ? " slotEmpty" : ""}`
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", {
    className: "rankedRowNum"
  }, i + 1), item !== null ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", {
    className: "rankedRowText"
  }, item) : /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", {
    className: "rankedRowEmpty"
  }, "empty"))))));
}
function ResultsScreen({
  slots,
  onPlayAgain,
  onChangeMode
}) {
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "card"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "resultsTitle"
  }, "Final Rankings"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "resultsSubtitle"
  }, "\u2605 Blind fate revealed, partner \u2605"), slots.map((item, i) => /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "resultRow",
    key: i
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", {
    className: "resultRank"
  }, i + 1), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", {
    className: "resultLabel"
  }, item || "—"))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "bottomButtons"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("button", {
    className: "replayBtn",
    onClick: () => {
      playRideAgain();
      onPlayAgain();
    }
  }, "Ride Again"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("button", {
    className: "replayBtn replayBtnSecondary",
    onClick: () => {
      playPop();
      onChangeMode();
    }
  }, "Change Mode")));
}

// ── MAIN PAGE ─────────────────────────────────────────────────────────────────

function IndexPage() {
  const {
    0: phase,
    1: setPhase
  } = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)("menu");
  const {
    0: prompts,
    1: setPrompts
  } = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)([]);
  const {
    0: slots,
    1: setSlots
  } = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(Array(10).fill(null));
  const {
    0: currentIndex,
    1: setCurrentIndex
  } = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(0);
  const {
    0: mode,
    1: setMode
  } = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)("random");
  const {
    0: customPrompts,
    1: setCustomPrompts
  } = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)([]);
  const {
    0: fsLabel,
    1: setFsLabel
  } = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)("⛶ TV Mode");
  const startRandom = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(() => {
    setPrompts(shuffle(ALL_PROMPTS).slice(0, 10));
    setSlots(Array(10).fill(null));
    setCurrentIndex(0);
    setMode("random");
    setPhase("playing");
  }, []);
  const startCustomEntry = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(() => {
    setPhase("custom");
  }, []);
  const launchCustom = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(inputs => {
    setCustomPrompts(inputs);
    setPrompts(shuffle(inputs));
    setSlots(Array(10).fill(null));
    setCurrentIndex(0);
    setMode("custom");
    setPhase("playing");
  }, []);
  const pickSlot = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(i => {
    if (slots[i] !== null) return;
    const newSlots = [...slots];
    newSlots[i] = prompts[currentIndex];
    setSlots(newSlots);
    const nextIndex = currentIndex + 1;
    if (nextIndex >= 10) {
      playFinal();
      setPhase("results");
    } else {
      playClick();
      setCurrentIndex(nextIndex);
    }
  }, [slots, prompts, currentIndex]);
  const playAgain = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(() => {
    if (mode === "custom" && customPrompts.length > 0) {
      setPrompts(shuffle(customPrompts));
    } else {
      setPrompts(shuffle(ALL_PROMPTS).slice(0, 10));
    }
    setSlots(Array(10).fill(null));
    setCurrentIndex(0);
    setPhase("playing");
  }, [mode, customPrompts]);
  const goMenu = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(() => {
    setPhase("menu");
  }, []);
  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      var _document$documentEle3, _document$documentEle4;
      (_document$documentEle3 = (_document$documentEle4 = document.documentElement).requestFullscreen) === null || _document$documentEle3 === void 0 ? void 0 : _document$documentEle3.call(_document$documentEle4);
      setFsLabel("✕ Exit TV");
    } else {
      var _document$exitFullscr2, _document2;
      (_document$exitFullscr2 = (_document2 = document).exitFullscreen) === null || _document$exitFullscr2 === void 0 ? void 0 : _document$exitFullscr2.call(_document2);
      setFsLabel("⛶ TV Mode");
    }
  };
  const showHeader = phase === "menu";
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment), null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("button", {
    className: "fullscreenBtn",
    onClick: () => {
      playPop();
      toggleFullscreen();
    }
  }, fsLabel), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "app"
  }, showHeader && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("header", {
    className: "header"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("img", {
    className: "decorLeft",
    src: _static_ranch_water2_png__WEBPACK_IMPORTED_MODULE_2__["default"],
    alt: "",
    "aria-hidden": "true"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("img", {
    className: "decorRight",
    src: _static_cigarette2_png__WEBPACK_IMPORTED_MODULE_3__["default"],
    alt: "",
    "aria-hidden": "true"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("img", {
    className: "decorBottomLeft",
    src: _static_alp2_png__WEBPACK_IMPORTED_MODULE_4__["default"],
    alt: "",
    "aria-hidden": "true"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "headerInner"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "starRow"
  }, "\u2605 \u2605 \u2605 \u2605 \u2605"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("img", {
    className: "logoImg",
    src: _static_ranch2_jpg__WEBPACK_IMPORTED_MODULE_1__["default"],
    alt: "Ranch Blind Ratings"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "starRow"
  }, "\u2605 \u2605 \u2605 \u2605 \u2605"))), phase === "menu" && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(MenuScreen, {
    onRandom: startRandom,
    onCustom: startCustomEntry
  }), phase === "custom" && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(CustomScreen, {
    onBack: goMenu,
    onStart: launchCustom
  }), phase === "playing" && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(GameScreen, {
    prompts: prompts,
    slots: slots,
    currentIndex: currentIndex,
    onPick: pickSlot
  }), phase === "results" && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(ResultsScreen, {
    slots: slots,
    onPlayAgain: playAgain,
    onChangeMode: goMenu
  })));
}
function Head() {
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment), null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("title", null, "Ranch Blind Ratings"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("meta", {
    name: "viewport",
    content: "width=device-width, initial-scale=1.0, user-scalable=no"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("meta", {
    name: "description",
    content: "The blind ranking game for game night"
  }));
}

/***/ }),

/***/ "./static/alp2.png":
/*!*************************!*\
  !*** ./static/alp2.png ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("/static/alp2-16833a68bb842a817ef26d0712ee8b3f.png");

/***/ }),

/***/ "./static/cigarette2.png":
/*!*******************************!*\
  !*** ./static/cigarette2.png ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("/static/cigarette2-be0b237407072036c19eb2386460be10.png");

/***/ }),

/***/ "./static/ranch2.jpg":
/*!***************************!*\
  !*** ./static/ranch2.jpg ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("/static/ranch2-455dd820eba735dedec563789b341aff.jpg");

/***/ }),

/***/ "./static/ranch_water2.png":
/*!*********************************!*\
  !*** ./static/ranch_water2.png ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("/static/ranch_water2-75a7f732e857ae6eed235a96c829962d.png");

/***/ })

};
;
//# sourceMappingURL=component---src-pages-index-jsx.js.map