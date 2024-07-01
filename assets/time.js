let p = document.getElementById("count");
let count = 0;

console.log("Hello");

setTimeout(() => {
    console.log("helo setTimeout");
}, 3000);

// setInterval
let intervalId = setInterval(() => {
    count++;
    console.log("Ankur", count + 1);
}, 500);

console.log("bye");


//  clearInterval

setTimeout(() => {
    clearInterval(intervalId);
}, 5000);


