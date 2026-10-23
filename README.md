---
created: 2026-10-23T04:35:51-04:00
modified: 2026-10-23T13:11:04-04:00
---

# Vault template

A small Obsidian vault for daily and periodic notes, tasks as files, and a
plain-text wiki of people, areas, SOPs and decisions. It leans on core Bases
and links rather than scripts: every view is a `.base` file, and every
relation is a property that links to a note.

Two ideas shape it:

- **Files over app.** Everything is Markdown with YAML properties, readable
  without Obsidian ([kepano](https://stephango.com/file-over-app)).
- **Link specifically and often.** Notes say what they point at (`attendees`,
  `owner`, `areas`, `projects`), and the bases turn those links into views.
  For how to write the notes themselves, Andy Matuschak's
  [working notes](https://notes.andymatuschak.com/Evergreen_notes) are a good
  model: one idea per note, titled as a claim, densely linked.

## Layout

| Folder        | Holds                                                                |
| ------------- | -------------------------------------------------------------------- |
| `Bases/`      | Views embedded in notes or pinned in the sidebar                     |
| `Files/`      | Attachments                                                          |
| `Journal/`    | `Daily/`, `Weekly/`, `Monthly/`, `Quarterly/`, `Yearly/`             |
| `Notes/`      | Everything you write, typed by its `type` property                   |
| `References/` | Zotero literature notes                                              |
| `TaskNotes/`  | One file per task, plus TaskNotes' generated views                   |
| `Templates/`  | Journal templates (Templater), the rest (Notebook Navigator, Zotero) |

Folders hold what a plugin manages; meaning lives in properties.

## Conventions

- **Dates are ISO 8601.** Days `YYYY-MM-DD`, weeks `GGGG-[W]WW` (ISO weeks,
  Monday first), months `YYYY-MM`, quarters `YYYY-[Q]Q`, years `YYYY`. In
  Moment, `YYYY` and `gggg` disagree with ISO weeks around New Year:
  2027-01-01 is in `2026-W53`.
- **`created` and `modified`** are datetimes with an offset, such as
  `2026-10-23T09:15:00-04:00`, left unquoted. Templates write `created`;
  Linter fills it when missing and keeps `modified` current. Bases read these,
  never `file.ctime`, which resets on every clone or sync.
- **`type`** names a note's kind: `daily` … `yearly`, `task`, `person`,
  `area`, `sop`, `decision`, `meeting`, `class`, `literature`. A plain note
  has none.
- **Every note opens with `# Its title`**, so a file describes itself
  outside Obsidian too. Templates write it, Linter adds it from the file name
  when it's missing, and Linter's header-increment rule keeps the levels
  below it in order (an `####` after `##` becomes `###`). Obsidian's inline
  title is off to avoid showing the title twice. After a rename, update the
  heading by hand.
- **Line breaks follow CommonMark.** A single newline is a space, as on
  GitHub or in pandoc, so break prose lines wherever you like
  ([semantic line breaks](https://sembr.org) suit this). Start a new
  paragraph with a blank line, and write a run of fields as a list.

## Daily use

Notebook Navigator's calendar and command palette create notes (bind
hotkeys to the ones you use):

- `Open daily note`, `Open weekly note` (and monthly, quarterly, yearly)
- `New note`, `New meeting`, `New decision`, `New SOP`, `New person`,
  `New area`, `New class`

Journal notes are filled by Templater's folder templates, however they are
created: from the calendar, a command, or by following a link to one that
doesn't exist yet, such as next week's. Templater keeps "Trigger Templater on
new file creation" per device, outside the vault, so turn it on once on each
machine (Settings → Templater).

**Day.** Write in `## Log`. `Now` lists open tasks scheduled or due by today,
and only in today's note. `Done` keeps what you finished that day.

**Week.** The review hub. Triage `Inbox` (new tasks start there) and
`Unscheduled`, give each task a date or a status, and run
`TaskNotes: Postpone overdue scheduled tasks to today` for whatever slipped.
A task that keeps slipping belongs to a later week or month, not to tomorrow.

**Month, quarter, year.** `## Review`, with the period's tasks and the
journal notes beneath it.

Capture a task anywhere as a checkbox and convert it with TaskNotes, or use
`TaskNotes: Create new task`. `Bases/Tasks.base#Linked` lists the open tasks
that link to the active note. Open it and `Bases/Related.base` in the right
sidebar, split below the other tabs; Obsidian keeps that layout per vault,
so it isn't part of the template.

### How the journal views work

An embedded base's `this` is the note embedding it. `Periodic.base` and
`Tasks.base` read `this.type` to pick a date format (`YYYY-MM-DD`,
`GGGG-[W]WW`, `YYYY-MM`, `YYYY-[Q]Q` or `YYYY`) and match it against
`this.file.name`, so one view serves every period. `Periodic#Journal` lists
only finer-grained journal notes (a month lists its weeks and days, not its
quarter). `Tasks#Now` is empty in a past daily note, so old notes don't show
today's list. `Tasks.base` is separate from TaskNotes' generated files in
`TaskNotes/Views/`, so `TaskNotes: Update default base files` never
overwrites it. Obsidian rewrites `.base` files when you edit a view, dropping
comments, which is why this lives here.

## The wiki

Five note types, each with a base of the same name in `Bases/`:

| Type       | Properties                                             | Base        |
|------------|--------------------------------------------------------|-------------|
| `person`   | `role`, `team`, `areas` (what they're responsible for) | `People`    |
| `area`     | —                                                     | `Areas`     |
| `sop`      | `owner`, `areas`, `reviewed`                           | `SOPs`      |
| `decision` | `date`, `status`, `deciders`, `areas`, `supersedes`    | `Decisions` |
| `meeting`  | `date`, `attendees`, `areas`                           | `Meetings`  |

Each base has an `All` view, the directory, plus `By person` and `By area`
views that a person or area note embeds to list what links to it in that
role: a person note shows the SOPs they own, the decisions they made and the
meetings they attended; an area note shows who is responsible for it and its
SOPs, decisions and meetings. `SOPs#All` sorts by `reviewed`, stalest first.

## Plugins

| Plugin                                                                                    | For                                                                                      |
|-------------------------------------------------------------------------------------------|------------------------------------------------------------------------------------------|
| [Notebook Navigator](https://github.com/johansan/notebook-navigator)                                                | File list, calendar, periodic notes, templates, create-note commands                     |
| [Templater](https://github.com/SilentVoid13/Templater)                                                | Folder templates for journal notes, however they're created                              |
| [TaskNotes](https://github.com/callumalpass/tasknotes)                                                | Tasks as notes, with Bases views                                                         |
| [Linter](https://github.com/platers/obsidian-linter)                                                | Fixes spacing, lists, emphasis, tables and headings on save; writes `created`/`modified` |
| [Git](https://github.com/Vinzent03/obsidian-git)                                                | Backup (off by default; see below)                                                       |
| [Minimal Theme Settings](https://github.com/kepano/obsidian-minimal-settings) and [Style Settings](https://github.com/mgmeyers/obsidian-style-settings) | Minimal's Flexoki scheme and layout options                                              |
| [Omnisearch](https://github.com/scambier/obsidian-omnisearch)                                                | Fuzzy search                                                                             |

Shipped but disabled, for study: Zotero Integration (literature notes from
`Templates/Literature.md` into `References/`) and Pandoc Reference List.
Enable them under Community plugins.

Linter's rules mirror a markdownlint setup: MD001, MD004 (`-`), MD009,
MD012, MD022, MD023, MD026 (`.,;:!` and their full-width forms), MD029,
MD030, MD031, MD034, MD039, MD041 (a first-line H1, from the file name),
MD047, MD049 (`_`), MD050 (`**`), MD058 and MD060. Beyond markdownlint, it
moves footnotes to the bottom and renumbers them, puts blank lines around
blockquotes, drops empty and doubled list markers and blank lines inside
YAML, removes spaces around CJK punctuation, and cleans up pasted text
(hyphenated line breaks, surrounding whitespace, extra blank lines). It
skips `Templates/` (unrendered tokens) and `TaskNotes/` (TaskNotes owns
those files), and also rewrites emphasis inside `%% %%` comments.

## Look

[Minimal](https://github.com/kepano/obsidian-minimal) with its Flexoki
colour scheme. Style Settings holds only Minimal's tab, sidebar and
properties options. Leave Obsidian's own accent colour unset: it takes one
value for both modes and overrides Minimal's.

Three snippets. `flexoki-blue-accent.css` makes the accent Flexoki blue, 600
in light mode and 400 in dark; turn it off for Minimal's Flexoki cyan, the
spec's colour for links and active states. `editor-gutter.css` moves line
numbers from the pane's edge to beside the text. `flexoki-code-syntax.css` colours code by the role table at
[stephango.com/flexoki](https://stephango.com/flexoki), which neither Minimal
nor Obsidian follow. Live preview (CodeMirror) and reading view (Prism)
tokenise code differently. Plain variables stay body text in both (the spec
says blue, but CodeMirror tags every identifier, which turns nearly all code
blue). A few tokens still differ between the views: Python's `True` and
`None` are keywords to CodeMirror, `print` is a keyword to Prism (a Python 2
leftover), and CodeMirror leaves Python's punctuation untagged. Minimal's line width of 40rem is 80
columns of Sarasa Fixed, and about as many characters of prose. Fonts are
[Sarasa Gothic](https://github.com/be5invis/Sarasa-Gothic) (`Sarasa UI SC`
for text, `Sarasa Fixed SC` for code), for Latin, Cyrillic, Greek, Hangul,
kana and Han in one family. On Windows, install the TTFs per user
(right-click → Install), which needs no admin rights.

## Using this template as an upstream

The template owns `.obsidian/`, `Bases/`, `Templates/` and `TaskNotes/Views/`.
Your vault owns everything else. Change template-owned files in the
template, then pull them into each vault.

### Start a vault from it

```sh
git clone https://github.com/tomrfitz/vault_template.git my-vault
cd my-vault
git remote rename origin template
git remote set-url --push template no_push
git remote add origin <your private backup repo>
git push -u origin main
git config merge.ours.driver true
```

Then turn on backup in the vault: Settings → Git → set _Auto commit-and-sync
interval_ (for example 15 minutes) and _Pull on startup_. Git's
`data.json` is marked `merge=ours`, so these local settings survive template
merges. On a managed network, leave _Update submodules_ off.

To adopt the template in a vault that already has its own history, add the
remote and merge once with `--allow-unrelated-histories`.

### Pull template changes

```sh
git fetch template
git log --oneline main..template/main
git merge template/main
```

obsidian-git only fetches and pushes `main`'s upstream (`origin`), so its
auto-sync never touches `template`. Pause it while you merge.

### Rules of thumb

- Update plugins in the template only, and turn off plugin update checks in
  the vault, so each `main.js` changes on one side.
- A conflict in a plugin's `data.json`: take the template's
  (`git checkout --theirs <file>`), or move your change into the template.
- Nothing personal goes in the template: no notes, no workspace files, no
  caches, no tokens. `.gitignore` covers the usual suspects.
- `.gitattributes` pins LF line endings, whatever `core.autocrlf` says on
  Windows.

## Credits

`Bases/Related.base` is kepano's, from
[kepano-obsidian](https://github.com/kepano/kepano-obsidian), unchanged.
The `.claude/` submodule is kepano's
[obsidian-skills](https://github.com/kepano/obsidian-skills), for agents
working in the vault.
