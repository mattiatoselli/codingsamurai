var path = window.location.href
alert(path)
var count = (path.match(/codingsamurai/g) || []).length;
alert(count)
if(count>1){
    var param = path.split("/");
    alert(param)
    alert(param[param.length-1])
    window.location.href = "https://mattiatoselli.github.io/codingsamurai/"+param[param.length-1];
}