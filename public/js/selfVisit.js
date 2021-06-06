'use strict';

const createVisit=document.getElementById('createVisit');
const tbody =document.getElementById('tbody');
const addVisit =document.getElementById('addVisit');
createVisit.addEventListener('submit',handler);


function handler(event){
  event.preventDefault();
  
  let trEl=document.createElement('tr');
  tbody.appendChild(trEl);
  
  let tdEl=document.createElement('td');
  tdEl.textContent=event.testname.value;
  trEl.appendChild(tdEl);
  
  let tdEl1=document.createElement('td');
  tdEl1.textContent=event.time.value;
  trEl.appendChild(tdEl1);
  
  let tdEl2=document.createElement('td');
  tdEl2.textContent=event.doctornotes.value;
  trEl.appendChild(tdEl2);
  
  
  let input = document.createElement('input');
  input.type='hidden';
  input.name='addTest';
  input.value=event.testname.value;
  addVisit.appendChild(input);
  
  let input1 = document.createElement('input');
  input1.type='hidden';
  input1.name='addTest';
  input1.value=event.time.value;
  addVisit.appendChild(input1);
  
  let input2 = document.createElement('input');
  input2.type='hidden';
  input2.name='addTest';
  input2.value=event.doctornotes.value;
  addVisit.appendChild(input2);
  
}
  