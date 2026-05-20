import React, { useState, useCallback, useRef } from "react"
import ranchLogo from "../../static/ranchgameslogo.png"
import ranchWater from "../../static/ranch_water3.png"
import cigarette from "../../static/cigarette2.png"
import alpCan from "../../static/alp2.png"
import luca from "../../static/luca.png"

const GOOD_PROMPTS = [
  "Getting a day off work","A hot shower after a long day","Winning a board game","A really good corndog",
  "Watching a great sunset","Getting a compliment from a stranger","Finishing a really good book",
  "Finding the perfect parking spot","Waking up before your alarm naturally","A dog greeting you at the door",
  "Getting the window seat on a flight","Fresh bedsheets after a shower",
  "Finding out your favorite show has a new season",
  "Somebody bringing you coffee exactly how you like it without you asking",
  "When your team pulls off a miracle comeback in the last seconds of the game",
  "When the vending machine drops two snacks instead of one",
  "Coming up with the perfect prompt at a ranch","Guessing the moon illumination perfectly",
  "A good smoothie on a summer day",
  "When your layover has a sick pizza joint and you become buddies with the pizza chef",
  "A rodeo with the ranch gang","Eating a soufflé from Jeffrey","A crisp dap","Lazy Rivers",
  "Ghost wipes","When a southern black woman calls you 'honey'","Wedding Cigar",
  "When you butter a reverse job into a parking space","Magicians",
  "When the girl at Publix calls you out of a long line to start a new checkout line",
  "Falling asleep on the couch and waking up to find someone put a blanket on you",
  "When you're dreading a thing all week and it gets cancelled the morning of",
  "Hearing your song come on at a gas station and realizing the person pumping next to you is also nodding",
  "Telling a joke and your buddy laughs so hard he snorts","A ripping fire pit with the gang",
  "When you're driving back late and everyone else in the car falls asleep and you've got the music to yourself",
  "Getting the whole aisle to yourself on a plane","Nailing a perfect medium rare on a steak",
  "A rainy Sunday with nothing to do","A sick ass tree house",
  "When the bill comes out way cheaper than you expected",
  "Ranching in Italy with the whole Ranch","Thrifting a sick band tee shirt","Ripping a dart",
  "When you go to a boring work meeting but your boss who you just met offers you an alp",
  "When the waiter brings extra bread without you asking",
  "A cold drink when you really need it",
  "Getting upgraded to first class for no reason",
  "When you nail the joke in a room full of people who weren't sure about you yet",
  "Waking up thinking it's Monday and it's Saturday",
  "When a stranger's dog comes and sits on your foot",
  "Getting to the airport and breezing through security in under 5 minutes",
  "When your food comes out looking exactly like the picture",
  "A roadtrip with friends",
  "A perfectly timed high five that makes a sound",
  "Finding out the group chat already handled it",
  "Remembering you have leftovers in the fridge right when you're hungry",
  "When someone you respect laughs really hard at something you said",
  "The first cold one after moving furniture or doing something physical",
  "When the check comes and someone just grabs it without a word",
  "When plans come together with zero effort",
  "When the fire catches on the first try in front of people",
  "A full tank, a clean truck, and somewhere worth going",
  "When someone says exactly what you were thinking before you could say it",
  "When the song you forgot about comes on and it's somehow better than you remembered",
  "Finding a new favorite restaurant and your friends love it too",
  "Getting a compliment from someone who clearly doesn't give them out easily",
  "When the rain starts right after you get inside",
  "When you and a stranger make eye contact and both silently agree the situation is ridiculous",
  "A sunrise you didn't plan on seeing but caught anyway",
  "When the group agrees on a restaurant immediately with zero debate",
  "When your bags come out first on the baggage carousel",
  "A long lunch that turns into a long afternoon and nobody has anywhere to be",
  "When the bartender just starts making your usual without you saying anything",
  "Getting a parking spot right up front like you own the place",
  "When the dog you just met won't leave your side the whole night",
  "When someone you respect says your name while giving a compliment",
  "The moment a new pair of boots finally breaks in",
  "Getting a table immediately at a place with a long wait",
  "When the fire catches on the first try in front of people",
  "When someone brings exactly the right snack at exactly the right time",
  "When the group agrees on a restaurant immediately with zero debate",
  "A fan that hits exactly right on a hot night",
  "When you're the one who remembered to bring the thing everyone needed",
  "Finishing something hard and not telling anyone about it",
]

const BAD_PROMPTS = [
  "Stubbing your toe","Finding $20 in your pocket","Missing your alarm",
  "Sitting in traffic for an hour and you have to pee",
  "Spilling coffee on yourself while you're wearing white",
  "Forgetting someone's name mid-conversation","A mosquito bite on your ankle",
  "Dropping your food on the floor","Having your card declined in public",
  "Accidentally liking an old photo while stalking someone on IG",
  "Replying 'you too' when the waiter says enjoy your meal","Burning your tongue on hot food",
  "Fracturing your cock",
  "When you try to quietly fart in a meeting but it comes out as a long wet trumpet solo",
  "Accidentally playing porn through the bluetooth speaker at a family gathering",
  "When your mom likes a thirst comment you left on an instagram model's photo",
  "When you pull down your pants to poop and the seat is already warm from the last person",
  "Having 10/10 buffalo wings, using the bathroom and getting buffalo sauce in your weiner hole",
  "Slamming your cock in a toilet bowl","Cutting off your nipple while trying to make a salad",
  "Landing a backflip at the rodeo only to get plowed by a horse",
  "Backing your truck into the golf sim",
  "Accidentally ordering your Uber Eats to the ranch on a work day",
  "Getting pantsed in public - full dong falls out","Accidentally order 3's instead of 6's",
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
  "Seeing Casey Tibbs hog at football practice","Getting close lined playing red rover on the yard",
  "Holding Brady for the first time and he shits on you",
  "A horrible nights sleep only to be woken up to the sound of your dog barfing on your new jeans",
  "You buy a nifty new piece of art at the thrift store and go to hang it up and smoke your thumb with the hammer",
  "When you got the red lobster for the first time in 7 years for endless shrimp. They're all out of shrimp",
  "Peeing at urinal in socks and Birkenstocks and the dude next to you pisses all over your foot",
  "When Argi breaks another chair at the ranch",
  "Waving back at someone who wasn't waving at you in front of a large crowd",
  "Confidently walking to the wrong car in a parking lot and opening the door to realize that it's a stranger's car and they're sitting in the driver's seat",
  "Opening the front camera by accident and just looking at yourself for a second",
  "Shaking someone's hand right after they sneezed",
  "Getting a wedgie","Cracking your phone screen",
  "Misjudging the depth of a step and falling down it in front of a group of people",
  "Getting sun poisoning on day one of a five day trip",
  "Ripping your pants at an event and having to walk around with your underwear showing",
  "Burning the roof of your mouth on the first bite and then doing it again immediately",
  "Dropping your sunglasses into the toilet mid-pee",
  "Walking into a glass door at a restaurant while people are eating inside",
  "Getting stung by a bee","Missing your flight",
  "Trying to casually lean on something at a party and knocking it over",
  "Getting hit by a sprinkler on the way to something important",
  "Mispronouncing a word you've only ever read and getting corrected in a group",
  "Running to catch a door someone held and you're farther than you thought and now you're jogging",
  "Asking for extra sauce and getting none and not discovering it until you're already home",
  "When your card declines at the gas pump so you go inside, you wait in a long line and it declines again",
  "Waking up with your neck out and the pain will last for days",
  "Spilling something on yourself in the car with no napkins and 45 minutes left",
  "Pushing a door that you're supposed to pull",
  "Sitting on a wet chair and getting a wet butt",
  "Swallowing your drink down the wrong pipe and you can't stop coughing at a restaurant dinner",
  "Getting a paper cut from something that has no business giving paper cuts",
  "Sitting on your own sunglasses and hearing the crunch before you know what it was",
  "Biting your cheek so hard you bite it again in the exact same spot for the next four days",
  "Walking out of a bathroom with your shirt tucked into your underwear at a nice dinner",
  "Trying to look casual on a wakeboard and immediately eating it in front of the whole boat",
  "Getting your flip flop sucked off in the mud in front of everyone and having to hop",
  "Getting bug sprayed by someone who didn't warn you and it goes directly into your mouth",
  "Slipping on a boat ladder in front of the whole marina",
  "Calling someone by the wrong name after being introduced three times",
  "Stepping on a hidden sprinkler head barefoot in the dark",
  "Getting to the front of a long line and not knowing what you want",
  "Finding out the reservation was for last night",
  "Getting your fishing line tangled beyond what any person should have to deal with",
  "Sitting in something wet and not knowing what it is for the rest of the day",
  "Offering to drive and then immediately getting lost",
  "Getting the hiccups during a quiet moment that goes on way longer than anyone is comfortable with",
  "Stepping off a boat onto a dock and the boat drifts at the exact wrong moment",
  "Biting into what you think is a chocolate chip cookie and it's raisins",
  "Losing your hat off the back of a boat and watching it get smaller in the wake",
  "Ordering confidently at a restaurant and the waiter saying that item is actually not available",
  "Getting bug sprayed by someone who didn't warn you and it goes directly into your mouth",
]

const TEN_BUT_PROMPTS = [
  "They have a full night time routine and it takes 2 hours. They get mad if you rush them",
  "They audibly burp very loudly and think it's cool and quirky",
  "They say 'type shit' and 'bruh' after most sentences",
  "They carry a gallon water bottle everywhere they go, including walking around the house and they bring it inside restaurants",
  "They confidently pronounce certain words wrong",
  "Their birthday is the most important day of the year and they always find a reason to cry about something on that day",
  "They get mysterious letters from a stalker and act like it's a gift",
  "They call you really obnoxious pet names and will address you as such",
  "They believe in rain dances and will do this once a week to help the environment",
  "They don't drink water because they don't like the taste of it",
  "They constantly clear their throat while talking and they don't notice it",
  "They want you to call them Mr or Miss before their name and will get upset if you don't",
  "They need you to hold their hand when they use the toilet because they're scared they're going to fall in",
  "They have a bunker under their house stocked with canned food and bottled water for the apocalypse",
  "They believe they have a sixth sense and bring it up constantly",
  "They've slept outside voluntarily, in a hammock, in November, and called it refreshing",
  "They quote movies in everyday conversation and expect you to know the movie and the quote",
  "They don't believe in using maps or GPS and navigate solely by the sun and stars. You constantly get lost with them",
  "They are always on live on instagram and will narrate everything they're doing in real time to their followers",
  "They like to pants you whenever they see you and they will not stop until they succeed at least once",
  "They introduce themselves as Dr. or Professor and they don't have a doctorate or professorship but they just like the title",
  "They count sheep out loud to fall asleep",
  "They're extremely sensitive to light and have to wear giant sunglasses even indoors and at night",
  "They talk to their animals and have them respond back and forth in a full conversation. It's not a joke — they make serious life decisions this way",
  "They need you to tuck them in at night and sing them a lullaby before they can fall asleep",
  "They're embarrassingly horrible at telling jokes but they tell them all the time and get very upset when no one laughs",
  "They have a handshake they invented and try to use it on everyone they meet",
  "They collect human teeth and have a display case for them in their house",
  "They like to go on cruises once a month and you have to go with them",
  "They have a severe lisp",
  "They love true crime and have a wall of the house dedicated to it with timelines, photos, and newspaper clippings",
  "They have a really ugly crying face and they cry often, about everything, and they don't care who sees it",
  "They have a YouTube channel reviewing toys and they take it very seriously",
  "They have weird friends and invite them to every event and they always make things awkward but they don't care",
  "They send very long winded texts that are just one giant run on sentence with no punctuation and they expect you to read the whole thing and respond to every point",
  "They absolutely love to sing and sing loudly and off key in public places",
  "They can't read or write but somehow they're still very smart",
  "They talk to themselves out loud and have full conversations with themselves and they don't even realize they're doing it",
  "They are extremely superstitious and have a different superstition for every occasion and they follow them all to a T",
  "They sound like Kermit the Frog",
  "They finish other people's sentences, incorrectly, confidently, and without remorse",
  "They're the person who shows up to a bonfire with a guitar no one asked for",
  "They carry a samurai sword around with them and will not put it down for any reason",
  "They're vegan and push it on everyone they meet and they get really upset if you eat meat around them",
  "They're a soundcloud rapper",
  "They never wear shoes and they think it's a lifestyle choice and not a health code violation",
  "They always think you could lose a few pounds and they bring it up often",
  "They have a very specific way they like their coffee and they will get very upset if you make it wrong",
  "They have a pet rat that they treat like a dog and they bring it everywhere with them in a little rat stroller",
  "They believe they're from the future and they have a time machine in their basement that they won't let anyone see",
  "They have a full skincare routine they describe as 'a whole thing' and it takes 45 minutes",
  "They've never once eaten a meal without rating it out loud",
  "They call everyone 'boss' including their actual boss",
  "They have an emotional support water bottle they've named Gerald",
  "They run into someone they know everywhere they go and seem unbothered by this",
  "They own a taxidermied animal that sits in the living room with a name and a backstory",
  "They have beef with a local weatherman that goes back three years",
  "They do a little bow before sitting down at the dinner table",
  "They hum constantly — not a song, just a frequency",
  "They refer to their houseplants as their children and have a babysitter for them when they travel",
  "They wear a cowboy hat indoors and get offended if you mention it",
  "They've cried at a car commercial, a dog food commercial, and once at a UPS commercial",
  "They keep every receipt they've ever received in a shoebox organized by month",
  "They've never once asked for directions and have been lost in a Walmart for 40 minutes",
  "They own a metal detector and use it every weekend",
  "They introduce their dog before they introduce themselves",
  "They've had the same lucky pen since 2009 and will not explain why it's lucky",
  "They know every employee at their local Chick-fil-A by name and vice versa",
  "They do voices for all their pets and maintain them consistently",
  "They've sent a formal letter of complaint to a restaurant and framed the response",
  "They treat parallel parking like a competitive sport and expect applause",
  "They make eye contact for slightly too long and smile slightly too wide",
  "They refer to napping as 'going into power mode'",
  "They have a nemesis at the gym and the gym does not know about this",
  "They've memorized every line from Tombstone and deploy them at random",
  "They rate gas stations like restaurants and have strong opinions about Flying J",
  "They write thank you cards by hand for every gift, meal, and minor favor",
  "They've never been on time to anything but always arrive with a very good story",
  "They believe strongly in signs from the universe and the universe apparently has a lot to say",
  "They narrate their own cooking like they're filming a YouTube video no one asked for",
  "They have a specific chair that is theirs and get visibly unsettled when someone sits in it",
  "They've been voluntarily sober at a tailgate, not because they had to, just to see if they could",
  "They're the person who shows up to a bonfire with a guitar no one asked for",
  "They have a theory about the moon that they'll share if you give them any opening at all",
  "They've given a full toast at someone else's dinner party that wasn't a special occasion",
  "They describe every trip they take in real time via a 47 photo album on Facebook",
  "They know the exact caloric content of everything on the menu and tell you",
  "They've been in a fantasy football league for 12 years, never won, and are more committed than ever",
  "They have a rating system for hugs and they will tell you your score",
  "They ask the waiter what their favorite item is and then order something completely different",
]

const TRIVIA_CATEGORIES = {
  "Geography": [
    { q: "What is the capital of Australia?", a: "Canberra" },
    { q: "What is the capital of Canada?", a: "Ottawa" },
    { q: "What is the capital of Brazil?", a: "Brasilia" },
    { q: "What is the capital of Egypt?", a: "Cairo" },
    { q: "What is the capital of Japan?", a: "Tokyo" },
    { q: "What is the capital of Argentina?", a: "Buenos Aires" },
    { q: "What is the capital of Morocco?", a: "Rabat" },
    { q: "What is the capital of Nigeria?", a: "Abuja" },
    { q: "What is the capital of Portugal?", a: "Lisbon" },
    { q: "What is the capital of South Korea?", a: "Seoul" },
    { q: "What is the capital of New Zealand?", a: "Wellington" },
    { q: "What is the capital of Saudi Arabia?", a: "Riyadh" },
    { q: "What is the capital of Vietnam?", a: "Hanoi" },
    { q: "What is the capital of Ghana?", a: "Accra" },
    { q: "What is the capital of Colombia?", a: "Bogota" },
    { q: "What is the capital of Kenya?", a: "Nairobi" },
    { q: "What is the capital of Thailand?", a: "Bangkok" },
    { q: "Which country has the most natural lakes?", a: "Canada" },
    { q: "Which country has the longest coastline?", a: "Canada" },
    { q: "Which country is the largest by land area?", a: "Russia" },
    { q: "What is the largest ocean on Earth?", a: "Pacific Ocean" },
    { q: "What is the longest river in the world?", a: "The Nile" },
    { q: "What is the largest continent?", a: "Asia" },
    { q: "What is the largest desert in the world?", a: "Antarctica" },
    { q: "Which country has the most islands?", a: "Sweden" },
    { q: "Which ocean is the saltiest?", a: "Atlantic Ocean" },
    { q: "What is the only sea without a land boundary?", a: "Sargasso Sea" },
    { q: "Which country has the most volcanoes?", a: "Indonesia" },
    { q: "Which country is both an island and a continent?", a: "Australia" },
    { q: "How many time zones does Russia span?", a: "11" },
  ],
  "Animals": [
    { q: "Which animal has the longest lifespan?", a: "Greenland shark" },
    { q: "What is the fastest land animal?", a: "Cheetah" },
    { q: "Which animal cannot jump?", a: "Elephant" },
    { q: "How many hearts does an octopus have?", a: "3" },
    { q: "Which mammal can fly?", a: "Bat" },
    { q: "Which bird lays the largest eggs?", a: "Ostrich" },
    { q: "What is a group of crows called?", a: "A murder" },
    { q: "How many eyes does a bee have?", a: "5" },
    { q: "How many tentacles does a squid have?", a: "10" },
    { q: "Which animal sleeps standing up?", a: "Horse" },
    { q: "How many bones does a shark have?", a: "Zero — they have cartilage" },
    { q: "Which insect has the shortest lifespan?", a: "Mayfly (about 24 hours)" },
    { q: "How many stomachs does a cow have?", a: "4" },
    { q: "How many eyes does a horseshoe crab have?", a: "10" },
    { q: "Which animal has the biggest eyes of any land creature?", a: "Ostrich" },
    { q: "How many legs does a spider have?", a: "8" },
    { q: "How many legs does a lobster have?", a: "10" },
    { q: "Which country is home to the kangaroo?", a: "Australia" },
    { q: "How fast can a hummingbird flap its wings per second?", a: "About 80 times" },
    { q: "How many teeth does a snail have?", a: "Thousands (up to 14,000)" },
    { q: "What is the most venomous animal in the world?", a: "Box jellyfish" },
    { q: "Which bird cannot fly?", a: "Ostrich" },
    { q: "What do you call a group of flamingos?", a: "A flamboyance" },
    { q: "How many noses does a slug have?", a: "4" },
    { q: "What is the only mammal with scales?", a: "Pangolin" },
    { q: "Which animal has the highest blood pressure?", a: "Giraffe" },
    { q: "A group of lions is called what?", a: "A pride" },
    { q: "What animal has fingerprints most similar to humans?", a: "Koala" },
    { q: "What is the largest land animal?", a: "African elephant" },
    { q: "How many legs does a crab have?", a: "10" },
  ],
  "Science": [
    { q: "What is the chemical symbol for gold?", a: "Au" },
    { q: "Which element has the atomic number 1?", a: "Hydrogen" },
    { q: "What gas do plants absorb from the atmosphere?", a: "Carbon dioxide" },
    { q: "What is the hardest natural substance on Earth?", a: "Diamond" },
    { q: "How long does it take light to travel from the sun to Earth?", a: "About 8 minutes" },
    { q: "Which planet has the most moons?", a: "Saturn" },
    { q: "Which planet is known as the Red Planet?", a: "Mars" },
    { q: "What is the smallest planet in our solar system?", a: "Mercury" },
    { q: "Which planet rotates on its side?", a: "Uranus" },
    { q: "How many bones are in the adult human body?", a: "206" },
    { q: "How many teeth does an adult human have?", a: "32" },
    { q: "What is the largest internal organ in the human body?", a: "Liver" },
    { q: "How many chambers does a human heart have?", a: "4" },
    { q: "What is the longest bone in the human body?", a: "Femur (thigh bone)" },
    { q: "What is the smallest bone in the human body?", a: "Stirrup (in the ear)" },
    { q: "How many muscles does the human body have?", a: "Over 600" },
    { q: "How many bones does a baby have at birth?", a: "About 270" },
    { q: "What percentage of the Earth is covered by water?", a: "About 71%" },
    { q: "How many strings does a standard guitar have?", a: "6" },
    { q: "How many keys does a standard piano have?", a: "88" },
    { q: "How many valves does a trumpet have?", a: "3" },
    { q: "How many hours are in a week?", a: "168" },
    { q: "How many sides does a heptagon have?", a: "7" },
    { q: "What is the most spoken language in the world?", a: "Mandarin Chinese" },
    { q: "What is the rarest blood type?", a: "AB negative" },
    { q: "What is the most expensive spice in the world?", a: "Saffron" },
    { q: "Which country invented paper?", a: "China" },
    { q: "Which country invented the printing press?", a: "Germany" },
    { q: "What is the national animal of Scotland?", a: "Unicorn" },
    { q: "How many liters are in a gallon?", a: "About 3.785" },
  ],
  "Food & Drink": [
    { q: "What country invented pizza?", a: "Italy" },
    { q: "Which country is the world's largest producer of coffee?", a: "Brazil" },
    { q: "Which country drinks the most coffee per capita?", a: "Finland" },
    { q: "What is the most consumed meat in the world?", a: "Pork" },
    { q: "Which fruit has its seeds on the outside?", a: "Strawberry" },
    { q: "Which vegetable was once considered poisonous in Europe?", a: "Tomato" },
    { q: "Which food is known as the king of fruits?", a: "Durian" },
    { q: "What is sushi traditionally wrapped in?", a: "Nori (seaweed)" },
    { q: "What grain is used to make bourbon?", a: "Corn" },
    { q: "What country does Gouda cheese come from?", a: "Netherlands" },
    { q: "What is the main ingredient in guacamole?", a: "Avocado" },
    { q: "What spirit is used in a Margarita?", a: "Tequila" },
    { q: "What country does Champagne legally have to come from?", a: "France" },
    { q: "What is the most popular pizza topping in America?", a: "Pepperoni" },
    { q: "What nut is used to make marzipan?", a: "Almonds" },
    { q: "What fish is used in a traditional Caesar salad dressing?", a: "Anchovies" },
    { q: "What is the Japanese word for raw fish over rice?", a: "Nigiri" },
    { q: "What gives red wine its color?", a: "Grape skins" },
    { q: "How many fluid ounces are in a standard shot?", a: "1.5 oz" },
    { q: "What country produces the most olive oil?", a: "Spain" },
    { q: "What is the French term for a pastry chef?", a: "Pâtissier" },
    { q: "What is the base of a traditional Hollandaise sauce?", a: "Egg yolks and butter" },
    { q: "What type of pastry is a croissant?", a: "Laminated/puff pastry" },
    { q: "What country has the most UNESCO World Heritage Sites?", a: "Italy" },
    { q: "What country has the most pyramids?", a: "Sudan" },
    { q: "What is the world's oldest fermented drink?", a: "Mead" },
    { q: "What is the most stolen food in the world?", a: "Cheese" },
    { q: "What fruit is used to make Calvados?", a: "Apple" },
    { q: "What is the main ingredient in a traditional paella?", a: "Saffron rice" },
    { q: "Which country invented nachos?", a: "Mexico" },
  ],
  "Pop Culture & History": [
    { q: "Who painted the Mona Lisa?", a: "Leonardo da Vinci" },
    { q: "What year did the Titanic sink?", a: "1912" },
    { q: "Who was the first man to walk on the moon?", a: "Neil Armstrong" },
    { q: "In what year did World War II end?", a: "1945" },
    { q: "What is the longest wall in the world?", a: "Great Wall of China" },
    { q: "Who wrote Romeo and Juliet?", a: "William Shakespeare" },
    { q: "What year did the Berlin Wall fall?", a: "1989" },
    { q: "What country did the Renaissance begin in?", a: "Italy" },
    { q: "Who was the first US president?", a: "George Washington" },
    { q: "What empire built the Colosseum?", a: "Roman Empire" },
    { q: "What year did Apple release the first iPhone?", a: "2007" },
    { q: "Who directed Jurassic Park?", a: "Steven Spielberg" },
    { q: "What band was Freddie Mercury the lead singer of?", a: "Queen" },
    { q: "Which TV show features the Iron Throne?", a: "Game of Thrones" },
    { q: "What is the best-selling video game of all time?", a: "Minecraft" },
    { q: "Who wrote the Harry Potter series?", a: "J.K. Rowling" },
    { q: "What country invented the Olympics?", a: "Greece" },
    { q: "What sport is played at Wimbledon?", a: "Tennis" },
    { q: "How many rings are on the Olympic flag?", a: "5" },
    { q: "Who holds the record for most Olympic gold medals?", a: "Michael Phelps" },
    { q: "What year did the first Super Bowl take place?", a: "1967" },
    { q: "How many players are on a basketball team on the court?", a: "5" },
    { q: "What country won the 2018 FIFA World Cup?", a: "France" },
    { q: "Who was known as 'The Greatest' in boxing?", a: "Muhammad Ali" },
    { q: "What sport uses a puck?", a: "Ice hockey" },
    { q: "How many points is a touchdown worth in football?", a: "6" },
    { q: "What is the diameter of a basketball hoop in inches?", a: "18 inches" },
    { q: "What team has won the most Super Bowls?", a: "New England Patriots / Kansas City Chiefs (tied at 6)" },
    { q: "What is the fastest sport in the world?", a: "Badminton" },
    { q: "Who was the first American to orbit Earth?", a: "John Glenn" },
  ],
}

const ALL_TRIVIA = Object.values(TRIVIA_CATEGORIES).flat()

const SPY_CATEGORIES = {
  "Christmas": ["Santa Claus","Christmas Tree","Candy Cane","Rudolph","Mistletoe","Eggnog","Christmas Stocking","Ugly Sweater","Wreath","Gingerbread Man"],
  "Dessert": ["Tiramisu","Crème Brûlée","Chocolate Cake","Cheesecake","Churros","Ice Cream","Cannoli"],
  "Jobs": ["Surgeon","Air Traffic Controller","Bomb Disposal Expert","Submarine Captain","Astronaut","Rodeo Clown","Ventriloquist","Zookeeper","Football Coach","Private Investigator"],
  "At the Beach": ["Lifeguard","Sunscreen","Sandcastle","Seagull","Beach Umbrella","Jellyfish","Crab","Surf Instructor"],
  "At a Wedding": ["Best Man","Flower Girl","Open Bar","Bouquet Toss","Father-Daughter Dance","Wedding Cake","Ring Bearer","Photobooth","DJ"],
  "Wild West": ["Sheriff","Saloon","Tumbleweed","Wanted Poster","Lasso","Campfire","Revolver","Cactus"],
  "Halloween": ["Vampire","Witch","Jack-o-Lantern","Candy Corn","Haunted House","Zombie","Black Cat","Cauldron","Skeleton","Full Moon"],
  "Airport": ["TSA Agent","Carry-On Bag","Boarding Pass","Middle Seat","Delayed Flight","Lost Luggage","Customs","Airport Lounge","Jet Lag","Security Line"],
  "Thanksgiving": ["Turkey","Gravy Boat","Cranberry Sauce","Stuffing","Pumpkin Pie","Green Bean Casserole","Drunk Uncle","Folding Table","Nap","Leftovers"],
  "At a Bar": ["Bartender","Happy Hour","Jukebox","Pool Table","Last Call","Tab","Bouncer","Trivia Night","Bar Fight","Karaoke"],
  "Space": ["Black Hole","Space Shuttle","Astronaut Ice Cream","Meteorite","Space Suit","Moon Rover","Nebula","Satellite","Gravity Boot","Tang"],
  "The Ranch": ["Ranch Water","ALP Can","Golf Sim","Soufflé","Fire Pit","Luca","Boot","Argi's Chair","The Rodeo","Ranch Gang"],
  "Hospital": ["Surgeon","Hospital Gown","Defibrillator","Stethoscope","Waiting Room","MRI Machine","Jello"],
  "Gym": ["Personal Trainer","Protein Shake","Bench Press","Locker Room","Treadmill","Spotter","Mirror Selfie","Sauna"],
  "Movie Theater": ["Popcorn","Trailers","Back Row","Usher","Recliner Seat","Candy","Talker","Projector","Sneak-In Snacks","End Credits"],
  "Camping": ["Tent","S'mores","Bear Spray","Sleeping Bag","Campfire","Headlamp","Trail Mix","Bug Spray","Canoe","Outhouse"],
  "New Year's Eve": ["Champagne","Countdown","Ball Drop","Party Hat","Midnight Kiss","Fireworks","Designated Driver","Resolution"],
  "Fast Food": ["Drive-Thru","Happy Meal","Secret Menu","Dipping Sauce","Soft Serve","Dollar Menu","Free Refills"],
  "Boating": ["Life Jacket","Anchor","Fishing Rod","Boat Horn","Wake Board","Cooler","Dock","Sunscreen","Captain's Hat","Boat Engine"],
  "Lake House": ["Boat","Cigar","Alps","Hammock","Lake","Bonfire","Fishing","Sunrise","Porch"],
  "Rodeo": ["Bull Rider","Clown","Lasso","Buckle","Wrangler","Bronco","Gate","Arena"],
  "Tailgate": ["Cornhole","Koozie","Grill","Tailgate","Folding Chair","Team Jersey","Parking Lot","Generator","Megaphone","Face Paint"],
}

function shuffle(arr) {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

// Smart picker: avoids recently used prompts using a ref-based history
function pickFresh(pool, usedRef, count) {
  // Filter out recently used (up to half the pool)
  const maxHistory = Math.floor(pool.length / 2)
  const used = usedRef.current || []
  const fresh = pool.filter(p => !used.includes(p))
  const source = fresh.length >= count ? fresh : pool
  const picked = shuffle(source).slice(0, count)
  // Update history
  usedRef.current = [...used, ...picked].slice(-maxHistory)
  return picked
}

const quotes = [
  { text: "If it ain't broke, hit it harder.", author: "Every cowboy ever" },
  { text: "Not my horse, not my rodeo, not my problem.", author: "Unknown rancher" },
  { text: "Lord give me patience, because if you give me strength I'm gonna need bail money.", author: "Your mom" },
  { text: "Some days you're the bull. Most days you're the fence.", author: "Old rodeo wisdom" },
  { text: "If common sense was lard, some folks couldn't grease a skillet.", author: "Southern proverb" },
  { text: "Now we're cooking with grease.", author: "Jesse Chinchar" },
  { text: "Life is short. Buy the boots.", author: "Every Texan" },
  { text: "I was born ready. I just wasn't born on time.", author: "Late cowboy" },
  { text: "Behind every great man is a woman rolling her eyes.", author: "Historical fact" },
  { text: "If you think adventure is dangerous, try routine — it's lethal.", author: "Paulo Coelho" },
  { text: "The road to success is always under construction.", author: "Lily Tomlin" },
  { text: "I've got the body of a god. Unfortunately it's Buddha.", author: "Billy Connolly" },
  { text: "I was not designed to wake up before the chickens.", author: "City folk, lost" },
  { text: "The lake doesn't care what you did at the office.", author: "Dock wisdom" },
  { text: "We don't need an occasion. That's what lake houses are for.", author: "Standing invitation" },
  { text: "The best therapy is a truck, a dirt road, and a good playlist.", author: "Southern prescription" },
  { text: "You can take the boy out of Georgia, but you can't take the Georgia out of the boy.", author: "Peach state proverb" },
  { text: "Sweet tea is not a drink. It's a lifestyle.", author: "Every Georgian" },
  { text: "We don't dial 911 down here. We handle it.", author: "Rural logic" },
  { text: "Bless your heart is not a compliment. Act accordingly.", author: "Southern translation guide" },
  { text: "The only thing better than one fire pit is two fire pits.", author: "Ranch math" },
  { text: "Mud on the boots means the day was well spent.", author: "Ranch debrief" },
  { text: "Life moves slower down here. That's not a bug, that's a feature.", author: "Southern FAQ" },
  { text: "If you ain't first, you're last. But honestly, last place at the ranch ain't bad either.", author: "Revised Ricky Bobby" },
  { text: "We stay up late not because we have to but because it's too good to stop.", author: "Fire pit constitution" },
  { text: "Nothing sobers you up faster than backing a boat into the dock with everyone watching.", author: "Captain's memoir" },
]
const quote = quotes[Math.floor(Math.random() * quotes.length)]

// ── SOUNDS ───────────────────────────────────────────────────────────────────
function makeCtx() { return new (window.AudioContext || window.webkitAudioContext)() }
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
    const ctx = makeCtx(); const osc = ctx.createOscillator(); const gain = ctx.createGain()
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
  const [categoryChoice, setCategoryChoice] = useState("all")
  const [questions, setQuestions] = useState(null)
  const [index, setIndex] = useState(0)
  const [revealed, setRevealed] = useState(false)
  const [score, setScore] = useState({ correct: 0, wrong: 0 })
  const [history, setHistory] = useState([])
  const [phase, setPhase] = useState("setup")

  const startTrivia = () => {
    const pool = categoryChoice === "all"
      ? shuffle(ALL_TRIVIA)
      : shuffle(TRIVIA_CATEGORIES[categoryChoice] || ALL_TRIVIA)
    setQuestions(pool); setIndex(0); setRevealed(false)
    setScore({ correct: 0, wrong: 0 }); setHistory([])
    setPhase("playing"); playWhoosh()
  }

  if (phase === "setup") return (
    <div className="gameWrapper">
      <div className="card tenButCard">
        <div className="cardLabel">★ Trivia ★</div>
        <div className="tenButSetup" style={{marginBottom:"16px"}}>Pick a category</div>
        <div className="triviaCategoryGrid">
          {["all", ...Object.keys(TRIVIA_CATEGORIES)].map(cat => (
            <button key={cat}
              className={`triviaCategoryBtn${categoryChoice === cat ? " triviaCategoryActive" : ""}`}
              onClick={() => { playClick(); setCategoryChoice(cat) }}>
              {cat === "all" ? "All Categories" : cat}
            </button>
          ))}
        </div>
        <button className="startBtn" style={{marginTop:"16px"}} onClick={startTrivia}>Start Trivia</button>
      </div>
      <button className="backBtnBottom" onClick={() => { playPop(); onBack() }}>← Back to Menu</button>
    </div>
  )

  if (!questions) return null
  const current = questions[index]
  const markAnswer = (correct) => {
    const newScore = { ...score, [correct ? "correct" : "wrong"]: score[correct ? "correct" : "wrong"] + 1 }
    const newHistory = [...history, { q: current.q, a: current.a, correct }]
    setScore(newScore); setHistory(newHistory)
    if (index + 1 >= questions.length) { playFinal(); setPhase("results") }
    else { correct ? playYes() : playNo(); setIndex(index + 1); setRevealed(false) }
  }

  if (phase === "results") return (
    <div className="gameWrapper">
      <div className="card">
        <div className="resultsTitle">Trivia Results</div>
        <div className="resultsSubtitle">★ How smart are ya, partner? ★</div>
        <div className="tenButScore">
          <div className="tenButScoreBox tenButYesBox"><div className="tenButScoreNum">{score.correct}</div><div className="tenButScoreLabel">Correct</div></div>
          <div className="tenButScoreBox tenButNoBox"><div className="tenButScoreNum">{score.wrong}</div><div className="tenButScoreLabel">Wrong</div></div>
        </div>
        {history.map((h, i) => (
          <div key={i} className={`tenButResultRow ${h.correct ? "tenButResultYes" : "tenButResultNo"}`}>
            <span className="tenButResultIcon">{h.correct ? "✓" : "✗"}</span>
            <span className="tenButResultText"><strong>{h.q}</strong><br />{h.a}</span>
          </div>
        ))}
        <div className="bottomButtons">
          <button className="replayBtn" onClick={() => { playRideAgain(); setPhase("setup"); setQuestions(null) }}>Play Again</button>
          <button className="replayBtn replayBtnSecondary" onClick={() => { playPop(); onBack() }}>Back</button>
        </div>
      </div>
    </div>
  )

  return (
    <div className="gameWrapper">
      <div className="progressBar"><div className="progressFill" style={{ width: `${(index / questions.length) * 100}%` }} /></div>
      <p className="howto">Read the question out loud — then reveal the answer!</p>
      <div className="card tenButCard">
        <div className="cardLabel">★ Trivia ★</div>
        <div className="promptNumber">Question {index + 1} of {questions.length}</div>
        <div className="tenButPrompt" style={{ fontSize: "clamp(16px, 4.5vw, 26px)" }}>{current.q}</div>
      </div>
      {!revealed ? (
        <button className="startBtn" onClick={() => { playClick(); setRevealed(true) }}>Reveal Answer</button>
      ) : (
        <>
          <div className="card" style={{ textAlign: "center", marginBottom: "14px" }}>
            <div className="cardLabel">★ Answer ★</div>
            <div className="tenButPrompt" style={{ fontSize: "clamp(18px, 5vw, 30px)", color: "var(--rosewood)" }}>{current.a}</div>
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
    if (index + 1 >= prompts.length) { playFinal(); setPhase("results") }
    else { choice === "yes" ? playYes() : playNo(); setIndex(index + 1) }
  }
  const yesCount = answers.filter(a => a.answer === "yes").length
  const noCount = answers.filter(a => a.answer === "no").length
  if (phase === "results") return (
    <div className="gameWrapper">
      <div className="card">
        <div className="resultsTitle">Your Verdict</div>
        <div className="resultsSubtitle">★ Still a yes or a hard no? ★</div>
        <div className="tenButScore">
          <div className="tenButScoreBox tenButYesBox"><div className="tenButScoreNum">{yesCount}</div><div className="tenButScoreLabel">Still a Yes</div></div>
          <div className="tenButScoreBox tenButNoBox"><div className="tenButScoreNum">{noCount}</div><div className="tenButScoreLabel">Hard No</div></div>
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
  return (
    <div className="gameWrapper">
      <div className="progressBar"><div className="progressFill" style={{ width: `${(index / prompts.length) * 100}%` }} /></div>
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

// ── SPY GAME ──────────────────────────────────────────────────────────────────
function SpyGame({ onBack }) {
  const [phase, setPhase] = useState("setup")
  const [playerNames, setPlayerNames] = useState(["", "", "", "", ""])
  const [category, setCategory] = useState("")
  const [chosenCategory, setChosenCategory] = useState("random")
  const [item, setItem] = useState("")
  const [spyIndex, setSpyIndex] = useState(null)
  const [revealIndex, setRevealIndex] = useState(0)
  const [currentReveal, setCurrentReveal] = useState(null)
  const [spyGuess, setSpyGuess] = useState("")
  const [gameResult, setGameResult] = useState(null)
  const [votedSpy, setVotedSpy] = useState(null)
  const validPlayers = playerNames.filter(n => n.trim().length > 0)
  const startGame = () => {
    if (validPlayers.length < 3) return
    const cats = Object.keys(SPY_CATEGORIES)
    const chosenCat = chosenCategory === "random" ? cats[Math.floor(Math.random() * cats.length)] : chosenCategory
    const items = SPY_CATEGORIES[chosenCat]
    const chosenItem = items[Math.floor(Math.random() * items.length)]
    const spy = Math.floor(Math.random() * validPlayers.length)
    setCategory(chosenCat); setItem(chosenItem); setSpyIndex(spy)
    setRevealIndex(0); setCurrentReveal(null); setPhase("reveal"); playWhoosh()
  }
  const handleRevealTap = () => {
    if (currentReveal === null) { setCurrentReveal(revealIndex === spyIndex ? "spy" : "player"); playClick() }
    else {
      setCurrentReveal(null)
      if (revealIndex + 1 >= validPlayers.length) { setPhase("playing"); playFinal() }
      else { setRevealIndex(revealIndex + 1) }
    }
  }
  const handleVote = (idx) => {
    setVotedSpy(idx)
    if (idx === spyIndex) { setPhase("spyGuess"); playYes() }
    else { setGameResult("spyEscaped"); setPhase("results"); playNo() }
  }
  const handleSpyGuess = () => {
    const guess = spyGuess.trim().toLowerCase()
    const correct = item.toLowerCase()
    setGameResult(guess === correct || correct.includes(guess) || guess.includes(correct.split(" ")[0].toLowerCase()) ? "spyGuessedRight" : "spyCaught")
    setPhase("results"); playFinal()
  }
  const resetGame = () => {
    setPhase("setup"); setPlayerNames(["", "", "", "", ""]); setCategory(""); setItem("")
    setChosenCategory("random"); setSpyIndex(null); setRevealIndex(0); setCurrentReveal(null)
    setSpyGuess(""); setGameResult(null); setVotedSpy(null)
  }
  if (phase === "setup") return (
    <div className="gameWrapper">
      <div className="card">
        <div className="cardLabel">★ Spy — Enter Players ★</div>
        <p className="howto" style={{marginBottom:"16px"}}>Add the names of everyone playing (3–10 players). Pass the phone around to reveal roles.</p>
        <div className="promptInputs">
          {playerNames.map((name, i) => (
            <div className="promptInputRow" key={i}>
              <span className="promptNumLabel">{i + 1}</span>
              <input className="promptInput" type="text" maxLength={20} placeholder={`Player ${i + 1}...`} value={name}
                onChange={e => { const next = [...playerNames]; next[i] = e.target.value; setPlayerNames(next) }} />
              {playerNames.length > 3 && (
                <button onClick={() => setPlayerNames(playerNames.filter((_, j) => j !== i))}
                  style={{background:"none",border:"none",color:"var(--rosewood)",fontSize:"18px",cursor:"pointer",padding:"0 4px"}}>✕</button>
              )}
            </div>
          ))}
        </div>
        {playerNames.length < 10 && (
          <button className="backBtnBottom" style={{marginBottom:"12px"}} onClick={() => setPlayerNames([...playerNames, ""])}>+ Add Player</button>
        )}
        <div style={{marginBottom:"14px"}}>
          <div className="cardLabel" style={{marginBottom:"8px"}}>★ Choose Category ★</div>
          <select className="spyCategorySelect" value={chosenCategory} onChange={e => setChosenCategory(e.target.value)}>
            <option value="random">Random Category</option>
            {Object.keys(SPY_CATEGORIES).sort().map(cat => <option key={cat} value={cat}>{cat}</option>)}
          </select>
        </div>
        <button className="startBtn" disabled={validPlayers.length < 3} onClick={startGame}>Deal Roles</button>
      </div>
      <button className="backBtnBottom" onClick={() => { playPop(); onBack() }}>← Back to Menu</button>
    </div>
  )
  if (phase === "reveal") {
    const playerName = validPlayers[revealIndex]
    return (
      <div className="gameWrapper">
        <div className="card tenButCard">
          <div className="cardLabel">★ Spy ★</div>
          <div className="promptNumber">{revealIndex + 1} of {validPlayers.length}</div>
          <div className="tenButSetup" style={{fontSize:"clamp(18px,5vw,28px)",marginBottom:"6px"}}>{playerName}</div>
          <p className="howto" style={{marginBottom:"16px"}}>{currentReveal === null ? "Tap below to see your role — don't show anyone else!" : "Memorize it, then tap to hide"}</p>
          {currentReveal === null ? (
            <button className="startBtn" onClick={handleRevealTap}>👁 Reveal My Role</button>
          ) : (
            <div>
              {currentReveal === "spy" ? (
                <div className="spyRevealBox spyRevealSpy">
                  <div className="spyRevealLabel">YOU ARE THE SPY</div>
                  <div className="spyRevealCategory">Category: <strong>{category}</strong></div>
                  <div className="spyRevealHint">You don't know the item — blend in!</div>
                </div>
              ) : (
                <div className="spyRevealBox spyRevealPlayer">
                  <div className="spyRevealLabel">YOU ARE NOT THE SPY</div>
                  <div className="spyRevealCategory">Category: <strong>{category}</strong></div>
                  <div className="spyRevealItem">{item}</div>
                </div>
              )}
              <button className="startBtn" style={{marginTop:"14px"}} onClick={handleRevealTap}>
                {revealIndex + 1 < validPlayers.length ? "Hide & Pass to Next Player →" : "Hide & Start Game"}
              </button>
            </div>
          )}
        </div>
      </div>
    )
  }
  if (phase === "playing") return (
    <div className="gameWrapper">
      <div className="card">
        <div className="cardLabel">★ Spy — In Progress ★</div>
        <div className="spyPlayingCategory">Category: <strong>{category}</strong></div>
        <p className="howto" style={{margin:"14px 0"}}>Go around asking each other questions. Try to spot the spy — they only know the category!</p>
        <div className="spyPlayerList">{validPlayers.map((name, i) => <div key={i} className="spyPlayerChip">{name}</div>)}</div>
        <div className="divider" style={{margin:"18px 0"}}>✦ ready to vote? ✦</div>
        <p className="howto" style={{marginBottom:"12px"}}>Who do you think is the spy?</p>
        <div className="spyVoteButtons">{validPlayers.map((name, i) => <button key={i} className="spyVoteBtn" onClick={() => handleVote(i)}>{name}</button>)}</div>
      </div>
      <button className="backBtnBottom" onClick={() => { playPop(); resetGame() }}>← Start Over</button>
    </div>
  )
  if (phase === "spyGuess") return (
    <div className="gameWrapper">
      <div className="card tenButCard">
        <div className="cardLabel">★ Spy Caught! ★</div>
        <div className="tenButSetup">The group voted for</div>
        <div className="tenButPrompt" style={{color:"var(--rosewood)"}}>{validPlayers[votedSpy]}</div>
        <p className="howto" style={{margin:"14px 0"}}>{validPlayers[spyIndex]}, you were caught! Guess the item to steal the win.</p>
        <p className="slotsLabel" style={{marginBottom:"8px"}}>Category: <strong>{category}</strong></p>
        <input className="promptInput" type="text" placeholder="Your guess..." value={spyGuess}
          onChange={e => setSpyGuess(e.target.value)} style={{marginBottom:"14px", width:"100%"}} />
        <button className="startBtn" disabled={!spyGuess.trim()} onClick={handleSpyGuess}>Submit Guess</button>
      </div>
    </div>
  )
  if (phase === "results") {
    const messages = {
      spyCaught: { title: "Spy Caught!", sub: "The group wins!", color: "var(--rosewood)" },
      spyGuessedRight: { title: "Spy Wins!", sub: `${validPlayers[spyIndex]} guessed it!`, color: "var(--terra-dark)" },
      spyEscaped: { title: "Spy Escapes!", sub: `${validPlayers[spyIndex]} was the spy all along!`, color: "var(--terra-dark)" },
    }
    const msg = messages[gameResult]
    return (
      <div className="gameWrapper">
        <div className="card tenButCard">
          <div className="resultsTitle" style={{color: msg.color}}>{msg.title}</div>
          <div className="resultsSubtitle">{msg.sub}</div>
          <div className="spyResultDetails">
            <div className="spyResultRow"><span>Category</span><strong>{category}</strong></div>
            <div className="spyResultRow"><span>The Item</span><strong>{item}</strong></div>
            <div className="spyResultRow"><span>The Spy</span><strong>{validPlayers[spyIndex]}</strong></div>
            {spyGuess && <div className="spyResultRow"><span>Spy's Guess</span><strong>{spyGuess}</strong></div>}
          </div>
          <div className="bottomButtons">
            <button className="replayBtn" onClick={() => { playWhoosh(); startGame() }}>Play Again</button>
            <button className="replayBtn replayBtnSecondary" onClick={() => { playPop(); resetGame() }}>New Players</button>
          </div>
        </div>
        <button className="backBtnBottom" onClick={() => { playPop(); onBack() }}>← Back to Menu</button>
      </div>
    )
  }
  return null
}

// ── SCREENS ──────────────────────────────────────────────────────────────────
function MenuScreen({ onRandom, onCustom, onTenBut, onTrivia, onSpy }) {
  const openWeather = () => {
    playWhoosh()
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent)
    if (isMobile) {
      window.location.href = "weather://"
      setTimeout(() => { window.open("https://forecast.weather.gov/MapClick.php?CityName=Clearwater&state=FL&site=TBW&textField1=27.9659&textField2=-82.8001", "_blank") }, 500)
    } else {
      window.open("https://forecast.weather.gov/MapClick.php?CityName=Clearwater&state=FL&site=TBW&textField1=27.9659&textField2=-82.8001", "_blank")
    }
  }
  const games = [
    {
      name: "Blind Ratings",
      desc: "Rank 10 prompts from worst to best — blindly. No take-backs.",
      action: (
        <div className="gameCardButtons">
          <button className="gameCardBtnSub" onClick={() => { playPop(); onCustom() }}>Custom</button>
          <button className="gameCardBtn" onClick={() => { playWhoosh(); onRandom() }}>Randomize</button>
        </div>
      )
    },
    { name: "Spy", desc: "One person only knows the category. Find them before they escape.", action: <button className="gameCardBtn" onClick={() => { playWhoosh(); onSpy() }}>Find the Spy</button> },
    { name: "They're A 10 But...", desc: "Red flags vs good looks. You be the judge.", action: <button className="gameCardBtn" onClick={() => { playWhoosh(); onTenBut() }}>Play Now</button> },
    { name: "Trivia", desc: "Choose a category and test your knowledge out loud.", action: <button className="gameCardBtn" onClick={() => { playWhoosh(); onTrivia() }}>Let's Go</button> },
    { name: "Guess The Weather", desc: "Check the Clearwater forecast. Was your gut right?", action: <button className="gameCardBtn" onClick={openWeather}>Open Forecast</button> },
    { name: "New Game Coming Soon", desc: "Something fun is on the way. Stay tuned, partner.", action: <div className="gameCardComingSoon">Coming Soon</div> },
  ]
  return (
    <div>
      <div className="quoteOfDay">
        <div className="quoteOfDayLabel">★ Quote of the Day ★</div>
        <span className="quoteOfDayText">"{quote.text}"</span>
        <div className="quoteOfDayAuthor">— {quote.author}</div>
      </div>
      <div className="gameSectionLabel">✦ Pick Your Game ✦</div>
      <div className="gamesGrid">
        {games.map((g, i) => (
          <div key={i} className="gameCard">
            <div className="gameCardName">{g.name}</div>
            <div className="gameCardDesc">{g.desc}</div>
            {g.action}
          </div>
        ))}
      </div>
    </div>
  )
}

function CustomScreen({ onBack, onStart }) {
  const [inputs, setInputs] = useState(Array(10).fill(""))
  const handleChange = (i, val) => { const next = [...inputs]; next[i] = val; setInputs(next) }
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
              <input className="promptInput" type="text" maxLength={200} placeholder={`Prompt #${i + 1}...`} value={val}
                onChange={e => handleChange(i, e.target.value)} />
            </div>
          ))}
        </div>
        <button className="startBtn" disabled={!allFilled} onClick={() => { playWhoosh(); onStart(inputs.map(v => v.trim())) }}>Deal the Cards</button>
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
      <div className="progressBar"><div className="progressFill" style={{ width: `${filled * 10}%` }} /></div>
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
          {slots.map((item, i) => <button key={i} className="ratingBtn" disabled={item !== null} onClick={() => onPick(i)}>{i + 1}</button>)}
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

  // Anti-repeat history refs — persist across rounds within the same session
  const usedGoodRef = useRef([])
  const usedBadRef = useRef([])

  const startRandom = useCallback(() => {
    const good = pickFresh(GOOD_PROMPTS, usedGoodRef, 5)
    const bad = pickFresh(BAD_PROMPTS, usedBadRef, 5)
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
    if (mode === "custom" && customPrompts.length > 0) {
      setPrompts(shuffle(customPrompts))
    } else {
      const good = pickFresh(GOOD_PROMPTS, usedGoodRef, 5)
      const bad = pickFresh(BAD_PROMPTS, usedBadRef, 5)
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
        {phase === "menu" && <MenuScreen onRandom={startRandom} onCustom={startCustomEntry} onTenBut={() => setPhase("tenBut")} onTrivia={() => setPhase("trivia")} onSpy={() => setPhase("spy")} />}
        {phase === "custom" && <CustomScreen onBack={goMenu} onStart={launchCustom} />}
        {phase === "playing" && <GameScreen prompts={prompts} slots={slots} currentIndex={currentIndex} onPick={pickSlot} onBack={goMenu} />}
        {phase === "results" && <ResultsScreen slots={slots} onPlayAgain={playAgain} onChangeMode={goMenu} />}
        {phase === "tenBut" && <TenButGame onBack={goMenu} />}
        {phase === "trivia" && <TriviaGame onBack={goMenu} />}
        {phase === "spy" && <SpyGame onBack={goMenu} />}
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
