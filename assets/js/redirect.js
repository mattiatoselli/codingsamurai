var path = window.location.href
var count = (path.match(/codingsamurai/g) || []).length;
if(count>1){
    var param = path.split("/");
    window.location.href = "https://mattiatoselli.github.io/codingsamurai/"+param[param.length-2];
}