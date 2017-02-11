var count,
    maxLevel = 10; 
newGame();
/******************************************************************************************************/
/******************************************************************************************************/
function newGame() {  
  count = 0;
  nextTurn();
}
/******************************************************************************************************/
function nextTurn() {  
  pedestalGrow( count );
  document.querySelector('#levelsCount').innerHTML = count;
  if ( count >= maxLevel) {
    alert('Победа!');
  } else {
    console.log(" You are right ! ");
    generateSmiles();
  }  
}
/******************************************************************************************************/
function generateSmiles() {
  var i, elem,
      board1 =  document.querySelector('.div1'),
      board2 =  document.querySelector('.div2');
  while ( elem = board1.lastElementChild ) {  board1.removeChild(elem) }
  while ( elem = board2.lastElementChild ) {  board2.removeChild(elem) }
  for ( i = ++count; i--; ) {
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
function pedestalGrow(h) {
  var statueOnPedestal = document.querySelector('.statueOnPedestal'),      
      pedestal = document.querySelector('.pedestal'),
      h = Math.floor( h*400/maxLevel );
  if (count) {
    pedestal.firstElementChild.innerHTML = count;
  } else {
    pedestal.firstElementChild.innerHTML = '';
  }
  statueOnPedestal.style.height = h + 200 +'px';
  pedestal.style.height = h + 'px';
}
/******************************************************************************************************/
/******************************************************************************************************/