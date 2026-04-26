import React, { useState, useCallback } from "react"
import ranchLogo from "../../static/ranch2.jpg"
import ranchWater from "../../static/ranch_water3.png"
import cigarette from "../../static/cigarette2.png"
import alpCan from "../../static/alp2.png"
import luca from "../../static/luca.png"

const ALL_PROMPTS = [
  "Stubbing your toe",
  "Getting a day off work",
  "Finding $20 in your pocket",
  "Missing your alarm",
  "A perfect slice of pizza",
  "Sitting in traffic for an hour",
  "Getting a surprise hug",
  "Stepping on a LEGO",
  "A hot shower after a long day",
  "Winning a board game",
  "Running out of phone battery",
  "Watching a great sunset",
  "Spilling coffee on yourself while you're wearing white",
  "Getting a compliment from a stranger",
  "Forgetting someone's name mid-conversation",
  "Finishing a really good book",
  "A mosquito bite on your ankle",
  "Finding the perfect parking spot",
  "Dropping your food on the floor",
  "Waking up before your alarm naturally",
  "Slow internet when you need it most",
  "A dog greeting you at the door",
  "Having your card declined in public",
  "Getting the window seat on a flight",
  "A song stuck in your head all day",
  "First bite of Thanksgiving dinner",
  "Accidentally liking an old photo while snooping",
  "Fresh bedsheets after a shower",
  "Replying 'you too' when the waiter says enjoy your meal",
  "Finding out your favorite show has a new season",
  "Burning your tongue on hot food",
  "Fracturing your cock",
  "When you try to quietly fart in a meeting but it comes out as a long wet trumpet solo",
  "Accidentally playing porn through the bluetooth speaker at a family gathering",
  "Somebody bringing you coffee exactly how you like it without you asking",
  "When your team pulls off a miracle comeback in the last seconds of the game",
  "When the vending machine drops two snacks instead of one",
  "When your mom likes a thirst comment you left on an instagram model's photo",
  "When you pull down your pants to poop and the seat is already warm from the last person",
]

function shuffle(arr) {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

// ── SOUNDS ───────────────────────────────────────────────────────────────────
function makeCtx() {
  return new (window.AudioContext || window.webkitAudioContext)()
}

// Woody clunk — slot pick
function playClick() {
  try {
    const ctx = makeCtx()
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()
    osc.connect(gain); gain.connect(ctx.destination)
    osc.type = "sine"
    osc.frequency.setValueAtTime(220, ctx.currentTime)
    osc.frequency.exponentialRampToValueAtTime(110, ctx.currentTime + 0.08)
    gain.gain.setValueAtTime(0.35, ctx.currentTime)
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.18)
    osc.start(ctx.currentTime); osc.stop(ctx.currentTime + 0.18)
  } catch (e) {}
}

// Triumphant chord — final pick / game over
function playFinal() {
  try {
    const ctx = makeCtx()
    const notes = [261, 329, 392]
    notes.forEach((freq, idx) => {
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()
      osc.connect(gain); gain.connect(ctx.destination)
      osc.type = "triangle"
      osc.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.06)
      gain.gain.setValueAtTime(0, ctx.currentTime + idx * 0.06)
      gain.gain.linearRampToValueAtTime(0.2, ctx.currentTime + idx * 0.06 + 0.02)
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + idx * 0.06 + 0.4)
      osc.start(ctx.currentTime + idx * 0.06)
      osc.stop(ctx.currentTime + idx * 0.06 + 0.4)
    })
  } catch (e) {}
}

// Soft pop — nav/menu buttons
function playPop() {
  try {
    const ctx = makeCtx()
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()
    osc.connect(gain); gain.connect(ctx.destination)
    osc.type = "sine"
    osc.frequency.setValueAtTime(400, ctx.currentTime)
    osc.frequency.exponentialRampToValueAtTime(200, ctx.currentTime + 0.06)
    gain.gain.setValueAtTime(0.2, ctx.currentTime)
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.12)
    osc.start(ctx.currentTime); osc.stop(ctx.currentTime + 0.12)
  } catch (e) {}
}

// Rising whoosh — start game
function playWhoosh() {
  try {
    const ctx = makeCtx()
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()
    osc.connect(gain); gain.connect(ctx.destination)
    osc.type = "sawtooth"
    osc.frequency.setValueAtTime(150, ctx.currentTime)
    osc.frequency.exponentialRampToValueAtTime(600, ctx.currentTime + 0.2)
    gain.gain.setValueAtTime(0.15, ctx.currentTime)
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.25)
    osc.start(ctx.currentTime); osc.stop(ctx.currentTime + 0.25)
  } catch (e) {}
}

// Ride again — descending bounce
function playRideAgain() {
  try {
    const ctx = makeCtx()
    const notes = [523, 440, 349]
    notes.forEach((freq, idx) => {
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()
      osc.connect(gain); gain.connect(ctx.destination)
      osc.type = "sine"
      osc.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.07)
      gain.gain.setValueAtTime(0.18, ctx.currentTime + idx * 0.07)
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + idx * 0.07 + 0.15)
      osc.start(ctx.currentTime + idx * 0.07)
      osc.stop(ctx.currentTime + idx * 0.07 + 0.15)
    })
  } catch (e) {}
}

// ── SCREENS ──────────────────────────────────────────────────────────────────

function MenuScreen({ onRandom, onCustom }) {
  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen?.()
    } else {
      document.exitFullscreen?.()
    }
    playPop()
  }
  return (
    <div>
      <div className="shareplayBanner">
        <span>Mirror your screen to a TV for group play</span>
        <button className="shareplayBtn" onClick={toggleFullscreen}>TV Mode</button>
      </div>
      <div className="card">
        <div className="cardLabel">★ Choose Your Path ★</div>
        <p className="modeIntro">How do you want to play tonight, partner?</p>
        <div className="modeButtons">
          <button className="modeBtn" onClick={() => { playPop(); onCustom() }}>
            Enter Your Own Prompts
            <span className="btnSub">Type in 10 of your own</span>
          </button>
          <button className="modeBtn" onClick={() => { playWhoosh(); onRandom() }}>
            Randomize
            <span className="btnSub">Draw from the deck</span>
          </button>
        </div>
      </div>
    </div>
  )
}

function CustomScreen({ onBack, onStart }) {
  const [inputs, setInputs] = useState(Array(10).fill(""))
  const handleChange = (i, val) => {
    const next = [...inputs]
    next[i] = val
    setInputs(next)
  }
  const allFilled = inputs.every(v => v.trim().length > 0)
  return (
    <div className="gameWrapper">
      <div className="card">
        <div className="cardLabel">★ Your Prompts ★</div>
        <p className="customInstructions">Fill in all 10 to begin</p>
        <div className="promptInputs">
          {inputs.map((val, i) => (
            <div className="promptInputRow" key={i}>
              <span className="promptNumLabel">{i + 1}</span>
              <input
                className="promptInput"
                type="text"
                maxLength={60}
                placeholder={`Prompt #${i + 1}...`}
                value={val}
                onChange={e => handleChange(i, e.target.value)}
              />
            </div>
          ))}
        </div>
        <button
          className="startBtn"
          disabled={!allFilled}
          onClick={() => { playWhoosh(); onStart(inputs.map(v => v.trim())) }}
        >
          Deal the Cards
        </button>
      </div>
      <button className="backBtnBottom" onClick={() => { playPop(); onBack() }}>← Back</button>
    </div>
  )
}

function GameScreen({ prompts, slots, currentIndex, onPick }) {
  const filled = slots.filter(s => s !== null).length
  const prompt = prompts[currentIndex]

  return (
    <div className="gameWrapper">
      <div className="progressBar">
        <div className="progressFill" style={{ width: `${filled * 10}%` }} />
      </div>
      <p className="howto">
        Use the buttons below to place this prompt — no take-backs!
      </p>

      <div className="card">
        <div className="cardLabel">★ Current Prompt ★</div>
        <div className="promptNumber">Prompt {currentIndex + 1} of 10</div>
        <div className="promptText">"{prompt}"</div>
        <div className="promptInstruction">— Where does this land? —</div>
      </div>

      <div className="card">
        <div className="ratingSelectLabel">Tap a number to rank this prompt</div>
        <div className="ratingButtons">
          {slots.map((item, i) => (
            <button
              key={i}
              className="ratingBtn"
              disabled={item !== null}
              onClick={() => onPick(i)}
            >
              {i + 1}
            </button>
          ))}
        </div>
      </div>

      <div className="divider">✦ ranked so far ✦</div>

      <div style={{ marginBottom: "20px" }}>
        <div className="slotsLabel">Your Rankings So Far</div>
        <div className="rankedList">
          {slots.map((item, i) => (
            <div key={i} className={`rankedRow${item === null ? " slotEmpty" : ""}`}>
              <span className="rankedRowNum">{i + 1}</span>
              {item !== null ? (
                <span className="rankedRowText">{item}</span>
              ) : (
                <span className="rankedRowEmpty">empty</span>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function ResultsScreen({ slots, onPlayAgain, onChangeMode }) {
  return (
    <div className="gameWrapper">
    <div className="card">
      <div className="resultsTitle">Final Rankings</div>
      <div className="resultsSubtitle">★ Blind fate revealed, partner ★</div>
      {slots.map((item, i) => (
        <div className="resultRow" key={i}>
          <span className="resultRank">{i + 1}</span>
          <span className="resultLabel">{item || "—"}</span>
        </div>
      ))}
      <div className="bottomButtons">
        <button className="replayBtn" onClick={() => { playRideAgain(); onPlayAgain() }}>Ride Again</button>
        <button className="replayBtn replayBtnSecondary" onClick={() => { playPop(); onChangeMode() }}>Change Mode</button>
      </div>
    </div>
    </div>
  )
}

// ── MAIN PAGE ─────────────────────────────────────────────────────────────────

export default function IndexPage() {
  const [phase, setPhase] = useState("menu")
  const [prompts, setPrompts] = useState([])
  const [slots, setSlots] = useState(Array(10).fill(null))
  const [currentIndex, setCurrentIndex] = useState(0)
  const [mode, setMode] = useState("random")
  const [customPrompts, setCustomPrompts] = useState([])
  const [fsLabel, setFsLabel] = useState("⛶ TV Mode")

  const startRandom = useCallback(() => {
    setPrompts(shuffle(ALL_PROMPTS).slice(0, 10))
    setSlots(Array(10).fill(null))
    setCurrentIndex(0)
    setMode("random")
    setPhase("playing")
  }, [])

  const startCustomEntry = useCallback(() => { setPhase("custom") }, [])

  const launchCustom = useCallback(inputs => {
    setCustomPrompts(inputs)
    setPrompts(shuffle(inputs))
    setSlots(Array(10).fill(null))
    setCurrentIndex(0)
    setMode("custom")
    setPhase("playing")
  }, [])

  const pickSlot = useCallback(i => {
    if (slots[i] !== null) return
    const newSlots = [...slots]
    newSlots[i] = prompts[currentIndex]
    setSlots(newSlots)
    const nextIndex = currentIndex + 1
    if (nextIndex >= 10) {
      playFinal()
      setPhase("results")
    } else {
      playClick()
      setCurrentIndex(nextIndex)
    }
  }, [slots, prompts, currentIndex])

  const playAgain = useCallback(() => {
    if (mode === "custom" && customPrompts.length > 0) {
      setPrompts(shuffle(customPrompts))
    } else {
      setPrompts(shuffle(ALL_PROMPTS).slice(0, 10))
    }
    setSlots(Array(10).fill(null))
    setCurrentIndex(0)
    setPhase("playing")
  }, [mode, customPrompts])

  const goMenu = useCallback(() => { setPhase("menu") }, [])

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen?.()
      setFsLabel("✕ Exit TV")
    } else {
      document.exitFullscreen?.()
      setFsLabel("⛶ TV Mode")
    }
  }

  const showHeader = phase === "menu"

  return (
    <>
      <button className="fullscreenBtn" onClick={() => { playPop(); toggleFullscreen() }}>{fsLabel}</button>
      <div className="app">

        {/* HEADER — only shown on menu screen */}
        {showHeader && (
          <header className="header">
            {/* Decor images */}
            <img className="decorLeft" src={ranchWater} alt="" aria-hidden="true" />
            <img className="decorRight" src={cigarette} alt="" aria-hidden="true" />
            <img className="decorBottomLeft" src={alpCan} alt="" aria-hidden="true" />
            <img className="decorLuca" src={luca} alt="" aria-hidden="true" />

            <div className="headerInner">
              <div className="starRow">★ ★ ★ ★ ★</div>
              <img className="logoImg" src={ranchLogo} alt="Ranch Blind Ratings" />
              <div className="starRow">★ ★ ★ ★ ★</div>
            </div>
          </header>
        )}

        {phase === "menu" && <MenuScreen onRandom={startRandom} onCustom={startCustomEntry} />}
        {phase === "custom" && <CustomScreen onBack={goMenu} onStart={launchCustom} />}
        {phase === "playing" && (
          <GameScreen prompts={prompts} slots={slots} currentIndex={currentIndex} onPick={pickSlot} />
        )}
        {phase === "results" && (
          <ResultsScreen slots={slots} onPlayAgain={playAgain} onChangeMode={goMenu} />
        )}
      </div>
    </>
  )
}

export function Head() {
  return (
    <>
      <title>Ranch Blind Ratings</title>
      <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no" />
      <meta name="description" content="The blind ranking game for game night" />
    </>
  )
}
