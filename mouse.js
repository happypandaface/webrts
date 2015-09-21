
function changeCallback(e){
  if(document.pointerLockElement === game.cursor.canvas ||
    document.mozPointerLockElement === game.cursor.canvas ||
    document.webkitPointerLockElement === game.cursor.canvas) {
    game.cursor.locked=true
  } else {
    game.cursor.locked=false
  }
  //game.cursor.pos.x=0
  //game.cursor.pos.y=0
}
function setupMouse(){
  var c = document.getElementById("myCanvas");
  c.requestPointerLock = c.requestPointerLock ||
    c.mozRequestPointerLock ||
    c.webkitRequestPointerLock;
  document.exitPointerLock = document.exitPointerLock ||
    document.mozExitPointerLock ||
    document.webkitExitPointerLock;
  /*
  document.exitPointerLock = document.exitPointerLock ||
    document.mozExitPointerLock ||
    document.webkitExitPointerLock;
    document.exitPointerLock();
  */
  game.cursor={canvas:c,anim:game.cursorAnim,pos:{x:100,y:100},locked:false}
  document.addEventListener('pointerlockchange', changeCallback, false);
  document.addEventListener('mozpointerlockchange', changeCallback, false);
  document.addEventListener('webkitpointerlockchange', changeCallback, false);
  c.addEventListener('mousemove', function(evt) {
    var dx = evt.movementX ||
      evt.mozMovementX ||
      evt.webkitMovementX ||
      0
    var dy = evt.movementY ||
      evt.mozMovementY ||
      evt.webkitMovementY ||
      0
    if (dx>30)
      dx=30
    if (dy>30)
      dy=30
    if (dx<-30)
      dx=-30
    if (dy<-30)
      dy=-30
    if(game.cursor.locked)
      game.cursor.pos=add(game.cursor.pos, {x:dx,y:dy})
    if(game.cursor.pos.x<=0){
      diffX=game.cursor.pos.x
      //game.screen.offset.x+=diffX
      game.cursor.pos.x=0
    }
    if(game.cursor.pos.x>=game.screen.dim.w){
      diffX=game.cursor.pos.x-game.screen.dim.w
      //game.screen.offset.x+=diffX
      game.cursor.pos.x=game.screen.dim.w
    }
    if(game.cursor.pos.y<=0){
      diffY=game.cursor.pos.y
      //game.screen.offset.y+=diffY
      game.cursor.pos.y=0
    }
    if(game.cursor.pos.y>=game.screen.dim.h){
      diffY=game.cursor.pos.y-game.screen.dim.h
      //game.screen.offset.y+=diffY
      game.cursor.pos.y=game.screen.dim.h
    }
    //var mousePos = getMousePos(c, evt);
    //var message = 'Mouse position: ' + mousePos.x + ',' + mousePos.y;
  }, false);
  c.addEventListener('mouseup', function(evt) {
    if(!game.cursor.locked)
      c.requestPointerLock();
    else{
      //var mousePos = getMousePos(c, evt);
      if(evt.which==1){
        for (i in game.objs){
          var obj=game.objs[i]
          var clickPos=add(game.cursor.pos,game.screen.offset)
          var diff=getDiff(clickPos,obj.pos)
          var len=getLen(diff)
          if(len<30){
            addTypes(obj.types,['selected'])
          }else{
            removeTypes(obj.types,['selected'])
          }
        }
      }else
      if(evt.which==3){
        for (i in game.objs){
          var obj=game.objs[i];
          if(checkTypes(obj.types,['friendly','selected'])){
            obj.destType="move"
            obj.dest.x=game.cursor.pos.x+game.screen.offset.x
            obj.dest.y=game.cursor.pos.y+game.screen.offset.y
          }
        }
      }
      //var message = 'Mouse position: ' + mousePos.x + ',' + mousePos.y;
    }
  });
}
