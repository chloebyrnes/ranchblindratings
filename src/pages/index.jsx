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
  "Having 10/10 buffalo wings, using the bathroom and getting buffalo sauce in your Weiner hole",
"Slamming your cock in a toilet bowl",
"Landing a backflip at the rodeo only to get plowed by a horse",
"Backing your truck into the golf sim",
"Accidentally ordering your Uber Eats to the ranch on a work day",
"Getting pantsed in public - full dong falls out",
"Accidentally order 3's instead of 6's",
"Sneezing so hard at a urinal that you pee on your own shoe",
"Doing a confident lean against a wall that turns out to be a door, which opens and fracturing you're cock",
"Fully committing to a fist bump when the other guy was going for a handshake and then both of you just kind of hover there",
"Loudly saying 'you too' when the waiter tells you to enjoy your meal",
"Calling your coach 'mom' in front of the whole team",
"Giving a big confident handshake to your new boss who just had hand surgery",
"Doing a slow confident walk toward a push door and having to pull it in front of a full restaurant",
"Accidentally dropping a hard R at the cookout. It does not go over well",
"You're song comes on during a workout, you absolutely send it on the first set, and pulling something out in your back",
"Accidentally sending a paragraph-long venting text about someone to that exact person",
"Watching your sunglasses fall off the boat in slow motion and making eye contact with them as they sink",
"Showing up to a costume party as Jesus only to find out it was not a costume party",
"Zipping up your cock something about Mary style",
"Watching your debit card get declined for a $7 purchase in a small, very quiet coffee shop",
"Ordering a drink on a plane only for the flight attendant to spill it on your head",
"Seeing Casey Tibbs hog at football practice",
"Getting close lined playing red rover on the yard",
"Holding Brady for the first time and he shits on you",
"A horrible nights sleep only to be woken up to the sound of your dog barfing on your new jeans",
"You buy a nifty new piece of art at the thrift store and go to hang It up and smoke your thumb with the hammer",
"When you got the red lobster for the first time in 7 years for endless shrimp. They're all out of shrimp",
"Peeing at urinal in socks and Birkenstocks and the dude next to you pisses all over your foot",
"Coming up with the perfect prompt at a ranch",
"Guessing the illumination perfectly",
"A good smoothie on a summer day",
"When your layover has a sick pizza joint and you become buddies with the pizza chef",
"A rodeo with the ranch gang",
"Eating a soufflé from Jeffrey",
"A crisp dap",
"Lazy Rivers",
"Ghost wipes",
"When a southern black woman calls you 'honey'",
"Wedding Cigar",
"When you butter a reverse job into a parking space",
"Magicians",
"When the girl at Publix calls you out of a long line to start a new checkout line",
"Falling asleep on the couch and waking up to find someone put a blanket on you",
"When you're dreading a thing all week and it gets cancelled the morning of",
"Hearing your song come on at a gas station and realizing the person pumping next to you is also nodding",
"Telling a joke and your buddy laughs so hard he snorts",
"A ripping fire pit with the gang",
"When you're driving back late and everyone else in the car falls asleep and you've got the music to yourself",
"Getting the whole aisle to yourself on a plane",
"Nailing a perfect medium rare on a steak",
"When a dog does a big stretch",
"Getting a reservation for Rocca on the day of",
"A rainy Sunday with nothing to do",
"A sick ass tree house",
"When the bill comes out way cheaper than you expected",
"An ice cold beer",
"When Argi Breaks another chair at the ranch",
"Ranching in Italy with the whole Ranch",
"Thrifting a sick band tee shirt",
"Ripping a dart",
"When you go to a boring work meeting but your boss who you just met offers you an alp",
  
]

const TEN_BUT_PROMPTS = [
  "They laugh at their own jokes before the punchline and then explain the joke",
  "They call every movie they don't understand 'boring' but loved Minions",
  "They reply to group texts with 'k' then immediately call you",
  "They pronounce it 'expresso' and will die on that hill",
  "They clap when the plane lands and make eye contact with you while doing it",
  "They still have a Hotmail address and it's their bank login",
  "They describe their personality as 'I don't like drama' and cause all the drama",
  "They absolutely love Miami unironically",
  "They're always 15 minutes late but text 'on my way' from their couch",
  "They split the bill to the cent including calculating your exact portion of the shared appetizer",
  "They have a photo of themselves flexing as their phone wallpaper",
  "They use speakerphone in public at full volume and hold it six inches from their face",
  "They chew with their mouth open and breathe through it too",
  "They refer to their dog as their 'fur baby' in formal situations",
  "They still wear Axe body spray like it's 2007 gym class",
  "They don't believe in therapy but describe their trauma in detail on first dates",
  "They order their steak well done and then send it back for being too dry",
  "They think Mercury retrograde is a valid reason to cancel plans",
  "They still quote Borat in 2025 and gauge your reaction to see if you're cool",
  "They correct literally everything you say with 'well actually' while nodding slowly",
  "They ask to try your food, take a bite the size of a small continent, and say 'yeah that's good'",
  "They cry at commercials but not at funerals",
  "They sleep with a childhood stuffed animal and it has a name and a backstory",
  "They are absolutely unhinged at mini golf — full pre-shot routine, trash talk, the works",
  "They have the worst music taste on earth but their aux confidence is through the roof",
  "They have never once apologized first and consider it a personality trait",
  "They have strong opinions about what you wear and bring it up casually in front of others",
  "They pronounce 'quinoa' a completely different way every time and never acknowledge it",
  "They use the word 'adulting' unironically in their out-of-office email",
  "They remove their shoes in any building including your office and a Chili's",
  "They say 'circling back' in a text to their mom about Thanksgiving plans",
  "They call any movie longer than 90 minutes 'a slow burn' and fell asleep in Interstellar",
  "They explain their morning routine unprompted and it takes 45 minutes to describe",
  "They've muted 83 of their 86 contacts and still consider themselves a great communicator",
  "They think saying something mean quietly is the same as not saying it",
  "They google the thing you are actively explaining to them and then read it back to you",
  "They call their humor 'dark' but their hardest joke is a pun about bread",
  "They hold their breath and pump an invisible brake during your parallel parking attempt",
  "They say 'I'm not like other people' in a way that proves they are exactly like other people",
  "They rank every restaurant they've ever been to out loud without being asked",
  "They have a whole personality about their coffee order and will tell your barista how to make it",
  "They think finishing your sentences is helping",
  "They've never tipped above 15% in their life and think that's completely reasonable",
  "They bring up their ex within the first three stories they tell you",
  "They've named their car, their plant, their Roomba, and their favorite parking spot",
  "They respond to 'how are you' with a genuinely detailed answer every single time",
  "They narrate what they're doing in the kitchen like a cooking show and you're the crew",
  "They describe a dream to you in full detail and get upset when you're not invested",
  "They send voice memos that are longer than most podcasts",
  "They think they could have been a professional athlete if things had gone differently",
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
  { text: "If it ain't broke, hit it harder.", author: "Every cowboy ever" },
  { text: "Not my horse, not my rodeo, not my problem.", author: "Unknown rancher" },
  { text: "I don't trust stairs. They're always up to something.", author: "Suspicious farmhand" },
  { text: "Lord give me patience, because if you give me strength I'm gonna need bail money.", author: "Grandma, probably" },
  { text: "Some days you're the bull. Most days you're the fence.", author: "Old rodeo wisdom" },
  { text: "If common sense was lard, some folks couldn't grease a skillet.", author: "Southern proverb" },
  { text: "Life is short. Buy the boots.", author: "Every Texan" },
  { text: "I was born ready. I just wasn't born on time.", author: "Late cowboy" },
  { text: "I'm not lazy, I'm on energy-saving mode.", author: "Ranch hand, 3pm" },
  { text: "I put the 'pro' in procrastination.", author: "Anonymous outlaw" },
  { text: "My people skills are just fine. It's my tolerance for idiots that needs work.", author: "Sheriff, unquoted" },
  { text: "I'm not arguing, I'm just explaining why I'm right.", author: "Every spouse at game night" },
  { text: "I run on coffee, sarcasm, and inappropriate thoughts.", author: "Night shift wrangler" },
  { text: "I don't need Google, my wife knows everything.", author: "Smart husband" },
  { text: "Age is just a number. Mine is unlisted.", author: "Unnamed elder" },
  { text: "Behind every great man is a woman rolling her eyes.", author: "Historical fact" },
  { text: "If you think adventure is dangerous, try routine — it's lethal.", author: "Paulo Coelho" },
  { text: "The road to success is always under construction.", author: "Lily Tomlin" },
  { text: "I've got the body of a god. Unfortunately it's Buddha.", author: "Billy Connolly" },
  { text: "I was not designed to wake up before the chickens.", author: "City folk, lost" },
]

const quote = quotes[Math.floor(Math.random() * quotes.length)]

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
  <div className="quoteOfDayLabel">★ Quote of the Day ★</div>
  <span className="quoteOfDayText">"{quote.text}"</span>
  <div className="quoteOfDayAuthor">— {quote.author}</div>
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
