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
 *    tier        optional badge: "Meta", "S", "A", "B" or "C" (leave out for none)
 *    code        the full import code exactly as the game gives it, e.g.
 *                "M4A1 Assault Rifle-Operations-6FC4II809B793ILS11ON5"
 *    attachments [{ slot, name }, ...]
 *    image       optional, Gunsmith screenshot of the build, e.g. "images/guns/m4a1.webp".
 *                Adds a "View build" button that shows the full picture.
 *    calibration optional, Calibrate-screen screenshot; adds a "Calibration" button.
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
    avatar: "images/avatar.png",     // profile picture, e.g. "images/avatar.png" (blank = initials)
    game: "Delta Force",
    twitch: "siingsong",               // twitch.tv/<this>
    tagline: "The exact Operations loadouts I run on stream. Copy a code, import it in the Gunsmith, deploy.",
    currency: "Tekniq Alloy",        // shown after build costs
    live: false,                    // true shows a red LIVE badge in the header
    showSampleNotice: false,         // set to false once real builds are in
    // Promo card shown at the top instead of the featured build. Delete this block to bring the featured build back.
    promo: {
      url: "https://www.midasbuy.com/siingsong/us/buy/dfm#/pages/shop/currency",
      eyebrow: "Midasbuy top-up",
      bonus: "+35%",
      headline: "More coins",
      text: "Top up Delta Force coins on Midasbuy through siingsong's link and get 35% more.",
      button: "Get coins on Midasbuy"
    },
    socials: [
      { label: "Twitch", url: "https://www.twitch.tv/siingsong" },
      { label: "YouTube", url: "https://www.youtube.com/@SiingsongTTV" },
      { label: "TikTok", url: "https://www.tiktok.com/@siingsongttv" },
      { label: "Discord", url: "https://discord.gg/8a3A8Vbfsg" }
    ]
  },

  builds: [
    { id: "ar-57", weapon: "AR-57", category: "Assault Rifle", image: "images/guns/ar-57.webp",
      calibration: "images/guns/ar-57-calibration.webp",
      code: "AR-57 Assault Rifle-Operations (Extraction Mode)-6LIC2SK014H9D6PDMV79E" },
    { id: "as-val-ar", weapon: "AS Val", category: "Assault Rifle", image: "images/guns/as-val-ar.webp",
      calibration: "images/guns/as-val-ar-calibration.webp",
      code: "AS Val Assault Rifle-Operations (Extraction Mode)-6LFEJOG014H9D6PDMV79E" },
    { id: "k437", weapon: "K437", category: "Assault Rifle", image: "images/guns/k437.webp",
      calibration: "images/guns/k437-calibration.webp",
      code: "K437 Assault Rifle-Operations (Extraction Mode)-6LH29G00F1274DR0HHHLC" }
  ],

  // Not shown on the site: these codes have no View build or Calibration screenshot yet.
  // To bring one back, move it into "builds" above and add its image/calibration.
  waiting: [
    { id: "ci-19", weapon: "CI-19", category: "Assault Rifle",
      code: "CI-19 Assault Rifle-Operations-6KGUHHC014H9D6PDMV79E" },
    { id: "car-15", weapon: "CAR-15", category: "Assault Rifle",
      code: "CAR-15 Assault Rifle-Operations-6GV8MK404L27S72T7O8IH" },
    { id: "ptr-32", weapon: "PTR-32", category: "Assault Rifle",
      code: "PTR-32 Assault Rifle-Operations-6GV8MMC04L27S72T7O8IH" },
    { id: "g3", weapon: "G3", category: "Assault Rifle",
      code: "G3 Battle Rifle-Operations-6GU95UG014H9D6PDMV79E" },
    { id: "scar-h", weapon: "SCAR-H", category: "Assault Rifle",
      code: "SCAR-H Battle Rifle-Operations-6KR2DDS014H9D6PDMV79E" },
    { id: "ak-12", weapon: "AK-12", category: "Assault Rifle",
      code: "AK-12 Assault Rifle-Operations-6KR2DF8014H9D6PDMV79E" },
    { id: "sg552", weapon: "SG552", category: "Assault Rifle",
      code: "SG552 Assault Rifle-Operations-6GV8SBG01OANMAF97OV6I" },
    { id: "m7", weapon: "M7", category: "Assault Rifle",
      code: "M7 Battle Rifle-Operations-6KO1QD0014H9D6PDMV79E" },
    { id: "aug", weapon: "AUG", category: "Assault Rifle",
      code: "AUG Assault Rifle-Operations-6KR2DIO014H9D6PDMV79E" },
    { id: "m16a4", weapon: "M16A4", category: "Assault Rifle",
      code: "M16A4 Assault Rifle-Operations-6KR2DJO014H9D6PDMV79E" },
    { id: "k416", weapon: "K416", category: "Assault Rifle",
      code: "K416 Assault Rifle-Operations-6KOA44S014H9D6PDMV79E" },
    { id: "ash-12", weapon: "ASH-12", category: "Assault Rifle",
      code: "ASh-12 Battle Rifle-Operations-6KNE8S8014H9D6PDMV79E" },
    { id: "aks-74", weapon: "AKS-74", category: "Assault Rifle",
      code: "AKS-74 Assault Rifle-Operations-6EV8048096H0J29AJAHPA" },
    { id: "qbz95-1", weapon: "QBZ95-1", category: "Assault Rifle",
      code: "QBZ95-1 Assault Rifle-Operations-6HUF3DG014H9D6PDMV79E" },
    { id: "akm", weapon: "AKM", category: "Assault Rifle",
      code: "AKM Assault Rifle-Operations-6KO0EIK014H9D6PDMV79E" },
    { id: "cs-ak", weapon: "CS AK", category: "Assault Rifle",
      code: "AKM Assault Rifle-Operations-6GV963C01OANMAF97OV6I" },
    { id: "m4a1", weapon: "M4A1", category: "Assault Rifle",
      code: "M4A1 Assault Rifle-Operations-6KR2DOC014H9D6PDMV79E" },
    { id: "kc17", weapon: "KC17", category: "Assault Rifle",
      code: "KC-17 Assault Rifle-Operations-6KKOO34014H9D6PDMV79E" },
    { id: "mk47", weapon: "MK47", category: "Assault Rifle",
      code: "MK47 Assault Rifle-Operations-6KR2D64014H9D6PDMV79E" },
    { id: "rm277", weapon: "RM277", category: "Assault Rifle",
      code: "RM277-Operations-6KIFB4C014H9D6PDMV79E" },
    { id: "mp7", weapon: "MP7", category: "SMG",
      code: "MP7 Submachine Gun-Operations-6KIIBHC014H9D6PDMV79E" },
    { id: "vityaz", weapon: "Vityaz", category: "SMG",
      code: "Vityaz Submachine Gun-Operations-6F1B3P40A343VCRUF2MBP" },
    { id: "sr-3m", weapon: "SR-3M", category: "SMG",
      code: "SR-3M Compact Assault Rifle-Operations-6KR2E08014H9D6PDMV79E" },
    { id: "smg-45", weapon: "SMG-45", category: "SMG",
      code: "SMG-45 Submachine Gun-Operations-6F1N22S0A343VCRUF2MBP" },
    { id: "bizon", weapon: "Bizon", category: "SMG",
      code: "Bizon Submachine Gun-Operations-6G57FKO0E0H5HH0IS5EKC" },
    { id: "uzi", weapon: "UZI", category: "SMG",
      code: "UZI Submachine Gun-Operations-6G57G4G0E0H5HH0IS5EKC" },
    { id: "vector", weapon: "Vector", category: "SMG",
      code: "Vector Submachine Gun-Operations-6IU9F2C014H9D6PDMV79E" },
    { id: "p90", weapon: "P90", category: "SMG",
      code: "P90 Submachine Gun-Operations-6IU9F3G014H9D6PDMV79E" },
    { id: "mp5", weapon: "MP5", category: "SMG",
      code: "MP5 Submachine Gun-Operations-6F12U5G0A343VCRUF2MBP" },
    { id: "qcq171", weapon: "QCQ171", category: "SMG",
      code: "QCQ171 Submachine Gun-Operations-6KKPKGS014H9D6PDMV79E" },
    { id: "mk4", weapon: "MK4", category: "SMG",
      code: "MK4 Submachine Gun-Operations-6KN4OQS014H9D6PDMV79E" },
    { id: "m249", weapon: "M249", category: "LMG",
      code: "M249 Light Machine Gun-Operations-6EV840S096H0J29AJAHPA" },
    { id: "pkm", weapon: "PKM", category: "LMG",
      code: "PKM General Machine Gun-Operations-6KR2E1S014H9D6PDMV79E" },
    { id: "qjb201", weapon: "QJB201", category: "LMG",
      code: "QJB201 Light Machine Gun-Operations-6KR2E40014H9D6PDMV79E" },
    { id: "m250", weapon: "M250", category: "LMG",
      code: "M250 General Machine Gun-Operations-6GCFL9O01OANMAF97OV6I" },
    { id: "svch", weapon: "SVCH", category: "Marksman Rifle",
      code: "SVCH Marksman Rifle-Operations-6KPLRSC014H9D6PDMV79E" },
    { id: "psg-1", weapon: "PSG-1", category: "Marksman Rifle",
      code: "PSG-1 Marksman Rifle-Operations-6FUN7KK0E0H5HH0IS5EKC" },
    { id: "sr-25", weapon: "SR-25", category: "Marksman Rifle",
      code: "SR-25 Marksman Rifle-Operations-6G57HA40E0H5HH0IS5EKC" },
    { id: "sks", weapon: "SKS", category: "Marksman Rifle",
      code: "SKS Marksman Rifle-Operations-6KR2E8O014H9D6PDMV79E" },
    { id: "m14", weapon: "M14", category: "Marksman Rifle",
      code: "M14 Marksman Rifle-Operations-6KR2E6C014H9D6PDMV79E" },
    { id: "svd", weapon: "SVD", category: "Marksman Rifle",
      code: "SVD Sniper Rifle-Operations-6KR2E78014H9D6PDMV79E" },
    { id: "vss", weapon: "VSS", category: "Marksman Rifle",
      code: "VSS Marksman Rifle-Operations-6F1MTM40A343VCRUF2MBP" },
    { id: "mini-14", weapon: "Mini-14", category: "Marksman Rifle",
      code: "Mini-14 Marksman Rifle-Operations-6GV90EO01OANMAF97OV6I" },
    { id: "sr9", weapon: "SR9", category: "Marksman Rifle",
      code: "SR9 Marksman Rifle-Operations-6G57I7O0E0H5HH0IS5EKC" },
    { id: "m700", weapon: "M700", category: "Sniper Rifle",
      code: "M700 Sniper Rifle-Operations-6KR2EB8014H9D6PDMV79E" },
    { id: "r93", weapon: "R93", category: "Sniper Rifle",
      code: "R93 Sniper Rifle-Operations-6JRECAS014H9D6PDMV79E" },
    { id: "sv-98", weapon: "SV-98", category: "Sniper Rifle",
      code: "SV-98 Sniper Rifle-Operations-6F03AD00A343VCRUF2MBP" },
    { id: "awm", weapon: "AWM", category: "Sniper Rifle",
      code: "AWM Sniper Rifle-Operations-6G57H7K0E0H5HH0IS5EKC" },
    { id: "compound-bow", weapon: "Compound Bow", category: "Special",
      code: "Compound Bow-Operations-6K6M1K0014H9D6PDMV79E" }
  ]
};
