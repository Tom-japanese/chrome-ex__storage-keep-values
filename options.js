var test = document.getElementById('storage');
chrome.storage.local.get('Alertmsg', function (items) {　　// Alertmsgキーの対になる値をitemsとして返す
  test.textContent = items.Alertmsg;
});

// 一覧で取得
chrome.storage.local.get(null, ((data) => {
  var storages = [];
  Object.keys(data).forEach(key => {
    if(key.indexOf('info') === 0){
      storages.push(key);
    }
  });
  console.log(storages);

}));

chrome.storage.local.get('test2', function (items) {　
  console.log(items);
  console.log(items.test2);
});

