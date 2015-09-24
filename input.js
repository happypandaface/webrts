
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
  game.keysDown={}
  document.addEventListener('pointerlockchange', changeCallback, false);
  document.addEventListener('mozpointerlockchange', changeCallback, false);
  document.addEventListener('webkitpointerlockchange', changeCallback, false);
  document.onkeydown=function(evt) {
    //if(evt.shiftKey)
    //  game.keysDown['shift']=true
  }
  document.onkeyup=function(evt) {
    //if(evt.shiftKey)
    //  game.keysDown['shift']=false
  }
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
    var c = document.getElementById("myCanvas");
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
            if(!evt.shiftKey)
              removeTypes(obj.types,['selected'])
          }
        }
      }else
      if(evt.which==3){
        var toMove=[]
        for (var i in game.objs){
          var obj=game.objs[i];
          if(checkTypes(obj.types,['friendly','selected'])){
            toMove.push(obj)
          }
        }
        var sq=Math.round(Math.sqrt(toMove.length))
        var size=30
        var movePoss=[]
        for (var i in toMove){
          movePoss.push({x:game.cursor.pos.x+game.screen.offset.x+(-sq/2+i%sq)*size
,y:game.cursor.pos.y+game.screen.offset.y+(-sq/2+Math.floor(i/sq))*size})
        }
        for (var i in movePoss){
          var mPos=movePoss[i]
          var bestObj=null
          for (var c in toMove){
            var obj=toMove[c]
            var diff=getDiff(obj.pos,mPos)
            var len=getLen(diff)
            if(bestObj==null||bestObj.len>len){
              bestObj={obj:obj,len:len}
            }
          }
          bestObj.obj.destType="move"
          bestObj.obj.dest.x=game.cursor.pos.x+game.screen.offset.x+(-sq/2+i%sq)*size
          bestObj.obj.dest.y=game.cursor.pos.y+game.screen.offset.y+(-sq/2+Math.floor(i/sq))*size
          for (var c in toMove){
            if (toMove[c]==bestObj.obj){
              toMove.splice(c,1)
              break
            }
          }
        }
      }
      //var message = 'Mouse position: ' + mousePos.x + ',' + mousePos.y;
    }
  });
}
