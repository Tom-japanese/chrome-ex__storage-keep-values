



/* ==================================================
コメントアウト
==================================================  */


function Save() {
  // ↓上手く行った３号
  chrome.storage.local.get('fruits', function ( data ) {
    if (Object.keys(data).length) {// オブジェクトがある時
      
      chrome.tabs.getSelected(function(tab) { 

        // alert(typeof(data));

        // URLに紐づくメモが存在するかどうかをチェックしてindexを返す
        let elm = data.fruits;
        for (let i=0; i < elm.length; i++){
          console.log(elm[i].url);
          if(elm[i].url == tab.url){
            var num = [i];
          }
        }

        if(num == undefined){// 新しいページへのメモの時
          const newFruit = {};
          
          let message = document.getElementById('input_message').value;
          newFruit.message = message;  
          newFruit.title = tab.title;
          newFruit.url = tab.url;
          var nextFruits = data.fruits.concat(newFruit); 

        }else{// 同じURL上にメモがある時は上書きをする
          let newFruit = {};
          let message = document.getElementById('input_message').value;
          newFruit.message = message;  
          newFruit.title = tab.title;
          newFruit.url = tab.url;
          elm[num] = newFruit;
          console.log(elm[num]);
          var nextFruits = elm; 
        }
    

        
        chrome.storage.local.set({ 'fruits': nextFruits }, function() {
          /* noop */
        });
      });
      
    }else{// オブジェクトがない時
      chrome.tabs.getSelected(function(tab) { 
        let object = {};
        let message = document.getElementById('input_message').value;
        object.message = message;  
        object.title = tab.title;
        object.url = tab.url;
        chrome.storage.local.set({'fruits': [object]}, function () { });
      });
    }
  });







  // // ↓　書き換え用（上手く行った）
  // chrome.storage.local.get('fruits', function ( data ) {
  //   chrome.tabs.getSelected(function(tab) { 
  //     let elm = data.fruits;
  //     for (let i=0; i < elm.length; i++){
  //       console.log(elm[i].url);
  //       if(elm[i].url == tab.url){
  //         var num = [i];
  //       }
  //     }
  //     let newFruit = {};
  //     let message = document.getElementById('input_message').value;
  //     newFruit.message = message;  
  //     newFruit.title = tab.title;
  //     newFruit.url = tab.url;
  //     elm[num] = newFruit;
  //     console.log(elm[num]);

  //   });

  // });



  // // ↓上手く行った３号
  // chrome.storage.local.get('fruits', function ( data ) {
  //   if (Object.keys(data).length) {// オブジェクトがある時
  //     chrome.tabs.getSelected(function(tab) { 

  //       alert(typeof(data));
  //       const newFruit = {};
        
  //       let message = document.getElementById('input_message').value;
  //       newFruit.message = message;  
  //       newFruit.title = tab.title;
  //       newFruit.url = tab.url;
        
  //       const nextFruits = data.fruits.concat(newFruit); // -> ['apple', 'banana']
  //       chrome.storage.local.set({ 'fruits': nextFruits }, function() {
  //         /* noop */
  //       });
  //     });
      
  //   }else{// オブジェクトがない時
  //     chrome.tabs.getSelected(function(tab) { 
  //       let object = {};
  //       let message = document.getElementById('input_message').value;
  //       object.message = message;  
  //       object.title = tab.title;
  //       object.url = tab.url;
  //       chrome.storage.local.set({'fruits': [object]}, function () { });
  //     });
  //   }
  // });





  // // ↓上手く行った二号
  // chrome.storage.local.get('fruits', function ( data ) {
  //   if (Object.keys(data).length) {// オブジェクトがある時
  //     chrome.tabs.getSelected(function(tab) { 

  //       alert(typeof(data));
  //       const newFruit = tab.title;
        
  //       const nextFruits = data.fruits.concat(newFruit); // -> ['apple', 'banana']
  //       chrome.storage.local.set({ 'fruits': nextFruits }, function() {
  //         /* noop */
  //       });
  //     });
      
  //   }else{// オブジェクトがない時
  //     chrome.tabs.getSelected(function(tab) { 

  //       var object = [tab.title];
  //       chrome.storage.local.set({'fruits': object}, function () { });
  //     });
  //   }
  // });




  // // ↓上手く行った
  // chrome.storage.local.get('fruits', function ( data ) {
  //   if (Object.keys(data).length) {// オブジェクトがある時
  //     chrome.storage.local.get('fruits', function ({ fruits }) {
  //       alert(typeof(fruits));
  //       const newFruit = 'banana';
      
  //       const nextFruits = fruits.concat(newFruit); // -> ['apple', 'banana']
  //       chrome.storage.local.set({ 'fruits': nextFruits }, function() {
  //          /* noop */
  //       });
  //     });
      
  //   }else{// オブジェクトがない時
  //     var object = ['apple'];
  //     chrome.storage.local.set({'fruits': object}, function () { });
  //   }
  // });
}
/* ==================================================
【改善点】
セーブのタイミングで拡張機能を開いた状態でタブを移動すると移動先として登録されちゃう…
フォームの操作後一定の時間が経ったら保存するようにした方がいいのかも…
==================================================  */
document.getElementById('input_message').addEventListener('change', Save);
// window.onblur = function () {
// 	Save();
// };







/* ==================================================
コメントアウト
==================================================  */

function Load() {
  chrome.storage.local.get('fruits', function (data) {
      chrome.tabs.getSelected(function(tab) { 
        // URLに紐づくメモが存在するかどうかをチェックしてindexを返す
        let elm = data.fruits;
        for (let i = 0; i < elm.length; i++){
          console.log(elm[i].url);
          if(elm[i].url == tab.url){
            var num = i;
          }
        }
        if(num == undefined){// 新しいページへのメモの時
        }else{
          console.log(data.fruits[num]);
          document.getElementById('input_message').value = data.fruits[num].message;  

        }
      });

  });
}

document.addEventListener('DOMContentLoaded', Load);  // オプションページ（options.html）の読み込みと解析が完了したらLoad関数を実行


