
function checkTypes(types,chtypes){
  for (var ti in chtypes){
    var inTypes=false
    for (var tc in types)
      if (chtypes[ti]==types[tc])
        inTypes=true
    if (!inTypes)
      return false
  }
  return true
}
function removeTypes(types,rmTypes){
  for (var ti in rmTypes){
    for (var tc=0;tc<types.length;++tc){
      if (rmTypes[ti]==types[tc]){
        types.splice(tc,1)
        tc-=1
      }
    } 
  }
}
function addTypes(types,addTypes){
  for (var ti in addTypes){
    var typeAlreadyAdded=false
    for (var tc=0;tc<types.length;++tc){
      if (addTypes[ti]==types[tc]){
        typeAlreadyAdded=true
        break
      }
    }
    if(!typeAlreadyAdded){
      types.push(addTypes[ti])
    }
  }
}
