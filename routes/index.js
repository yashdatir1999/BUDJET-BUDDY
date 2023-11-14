var express = require('express');
var router = express.Router();

const USER = require("../module/usermodel")
const passport = require("passport")
const LocalStrategy = require("passport-local")
passport.use(new LocalStrategy(USER.authenticate()))
const nodemailer = require("nodemailer")
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/about', function(req, res, next) {
  res.render('about', { title: 'Express' });
});

router.get('/services', function(req, res, next) {
  res.render('Services', { title: 'Express' });
});

router.get('/contactus', function(req, res, next) {
  res.render('ContactUs', { title: 'Express' });
});

router.get('/signup', function(req, res, next) {
  res.render('signup', { title: 'Express' });
});

router.post('/signup',async function(req, res, next) {
try {
  await USER.register(
    {username: req.body.username ,
     email: req.body.email},
    req.body.password)
    res.redirect("/signin")
} catch (error) {
  res.send(error)
}
});

router.get('/signin', function(req, res, next) {
  res.render('signin', { title: 'Express' });
});

router.post('/signin', 
passport.authenticate("local",{
  successRedirect: "/",
  failureRedirect: "/signin"
}),function(req, res, next) {
  res.render('signin', { title: 'Express' });
});

router.get('/forgetpassword', function(req, res, next) {
  res.render('forgetpassword', { title: 'Express' });
});

router.post('/sendotp', async function(req, res, next) {
try {
  const user = await USER.findOne({email: req.body.email})
  if(!user) return res.send("no user found")

  otphandler(req , res ,user)

} catch (error) {
  res.send(error)  
}
});

function otphandler(req , res , user){
  const otp = Math.floor(10000 + Math.random()*9999)

// admin mail address, which is going to be the sender
const transport = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  port: 465,
  auth: {
      user: "yashdatir1999@gmail.com",
      pass: "fnjf hnpc buue xlil",
  },
});

// receiver mailing info
const mailOptions = {
  from: "Dhanesh Pvt. Ltd.<yashdatir1999@gmail.com>",
  to: user.email,
  subject: "Testing Mail Service",
  // text: req.body.message,
  html: `<h1>${otp}</h1>`,
};

// actual object which intregrate all info and send mail
transport.sendMail(mailOptions, (err, info) => {
  if (err) return res.send(err);
  console.log(info);
  user.otp = otp
  user.save()
  res.render("otp" ,{email: user.email , admin: req.user})
});
}

router.post('/enterotp/:email', async function(req, res, next) {
  try {
    const user = await USER.findOne({email: req.params.email})
    if(user.otp == req.body.otp){
      user.otp = -1
      res.render("resetpassword" , {user})
    }
  } catch (error) {
    res.send(error)  
  }
});


router.post('/resetpassword/:email', async function(req, res, next) {
  try {
    if(req.body.newpassword == req.body.cnfpassword){
      const user = await USER.findOne({email: req.params.email})
      await user.setPassword(req.body.newpassword)
      await user.save()
      res.redirect("/signin")
    }else{
      res.send("new password and conform password are not same")
    }
  } catch (error) {
    res.send(error)  
  }
});
  

module.exports = router;
