var express = require('express');
var app = express();
var userSchema = require('./user');
var bodyParser = require('body-parser');
var ImageSchema  = require('./image');

var mongoose = require('mongoose');
//加密模块
var crypto = require("crypto");

//链接本地数据库
var DB_URL = 'mongodb://localhost:27017/finalHomework';
mongoose.connect(DB_URL);


//利用Express托管静态文件
app.use(express.static('page'));
//解析表单数据,extended为true则可以返回任何类型数据
app.use(bodyParser.urlencoded({extended:true}));
//显示静态页面
app.get('/',function(req,res){
    res.render('index',__dirname+"page/index.html")
});


/*插入用户到数据库函数*/
function insert(name,psw,majorTem,emailTem){
    //数据格式
    var user =  new userSchema({
        username : name,
        userpsw : psw,
        major:majorTem,
        email:emailTem
    });
    user.save(function(err,res){
        if(err){
            console.log(err);
        }
        else{
            console.log(res);
        }
    })
}

/*注册页面数据接收*/
app.post('/register', function (req, res,next) {
    //处理跨域的问题
    res.setHeader('Content-type','application/json;charset=utf-8');
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By",' 3.2.1');
    //先查询有没有这个user
    var UserName = req.body.username;
    var UserPsw = req.body.password;
    var Major = req.body.major;
    var Mail = req.body.email;
    //密码加密
    var md5 = crypto.createHash("md5");
    var newPas = md5.update(UserPsw).digest("hex");
    //通过账号验证
    var updatestr = {username: UserName};
    if(UserName == '')
    {
        console.log("user NULL");
        res.send({status:'success',message:false}) ;
    }
    res.setHeader('Content-type','application/json;charset=utf-8');
    userSchema.find(updatestr, function(err, obj)
    {
        if (err)
        {
            console.log("Error:" + err);
        }
        else
        {
            //如果查出无数据,就将账户密码插入数据库
            if(obj.length == 0)
            {
                console.log("Can! find!");
                insert(UserName,newPas,Major,Mail);
                //返回数据到前端
                res.send({status:'success',message:true})
            }
            else if(obj.length !=0)
            {
                res.send({status:'success',message:false})
            }
            else
            {
                res.send({status:'success',message:false})
            }
        }
    })
});

/*登录处理*/
app.post('/login', function (req, res,next) {
    //先查询有没有这个user
    var UserName = req.body.username;
    var UserPsw = req.body.password;
    //密码加密
    var md5 = crypto.createHash("md5");
    var newPas = md5.update(UserPsw).digest("hex");
    //处理跨域的问题
    res.setHeader('Content-type','application/json;charset=utf-8')
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By",' 3.2.1')

    //通过账号密码搜索验证
    var updatestr = {username: UserName,userpsw:newPas};
    userSchema.find(updatestr, function(err, obj)
    {
        if (err) {
            console.log("Error:" + err);
        }
        else
        {
            if(obj.length == 1)
            {
                console.log('登录成功');
                res.send({status:'success',message:true,data:obj});
            }
            else
            {
                console.log('请注册账号');
                res.send({status:'success',message:false});
            }
        }
    })
});

/* 图片加载*/
app.post('/computerScience', function (req, res) {
    var typeGet= req.body.type;
    console.log("typeGet   "+typeGet);
    console.log(typeof typeGet);
    //处理跨域的问题
    res.setHeader('Content-type','application/json;charset=utf-8')
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By",' 3.2.1')

    var imagesearch = {type: typeGet};
    ImageSchema.find(imagesearch, function(err, obj)
    {
        if (err) {
            console.log("Error:" + err);
        }
        else
        {
            if(obj.length>=1)
            {
                //var i = 0;
                //while(i<obj.length){
                    console.log("obj");
                    console.log(obj);
                    res.send(obj);
                //}

            }
            else
            {
                console.log("Wrong not find!");
                res.send({status:'success',message:false});
            }
        }
    })
});

var server = app.listen(1993,function(){
    console.log('server connect');
});
