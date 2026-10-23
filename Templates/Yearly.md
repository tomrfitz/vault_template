<%* const d = moment(tp.file.title, "YYYY", true) -%>
---
type: yearly
date: <% d.format("YYYY-MM-DD") %>
previous: "[[Journal/Yearly/<% d.clone().subtract(1, "year").format("YYYY") %>|<% d.clone().subtract(1, "year").format("YYYY") %>]]"
next: "[[Journal/Yearly/<% d.clone().add(1, "year").format("YYYY") %>|<% d.clone().add(1, "year").format("YYYY") %>]]"
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
