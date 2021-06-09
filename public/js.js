const socket = io();
socket.emit('test', 'hello')
console.log("Hello");

const btn = document.getElementById('me');
btn.addEventListener('click', (evt)=>{
    socket.emit('test' , 'Hellllllllllllllllooooooooooooooooooo')
});

socket.on('test', pay=>{
    console.log(pay);
})