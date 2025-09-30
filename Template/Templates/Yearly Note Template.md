<%*
var fileDate = moment(tp.file.title, 'YYYY');

let prevYear = moment(fileDate).subtract(1, 'years').format('YYYY');

let nextYear = moment(fileDate).add(1, 'years').format('YYYY');

let yearLink = fileDate.format('YYYY');
let quarterLink = fileDate.format('YYYY-[Q]Q');
let monthLink = fileDate.format('YYYY-MM');
-%>

# <% tp.file.title %>

<%*
let navStr = `[[Journal/Yearly/${prevYear}|${prevYear}]] ⋮ [[Journal/Yearly/${nextYear}|${nextYear}]]`;

tR += navStr
%>

## Tasks

```tasks
group by function task.done.format("YYYY-[Q]Q")
group by heading
done in {{query.file.filenameWithoutExtension}}
```

## Reflections

## Lookback

![[Journal.base#Created this year]]

![[Journal.base#Modified this year]]