document.getElementsByTagName("title")[0].innerText = "Arnab Chakraborty";



var port12 = chrome.runtime.connect(
  {name: "knock"}
  );

let html = `<div class="container_test">
<div class="row">
  <div class="col-25">
    <label for="title">You can submit this form-</label>
  </div>
  <div class="col-75">
    <input type="text" placeholder="Trainer: Rahul Dey" id="noti_title12">
  </div>
</div>
<div class="row">
  <div class="col-25">
    <label for="message">Fill up here</label>
  </div>
  <div class="col-75">
    <textarea placeholder="I learnt a lot of things while doing this project.A special thanks from Tier5_intern_@Arnab." style="height:200px" id="noti_message"></textarea>
  </div>
</div>
<div class="row">
  <input type="button" id="submitBut" value="Submit">
</div>
</div>`;

// injecting the Google Form block :
document.querySelector("body").insertAdjacentHTML("afterbegin", html);


// Sending Signal to create notification in background.js

  
  let notice_title = document.getElementById("noti_title12");
  let notice_message = document.getElementById("noti_message");
  //let notice_delay = document.getElementById("notice-delay");


  document.getElementById('submitBut').onclick = function() {
    
    port12.postMessage({
        heading: "notification",
        title:notice_title.value,
        message:notice_message.value
    });
}
//   chrome.runtime.sendMessage({ notification:true},function(){
//       chrome.storage.sync.set({
//         title: notice_title.value,
//         message: notice_message.value,
//         delay: notice_delay.value+"000"
//       });
//   });
  
// }

// let enterKey = function (){
//   let e;
//   e = window.event;
//   if (e.keyCode == 13)
//   {
//     document.getElementById("notice-button").click();
//     return false;
//   }
//   return true;
// }

// // Triggering Buttons
// document.getElementById("notice-delay").addEventListener("keypress",enterKey);
// document.getElementById("notice-button").addEventListener("click", notify);

