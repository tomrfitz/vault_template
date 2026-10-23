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

| Folder      | Holds                                                         |
| ----------- | ------------------------------------------------------------- |
| `Bases/`    | Views embedded in notes or pinned in the sidebar              |
| `Files/`    | Attachments                                                   |
| `Journal/`  | `Daily/`, `Weekly/`, `Monthly/`, `Quarterly/`, `Yearly/`      |
| `Notes/`    | Everything you write, typed by its `type` property            |
| `References/` | Zotero literature notes                                     |
| `TaskNotes/` | One file per task, plus TaskNotes' generated views           |
| `Templates/` | Templates for Notebook Navigator and Zotero Integration      |

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

## Daily use

Notebook Navigator creates every note, from its calendar or the command
palette (bind hotkeys to the ones you use):

- `Open daily note`, `Open weekly note` (and monthly, quarterly, yearly)
- `New note`, `New meeting`, `New decision`, `New SOP`, `New person`,
  `New area`, `New class`

A note opened from a link that doesn't exist yet is created blank. Create
journal notes from the calendar or the commands instead, so they get their
template.

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
that link to the active note; pin it and `Bases/Related.base` in the right
sidebar.

## The wiki

| Type       | Properties                                      | Shows                         |
| ---------- | ----------------------------------------------- | ----------------------------- |
| `person`   | `role`, `team`, `areas` (what they're responsible for) | SOPs they own, decisions, meetings |
| `area`     | —                                               | who is responsible, and its SOPs, decisions and meetings |
| `sop`      | `owner`, `areas`, `reviewed`                    | —                             |
| `decision` | `date`, `status`, `deciders`, `areas`, `supersedes` | —                         |
| `meeting`  | `date`, `attendees`, `areas`                    | —                             |

`Bases/Wiki.base` has a directory view for each type; sort SOPs by `reviewed`
to find stale ones.

## Plugins

| Plugin | For |
| ------ | --- |
| [Notebook Navigator](https://github.com/johansan/notebook-navigator) | File list, calendar, periodic notes, templates, create-note commands |
| [TaskNotes](https://github.com/callumalpass/tasknotes) | Tasks as notes, with Bases views |
| [Linter](https://github.com/platers/obsidian-linter) | Fixes spacing, lists, emphasis, tables and headings on save; writes `created`/`modified` |
| [Git](https://github.com/Vinzent03/obsidian-git) | Backup (off by default; see below) |
| [Minimal Theme Settings](https://github.com/kepano/obsidian-minimal-settings) and [Style Settings](https://github.com/mgmeyers/obsidian-style-settings) | Minimal's Flexoki scheme and layout options |
| [Omnisearch](https://github.com/scambier/obsidian-omnisearch) | Fuzzy search |

Shipped but disabled, for study: Zotero Integration (literature notes from
`Templates/Literature.md` into `References/`) and Pandoc Reference List.
Enable them under Community plugins.

Linter's rules mirror a markdownlint setup: MD001, MD004 (`-`), MD009,
MD012, MD022, MD023, MD026 (`.,;:!`), MD029, MD030, MD031, MD034, MD039,
MD047, MD049 (`_`), MD050 (`**`), MD058 and MD060. It skips `Templates/`
(unrendered tokens) and `TaskNotes/` (TaskNotes owns those files), and also
rewrites emphasis inside `%% %%` comments.

## Look

[Minimal](https://github.com/kepano/obsidian-minimal) with its Flexoki
colour scheme, plus `flexoki-code-syntax.css` for Flexoki's own syntax
colours, which neither Minimal nor Obsidian set. Fonts are
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

Then turn on backup in the vault: Settings → Git → set *Auto commit-and-sync
interval* (for example 15 minutes) and *Pull on startup*. Git's
`data.json` is marked `merge=ours`, so these local settings survive template
merges. On a managed network, leave *Update submodules* off.

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
