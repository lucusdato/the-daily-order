# Scene checklist

Every battle goes through two checks before it ships: one automatic, one by a person.

## 1. Automatic check

From the repo root:

```
python3 tools/check_scenes.py          # all mystery battles
python3 tools/check_scenes.py 1        # one battle
python3 tools/check_scenes.py --strict # warnings fail too
```

The script replays the real battle and every wrong order, then flags:

- units that walk through enemy units with no fight
- enemies left standing face to face
- shots fired beyond the weapon's reach
- units that fight or move after they are knocked out
- casualties nobody fired on
- captions that mention firing or a charge the animation never shows
- wrong orders that have no outcome of their own
- battles with no sources

A battle ships with 0 errors and 0 warnings. A note is a prompt to look again, not a failure.

## 2. History check (by a person, against the sources)

1. **Orientation.** Decide which way is north and which way each army faces. Then work out which side of the map is each army's left and right. Most flank mistakes start here.
2. **Order of battle.** Check every unit's name, size and type against a source. Place each one where the sources put it at the start.
3. **Sequence.** Each real-battle scene should match one step in the sources, in order. Don't merge two steps in a way that changes who did what, or when.
4. **Who hits whom.** Every `fire` entry should be something a source describes. Use the right `kind`: a volley is `musket`, a bayonet or sabre fight is `clash`.
5. **Numbers and quotes.** Every number or quoted phrase in a caption needs a source. If the sources disagree, say "about" or drop the number.
6. **Wrong orders.** Write a separate outcome for every toy and zone combination. Each outcome is a counterfactual, but it must follow from documented behaviour: the enemy's known habits, what the troop type could and couldn't do, or a real precedent you can name.
7. **Sources.** List them in `m.sources` as `[title, url]`. Prefer park services, museums, and journals or books by historians.
