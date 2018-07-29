'use strict';
var imgs = ['bag', 'banana', 'bathroom', 'boots', 'breakfast', 'bubblegum', 'chair', 'cthulhu', 'dog-duck', 'dragon', 'pen',
  'pet-sweep', 'scissors', 'shark', 'sweep', 'tauntaun', 'unicorn', 'usb', 'water-can', 'wine-glass'];
var allProducts = [];
var left = document.getElementById('left');
var center = document.getElementById('center');
var right = document.getElementById('right');
var container = document.getElementById('quest');
var totalClicks = 0;
var lastIndexes = [0,0,0];
var totaldata = [];
for (var i in imgs) {
  new Product(imgs[i]);
}
container.addEventListener('click', handleClick);
threeRandomImages();

window.onload = function() {
  if (localStorage.getItem('item')){
    totaldata = JSON.parse(localStorage.getItem('item'));
  } else {
    totaldata = [];
  }
};

//creates a product which is the main object type we're dealing with
function Product(name){
  this.name = name;
  this.path = `img/${name}.jpg`;
  this.views = 0;
  this.clicks = 0;
  allProducts.push(this);
}
//loop pops allProducts with Product objects

//gets a random number, child of threeRandomImages
function getRandomInt() {
  return Math.floor(Math.random()*(allProducts.length - 1));
}
//sets left, center, and right to the image of a random picture
function threeRandomImages() {
  var randomIndexes = [];
  randomIndexes.push(getRandomInt());
  randomIndexes.push(getRandomInt());
  randomIndexes.push(getRandomInt());
  //validate input now!
  //basically, you need to compare every idx to every other idx and every idx to every other past idx.
  if (totalClicks > 0){
    while(randomIndexes[0] === randomIndexes[1] || randomIndexes[0] === randomIndexes[2] || randomIndexes[1] === randomIndexes[2] 
    || lastIndexes[0] === randomIndexes[0] || lastIndexes[0] === randomIndexes[1] || lastIndexes[0] === randomIndexes[2] || lastIndexes[1] === randomIndexes[0]
    || lastIndexes[1] === randomIndexes[1] || lastIndexes[1] === randomIndexes[2] || lastIndexes[2] === randomIndexes[0] || lastIndexes[2] === randomIndexes[1]
    || lastIndexes[2] === randomIndexes[2]){
    for (var idx in randomIndexes){
      randomIndexes[idx] = getRandomInt();
    }
  }
} else {
  while(randomIndexes[0] === randomIndexes[1] || randomIndexes[0] === randomIndexes[2] || randomIndexes[1] === randomIndexes[2] ){
  for (var i in randomIndexes){
    randomIndexes[idx] = getRandomInt();
  }
}
}
  // for in img tags, assign random src attribute
  left.src = allProducts[randomIndexes[0]].path;
  center.src = allProducts[randomIndexes[1]].path;
  right.src = allProducts[randomIndexes[2]].path;
  left.title = allProducts[randomIndexes[0]].name;
  center.title = allProducts[randomIndexes[1]].name;
  right.title = allProducts[randomIndexes[2]].name;
  allProducts[randomIndexes[0]].views++;
  allProducts[randomIndexes[1]].views++;
  allProducts[randomIndexes[2]].views++;
  for (var idx in randomIndexes){
    lastIndexes[idx] = randomIndexes[idx];
  }
}
//on click, does threeRandomImages(), console tells you which id was clicked
function handleClick(event){
  if (event.target.id === 'quest'){
    return alert('Click on images, please!');
  }
  totalClicks++;
  console.log(totalClicks, 'total clicks');
  for(var idx in allProducts){
    if(event.target.title === allProducts[idx].name){
      allProducts[idx].clicks++;
    }
  }
  if(totalClicks === 25){
    alert('you are out of clicks');
    container.removeEventListener('click', handleClick);
    for (var i in allProducts){
      totaldata[i] += allProducts[i].clicks;
    }
    localStorage.setItem('item', JSON.stringify(totaldata));
    populateChartData();
    createBar();
  }
  console.log(event.target, 'was clicked');
  threeRandomImages();
}

var chartData = {
  labels : [],
  datasets : {
    label: '# of votes',
    data: []
  }
};

function populateChartData(){
  for (var idx in allProducts){
    chartData.labels.push(allProducts[idx].name);
    chartData.datasets.data.push(allProducts[idx].clicks);
    chartData.datasets.data[idx] += totaldata[idx];
  }
}
function createBar(){
  var ctx = document.getElementById('barchart');
  var myChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: chartData.labels,
      datasets: [{
        label: chartData.datasets.label,
        data: chartData.datasets.data,

      }]
    }
  });
}





