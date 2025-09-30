<%*
var fileDate = moment(tp.file.title);

let prevWeek = moment(fileDate).subtract(1, 'w').format('gggg-[W]w');
let prevWeekLink = prevWeek.format('gggg-[W]w');

let nextWeek = moment(fileDate).add(1, 'w').format('gggg-[W]w');
let nextWeekLink = nextWeek.format('gggg-[W]w');

let yearLink = fileDate.format('YYYY');
let quarterLink = fileDate.format('YYYY-[Q]Q');
let monthLink = fileDate.format('YYYY-MM');
let weekLink = fileDate.format('gggg-[W]WW');
-%>
# <% tp.file.title %>

<%*
let navStr = `[[Journal/Weekly/${prevWeek}|${prevWeek}]] ⋮ [[Journal/Yearly/${yearLink}|${yearLink}]] › [[Journal/Quarterly/${quarterLink}|${fileDate.format('[Q]Q')}]] › [[Journal/Monthly/${monthLink}|${fileDate.format('MMM')}]] ⋮ [[Journal/Weekly/${nextWeek}|${nextWeek}]]`;

tR += navStr
%>

## Tasks

```tasks
group by function task.done.format("YYYY-MM-DD")
group by heading
done in {{query.file.filenameWithoutExtension}}
```

## Reflections

![[Journal.base#Created this week]]

![[Journal.base#Modified this week]]