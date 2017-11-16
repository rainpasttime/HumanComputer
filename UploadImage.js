//检查图片的格式是否正确,同时实现预览
function setImagePreview(obj, localImagId, imgObjPreview) {
    var array = new Array('gif', 'jpeg', 'png', 'jpg', 'bmp'); //可以上传的文件类型
    if (obj.value == '') {
        $.messager.alert("提示", "让选择要上传的图片!");
        flag = false;
        return false;
    }
    else {
        var fileContentType = obj.value.match(/^(.*)(\.)(.{1,8})$/)[3]; //这个文件类型正则很有用
        ////布尔型变量
        var isExists = false;
        var objValue = obj.value;
        try {
            //对于IE判断要上传的文件的大小
            var fso = new ActiveXObject("Scripting.FileSystemObject");
            fileLenth = parseInt(fso.getFile(objValue).size);
        } catch (e) {
            try {
                //对于非IE获得要上传文件的大小
                fileLenth = parseInt(obj.files[0].size);
            } catch (e) {
                flag = false;
                return false;
            }
        }
        //循环判断图片的格式是否正确
        for (var i in array) {
            if (fileContentType.toLowerCase() == array[i].toLowerCase()) {
                //图片格式正确之后，根据浏览器的不同设置图片的大小
                if (obj.files && obj.files[0]) {
                    //火狐下，直接设img属性
                    imgObjPreview.style.display = 'block';
                    imgObjPreview.style.width = '180px';
                    imgObjPreview.style.height = '200px';
                    //火狐7以上版本不能用上面的getAsDataURL()方式获取，需要一下方式
                    imgObjPreview.src = window.URL.createObjectURL(obj.files[0]);
                    if (fileLenth > 102400) {
                        $.messager.alert("提示", "请选择小于100k的图片!");
                        flag = false;
                        return false;
                    }
                }
                else {
                    //IE下，使用滤镜
                    obj.select();
                    var imgSrc = document.selection.createRange().text;
                    //必须设置初始大小
                    localImagId.style.width = "180px";
                    localImagId.style.height = "200px";
                    //图片异常的捕捉，防止用户修改后缀来伪造图片
                    try {
                        localImagId.style.filter = "progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod=scale)";
                        localImagId.filters.item("DXImageTransform.Microsoft.AlphaImageLoader").src = imgSrc;
                    }
                    catch (e) {
                        $.messager.alert("提示", "您上传的图片格式不正确，请重新选择!");
                        flag = false;
                        return false;
                    }
                    imgObjPreview.style.display = 'none';
                    document.selection.empty();
                }
                isExists = true;
                flag = true;
                return true;
            }
        }
        if (isExists == false) {
            $.messager.alert("提示", "上传图片类型不正确!");
            flag = false;
            return false;
        }
        flag = false;
        return false;
    }
}
