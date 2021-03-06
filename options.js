var storage = document.getElementById('storage');

function load(){
  chrome.storage.local.get('fruits', function ( data ) {
    let elm = '';
    for (let i=0; i < data.fruits.length; i++){
      elm += `
      <div class="box">
        <div class="box-title"><a href="${data.fruits[i].url}" target="_blank">${data.fruits[i].title}</a>
        </div>
        <div class="box-message"><span>メモ<button class="remove">削除</button></span>${data.fruits[i].message}
        </div>
        <a href="${data.fruits[i].url}" target="_blank" class="box-link">リンク先へ</a>
      </div>
      `
  
    }
    storage.innerHTML = elm;
  });
}

load();



const elms = document.querySelectorAll(".remove");
let index;
elms.forEach((elm) => {
  elm.addEventListener("click", () => {
    index = [].slice.call(elms).indexOf(elm);
    console.log(index);
  });
});

jQuery(function($){

  $(document).on('click', '.remove', function(){
    console.log($(this));
    var index = $('.remove').index(this);
  
    console.log(index + 'th item clicked!');
    remove(index);

  });
});

function remove(index){
  chrome.storage.local.get('fruits', function ( data ) {
    console.log(index);
    console.log(data.fruits);
    data.fruits.splice(index, 1);
    let nextFruits = data.fruits;
    chrome.storage.local.set({ 'fruits': nextFruits }, function() {});

    load();
  });
}

document.getElementById('allRemove').onclick = function() {
  chrome.storage.local.clear();
  window.location.reload();
};