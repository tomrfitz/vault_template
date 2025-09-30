<%*
var fileDate = moment(tp.file.title);

let prevDay = moment(fileDate).subtract(1, 'd').format('YYYY-MM-DD');
let prevDayLink = prevDay.format('dddd');

let nextDay = moment(fileDate).add(1, 'd').format('YYYY-MM-DD');
let nextDayLink = nextDay.format('dddd');

let yearLink = fileDate.format('YYYY');
let quarterLink = fileDate.format('YYYY-[Q]Q');
let monthLink = fileDate.format('YYYY-MM');
let weekLink = fileDate.format('gggg-[W]WW');
-%>
# <% moment(tp.file.title,'YYYY-MM-DD').format("dddd, MMMM DD, YYYY") %>

<%*
let navStr = `[[Journal/Daily/${prevDay}|${moment(fileDate).subtract(1, 'd').format('dddd')}]] ⋮ [[Journal/Yearly/${yearLink}|${yearLink}]] › [[Journal/Quarterly/${quarterLink}|${fileDate.format('[Q]Q')}]] › [[Journal/Monthly/${monthLink}|${fileDate.format('MMM')}]] › [[Journal/Weekly/${weekLink}|${fileDate.format('[W]WW')}]] ⋮ [[Journal/Daily/${nextDay}|${moment(fileDate).add(1, 'd').format('dddd')}]]`;

tR += navStr
%>

## Goals

## Ideas

<% await tp.user.daily_quote() %>

## Actions

## Reflections

## Lookback

### Notes Created Today

![[Journal.base#Created this day]]

### Notes Last Touched Today

![[Journal.base#Modified this day]]