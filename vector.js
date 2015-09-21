
function getDiff(v1,v2){
  return {x:v2.x-v1.x,y:v2.y-v1.y}
}
function getAng(v){
  return Math.atan2(v.y,v.x)
}
function getLen(v){
  return Math.sqrt(v.x*v.x+v.y*v.y)
}
function scl(v,s){
  return {x:v.x*s,y:v.y*s}
}
function add(v1,v2){
  return {x:v1.x+v2.x,y:v1.y+v2.y}
}
function cpy(v){
  return {x:v.x, y:v.y}
}
function log(v){
  return "{x:"+v.x+", y:"+v.y+"}"
}
