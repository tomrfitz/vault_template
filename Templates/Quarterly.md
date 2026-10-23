<%* const d = moment(tp.file.title, "YYYY-[Q]Q", true) -%>
---
type: quarterly
date: <% d.format("YYYY-MM-DD") %>
previous: "[[Journal/Quarterly/<% d.clone().subtract(1, "quarter").format("YYYY-[Q]Q") %>|<% d.clone().subtract(1, "quarter").format("YYYY-[Q]Q") %>]]"
next: "[[Journal/Quarterly/<% d.clone().add(1, "quarter").format("YYYY-[Q]Q") %>|<% d.clone().add(1, "quarter").format("YYYY-[Q]Q") %>]]"
year: "[[Journal/Yearly/<% d.format("YYYY") %>|<% d.format("YYYY") %>]]"
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
