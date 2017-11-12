console.log("Starting app");

setTimeout(() => {
    console.log("Inside of callback")
}, 2000);

setTimeout(() => {
    console.log("Still inside of callback")
}, 0);

console.log("Finishin up");