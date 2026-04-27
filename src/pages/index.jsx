import React, { useState, useCallback } from "react"
import ranchLogo from "../../static/ranchgameslogo.png"
import ranchWater from "../../static/ranch_water3.png"
import cigarette from "../../static/cigarette2.png"
import alpCan from "../../static/alp2.png"
import luca from "../../static/luca.png"

const ALL_PROMPTS = [
  "Stubbing your toe","Getting a day off work","Finding $20 in your pocket",
  "Missing your alarm","A perfect slice of pizza","Sitting in traffic for an hour",
  "Getting a surprise hug","Stepping on a LEGO","A hot shower after a long day",
  "Winning a board game","Running out of phone battery","Watching a great sunset",
  "Spilling coffee on yourself while you're wearing white","Getting a compliment from a stranger",
  "Forgetting someone's name mid-conversation","Finishing a really good book",
  "A mosquito bite on your ankle","Finding the perfect parking spot",
  "Dropping your food on the floor","Waking up before your alarm naturally",
  "Slow internet when you need it most","A dog greeting you at the door",
  "Having your card declined in public","Getting the window seat on a flight",
  "A song stuck in your head all day","First bite of Thanksgiving dinner",
  "Accidentally liking an old photo while snooping","Fresh bedsheets after a shower",
  "Replying 'you too' when the waiter says enjoy your meal",
  "Finding out your favorite show has a new season","Burning your tongue on hot food",
  "Fracturing your cock",
  "When you try to quietly fart in a meeting but it comes out as a long wet trumpet solo",
  "Accidentally playing porn through the bluetooth speaker at a family gathering",
  "Somebody bringing you coffee exactly how you like it without you asking",
  "When your team pulls off a miracle comeback in the last seconds of the game",
  "When the vending machine drops two snacks instead of one",
  "When your mom likes a thirst comment you left on an instagram model's photo",
  "When you pull down your pants to poop and the seat is already warm from the last person",
]

const TEN_BUT_PROMPTS = [
  "they still use Internet Explorer","they laugh at their own jokes before the punchline",
  "they call every movie they don't understand 'boring'","they reply to group texts with 'k'",
  "they've never left their home state","they pronounce it 'expresso'",
  "they clap when the plane lands","they still have a Hotmail address",
  "they put their phone face down when you're talking",
  "they describe their personality as 'I don't like drama'",
  "they're always 15 minutes late to everything","they've never read a book for fun",
  "they ask to split the bill down to the cent","they have a photo of themselves as their phone wallpaper",
  "they use speakerphone in public","they think sushi is gross without trying it",
  "they still forward chain emails","they can't keep a plant alive",
  "they narrate everything they're doing while cooking","they leave voicemails instead of texting",
  "they say 'I'm not racist, but...'","they've never been in a real argument",
  "they chew with their mouth open","they think The Office UK is better than The Office US",
  "they call their pet their 'fur baby' constantly","they screenshot everything you say",
  "they still wear Axe body spray","they have 47 unread emails",
  "they order their steak well done","they think astrology runs their life",
  "they use Comic Sans unironically","they've never had a cavity",
  "they still quote Borat in 2025","they tip exactly 15% every time, calculated on their phone",
  "they don't laugh at anything at the movies","they've blocked their ex 7 times and unblocked them 8",
  "they always have a 'actually...' ready","they ask to try your food and take a bigger bite than expected",
  "they think they can fix anyone","they cry at commercials","they won't eat leftovers",
  "they're weirdly competitive at mini golf","they screenshot their Wordle score every day",
  "they still owe you $12 from 6 months ago","they refuse to wear sunscreen",
  "they make everything a teachable moment","they've never apologized first in their life",
  "they think every song from their teen years is a banger","they have strong opinions about fonts",
  "they've watched The Last of Us but won't play the game",
  "they refer to their streaming queue as 'the pile of shame'",
  "they have 'thoughts' about the correct way to load a dishwasher",
  "they call the TV remote 'the clicker'","they still say 'per my last email' unironically",
  "they've named all their houseplants after coworkers they don't like",
  "they pronounce 'quinoa' a new way every time","they use the word 'adulting' with zero shame",
  "they've memorized the Cheesecake Factory menu","they send 'u up?' at 11:59pm",
  "they use a different laugh for when their boss says something",
  "they describe every trip they've ever taken in real-time",
  "they have very specific opinions about which Trader Joe's is better",
  "they call a podcast 'life-changing' every other week",
  "they still type in all lowercase like it's 2014 tumblr",
  "they take their shoes off the moment they enter any building",
  "they have their email organized into 47 subfolders",
  "they've never once refreshed a page — they close and reopen the tab",
  "they think they're the only one who notices the film grain",
  "they say 'circling back' in text messages",
  "they've never eaten a meal without photographing it first",
  "they use 'lol' as punctuation in work slack messages",
  "they have opinions on the correct pasta shape for every sauce",
  "they close apps on their phone to 'save battery'",
  "they describe movies as 'a slow burn' when they just mean boring",
  "they've told you about their 5-step morning routine unprompted",
  "they charge their AirPods more than they use them",
  "they switch to whisper to tell you something that isn't a secret",
  "they've started three separate journal 'streaks' this year",
  "they use the phrase 'I did my research' about a YouTube video",
  "they pronounce 'charcuterie' with full confidence and incorrectly",
  "they've never once used the dark mode option",
  "they still screenshot memes instead of sharing the link",
  "they have a 'fancy' olive oil they won't cook with",
  "they've muted 80% of their contacts but deny being a bad texter",
  "they think being direct is the same as being rude",
  "they google things while you're literally explaining it to them",
  "they call anything from the 90s 'retro' but anything from the 80s 'vintage'",
  "they add 'just' to every request to seem less demanding",
  "they're always 'about to start' a project",
  "they keep every charger they've ever owned in a drawer",
  "they say 'no worries' when they're clearly worried",
  "they've memorized every Ina Garten 'store-bought is fine' moment",
  "they've never sent a voice memo under 4 minutes",
  "they describe their sense of humor as 'dark' but only like puns",
  "they use a physical planner but also three different apps",
  "they've bookmarked 200 recipes and cooked zero of them",
  "they think they could have been a chef",
  "they hold their breath during someone else's parallel parking",
  "they read the comments on news articles and get mad about it",
  "they've never once called a restaurant to check their hours",
]

function shuffle(arr) {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

const quotes = [
  "If it ain't broke, hit it harder.",
  "I've been rich and I've been poor. Rich is better, but either way I need a nap.",
  "Not my horse, not my rodeo, not my problem.",
  "I don't trust stairs. They're always up to something.",
  "Lord give me patience, because if you give me strength I'm gonna need bail money.",
  "I'm not lazy, I'm on energy-saving mode.",
  "The road to success is always under construction.",
  "Some days you're the bull. Most days you're the fence.",
  "If common sense was lard, some folks couldn't grease a skillet.",
  "I've got the body of a god. Unfortunately it's Buddha.",
  "Age is just a number. Mine is unlisted.",
  "I don't need Google, my wife knows everything.",
  "Behind every great man is a woman rolling her eyes.",
  "I put the 'pro' in procrastination.",
  "My people skills are just fine. It's my tolerance for idiots that needs work.",
  "I'm not arguing, I'm just explaining why I'm right.",
  "I run on coffee, sarcasm, and inappropriate thoughts.",
  "Life is short. Buy the boots.",
  "I was born ready. I just wasn't born on time.",
  "If you think adventure is dangerous, try routine — it's lethal.",
]

// ── SOUNDS ───────────────────────────────────────────────────────────────────
function makeCtx() {
  return new (window.AudioContext || window.webkitAudioContext)()
}
function playClick() {
  try {
    const ctx = makeCtx(); const osc = ctx.createOscillator(); const gain = ctx.createGain()
    osc.connect(gain); gain.connect(ctx.destination); osc.type = "sine"
    osc.frequency.setValueAtTime(220, ctx.currentTime)
    osc.frequency.exponentialRampToValueAtTime(110, ctx.currentTime + 0.08)
    gain.gain.setValueAtTime(0.35, ctx.currentTime)
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.18)
    osc.start(ctx.currentTime); osc.stop(ctx.currentTime + 0.18)
  } catch (e) {}
}
function playFinal() {
  try {
    const ctx = makeCtx()
    ;[261, 329, 392].forEach((freq, idx) => {
      const osc = ctx.createOscillator(); const gain = ctx.createGain()
      osc.connect(gain); gain.connect(ctx.destination); osc.type = "triangle"
      osc.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.06)
      gain.gain.setValueAtTime(0, ctx.currentTime + idx * 0.06)
      gain.gain.linearRampToValueAtTime(0.2, ctx.currentTime + idx * 0.06 + 0.02)
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + idx * 0.06 + 0.4)
      osc.start(ctx.currentTime + idx * 0.06); osc.stop(ctx.currentTime + idx * 0.06 + 0.4)
    })
  } catch (e) {}
}
function playPop() {
  try {
    const ctx = makeCtx(); const osc = ctx.createOscillator(); const gain = ctx.createGain()
    osc.connect(gain); gain.connect(ctx.destination); osc.type = "sine"
    osc.frequency.setValueAtTime(400, ctx.currentTime)
    osc.frequency.exponentialRampToValueAtTime(200, ctx.currentTime + 0.06)
    gain.gain.setValueAtTime(0.2, ctx.currentTime)
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.12)
    osc.start(ctx.currentTime); osc.stop(ctx.currentTime + 0.12)
  } catch (e) {}
}
function playWhoosh() {
  try {
    const ctx = makeCtx()
    // bubbly ascending chime — three quick happy notes
    ;[523, 659, 784].forEach((freq, idx) => {
      const osc = ctx.createOscillator(); const gain = ctx.createGain()
      osc.connect(gain); gain.connect(ctx.destination); osc.type = "sine"
      const t = ctx.currentTime + idx * 0.08
      osc.frequency.setValueAtTime(freq, t)
      gain.gain.setValueAtTime(0, t)
      gain.gain.linearRampToValueAtTime(0.18, t + 0.02)
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.18)
      osc.start(t); osc.stop(t + 0.18)
    })
  } catch (e) {}
}
function playYes() {
  try {
    const ctx = makeCtx(); const osc = ctx.createOscillator(); const gain = ctx.createGain()
    osc.connect(gain); gain.connect(ctx.destination); osc.type = "sine"
    osc.frequency.setValueAtTime(440, ctx.currentTime)
    osc.frequency.exponentialRampToValueAtTime(660, ctx.currentTime + 0.1)
    gain.gain.setValueAtTime(0.25, ctx.currentTime)
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.2)
    osc.start(ctx.currentTime); osc.stop(ctx.currentTime + 0.2)
  } catch (e) {}
}
// New No sound — soft thud, not harsh
function playNo() {
  try {
    const ctx = makeCtx()
    const osc = ctx.createOscillator(); const gain = ctx.createGain()
    osc.connect(gain); gain.connect(ctx.destination); osc.type = "sine"
    osc.frequency.setValueAtTime(180, ctx.currentTime)
    osc.frequency.exponentialRampToValueAtTime(120, ctx.currentTime + 0.12)
    gain.gain.setValueAtTime(0.22, ctx.currentTime)
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.22)
    osc.start(ctx.currentTime); osc.stop(ctx.currentTime + 0.22)
  } catch (e) {}
}
function playRideAgain() {
  try {
    const ctx = makeCtx()
    ;[523, 440, 349].forEach((freq, idx) => {
      const osc = ctx.createOscillator(); const gain = ctx.createGain()
      osc.connect(gain); gain.connect(ctx.destination); osc.type = "sine"
      osc.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.07)
      gain.gain.setValueAtTime(0.18, ctx.currentTime + idx * 0.07)
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + idx * 0.07 + 0.15)
      osc.start(ctx.currentTime + idx * 0.07); osc.stop(ctx.currentTime + idx * 0.07 + 0.15)
    })
  } catch (e) {}
}

// ── THEY'RE A 10 BUT GAME ─────────────────────────────────────────────────────
function TenButGame({ onBack }) {
  const [prompts] = useState(() => shuffle(TEN_BUT_PROMPTS))
  const [index, setIndex] = useState(0)
  const [answers, setAnswers] = useState([])
  const [phase, setPhase] = useState("playing")

  const answer = (choice) => {
    const newAnswers = [...answers, { prompt: prompts[index], answer: choice }]
    setAnswers(newAnswers)
    if (index + 1 >= prompts.length) {
      playFinal(); setPhase("results")
    } else {
      choice === "yes" ? playYes() : playNo()
      setIndex(index + 1)
    }
  }

  const yesCount = answers.filter(a => a.answer === "yes").length
  const noCount = answers.filter(a => a.answer === "no").length

  if (phase === "results") {
    return (
      <div className="gameWrapper">
        <div className="card">
          <div className="resultsTitle">Your Verdict</div>
          <div className="resultsSubtitle">★ Still a yes or a hard no? ★</div>
          <div className="tenButScore">
            <div className="tenButScoreBox tenButYesBox">
              <div className="tenButScoreNum">{yesCount}</div>
              <div className="tenButScoreLabel">Still a Yes</div>
            </div>
            <div className="tenButScoreBox tenButNoBox">
              <div className="tenButScoreNum">{noCount}</div>
              <div className="tenButScoreLabel">Hard No</div>
            </div>
          </div>
          {answers.map((a, i) => (
            <div key={i} className={`tenButResultRow ${a.answer === "yes" ? "tenButResultYes" : "tenButResultNo"}`}>
              <span className="tenButResultIcon">{a.answer === "yes" ? "✓" : "✗"}</span>
              <span className="tenButResultText">They're a 10 but {a.prompt}</span>
            </div>
          ))}
          <div className="bottomButtons">
            <button className="replayBtn" onClick={() => { playRideAgain(); window.location.reload() }}>Play Again</button>
            <button className="replayBtn replayBtnSecondary" onClick={() => { playPop(); onBack() }}>Back</button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="gameWrapper">
      <div className="progressBar">
        <div className="progressFill" style={{ width: `${(index / prompts.length) * 100}%` }} />
      </div>
      <p className="howto">Would you still date them?</p>

      <div className="card tenButCard">
        <div className="cardLabel">★ They're A 10 But... ★</div>
        <div className="promptNumber">Card {index + 1} of {prompts.length}</div>
        <div className="tenButSetup">They're a 10 but</div>
        <div className="tenButPrompt">{prompts[index]}</div>
      </div>

      <div className="tenButButtons">
        <button className="tenButNo" onClick={() => answer("no")}>✗ Hard No</button>
        <button className="tenButYes" onClick={() => answer("yes")}>✓ Still a Yes</button>
      </div>

      <div className="tenButTally">
        <span className="tenButTallyYes">✓ {yesCount} yes</span>
        <span className="tenButTallyNo">✗ {noCount} no</span>
      </div>

      {/* Live running list of answered cards */}
      {answers.length > 0 && (
        <div style={{ marginBottom: "20px" }}>
          <div className="divider">✦ your answers so far ✦</div>
          <div className="rankedList">
            {[...answers].reverse().map((a, i) => (
              <div key={i} className={`tenButResultRow ${a.answer === "yes" ? "tenButResultYes" : "tenButResultNo"}`}>
                <span className="tenButResultIcon">{a.answer === "yes" ? "✓" : "✗"}</span>
                <span className="tenButResultText">They're a 10 but {a.prompt}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      <button className="backBtnBottom" onClick={() => { playPop(); onBack() }}>← Back to Menu</button>
    </div>
  )
}

// ── SCREENS ──────────────────────────────────────────────────────────────────
function MenuScreen({ onRandom, onCustom, onTenBut }) {
  const toggleFullscreen = () => {
    if (!document.fullscreenElement) { document.documentElement.requestFullscreen?.() }
    else { document.exitFullscreen?.() }
    playPop()
  }

const openWeather = () => {
  playWhoosh()
  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent)
  if (isMobile) {
    // Try native weather app first, fall back to Clearwater forecast
    window.location.href = "weather://"
    setTimeout(() => {
      window.open("https://forecast.weather.gov/MapClick.php?CityName=Clearwater&state=FL&site=TBW&textField1=27.9659&textField2=-82.8001", "_blank")
    }, 500)
  } else {
    window.open("https://forecast.weather.gov/MapClick.php?CityName=Clearwater&state=FL&site=TBW&textField1=27.9659&textField2=-82.8001", "_blank")
  }
}

  return (
    <div>
<div className="quoteOfDay">
  <span className="quoteOfDayText">"{quotes[Math.floor(Math.random() * quotes.length)]}"</span>
</div>

      <div className="card">
        <div className="cardLabel">★ Blind Ratings ★</div>
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

      <div className="card tenButMenuCard">
        <div className="cardLabel">★ They're A 10 But... ★</div>
        <p className="modeIntro">Make your judgement!</p>
        <p className="comingSoonDesc">They're a 10. But do their red flags cancel it out? You be the judge.</p>
        <button className="startBtn" onClick={() => { playWhoosh(); onTenBut() }}>Play Now</button>
      </div>

      <div className="card">
        <div className="cardLabel">☁ Guess The Weather ☁</div>
        <p className="modeIntro">Check the forecast!</p>
        <p className="comingSoonDesc">Open your weather app and see if your gut matches the forecast.</p>
        <button className="startBtn" onClick={openWeather}>Open Weather App</button>
      </div>
    </div>
  )
}

function CustomScreen({ onBack, onStart }) {
  const [inputs, setInputs] = useState(Array(10).fill(""))
  const handleChange = (i, val) => {
    const next = [...inputs]; next[i] = val; setInputs(next)
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
                maxLength={200}
                placeholder={`Prompt #${i + 1}...`}
                value={val}
                onChange={e => handleChange(i, e.target.value)}
              />
            </div>
          ))}
        </div>
        <button className="startBtn" disabled={!allFilled}
          onClick={() => { playWhoosh(); onStart(inputs.map(v => v.trim())) }}>
          Deal the Cards
        </button>
      </div>
      <button className="backBtnBottom" onClick={() => { playPop(); onBack() }}>← Back</button>
    </div>
  )
}

function GameScreen({ prompts, slots, currentIndex, onPick, onBack }) {
  const filled = slots.filter(s => s !== null).length
  const prompt = prompts[currentIndex]
  return (
    <div className="gameWrapper">
      <div className="progressBar">
        <div className="progressFill" style={{ width: `${filled * 10}%` }} />
      </div>
      <p className="howto">Use the buttons below to place this prompt — no take-backs!</p>
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
            <button key={i} className="ratingBtn" disabled={item !== null} onClick={() => onPick(i)}>{i + 1}</button>
          ))}
        </div>
      </div>
      <div className="divider">✦ Your Rankings So Far ✦</div>
      <div style={{ marginBottom: "20px" }}>
        <div className="rankedList">
          {slots.map((item, i) => (
            <div key={i} className={`rankedRow${item === null ? " slotEmpty" : ""}`}>
              <span className="rankedRowNum">{i + 1}</span>
              {item !== null ? <span className="rankedRowText">{item}</span> : <span className="rankedRowEmpty">empty</span>}
            </div>
          ))}
        </div>
      </div>
      <button className="backBtnBottom" onClick={() => { playPop(); onBack() }}>← Back to Menu</button>
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
    setSlots(Array(10).fill(null)); setCurrentIndex(0); setMode("random"); setPhase("playing")
  }, [])
  const startCustomEntry = useCallback(() => { setPhase("custom") }, [])
  const launchCustom = useCallback(inputs => {
    setCustomPrompts(inputs); setPrompts(shuffle(inputs))
    setSlots(Array(10).fill(null)); setCurrentIndex(0); setMode("custom"); setPhase("playing")
  }, [])
  const pickSlot = useCallback(i => {
    if (slots[i] !== null) return
    const newSlots = [...slots]; newSlots[i] = prompts[currentIndex]; setSlots(newSlots)
    const nextIndex = currentIndex + 1
    if (nextIndex >= 10) { playFinal(); setPhase("results") }
    else { playClick(); setCurrentIndex(nextIndex) }
  }, [slots, prompts, currentIndex])
  const playAgain = useCallback(() => {
    if (mode === "custom" && customPrompts.length > 0) { setPrompts(shuffle(customPrompts)) }
    else { setPrompts(shuffle(ALL_PROMPTS).slice(0, 10)) }
    setSlots(Array(10).fill(null)); setCurrentIndex(0); setPhase("playing")
  }, [mode, customPrompts])
  const goMenu = useCallback(() => { setPhase("menu") }, [])
  const toggleFullscreen = () => {
    if (!document.fullscreenElement) { document.documentElement.requestFullscreen?.(); setFsLabel("✕ Exit TV") }
    else { document.exitFullscreen?.(); setFsLabel("⛶ TV Mode") }
  }

  return (
    <>
      <button className="fullscreenBtn" onClick={() => { playPop(); toggleFullscreen() }}>{fsLabel}</button>
      <div className="app">
        {phase === "menu" && (
          <header className="header">
            <img className="decorLeft" src={ranchWater} alt="" aria-hidden="true" />
            <img className="decorRight" src={cigarette} alt="" aria-hidden="true" />
            <img className="decorBottomLeft" src={alpCan} alt="" aria-hidden="true" />
            <img className="decorLuca" src={luca} alt="" aria-hidden="true" />
            <div className="headerInner">
              <div className="starRow">★ ★ ★ ★ ★</div>
              <img className="logoImg" src={ranchLogo} alt="Blind Ratings" />
              <div className="starRow">★ ★ ★ ★ ★</div>
            </div>
          </header>
        )}
        {phase === "menu" && <MenuScreen onRandom={startRandom} onCustom={startCustomEntry} onTenBut={() => setPhase("tenBut")} />}
        {phase === "custom" && <CustomScreen onBack={goMenu} onStart={launchCustom} />}
        {phase === "playing" && <GameScreen prompts={prompts} slots={slots} currentIndex={currentIndex} onPick={pickSlot} onBack={goMenu} />}
        {phase === "results" && <ResultsScreen slots={slots} onPlayAgain={playAgain} onChangeMode={goMenu} />}
        {phase === "tenBut" && <TenButGame onBack={goMenu} />}
      </div>
    </>
  )
}

export function Head() {
  return (
    <>
      <title>Ranch Games</title>
      <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no" />
      <meta name="description" content="The blind ranking game for game night" />
      <link rel="icon" type="image/png" href="/ranch_water3.png" />
      <link rel="apple-touch-icon" href="/ranch_water3.png" />
      <meta property="og:title" content="Ranch Games" />
      <meta property="og:description" content="The blind ranking game for game night 🤠" />
      <meta property="og:image" content="https://ranchblindratings.netlify.app/ranchgames.png" />
      <meta property="og:url" content="https://ranchblindratings.netlify.app" />
      <meta property="og:type" content="website" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:image" content="https://ranchblindratings.netlify.app/ranchgames.png" />
    </>
  )
}
