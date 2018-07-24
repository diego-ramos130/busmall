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
//creates a product which is the main object type we're dealing with
function Product(name){
  this.name = name;
  this.path = `img/${name}.jpg`;
  this.views = 0;
  this.clicks = 0;
  allProducts.push(this);
}
//loop pops allProducts with Product objects
for (var idx in imgs){
  new Product(imgs[idx]) ;
}
//gets a random number, child of threeRandomImages
function getRandomInt() {
  return Math.floor(Math.random()*(allProducts.length - 1));
}
//sets left, center, and right to the image of a random picture
function threeRandomImages() {
  var randomIndexes= [];
  randomIndexes.push(getRandomInt());
  randomIndexes.push(getRandomInt());
  randomIndexes.push(getRandomInt());
  //validate input now!
  //basically, you need to compare every idx to every other idx and every idx to every other past idx.
  if (totalClicks > 0){
    for (var i in randomIndexes){
      for (var j = i+1; j<randomIndexes.length -1;j++){
        if (randomIndexes[i] === randomIndexes[j]){
          randomIndexes[i] = getRandomInt();
        }
        if(randomIndexes[i]===lastIndexes[j - 1]){
          randomIndexes[i] = getRandomInt();
        }
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
  if (event.target.id === 'container'){
    return alert('Click on images, please!');
  }
  totalClicks++;
  console.log(totalClicks, 'total clicks');
  for(var idx in allProducts){
    if(event.target.title === allProducts[idx].name){
      allProducts[idx].clicks++;
    }
  }
  if(totalClicks > 25){
    alert('you are out of clicks');
    container.removeEventListener('click', handleClick);
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
threeRandomImages();
container.addEventListener('click', handleClick);

/* 'use strict';

//create an image array.
var imgs = ['bag.jpg', 'banana.jpg', 'bathroom.jpg', 'boots.jpg', 'breakfast.jpg', 'bubblegum.jpg', 'chair.jpg', 'cthulhu.jpg','dog-duck.jpg','dragon.jpg','pen.jpg',
  'pet-sweep.jpg','scissors.jpg','shark.jpg','sweep.png','tauntaun.jpg','unicorn.jpg','usb.gif','water-can.jpg', 'wine-glass.jpg'];
//create an empty array to be stored with image objects.
var imgObjs = [];
var round = 0;

//create a constructor that creates image objects.
function ImageObject(img){
  this.name = img.split('.')[0];
  this.dir = img;
  this.votes = 0;
  this.appearances = 0;
  this.idx = 0;
}
function generateImgObjs(){
  for (var i=0;i<imgs.length;i++){
    imgObjs[i] = new ImageObject(imgs[i]);
    imgObjs[i].idx = i;
  }
}
//placeholder gen
//console.log('should have generated all image objects', imgObjs);
//we have now laid the framework for the randomizer.
//the randomizer should pick 3 objects that have not already been chosen in the array and append them to the page. upon being chosen, appearances++.
//let's use a baseline random function to accomplish this.
function getRandomInt(min, max){
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}
//actually, maybe creating an object that runs the selector, appender, and looper is the way to go. let's see.
function FocusGroup(imgObjs){

  this.lastObjLeft = 'placeholderleft';
  this.lastObjMid = 'placeholdermid';
  this.lastObjRight = 'placeholder';
  this.comparisonArray = [0,0,0,this.lastObjLeft,this.lastObjMid,this.lastObjRight];
  this.items = imgObjs;
}

function hasAnySame(array){
  for (var i = 0; i<array.length;i++){
    for (var j = i + 1 ;j < array.length ; j++){
      if (array[i] === array[j]){
        return true;
      }
    }
  }
  return false;
}

FocusGroup.prototype.objSelector = function() {

  //while there are any elements that are the same in the comparison array, repeat this loop
  while (hasAnySame(this.comparisonArray)){
    //chooses a random item from idx 0 to 19
    var idxone = getRandomInt(0, imgObjs.length - 1);
    this.objLeft = this.items[idxone];
    var idxtwo = getRandomInt(0, imgObjs.length - 1);
    this.objMid = this.items[idxtwo];
    var idxthree = getRandomInt(0, imgObjs.length - 1);
    this.objRight = this.items[idxthree];
    // cut three off the front
    for (var i = 0; i < this.comparisonArray.length/2;i++){
      this.comparisonArray.shift();
    }
    // add back the three objects to the front of comparisonarray
    this.comparisonArray.unshift(this.objRight);
    this.comparisonArray.unshift(this.objMid);
    this.comparisonArray.unshift(this.objLeft);

  }
  //keep these objects on memory as last obj

  this.lastObjLeft = this.objLeft;
  this.items[idxone].appearances++;
  this.lastObjMid = this.objMid;
  this.items[idxtwo].appearances++;
  this.lastObjRight = this.objRight;
  this.items[idxthree].appearances++;

  this.appendImgs();

};

FocusGroup.prototype.appendImgs = function() {
  //have to access dom
  var secEl = document.getElementById('quest');
  //now have to append objects to the dom
  for (var i = 0; i<this.comparisonArray.length/2 - 1;i++){
    var imgEl = document.createElement('img');
    imgEl.src = ('img/' + this.comparisonArray[i].dir);
    imgEl.alt = this.comparisonArray[i].name;
    imgEl.id = imgEl.alt;
    secEl.appendChild(imgEl);
  }
  this.clickObjs();
};

FocusGroup.prototype.clickObjs = function(){
  //should make every img clickable, and when they are clicked, calls a function that deletes all 3 img children from sect and calls objSelector().
  //have to access dom
  for (var i = 0; i < (this.comparisonArray.length/2) -1; i++){
    var imgEl = document.getElementById(this.comparisonArray[i].name);
    imgEl.addEventListener('click', function(){
      this.comparisonArray[i].votes++;
    });
    imgEl.addEventListener('click',removeImg);
  }
};

function removeImg(){
  var secEl = document.getElementById('quest');
  while (secEl.firstChild){
    secEl.removeChild(secEl.firstChild);
  }
  quest.objReset();
  if (quest.objChecker()===false){
    quest.objSelector();
  } else {
    endgame();
  }
}


FocusGroup.prototype.objReset = function() {
  this.objLeft = '';
  this.objMid = '';
  this.objRight = '';
  this.comparisonArray = [this.objLeft, this.objMid, this.objRight, this.lastObjLeft, this.lastObjMid, this.lastObjRight];
};

FocusGroup.prototype.objChecker = function(){
  round++;
  if (round === 25){
    return true;
  } else {
    return false;
  }
};


function endgame(){
  var secEl = document.getElementById('quest');
  while (secEl.firstChild) {
    secEl.removeChild(secEl.firstChild);
  }
  printList();
}

function printList(){
  var ulEl = document.createElement('ul');
  var sectEl = document.getElementById('quest');
  sectEl.appendChild(ulEl);
  for (var i = 0; i < imgObjs;i++){
    var liEl = document.createElement('li');
    liEl.textContent = quest.items[i].name + ': ' + 'appeared ' + quest.items[i].appearances + ', clicked ' + quest.items[i].votes;
    ulEl.appendChild(liEl);
  }
}

generateImgObjs();
var quest = new FocusGroup(imgObjs);
quest.objSelector();









/* function objSelector(){
  while (objLeft === objMiddle || objLeft === objRight || objMiddle === objRight){
    var objLeft = imgObjs[getRandomInt(0,imgObjs.length-1)];
    var objMiddle = imgObjs[getRandomInt(0, imgObjs.length - 1)];
    var objRight = imgObjs[getRandomInt(0, imgObjs.length - 1)];
  }
  objLeft.appearances++;
  //console.log('Left', objLeft);
  objMiddle.appearances++;
  //console.log('Middle', objMiddle);
  objRight.appearances++;
  //console.log('Right', objRight);
  //let's store their appearances now so that they don't get picked next time this is called.
  var lastObjLeft = objLeft;
  var lastObj
} */


//after it appends three imgs to the page, it should then have an event listener on each image that allows the user to click on them. upon being clicked, votes++.
//it then loops again. repeat 25 rounds.
//after 25 rounds, we will remove the images and append a UL to the page listing each item and how much they appeared/were selected.*/