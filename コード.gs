function myFunction() {

  var videoIds = getVideoIds('UCQAEaOgBMidPZqlluTpAb4A');

  var results2 = YouTube.Videos.list('id,snippet', {
    mine: true,
    id: videoIds.join(','),
    maxResults: 50,
  });

  var data = [];
  for(var i = 0; i < results2.items.length; i++) {
    var item = results2.items[i];
    var title = item.snippet.title;
    var description = item.snippet.description;
    var tags = item.snippet.tags != null ? item.snippet.tags.join(',') : '';
    var publishedAt = item.snippet.publishedAt;
    var url = "http://www.youtube.com/watch?v=" + item.id;
    var image = "=IMAGE(\"http://i.ytimg.com/vi/"+item.id+"/mqdefault.jpg\")"
    data.push([title, description, tags, publishedAt, url, image]);
  }

  Logger.log(results2.items.length)

  var range = 'A1:F'+results2.items.length
  SpreadsheetApp.getActive().getRange(range).setValues(data);
}

function getVideoIds(channelId)
{
  var results = YouTube.Search.list('id,snippet', {
    mine: true,
    channelId: channelId,
    maxResults: 50,
    type: 'video',
    order: 'date',
  });

  var videoIds = [];

  for(var i = 0; i < results.items.length; i++) {
    videoIds.push(results.items[i].id.videoId)
  }
  
  return videoIds;
}