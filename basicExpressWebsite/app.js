var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var nodemailer = require('nodemailer');

var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended : false}));
app.use(express.static(path.join(__dirname,'public')));

app.set('views',path.join(__dirname,'views'));
app.set('view engine','jade');


app.get('/',function(req,res){
	res.render('index',{title : 'Computer Not Working'});
})
app.get('/about',function(req,res){
	res.render('about',{title : 'about'});
})
app.get('/contact',function(req,res){
	res.render('contact',{title : 'contact'});
})

app.post('/contact/send',function(req,res){
	var imp = {
		'service' : 'Gmail',
		auth : {
			"user": "no_reply@medibox.in",
			"pass": ""
		}
	};
	var transporter = nodemailer.createTransport(imp);

	var mailOptions = {
		from : 'Sagar Testing <no_reply@medibox.in>',
		to : 'chaudharisagard@gmail.com',
		subject : 'Web Testing',
		text : 'Your have submission with following details',
		html : '<p>Your have submission with following details</p><ul><li>Name :'+req.body.name+'</li><li>Email :'+req.body.email+'</li><li>Message :'+req.body.message+'</li></ul>'
	}
	console.log("welcome to send  mail",mailOptions);
	transporter.sendMail(mailOptions, function (err,result){

		if(err){
			console.log('Error ');
			res.redirect('/');
		}else{
			console.log('Message sent :'+result.response);
			res.redirect('/');
		}

	});
})


app.listen(3000);
console.log('server is running on port : 3000');