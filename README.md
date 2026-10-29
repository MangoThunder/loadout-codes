# Delta Force Loadouts

A static site for a streamer's Delta Force Operations build codes. It has no build step. Open `index.html` in a browser to run it.

## Add or change builds
Edit **`js/builds.js`** only.
- `config`: streamer name, Twitch channel, tagline, currency label for build costs, socials, the `live` badge, and the sample notice.
- `builds`: one object per gun. Copy an existing entry and change the fields. The comment at the top of the file explains each field.

Paste each import code exactly as the game gives it (e.g. `M4A1 Assault Rifle-Operations-...`). New weapon classes and ranges show up as filters automatically.

## Change the accent colour
In `css/styles.css`, change `--accent` (dark theme) and the `--accent` values in the two light-theme blocks.

## Put it online (free)
- **Netlify Drop**: drag the `gun-builds` folder onto app.netlify.com/drop
- **GitHub Pages**: push the folder to a repo, then turn on Pages in the repo settings
- **Vercel / Cloudflare Pages**: import the repo; no build command is needed
