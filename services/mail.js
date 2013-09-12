var mailer = require('nodemailer');

var smtpTransport = mailer.createTransport('SMTP', {
	service: '126',
	auth: {
		user: 'hankewins@126.com',
		pass: 'xp1234567'
	},
});

var data = {
	from: 'hankewins<hankewins@126.com>',
	to: '7269273788<7269273788@qq.com>',
 	subject: 'Hello world',
    text: 'Hello world, I am a test mail!',
    html: '<b>Hello world, I am a test mail!</b>'
}

smtpTransport.sendMail(data, function(error, response){
	if (error) {
		console.log(error);
	} else {
		console.log("Message sent: " + response.message);
	}
});
