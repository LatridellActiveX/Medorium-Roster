var button = document.getElementById('btn');
var target = document.getElementById('target')


//now to test something interesting

var count = 100;


function changeCount(){
    target.innerHTML = count;
    count--;
    
}


button.addEventListener("click", (event)=>{
    var intervalId = setInterval(() => {
        if (count >= 1) {
          changeCount();
        } else {
          clearInterval(intervalId); // Stop the interval when count reaches 0
        }
      }, 1000);
});

// function test(){
//     target.innerHTML = "Button has been clicked!"
// }
