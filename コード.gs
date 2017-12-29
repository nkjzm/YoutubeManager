function myFunction() {
  // eventType=completedはtype=videoの時に使える。
  // eventType=completedのみの指定だとエラーになる。
  // 公開されたのが2013年以降の動画
  // 日付の新しい順に、最大25件
  var results = YouTube.Search.list('id,snippet', {
    mine: true,
    channelId: 'UCQAEaOgBMidPZqlluTpAb4A',
    maxResults: 50,
    type: 'video',
    order: 'date',
  });

  var data = [];
  for(var i = 0; i < results.items.length; i++) {
    //Logger.log(results.items[i]);
    var item = results.items[i];
    var title = item.snippet.title;
    var description = item.snippet.description;
    var publishedAt = item.snippet.publishedAt;
    var url = "http://www.youtube.com/watch?v=" + item.id.videoId;
    var image = "=IMAGE(\"http://i.ytimg.com/vi/"+item.id.videoId+"/mqdefault.jpg\")"
    data.push([title, description, publishedAt, url, image]);
  }

  Logger.log(results.items.length)

  var range = 'A1:E'+results.items.length
  SpreadsheetApp.getActive().getRange(range).setValues(data);
}