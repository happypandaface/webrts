function loadAssets(sounds,imgs,angImgs,callback){
  //setup all the different angles for the images with different angles (angImgs)
  //the angImgs is an array of prefixes (can include '/') and get the angle plus '.png' appended 
  //the angle is 0 to 315
  //there's a blender script in my notes for exporting this from blender, along with how to use the script
  for (var i in angImgs){
    for (var ang=0;ang<360;ang+=45){
      imgName=angImgs[i]+ang+'.png'
      imgs.push(imgName)
    }
  }
  imgsLoaded=0
  loadedImgs={}
  for (var s in imgs){
    var img = new Image();
    img.src=imgs[s];
    img.onload=function(){
      imgsLoaded++
      console.log("cur: "+imgsLoaded+", tot: "+imgs.length)
      if (soundsLoaded==sounds.length&&
        imgsLoaded==imgs.length)
        callback()
    };
    loadedImgs[imgs[s]]=img;
  }
  soundsLoaded=0
  loadedSounds={}
  for (var s in sounds){
    var sound = new Audio(sounds[s]);
    sound.onloadeddata=function(){
      soundsLoaded++
      console.log("cur: "+soundsLoaded+", tot: "+sounds.length)
      if (soundsLoaded==sounds.length&&
        imgsLoaded==imgs.length)
        callback()
    };
    loadedSounds[sounds[s]]=sound;
  }
}
