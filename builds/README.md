# Builds from Obsidian

Every note in this folder tagged **#publish** shows up on the website about a minute after Obsidian Git pushes it.

## Add a build
1. Copy `_template.md` (or make a new note here).
2. Fill in the gun name and paste the import code.
3. Paste the Modify screenshot first and the Calibrate screenshot second.
4. Add the `publish` tag. Without it, the note stays private on your side.

Take the tag off (or delete the note) to remove the build from the site.

## Fields
| Field | Needed? | Notes |
|---|---|---|
| `gun` | optional | Shown as the build name. Defaults to the note's file name. |
| `code` | **yes** | The full import code. It can also just be pasted as a line in the note. |
| `class` | optional | Assault Rifle, SMG, LMG, Marksman Rifle, Sniper Rifle, Shotgun, Special. Worked out from the code if left out. |
| `tags` | **yes** | Must include `publish` (or write `#publish` anywhere in the note). |

Pictures: the first one is **View build**, the second is **Calibration**. A picture with "calibration" in its file name is always used for Calibration.

A note for a gun that's already on the site (like the AS Val) replaces that build.
