let hrs = document.getElementById("hrs");
let min = document.getElementById("min");
let sec = document.getElementById("sec");


setInterval(()=>{
    let currntTime = new Date();
    hrs.textContent = (currntTime.getHours() < 10? "0" :"") + currntTime.getHours();
    min.textContent = (currntTime.getMinutes() < 10? "0" :"") + currntTime.getMinutes();
},1000)



