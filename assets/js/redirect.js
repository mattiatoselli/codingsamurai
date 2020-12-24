var path = window.location.href
console.log(path)
var count = (path.match(/codingsamurai/g) || []).length;
console.log(count)
if(count>1){
    var param = path.split("/");
    console.log(param)
    console.log(param[param.length-1])
    window.location.href = "https://mattiatoselli.github.io/codingsamurai/"+param[param.length-1];
}