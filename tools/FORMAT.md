# The three-decision format

This is the format every new daily battle is written in. It is the one place the format is described: if it changes, change it here, and the nightly task that prepares battles follows this file.

Marathon (`PGD.mystery(13, ...)` in `daily/mystery-03.js`) is the worked example. Cowpens (scenario 1) carries the same structure as a trial only, opened with `#steps-1`.

## What the player gets

A battle is three decisions in a row. Each decision has a short situation, a few lines of intel, one question, and two tries. After a decision is settled the real battle plays on to the next one, so the story is told as it goes and everybody reaches the ending. The score is how many of the three decisions matched the commander.

## How it is written

A battle is still one `PGD.mystery(n, {...})` entry with everything the single-order format needs: `war`, `general`, `pitch`, `H:600` with its own `terrain()`, `lead`, `sit`, `mett`, `ground`, `q`, `qs`, `toys`, `zones`, `ans`, `start`, `fbU`, `fbZ`, `fail`, `clues`, `deduce`, `scenes`, `video`, `sources`, `cards`. That top-level puzzle is one of the three decisions (usually the most famous one), and it keeps a `'toy@zone'` fail for every wrong combination so `tools/check_scenes.py` can check it.

On top of that it adds:

- `stepsLive:true` so the battle plays as three decisions from its normal daily link.
- `steps:[ ... ]` with exactly three entries, in the order they happened.

Each step overrides the top-level puzzle fields for that decision. A step that is the top-level puzzle only needs `after`, `hint` and `intel`.

| Field | What it is |
|---|---|
| `from` | Index of the scene whose unit positions this decision starts from. Leave it out to use the top-level `start`. |
| `start` | Position overrides on top of `from`, for the moment just before the decision (for example, a unit already on the move). |
| `after` | Scene indexes to play once the decision is settled. Across the three steps, every scene appears exactly once, in order. |
| `qs` | Short title for the order panel, ending in a question. About 40 characters. |
| `sit` | The situation, two or three sentences. Shown in the brief. |
| `q` | The question, one sentence, asking which toy goes where. |
| `intel` | Two or three `[title, text]` pairs. Only what a commander on the spot could know. |
| `toys` | `[id, label, phrase]`. `phrase` is how the toy reads inside a sentence: `'the cavalry'`. |
| `zones` | `[id, label, x, y, r, phrase]`. `phrase` completes "You sent the cavalry ...": `'into the chasing dragoons'`. Label of 16 characters or fewer where possible. |
| `ans` | `{u, z}`. `u` may be a list of toy ids when the decision is about where, not who. |
| `hint` | `{u, z}`. Shown after a first miss, for whichever part was wrong. A nudge toward the reasoning, never the answer. |
| `fbU`, `fbZ` | One line per toy and per zone: why it is right or wrong. Start a right one with "Right toy." or "Right place." |
| `fail` | At least one entry per zone (`{ko:[], fire:[...], idle:['$']}`), so a wrong order shows something sensible. Add `'toy@zone'` entries with their own `b` text where the outcome deserves it. |

## Rules for a decision

1. **Every choice is a real move.** No zone may sit where a toy already stands. "Leave it where it is" is never an answer and never an option.
2. **One clear reason.** The right answer must follow from the situation and intel, not from knowing the battle. If two answers are both defensible, rewrite the decision or accept both toys in `ans.u`.
3. **Real decisions only.** Each one is a choice the commander actually faced, in the order it came up. If a battle does not have three, pick a different battle rather than invent one.
4. **Positions are written for the 400 square board**, like everything else in the file. The engine stretches them for the tall phone board. Do not copy coordinates from a `terrain()` drawn for `H:600`.
5. **Texts stay inside the sources.** Situations, intel, feedback and hints may only state what the scenes and the listed sources support. Wrong-order outcomes are counterfactuals, and must follow from documented behaviour.
6. **The pitch covers the whole battle** and does not give away any of the three answers.
7. **Plain words**, no em dashes or en dashes, nothing a curious teenager would have to look up without the glossary.

## Checking

- `python3 build.py`, then `python3 tools/check_scenes.py --strict n`. It checks the real battle and the top-level puzzle's wrong orders.
- Play all three decisions once on a phone-sized screen and once on a wide one: a miss then a match, two misses, and a first-try match. Read every verdict sentence aloud; "You sent ..." must be good English for every toy and zone.
