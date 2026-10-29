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
 *    weapon      gun name, e.g. "M4A1"
 *    category    e.g. "Assault Rifle", "SMG" (each value becomes a filter chip)
 *    role        e.g. "Long Range", "Close Range", "Budget"
 *    tier        "Meta", "S", "A", "B" or "C"
 *    code        the full import code exactly as the game gives it, e.g.
 *                "M4A1 Assault Rifle-Operations-6FC4II809B793ILS11ON5"
 *    attachments [{ slot, name }, ...]
 *    cost        optional, rough build price, e.g. "210K" (shown with config.currency)
 *    stats       optional, 0–100: damage, range, control, handling, stability
 *    notes       optional, a sentence or two from the streamer
 *    tags        optional, extra search words
 *    clip        optional, link to a Twitch/YouTube clip of the build
 *    featured    optional, true = shown in the big card at the top
 *    updated     "YYYY-MM-DD"
 */
window.GUN_BUILDS = {
  config: {
    name: "siingsong",
    avatar: "",                     // profile picture, e.g. "images/avatar.png" (blank = initials)
    game: "Delta Force",
    twitch: "siingsong",               // twitch.tv/<this>
    tagline: "The exact Operations loadouts I run on stream. Copy a code, import it in the Gunsmith, deploy.",
    currency: "Tekniq Alloy",        // shown after build costs
    live: false,                    // true shows a red LIVE badge in the header
    showSampleNotice: true,         // set to false once real builds are in
    socials: [
      { label: "Twitch", url: "https://www.twitch.tv/siingsong" },
      { label: "YouTube", url: "https://www.youtube.com/@SiingsongTTV" },
      { label: "TikTok", url: "https://www.tiktok.com/@siingsongttv" },
      { label: "Discord", url: "https://discord.com/" }
    ]
  },

  builds: [
    {
      id: "m4a1-long-range",
      weapon: "M4A1",
      category: "Assault Rifle",
      role: "Long Range",
      tier: "Meta",
      code: "M4A1 Assault Rifle-Operations-6SAMPLE09B793ILS11ON5",
      cost: "310K",
      featured: true,
      updated: "2026-10-27",
      attachments: [
        { slot: "Optic", name: "Panoramic Red Dot" },
        { slot: "Muzzle", name: "Spiral Fire Flash Hider" },
        { slot: "Barrel", name: "AR Gabriel Long Barrel Combo" },
        { slot: "Handguard", name: "Ranger Handguard" },
        { slot: "Foregrip", name: "Folding Grip" },
        { slot: "Rear Grip", name: "Phantom Rear Grip" },
        { slot: "Stock", name: "416 Light Stock" }
      ],
      stats: { damage: 68, range: 84, control: 86, handling: 62, stability: 80 },
      notes: "My main rifle. Barely any recoil out to 60m, so it wins the long fights across open ground.",
      tags: ["laser beam", "no recoil"]
    },
    {
      id: "vector-close",
      weapon: "Vector",
      category: "SMG",
      role: "Close Range",
      tier: "Meta",
      code: "Vector Submachine Gun-Operations-6SAMPLE8073PLD67R4E7P1",
      cost: "240K",
      updated: "2026-10-25",
      attachments: [
        { slot: "Optic", name: "Panoramic Red Dot" },
        { slot: "Muzzle", name: "Silent Suppressor" },
        { slot: "Foregrip", name: "Secret Order Bevel Foregrip" },
        { slot: "Magazine", name: "Extended Magazine" },
        { slot: "Stock", name: "Lightweight Stock" }
      ],
      stats: { damage: 60, range: 36, control: 74, handling: 92, stability: 66 },
      notes: "Building clears on Zero Dam. Suppressed so you can push without giving away your spot.",
      tags: ["zero dam", "indoors", "suppressed"]
    },
    {
      id: "awm-overwatch",
      weapon: "AWM",
      category: "Sniper Rifle",
      role: "Long Range",
      tier: "S",
      code: "AWM Sniper Rifle-Operations-6SAMPLE2PL8XB2XC7Q10",
      cost: "380K",
      updated: "2026-10-22",
      attachments: [
        { slot: "Optic", name: "8x Variable Scope" },
        { slot: "Muzzle", name: "Silent Suppressor" },
        { slot: "Barrel", name: "Long Barrel" },
        { slot: "Stock", name: "Precision Stock" },
        { slot: "Magazine", name: "Fast Magazine" }
      ],
      stats: { damage: 96, range: 96, control: 58, handling: 34, stability: 72 },
      notes: "Watch the extract from a ridge and pick people off. One body shot plus a follow-up drops most armor.",
      tags: ["one shot", "overwatch"]
    },
    {
      id: "ci19-all-rounder",
      weapon: "CI-19",
      category: "Assault Rifle",
      role: "Mid Range",
      tier: "S",
      code: "CI-19 Assault Rifle-Operations-6SAMPLEK073PI62OT9AFJ2",
      cost: "195K",
      updated: "2026-10-26",
      attachments: [
        { slot: "Optic", name: "Panoramic Red Dot" },
        { slot: "Muzzle", name: "Spiral Fire Flash Hider" },
        { slot: "Handguard", name: "KC Hound Handguard" },
        { slot: "Foregrip", name: "Folding Grip" },
        { slot: "Magazine", name: "Badger Small Mag Assist" },
        { slot: "Rear Grip", name: "Phantom Rear Grip" }
      ],
      stats: { damage: 70, range: 70, control: 76, handling: 70, stability: 74 },
      notes: "Does everything well. If you only learn one Operations gun, make it this one.",
      tags: ["all rounder"]
    },
    {
      id: "k416-budget",
      weapon: "K416",
      category: "Assault Rifle",
      role: "Budget",
      tier: "A",
      code: "K416 Assault Rifle-Operations-6SAMPLE10B4HWE8QK4N6",
      cost: "85K",
      updated: "2026-10-18",
      attachments: [
        { slot: "Optic", name: "Red Dot Sight" },
        { slot: "Muzzle", name: "Muzzle Brake" },
        { slot: "Handguard", name: "Ranger Handguard" },
        { slot: "Foregrip", name: "Vertical Foregrip" }
      ],
      stats: { damage: 66, range: 66, control: 70, handling: 68, stability: 64 },
      notes: "Cheap kit for when the stash is low. Fine to lose, still wins fights.",
      tags: ["cheap", "low risk"]
    },
    {
      id: "smg45-close",
      weapon: "SMG-45",
      category: "SMG",
      role: "Close Range",
      tier: "Meta",
      code: "SMG-45 Submachine Gun-Operations-6SAMPLE3BQW7LP5V2Q1",
      cost: "150K",
      updated: "2026-10-28",
      attachments: [
        { slot: "Optic", name: "Panoramic Red Dot" },
        { slot: "Muzzle", name: "Compensator" },
        { slot: "Foregrip", name: "Angled Foregrip" },
        { slot: "Magazine", name: "Extended Magazine" },
        { slot: "Stock", name: "Lightweight Stock" }
      ],
      stats: { damage: 72, range: 40, control: 70, handling: 88, stability: 62 },
      notes: "Hard-hitting SMG for third-partying fights around the loot rooms.",
      tags: ["aggressive", "third party"]
    },
    {
      id: "m7-long-range",
      weapon: "M7",
      category: "Battle Rifle",
      role: "Long Range",
      tier: "A",
      code: "M7 Battle Rifle-Operations-6SAMPLE8MNC1WS6R3Q01",
      cost: "270K",
      updated: "2026-10-12",
      attachments: [
        { slot: "Optic", name: "3x Scope" },
        { slot: "Muzzle", name: "Muzzle Brake" },
        { slot: "Barrel", name: "Long Barrel" },
        { slot: "Handguard", name: "KC Hound Handguard" },
        { slot: "Foregrip", name: "Vertical Foregrip" },
        { slot: "Stock", name: "Heavy Stock" }
      ],
      stats: { damage: 86, range: 88, control: 60, handling: 46, stability: 70 },
      notes: "Fewer shots to kill than any rifle, but you need to control it. Shreds heavy armor.",
      tags: ["hard hitting"]
    },
    {
      id: "qcq171-budget",
      weapon: "QCQ171",
      category: "SMG",
      role: "Budget",
      tier: "B",
      code: "QCQ171 Submachine Gun-Operations-6SAMPLE5JRT6CX9K11",
      cost: "60K",
      updated: "2026-10-09",
      attachments: [
        { slot: "Optic", name: "Red Dot Sight" },
        { slot: "Muzzle", name: "Silent Suppressor" },
        { slot: "Magazine", name: "Extended Magazine" },
        { slot: "Stock", name: "Lightweight Stock" }
      ],
      stats: { damage: 54, range: 34, control: 78, handling: 86, stability: 70 },
      notes: "Budget runs and new accounts. Easy to control and it costs almost nothing.",
      tags: ["cheap", "beginner"]
    }
  ]
};
