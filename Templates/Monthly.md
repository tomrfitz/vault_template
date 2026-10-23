<%* const d = moment(tp.file.title, "YYYY-MM", true) -%>
---
type: monthly
date: <% d.format("YYYY-MM-DD") %>
previous: "[[Journal/Monthly/<% d.clone().subtract(1, "month").format("YYYY-MM") %>|<% d.clone().subtract(1, "month").format("YYYY-MM") %>]]"
next: "[[Journal/Monthly/<% d.clone().add(1, "month").format("YYYY-MM") %>|<% d.clone().add(1, "month").format("YYYY-MM") %>]]"
quarter: "[[Journal/Quarterly/<% d.format("YYYY-[Q]Q") %>|<% d.format("YYYY-[Q]Q") %>]]"
created: <% moment().format("YYYY-MM-DDTHH:mm:ssZ") %>
---

# <% tp.file.title %>

## Review

<% tp.file.cursor() %>

## Tasks

![[Tasks.base#Planned]]

![[Tasks.base#Done]]

## Journal

![[Periodic.base#Journal]]

## Notes

![[Periodic.base#Notes]]
