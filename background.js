// Creating Notification
// chrome.alarms.onAlarm.addListener(function(alarm) {
//     if (alarm.name === "notice"){
//       chrome.storage.sync.get(['title','message'],function(item){
//         chrome.notifications.create(
//           "Alarm",
//           {
//             type: "basic",
//             iconUrl: "/images/four.jpg",
//             title: item.title,
//             message: item.message
//           }
//         );
//       });
//     }
//     return true;
//   });

chrome.runtime.onConnect.addListener((obj)=>{
  console.log(obj);
  obj.onMessage.addListener(function(msg) {


    if(msg.heading==="notification")
    {
    
        chrome.notifications.create("notifyTest",{
            iconUrl:"https://upload.wikimedia.org/wikipedia/commons/thumb/7/73/Flat_tick_icon.svg/1200px-Flat_tick_icon.svg.png",
             type:"basic",
             title:msg.title,
             message:msg.message
        }) 
    }


  })
})
  
  chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
      
      // Sending signal to create notification.
      if (request.notification){
        chrome.storage.sync.get(['delay'],function(item){
          chrome.alarms.create("notice",{when: Date.now()+parseInt(item.delay)});
        });
      }
      
      // creating search tab and closing it in 30 sec.
      if (request.searching){
        
        const interval = 30000;
        chrome.tabs.create({ url: 'https://www.google.com/search?q='+request.weby, active: true }, function(tab){
          setTimeout(function() {
            chrome.tabs.remove(tab.id);
          },interval);
        });
        
      }
      
      // Printing the currently opened tab.
      function printTab(){
        window.print();
      }
      
      if (request.printing){
        chrome.tabs.query({ active: true, currentWindow: true },function(tabs){
          
          let curTab = tabs[0].id;
          chrome.scripting.executeScript({
            target: {tabId: curTab},
            function: printTab,
          });
          
        });
      return true;
      }
      
    }
  );