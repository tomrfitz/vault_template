<%*
var fileDate = moment(tp.file.title);

let prevMonth = moment(fileDate).subtract(1, 'M').format('YYYY-MM');

let nextMonth = moment(fileDate).add(1, 'M').format('YYYY-MM');

let yearLink = fileDate.format('YYYY');
let quarterLink = fileDate.format('YYYY-[Q]Q');
let monthLink = fileDate.format('YYYY-MM');
-%>

# <% moment(tp.file.title,'YYYY-MM').format("MMMM, YYYY") %>

<%*
let navStr = `[[Journal/Monthly/${prevMonth}|${prevMonth}]] ⋮ [[Journal/Yearly/${yearLink}|${yearLink}]] › [[Journal/Quarterly/${quarterLink}|${fileDate.format('[Q]Q')}]] ⋮ [[Journal/Monthly${nextMonth}|${nextMonth}]]`;

tR += navStr
%>

## Tasks

```tasks
group by function task.done.format("YYYY-[W]W")
group by heading
done in {{query.file.filenameWithoutExtension}}
```

## Reflections

## Lookback

![[Journal.base#Created this month]]

![[Journal.base#Modified this month]]