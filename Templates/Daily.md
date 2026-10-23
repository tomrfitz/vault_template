<%* const d = moment(tp.file.title, "YYYY-MM-DD", true) -%>
---
type: daily
date: <% d.format("YYYY-MM-DD") %>
previous: "[[Journal/Daily/<% d.clone().subtract(1, "day").format("YYYY-MM-DD") %>|<% d.clone().subtract(1, "day").format("YYYY-MM-DD") %>]]"
next: "[[Journal/Daily/<% d.clone().add(1, "day").format("YYYY-MM-DD") %>|<% d.clone().add(1, "day").format("YYYY-MM-DD") %>]]"
week: "[[Journal/Weekly/<% d.format("GGGG-[W]WW") %>|<% d.format("GGGG-[W]WW") %>]]"
month: "[[Journal/Monthly/<% d.format("YYYY-MM") %>|<% d.format("YYYY-MM") %>]]"
created: <% moment().format("YYYY-MM-DDTHH:mm:ssZ") %>
---

# <% tp.file.title %>

## Log

- <% tp.file.cursor() %>

## Tasks

![[Tasks.base#Now]]

![[Tasks.base#Done]]

## Notes

![[Periodic.base#Notes]]
