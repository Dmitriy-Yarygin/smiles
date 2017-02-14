var level=0,
    maxLevel = 3,
    gameIsOver = false; 

window.onload = function() {
  playSoundAfter( 'help' );
};
window.onresize = fnResize;    
newGame();

$('#help').on('show.bs.modal', function(){ playSound( 'help' ); } );
$('#help').on('hide.bs.modal', function(){ playSound( '' ); } );


$('#youWinModal').on('show.bs.modal', function(){  playYoutube( 0 ); } );
$('#youWinModal').on('hide.bs.modal', stopYoutube );
/******************************************************************************************************/
/******************************************************************************************************/
function newGame() {  
  gameIsOver = false;
  document.querySelector('#level').innerHTML = level = 0;
  pedestalGrow( level );
  generateSmiles();
}
/******************************************************************************************************/
function nextTurn() { 
  if (gameIsOver) return;
  level++;
  pedestalGrow( level );
  document.querySelector('#level').innerHTML = level;
  if ( level >= maxLevel) {
    gameIsOver = true;
    playSound( '' );
    setTimeout( function(){  
      document.querySelector('#achivedLevel').innerHTML = level;      
      $('#youWinModal').modal('show');                
    }, 100 );
  } else {
    console.log(" You are right ! ");
    playSound( 'right' );
    generateSmiles();
  }   
}
/******************************************************************************************************/
function generateSmiles() {
  var elem,
      i = level+1,
      board1 =  document.querySelector('.div1'),
      board2 =  document.querySelector('.div2');
  while ( elem = board1.lastElementChild ) {  board1.removeChild(elem) }
  while ( elem = board2.lastElementChild ) {  board2.removeChild(elem) }
  for ( ; i--; ) {
    elem = make1Smile();
    board1.appendChild( elem );
    board2.appendChild( elem.cloneNode() );
  }  
  elem = make1Smile();
  elem.onclick = nextTurn;
  board2.appendChild( elem );
}
/******************************************************************************************************/
function make1Smile() {
  var R=20, D = 2*R,
      elem = document.createElement('img'),
      x = Math.floor( Math.random() * 80 ),
      y = Math.floor( Math.random() * 80 );  
  elem.setAttribute( "src", "img/smile.png" ); 
  elem.style.cssText="position: absolute;  width:"+ D +"px; height:"+ D +"px; left:"+ x +"%; top:"+ y +"%;";
  return elem;
}
/******************************************************************************************************/
function pedestalGrow(level) {
  var countInPedestal = document.querySelector('.countInPedestal');
  if (level) {
    countInPedestal.innerHTML = level;
  } else {
    countInPedestal.innerHTML = '';
  }
  fnResize();
}
/*****************************************************************************************************/
function fnResize() {
  var divHeight = document.querySelector('.div1').offsetHeight, 
      statueHeight = document.querySelector('.statue').offsetHeight,
      pedestal = document.querySelector('.pedestal'), 
      h = Math.floor( level/maxLevel * ( divHeight - statueHeight + 50 ) ); 
  console.log( 'LEVEL='+level+ 'divHeight=' + divHeight + ' statueHeight=' + statueHeight + ' h=' + h             );      
  document.querySelector('.statueOnPedestal').style.height = h + statueHeight +'px';
  pedestal.style.height = h + 'px';
}
/*****************************************************************************************************/
function playSoundAfter(fileName) { 
  var a = document.querySelector("audio");
  if ( a.ended ) {
    playSound(fileName);
  } else {
    soundTimer = setTimeout(function() { playSoundAfter(fileName) }, 100);
  }
} 
/******************************************************************************************************/
function playSound(fileName) {
  clearTimeout(soundTimer);
  var mySrc = '';
  if (fileName) mySrc = "sound/"+fileName+".mp3";
  document.querySelector("audio").setAttribute( "src", mySrc ); 
} 
/******************************************************************************************************/
function playYoutube(start, end) { 
   var mySrc = "https://www.youtube.com/embed/EPrxjhvO1TU", 
       options = "?controls=1&showinfo=0&iv_load_policy=3&modestbranding=1&fs=0&rel=0&autoplay=1&start="+start;
   if (end) options += "&end="+end;
   document.querySelector("iframe").setAttribute( "src", mySrc + options ); 
} 
/******************************************************************************************************/
function stopYoutube() {
   $('#youWinModal iframe').removeAttr('src');
} 
/******************************************************************************************************/