<%* const d = moment(tp.file.title, "GGGG-[W]WW", true) -%>
---
type: weekly
date: <% d.format("YYYY-MM-DD") %>
previous: "[[Journal/Weekly/<% d.clone().subtract(1, "week").format("GGGG-[W]WW") %>|<% d.clone().subtract(1, "week").format("GGGG-[W]WW") %>]]"
next: "[[Journal/Weekly/<% d.clone().add(1, "week").format("GGGG-[W]WW") %>|<% d.clone().add(1, "week").format("GGGG-[W]WW") %>]]"
month: "[[Journal/Monthly/<% d.clone().isoWeekday(4).format("YYYY-MM") %>|<% d.clone().isoWeekday(4).format("YYYY-MM") %>]]"
created: <% moment().format("YYYY-MM-DDTHH:mm:ssZ") %>
---

# <% tp.file.title %>

## Review

<% tp.file.cursor() %>

## Tasks

![[Tasks.base#Planned]]

![[Tasks.base#Done]]

### Triage

![[Tasks.base#Inbox]]

![[Tasks.base#Unscheduled]]

## Journal

![[Periodic.base#Journal]]

## Notes

![[Periodic.base#Notes]]
