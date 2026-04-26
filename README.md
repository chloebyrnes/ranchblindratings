# Ranch Blind Ratings

A western-themed blind ranking game for game night.

## Setup

```bash
npm install
npm run develop    # local dev at localhost:8000
npm run build      # production build
```

## Deploy to Netlify

1. Push this folder to a GitHub repo
2. Go to netlify.com → "Add new site" → "Import from Git"
3. Select your repo — build settings are pre-filled via netlify.toml
4. Hit Deploy!

## Adding Your Own Prompts

Open `src/pages/index.jsx` and edit the `ALL_PROMPTS` array at the top of the file.
