function showps(){
    if (this.Must.MustC.type="password") {
        document.getElementById("box").innerHTML="<input class=\"text\" type=\"text\" name=\"MustC\" size=\"80\" value="+this.Must.MustC.value+">";
        document.getElementById("click").innerHTML="<a href=\"javascript:hideps()\">隐藏密码</a>"
    }
}
function hideps(){
    if (this.Must.MustC.type="text") {
        document.getElementById("box").innerHTML="<input class=\"text\" type=\"password\" name=\"MustC\" size=\"80\" value="+this.Must.MustC.value+">";
        document.getElementById("click").innerHTML="<a href=\"javascript:showps()\">显示密码</a>"
    }
}