/*
 * ─────────────────────────────────────────────────────────────
 *  EDIT THIS FILE to change the site. No other file needs touching.
 * ─────────────────────────────────────────────────────────────
 *
 *  config  – streamer name, Twitch channel, socials
 *  builds  – one object per loadout. Copy an existing one and change it.
 *
 *  Build fields
 *    id          unique, lowercase letters/numbers/hyphens (used in share links)
 *    weapon      gun name
 *    game        e.g. "Warzone", "Multiplayer" (each value becomes a tab)
 *    category    e.g. "Assault Rifle", "SMG" (each value becomes a filter chip)
 *    role        e.g. "Long Range", "Close Range", "Sniper Support"
 *    tier        "Meta", "S", "A", "B" or "C"
 *    code        the in-game build code
 *    attachments [{ slot, name }, ...]
 *    stats       optional, 0–100: damage, range, accuracy, mobility, handling
 *    notes       optional, a sentence or two from the streamer
 *    tags        optional, extra search words
 *    clip        optional, link to a Twitch/YouTube clip of the build
 *    featured    optional, true = shown in the big card at the top
 *    updated     "YYYY-MM-DD"
 */
window.GUN_BUILDS = {
  config: {
    name: "YourStreamer",
    twitch: "yourchannel",          // twitch.tv/<this>
    tagline: "The exact loadouts I run on stream. Copy a code, paste it in game, drop in.",
    live: false,                    // true shows a red LIVE badge in the header
    showSampleNotice: true,         // set to false once real builds are in
    socials: [
      { label: "Twitch", url: "https://www.twitch.tv/yourchannel" },
      { label: "YouTube", url: "https://www.youtube.com/" },
      { label: "X", url: "https://x.com/" },
      { label: "Discord", url: "https://discord.com/" }
    ]
  },

  builds: [
    {
      id: "xm4-long-range",
      weapon: "XM4",
      game: "Warzone",
      category: "Assault Rifle",
      role: "Long Range",
      tier: "Meta",
      code: "A01-7XKQ2-R5T1M-11",
      featured: true,
      updated: "2026-10-27",
      attachments: [
        { slot: "Muzzle", name: "Compensator" },
        { slot: "Barrel", name: "Long Barrel" },
        { slot: "Underbarrel", name: "Vertical Foregrip" },
        { slot: "Magazine", name: "Extended Mag II" },
        { slot: "Rear Grip", name: "Commando Grip" },
        { slot: "Optic", name: "Kepler Microflex" }
      ],
      stats: { damage: 72, range: 88, accuracy: 84, mobility: 46, handling: 58 },
      notes: "Main long-range rifle right now. Recoil is almost flat out to 60m. Pair it with an SMG for close fights.",
      tags: ["laser beam", "no recoil"]
    },
    {
      id: "kompakt-92-close",
      weapon: "Kompakt 92",
      game: "Warzone",
      category: "SMG",
      role: "Close Range",
      tier: "Meta",
      code: "S07-4RKQ1-ZM8P2-11",
      updated: "2026-10-25",
      attachments: [
        { slot: "Muzzle", name: "Suppressor" },
        { slot: "Barrel", name: "Short Barrel" },
        { slot: "Laser", name: "Target Laser" },
        { slot: "Magazine", name: "Extended Mag I" },
        { slot: "Stock", name: "Infiltrator Stock" }
      ],
      stats: { damage: 64, range: 38, accuracy: 62, mobility: 90, handling: 86 },
      notes: "Fastest kill time up close. Sprint-to-fire is quick enough to win most corner fights.",
      tags: ["movement", "aggressive"]
    },
    {
      id: "lr-762-sniper",
      weapon: "LR 7.62",
      game: "Warzone",
      category: "Sniper",
      role: "Sniper Support",
      tier: "S",
      code: "R12-9PLM3-B2XC7-10",
      updated: "2026-10-22",
      attachments: [
        { slot: "Muzzle", name: "Monolithic Suppressor" },
        { slot: "Barrel", name: "Heavy Barrel" },
        { slot: "Optic", name: "Variable Zoom 8x" },
        { slot: "Magazine", name: "Fast Mag" },
        { slot: "Rear Grip", name: "Quickdraw Grip" }
      ],
      stats: { damage: 92, range: 95, accuracy: 70, mobility: 34, handling: 48 },
      notes: "Two-tap marksman that keeps up with the SMG for rotations. Use it to crack plates from rooftops.",
      tags: ["marksman", "two tap"]
    },
    {
      id: "gpmg-7-anchor",
      weapon: "GPMG-7",
      game: "Warzone",
      category: "LMG",
      role: "Long Range",
      tier: "A",
      code: "L03-2HWE8-QK4N6-11",
      updated: "2026-10-18",
      attachments: [
        { slot: "Muzzle", name: "Muzzle Brake" },
        { slot: "Barrel", name: "Reinforced Barrel" },
        { slot: "Underbarrel", name: "Ranger Foregrip" },
        { slot: "Magazine", name: "Belt Box 150" },
        { slot: "Rear Grip", name: "Ergonomic Grip" },
        { slot: "Stock", name: "Balanced Stock" },
        { slot: "Optic", name: "Volzhskiy Reflex" }
      ],
      stats: { damage: 78, range: 86, accuracy: 74, mobility: 22, handling: 36 },
      notes: "For holding a building in the final circles. 150 rounds means no reloading mid-fight.",
      tags: ["endgame", "anchor"]
    },
    {
      id: "aek-973-mp",
      weapon: "AEK-973",
      game: "Multiplayer",
      category: "Assault Rifle",
      role: "Mid Range",
      tier: "S",
      code: "A09-6TYU4-HN2D9-01",
      updated: "2026-10-26",
      attachments: [
        { slot: "Muzzle", name: "Compensator" },
        { slot: "Underbarrel", name: "Vertical Foregrip" },
        { slot: "Magazine", name: "Extended Mag I" },
        { slot: "Rear Grip", name: "Quickdraw Grip" },
        { slot: "Optic", name: "Accu-Spot Reflex" }
      ],
      stats: { damage: 70, range: 66, accuracy: 72, mobility: 64, handling: 74 },
      notes: "Burst mode is the trick. Full auto is fine but burst wins every mid-range duel.",
      tags: ["burst", "ranked"]
    },
    {
      id: "jackal-pdw-mp",
      weapon: "Jackal PDW",
      game: "Multiplayer",
      category: "SMG",
      role: "Close Range",
      tier: "Meta",
      code: "S11-3BQW7-LP5V2-01",
      updated: "2026-10-28",
      attachments: [
        { slot: "Barrel", name: "Gain-Twist Barrel" },
        { slot: "Laser", name: "Steady Aim Laser" },
        { slot: "Magazine", name: "Extended Mag II" },
        { slot: "Rear Grip", name: "Commando Grip" },
        { slot: "Stock", name: "No Stock" }
      ],
      stats: { damage: 60, range: 42, accuracy: 68, mobility: 94, handling: 88 },
      notes: "Slide-cancel build. Hardpoint and Control only.",
      tags: ["slide cancel", "ranked"]
    },
    {
      id: "marine-sp-shotgun",
      weapon: "Marine SP",
      game: "Multiplayer",
      category: "Shotgun",
      role: "Close Range",
      tier: "B",
      code: "G02-8MNC1-WS6R3-01",
      updated: "2026-10-12",
      attachments: [
        { slot: "Barrel", name: "Long Barrel" },
        { slot: "Underbarrel", name: "Ranger Foregrip" },
        { slot: "Magazine", name: "Extended Tube" },
        { slot: "Ammo", name: "Slug Rounds" }
      ],
      stats: { damage: 96, range: 30, accuracy: 44, mobility: 70, handling: 60 },
      notes: "Meme build from the 24-hour stream. One-shots out to about 15m with slugs.",
      tags: ["meme", "one shot"]
    },
    {
      id: "tanto-22-sidearm",
      weapon: "Tanto .22",
      game: "Warzone",
      category: "SMG",
      role: "Close Range",
      tier: "A",
      code: "S04-5JRT6-CX9K1-11",
      updated: "2026-10-09",
      attachments: [
        { slot: "Muzzle", name: "Suppressor" },
        { slot: "Barrel", name: "Long Barrel" },
        { slot: "Magazine", name: "Extended Mag III" },
        { slot: "Stock", name: "Balanced Stock" },
        { slot: "Ammo", name: "Hollow Point" },
        { slot: "Laser", name: "Target Laser" }
      ],
      stats: { damage: 58, range: 50, accuracy: 76, mobility: 82, handling: 80 },
      notes: "Backup SMG when the Kompakt is out of the meta. More forgiving at range.",
      tags: ["burst"]
    }
  ]
};
