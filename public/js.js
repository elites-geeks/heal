const socket = io();
socket.emit('test', 'hello')
console.log("Hello");
let insComp;
const btn = document.getElementById('me');
const insList = document.getElementById('insurance');
const policiesList = document.getElementById('policies');
btn.addEventListener('click', (evt) => {
    socket.emit('test', 'Hellllllllllllllllooooooooooooooooooo')
});

socket.on('test', pay => {
    console.log(pay);
})

window.addEventListener('load', (event) => {
    superagent.get('/patient/insurance').then((data) => {
        insComp = data.body;
        data.body.forEach(element => {
            const option = document.createElement('option');
            option.value = element._id;
            option.textContent = element.name;
            insList.append(option);
        });
    });
});

insList.addEventListener('change', (event) => {
    const id = insList.value;
    const chosen = insComp.find(elem => {
        return elem._id == id;
    });
    chosen.listOfPolicies.forEach(policy => {
        policiesList.innerHTML += `<div><h2>Offer name: ${policy.name}</h2><h3>coverage: ${policy.offerCoverage}</h3><h3>Cost per year: ${policy.costPerYear}</h3><h3>Cost per month: ${policy.costPerMonth}</h3><button value="${policy._id}">Send Request</button></div>`
    });
    const btns = document.querySelectorAll('button');
    btns.forEach(btn=>{
        btn.addEventListener('click',evt=>{
            const offerId = btn.getAttribute('value');
            superagent.post('/insurance/subscribe').send({insuranceComp:id , policy:offerId })
        });
    });
});
