import React, { useState, useCallback } from "react"
import ranchLogo from "../../static/ranchgameslogo.png"
import ranchWater from "../../static/ranch_water3.png"
import cigarette from "../../static/cigarette2.png"
import alpCan from "../../static/alp2.png"
import luca from "../../static/luca.png"

const GOOD_PROMPTS = [
  "Getting a day off work",
  "A hot shower after a long day",
  "Winning a board game",
  "Watching a great sunset",
  "Getting a compliment from a stranger",
  "Finishing a really good book",
  "Finding the perfect parking spot",
  "Waking up before your alarm naturally",
  "A dog greeting you at the door",
  "Getting the window seat on a flight",
  "Fresh bedsheets after a shower",
  "Finding out your favorite show has a new season",
  "Somebody bringing you coffee exactly how you like it without you asking",
  "When your team pulls off a miracle comeback in the last seconds of the game",
  "When the vending machine drops two snacks instead of one",
  "Coming up with the perfect prompt at a ranch",
  "Guessing the moon illumination perfectly",
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
  "Ranching in Italy with the whole Ranch",
  "Thrifting a sick band tee shirt",
  "Ripping a dart",
  "When you go to a boring work meeting but your boss who you just met offers you an alp",
]

const BAD_PROMPTS = [
  "Stubbing your toe",
  "Finding $20 in your pocket",
  "Missing your alarm",
  "Sitting in traffic for an hour and you have to pee",
  "Spilling coffee on yourself while you're wearing white",
  "Forgetting someone's name mid-conversation",
  "A mosquito bite on your ankle",
  "Dropping your food on the floor",
  "Having your card declined in public",
  "Accidentally liking an old photo while stalking someone on IG",
  "Replying 'you too' when the waiter says enjoy your meal",
  "Burning your tongue on hot food",
  "Fracturing your cock",
  "When you try to quietly fart in a meeting but it comes out as a long wet trumpet solo",
  "Accidentally playing porn through the bluetooth speaker at a family gathering",
  "When your mom likes a thirst comment you left on an instagram model's photo",
  "When you pull down your pants to poop and the seat is already warm from the last person",
  "Having 10/10 buffalo wings, using the bathroom and getting buffalo sauce in your weiner hole",
  "Slamming your cock in a toilet bowl",
  "Cutting off your nipple while trying to make a salad",
  "Landing a backflip at the rodeo only to get plowed by a horse",
  "Backing your truck into the golf sim",
  "Accidentally ordering your Uber Eats to the ranch on a work day",
  "Getting pantsed in public - full dong falls out",
  "Accidentally order 3's instead of 6's",
  "Sneezing so hard at a urinal that you pee on your own shoe",
  "Doing a confident lean against a wall that turns out to be a door, which opens and fracturing you're cock",
  "Fully committing to a fist bump when the other guy was going for a handshake and then both of you just kind of hover there",
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
  "You buy a nifty new piece of art at the thrift store and go to hang it up and smoke your thumb with the hammer",
  "When you got the red lobster for the first time in 7 years for endless shrimp. They're all out of shrimp",
  "Peeing at urinal in socks and Birkenstocks and the dude next to you pisses all over your foot",
  "When Argi breaks another chair at the ranch",
]

const TEN_BUT_PROMPTS = [
  "They only go to the bathroom with the door open",
  "They smell awful",
  "They howl whenever there is a full moon",
  "They love Minecraft and wear Minecraft merch",
  "They dress up as a clown for kids birthday parties and their instagram handle is GIGGLESTHECLOWN",
  "They have a fanny pack they wear to every occasion including funerals and first dates",
  "They refer to their car as 'she' and have cried when it got a scratch",
  "They eat cereal with orange juice instead of milk and think it's a personality",
  "They've never once flushed a public toilet with their hand",
  "They collect porcelain dolls and have names for all of them",
  "They sleep in their jeans",
  "They have a face tattoo of their own face",
  "They answer the phone by saying 'speak' no matter who it is",
  "They genuinely believe they can communicate with pigeons",
  "Their ringtone is their own voice saying their own name",
  "They bring a full-size pillow on airplanes and make no apologies",
  "They've legally changed their name to something they refuse to explain",
  "They wear crocs to every wedding they attend including ones where they are the best man",
  "They have a blog that has been 'coming soon' since 2014",
  "They do karate in the backyard every morning and invite no one but leave the gate open",
  "They've eaten at Olive Garden on their last four birthdays by choice and will do it again",
  "They refer to all beverages as 'juice'",
  "They have a second Instagram account for their hand",
  "They give themselves a nickname and introduce themselves by it immediately",
  "Their laugh sounds exactly like a seal and they know it and lean into it",
  "They've been 'working on a novel' for eleven years and it is four pages",
  "They wear a cape — not a costume, just a cape — as a daily choice",
  "They have a MySpace page that is still active and updated weekly",
  "They bite into string cheese instead of pulling it apart and they know what they're doing",
  "They make their own butter and tell you about it within the first ten minutes",
  "They've memorized the entire Shrek script and will use it in normal conversation",
  "They have a theme song they hum when they walk into rooms",
  "They wear transition lenses indoors on purpose",
  "They've named all their teeth",
  "They greet everyone they meet with a formal bow",
  "They won't eat anything that is touching another thing on the plate",
  "They have a podcast with one episode from 2019 and it is two hours long",
  "They think they're haunted and are fine with it",
  "They sign every text message with their full name",
  "They've been asked to leave a Panera Bread and won't say why",
  "They freestyle rap under stress and it's somehow good",
  "They wear a bluetooth earpiece at all times just in case",
  "They communicate exclusively through movie quotes in arguments",
  "They've trained their cat to high five and lead with this information on dates",
  "They have a go-bag packed at all times and the contents change seasonally",
  "They refer to themselves in the third person when they are proud of something they did",
  "They've been permanently banned from one specific Dave and Buster's",
  "They leave reviews for parking lots",
  "They whistle constantly and have no idea they are doing it",
]

const TRIVIA_QUESTIONS = [
  { q: "What is the capital of Australia?", a: "Canberra" },
  { q: "How many bones are in the adult human body?", a: "206" },
  { q: "What is the smallest country in the world?", a: "Vatican City" },
  { q: "Which animal has the longest lifespan?", a: "Greenland shark" },
  { q: "What is the most spoken language in the world?", a: "Mandarin Chinese" },
  { q: "How many hearts does an octopus have?", a: "3" },
  { q: "What is the chemical symbol for gold?", a: "Au" },
  { q: "Which country has the most natural lakes?", a: "Canada" },
  { q: "What is the fastest land animal?", a: "Cheetah" },
  { q: "How many sides does a heptagon have?", a: "7" },
  { q: "What is the capital of Canada?", a: "Ottawa" },
  { q: "Which planet has the most moons?", a: "Saturn" },
  { q: "What is the largest ocean on Earth?", a: "Pacific Ocean" },
  { q: "What country invented pizza?", a: "Italy" },
  { q: "How many teeth does an adult human have?", a: "32" },
  { q: "What is the longest river in the world?", a: "The Nile" },
  { q: "Which animal cannot jump?", a: "Elephant" },
  { q: "What is the hardest natural substance on Earth?", a: "Diamond" },
  { q: "How many stars are on the American flag?", a: "50" },
  { q: "What is the capital of Japan?", a: "Tokyo" },
  { q: "Which fruit has its seeds on the outside?", a: "Strawberry" },
  { q: "How many legs does a spider have?", a: "8" },
  { q: "What is the largest continent?", a: "Asia" },
  { q: "What gas do plants absorb from the atmosphere?", a: "Carbon dioxide" },
  { q: "How many players are on a soccer team on the field?", a: "11" },
  { q: "What is the smallest planet in our solar system?", a: "Mercury" },
  { q: "Which country is home to the kangaroo?", a: "Australia" },
  { q: "What is the most consumed meat in the world?", a: "Pork" },
  { q: "How many colors are in a rainbow?", a: "7" },
  { q: "What is the capital of Brazil?", a: "Brasilia" },
  { q: "Which ocean is the saltiest?", a: "Atlantic Ocean" },
  { q: "What is a group of crows called?", a: "A murder" },
  { q: "How many eyes does a bee have?", a: "5" },
  { q: "What country has the most pyramids?", a: "Sudan" },
  { q: "What is the most expensive spice in the world?", a: "Saffron" },
  { q: "Which mammal can fly?", a: "Bat" },
  { q: "How long does it take light to travel from the sun to Earth?", a: "About 8 minutes" },
  { q: "What is the capital of Egypt?", a: "Cairo" },
  { q: "Which country drinks the most coffee per capita?", a: "Finland" },
  { q: "What is the largest internal organ in the human body?", a: "Liver" },
  { q: "How many time zones does Russia span?", a: "11" },
  { q: "Which bird lays the largest eggs?", a: "Ostrich" },
  { q: "What is the capital of Argentina?", a: "Buenos Aires" },
  { q: "How many chambers does a human heart have?", a: "4" },
  { q: "What is the longest bone in the human body?", a: "Femur (thigh bone)" },
  { q: "Which country is the largest by land area?", a: "Russia" },
  { q: "What is the national animal of Scotland?", a: "Unicorn" },
  { q: "How many official languages does Switzerland have?", a: "4" },
  { q: "What is the most venomous animal in the world?", a: "Box jellyfish" },
  { q: "Which country invented paper?", a: "China" },
  { q: "What is the capital of Kenya?", a: "Nairobi" },
  { q: "How many tentacles does a squid have?", a: "10" },
  { q: "Which element has the atomic number 1?", a: "Hydrogen" },
  { q: "What is the largest desert in the world?", a: "Antarctica" },
  { q: "Which planet is known as the Red Planet?", a: "Mars" },
  { q: "How many strings does a standard guitar have?", a: "6" },
  { q: "What country has the most UNESCO World Heritage Sites?", a: "Italy" },
  { q: "What is the capital of South Korea?", a: "Seoul" },
  { q: "How many legs does a lobster have?", a: "10" },
  { q: "What is the only sea without a land boundary?", a: "Sargasso Sea" },
  { q: "Which country is known as the Land of the Rising Sun?", a: "Japan" },
  { q: "How many valves does a trumpet have?", a: "3" },
  { q: "What is the capital of Morocco?", a: "Rabat" },
  { q: "Which country has the most volcanoes?", a: "Indonesia" },
  { q: "How many stomachs does a cow have?", a: "4" },
  { q: "What is the smallest bone in the human body?", a: "Stirrup (in the ear)" },
  { q: "Which country is the world's largest producer of coffee?", a: "Brazil" },
  { q: "What is the capital of Nigeria?", a: "Abuja" },
  { q: "How fast can a hummingbird flap its wings per second?", a: "About 80 times" },
  { q: "Which country has the most islands?", a: "Sweden" },
  { q: "What is the rarest blood type?", a: "AB negative" },
  { q: "How many bones does a shark have?", a: "Zero — they have cartilage" },
  { q: "What is the capital of Portugal?", a: "Lisbon" },
  { q: "Which vegetable was once considered poisonous in Europe?", a: "Tomato" },
  { q: "How many moons does Mars have?", a: "2" },
  { q: "Which insect has the shortest lifespan?", a: "Mayfly (about 24 hours)" },
  { q: "What is the capital of Thailand?", a: "Bangkok" },
  { q: "How many keys does a standard piano have?", a: "88" },
  { q: "Which country invented the printing press?", a: "Germany" },
  { q: "What percentage of the Earth is covered by water?", a: "About 71%" },
  { q: "How many eyes does a horseshoe crab have?", a: "10" },
  { q: "What is the capital of Colombia?", a: "Bogota" },
  { q: "Which food is known as the king of fruits?", a: "Durian" },
  { q: "What is the longest wall in the world?", a: "Great Wall of China" },
  { q: "Which animal sleeps standing up?", a: "Horse" },
  { q: "What is the capital of New Zealand?", a: "Wellington" },
  { q: "How many bones does a baby have at birth?", a: "About 270" },
  { q: "What is the world's oldest religion?", a: "Hinduism" },
  { q: "How many teeth does a snail have?", a: "Thousands (up to 14,000)" },
  { q: "What is the capital of Saudi Arabia?", a: "Riyadh" },
  { q: "Which planet rotates on its side?", a: "Uranus" },
  { q: "What is the only fruit that grows its seed on the outside?", a: "Strawberry" },
  { q: "How many muscles does the human body have?", a: "Over 600" },
  { q: "Which country has the longest coastline in the world?", a: "Canada" },
  { q: "What is the capital of Vietnam?", a: "Hanoi" },
  { q: "How many hours are in a week?", a: "168" },
  { q: "Which animal has the biggest eyes of any land creature?", a: "Ostrich" },
  { q: "What is the capital of Ghana?", a: "Accra" },
  { q: "How many liters are in a gallon?", a: "About 3.785" },
  { q: "Which country is both an island and a continent?", a: "Australia" },
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

// ── TRIVIA GAME ───────────────────────────────────────────────────────────────
function TriviaGame({ onBack }) {
  const [questions] = useState(() => shuffle(TRIVIA_QUESTIONS))
  const [index, setIndex] = useState(0)
  const [revealed, setRevealed] = useState(false)
  const [score, setScore] = useState({ correct: 0, wrong: 0 })
  const [history, setHistory] = useState([])
  const [phase, setPhase] = useState("playing")

  const current = questions[index]

  const markAnswer = (correct) => {
    const newScore = { ...score, [correct ? "correct" : "wrong"]: score[correct ? "correct" : "wrong"] + 1 }
    const newHistory = [...history, { q: current.q, a: current.a, correct }]
    setScore(newScore)
    setHistory(newHistory)
    if (index + 1 >= questions.length) {
      playFinal(); setPhase("results")
    } else {
      correct ? playYes() : playNo()
      setIndex(index + 1)
      setRevealed(false)
    }
  }

  if (phase === "results") {
    return (
      <div className="gameWrapper">
        <div className="card">
          <div className="resultsTitle">Trivia Results</div>
          <div className="resultsSubtitle">★ How smart are ya, partner? ★</div>
          <div className="tenButScore">
            <div className="tenButScoreBox tenButYesBox">
              <div className="tenButScoreNum">{score.correct}</div>
              <div className="tenButScoreLabel">Correct</div>
            </div>
            <div className="tenButScoreBox tenButNoBox">
              <div className="tenButScoreNum">{score.wrong}</div>
              <div className="tenButScoreLabel">Wrong</div>
            </div>
          </div>
          {history.map((h, i) => (
            <div key={i} className={`tenButResultRow ${h.correct ? "tenButResultYes" : "tenButResultNo"}`}>
              <span className="tenButResultIcon">{h.correct ? "✓" : "✗"}</span>
              <span className="tenButResultText"><strong>{h.q}</strong><br />{h.a}</span>
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
        <div className="progressFill" style={{ width: `${(index / questions.length) * 100}%` }} />
      </div>
      <p className="howto">Read the question out loud — then reveal the answer!</p>
      <div className="card tenButCard">
        <div className="cardLabel">★ Trivia ★</div>
        <div className="promptNumber">Question {index + 1} of {questions.length}</div>
        <div className="tenButPrompt" style={{ fontSize: "clamp(16px, 4.5vw, 26px)" }}>{current.q}</div>
      </div>

      {!revealed ? (
        <button className="startBtn" onClick={() => { playClick(); setRevealed(true) }}>
          Reveal Answer
        </button>
      ) : (
        <>
          <div className="card" style={{ textAlign: "center", marginBottom: "14px" }}>
            <div className="cardLabel">★ Answer ★</div>
            <div className="tenButPrompt" style={{ fontSize: "clamp(18px, 5vw, 30px)", color: "var(--rosewood)" }}>
              {current.a}
            </div>
          </div>
          <div className="tenButButtons">
            <button className="tenButNo" onClick={() => markAnswer(false)}>✗ Got it Wrong</button>
            <button className="tenButYes" onClick={() => markAnswer(true)}>✓ Got it Right</button>
          </div>
        </>
      )}

      <div className="tenButTally" style={{ marginTop: "12px" }}>
        <span className="tenButTallyYes">✓ {score.correct} correct</span>
        <span className="tenButTallyNo">✗ {score.wrong} wrong</span>
      </div>

      {history.length > 0 && (
        <div style={{ marginBottom: "20px" }}>
          <div className="divider">✦ previous answers ✦</div>
          <div className="rankedList">
            {[...history].reverse().map((h, i) => (
              <div key={i} className={`tenButResultRow ${h.correct ? "tenButResultYes" : "tenButResultNo"}`}>
                <span className="tenButResultIcon">{h.correct ? "✓" : "✗"}</span>
                <span className="tenButResultText"><strong>{h.q}</strong> — {h.a}</span>
              </div>
            ))}
          </div>
        </div>
      )}
      <button className="backBtnBottom" onClick={() => { playPop(); onBack() }}>← Back to Menu</button>
    </div>
  )
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
function MenuScreen({ onRandom, onCustom, onTenBut, onTrivia }) {
  const toggleFullscreen = () => {
    if (!document.fullscreenElement) { document.documentElement.requestFullscreen?.() }
    else { document.exitFullscreen?.() }
    playPop()
  }

  const openWeather = () => {
    playWhoosh()
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent)
    if (isMobile) {
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

      <div className="card">
        <div className="cardLabel">★ Trivia ★</div>
        <p className="modeIntro">How smart are ya, partner?</p>
        <p className="comingSoonDesc">100 questions on animals, history, food, countries and more. Read it out loud and mark it yourself.</p>
        <button className="startBtn" onClick={() => { playWhoosh(); onTrivia() }}>Let's Go</button>
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
        <div className="promptText">{prompt}</div>
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
    const good = shuffle(GOOD_PROMPTS).slice(0, 5)
    const bad = shuffle(BAD_PROMPTS).slice(0, 5)
    setPrompts(shuffle([...good, ...bad]))
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
    else {
      const good = shuffle(GOOD_PROMPTS).slice(0, 5)
      const bad = shuffle(BAD_PROMPTS).slice(0, 5)
      setPrompts(shuffle([...good, ...bad]))
    }
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
        {phase === "menu" && <MenuScreen onRandom={startRandom} onCustom={startCustomEntry} onTenBut={() => setPhase("tenBut")} onTrivia={() => setPhase("trivia")} />}
        {phase === "custom" && <CustomScreen onBack={goMenu} onStart={launchCustom} />}
        {phase === "playing" && <GameScreen prompts={prompts} slots={slots} currentIndex={currentIndex} onPick={pickSlot} onBack={goMenu} />}
        {phase === "results" && <ResultsScreen slots={slots} onPlayAgain={playAgain} onChangeMode={goMenu} />}
        {phase === "tenBut" && <TenButGame onBack={goMenu} />}
        {phase === "trivia" && <TriviaGame onBack={goMenu} />}
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
