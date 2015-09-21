function drawAnim(pos,anim,ang,dt,ctx){
  if (ang<0)
    ang+=360
  if (ang>360)
    ang-=360
  imgName=anim.prefix+ang+".png"
  img=loadedImgs[imgName]
  w=anim.ssize.x
  h=anim.ssize.y
  rows=anim.rows
  cols=anim.cols
  if (anim.num<anim.start)
    anim.num=anim.start
  if (anim.num>anim.end)
    anim.num=anim.end
  num=anim.num
  ctx.drawImage(img,img.width/cols*(num%cols)+img.width/cols/2-w/2,img.height/rows*Math.floor(num/cols)+img.height/rows/2-h/2,w,h,pos.x-anim.size.w/2,pos.y-anim.size.h/2,anim.size.w,anim.size.h);
  //anim.num+=1
  //margin=1
  anim.time+=dt
  while(anim.time>=50){
    anim.time-=50
    anim.num++
  }
  looped=false
  if (anim.start!=anim.end){
    while(anim.num>=anim.end){
      anim.num-=(anim.end-anim.start)
      looped=true
    }
  }
  return looped
}
