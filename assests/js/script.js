var submitBtn = document.querySelector('#submit_btn');
var inputBox = document.querySelector('#input_box')
var output_box = document.querySelector('#output_box');

apik = "3045dd712ffe6e702e3245525ac7fa38"

submitBtn.addEventListener('click',function(){

var output = document.createElement('p');
output_box.append(output);
output.textContent = inputBox.value;

fetch('https://api.openweathermap.org/data/2.5/weather?q='+inputBox.value+'&appid='+apik)
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
   console.log("this is data",data);
   output.textContent=(data['wind']['speed'])
  });
});