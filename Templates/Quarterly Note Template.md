<%*
var fileDate = moment(tp.file.title, 'YYYY-[Q]Q');

let prevQuarter = moment(fileDate).subtract(1, 'quarters').format('YYYY-[Q]Q');

let nextQuarter = moment(fileDate).add(1, 'quarters').format('YYYY-[Q]Q');

let yearLink = fileDate.format('YYYY');
let quarterLink = fileDate.format('YYYY-[Q]Q');
let monthLink = fileDate.format('YYYY-MM');
-%>

# <% tp.file.title %>

<%*
let navStr = `[[Journal/Quarterly/${prevQuarter}|${prevQuarter}]] ⋮ [[Journal/Yearly/${yearLink}|${yearLink}]] ⋮ [[Journal/Quarterly/${nextQuarter}|${nextQuarter}]]`;

tR += navStr
%>

## Tasks

```tasks
group by function task.done.format("YYYY-MM")
group by heading
done in {{query.file.filenameWithoutExtension}}
```

## Reflections

## Lookback

![[Journal.base#Created this quarter]]

![[Journal.base#Modified this quarter]]