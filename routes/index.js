var express = require('express');
var router = express.Router();

const USER = require("../module/usermodel")
const USEREXPENSES = require("../module/userexpenses")
const passport = require("passport")
const LocalStrategy = require("passport-local")
passport.use(new LocalStrategy(USER.authenticate()))
const nodemailer = require("nodemailer")

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { admin: req.user });
});

router.get('/about', function(req, res, next) {
  res.render('about', { admin: req.user });
});

router.get('/services', function(req, res, next) {
  res.render('Services', { admin: req.user });
});

router.get('/contactus', function(req, res, next) {
  res.render('ContactUs', { admin: req.user });
});

router.get('/signup', function(req, res, next) {
  res.render('signup', { admin: req.user });
});

router.post('/signup',async function(req, res, next) {
try {
  await USER.register(
    {username: req.body.username ,
     email: req.body.email ,
     mobile: req.body.mobile ,
     budget: 10000 },
    req.body.password)
    res.redirect("/signin")
} catch (error) {
  res.send(error)
}
});

router.get('/signin', function(req, res, next) {
  res.render('signin', { admin: req.user });
});

router.post('/signin', 
passport.authenticate("local",{
  successRedirect: "/profile",
  failureRedirect: "/signin"
}),function(req, res, next) {
  res.render('signin', { title: 'Express' });
});

router.get('/forgetpassword', function(req, res, next) {
  res.render('forgetpassword', { admin: req.user });
});

router.get('/delete/:id', islogin, async function(req, res, next) {
  try {
    const del = await USER.findByIdAndDelete(req.params.id) 
    console.log(del.userexpenses)
    del.userexpenses.forEach(async (d)=>{
      await USEREXPENSES.findByIdAndDelete(d._id)
    })
    res.redirect("/")
  } catch (error) {
    res.send(error)
  }
});

router.get('/update/:id', islogin, async function(req, res, next) {
  try {
    const user = await USER.findById(req.params.id)
    res.render('update', { admin: req.user , user });  
  } catch (error) {
    res.send(error)
  }
});

router.post('/update/:id', islogin, async function(req, res, next) {
  try {
    await USER.findByIdAndUpdate(req.params.id , 
      {username: req.body.username , 
       email: req.body.email , 
       mobile: req.body.mobile , 
       budget: req.body.budget})
    res.redirect("/profilesetting")
  } catch (error) {
    res.send(error)
  }
});

router.get('/changepassword/:id', islogin, async function(req, res, next) {
  try {
    const user = await USER.findById(req.params.id)
    console.log(user)
    res.render('changepassword', { admin: req.user , user });    
  } catch (error) {
    res.send(error)
  }
});

router.post('/changepassword/:id',  async function(req, res, next) {
  try {
    if(req.body.newpassword == req.body.cnfpassword){
      const user = await USER.findById(req.params.id)
      user.changePassword(req.body.oldpassword , req.body.newpassword)
      await user.save()
      res.redirect("/signin")
    }else{
      res.send("NEW PASSWORD AND CONFORM PASSWORD NOT MATCH")
    }

  } catch (error) {
    res.send(error)
  }
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
  from: "Budjet Buddy Pvt. Ltd.<yashdatir1999@gmail.com>",
  to: user.email,
  subject: "Budget Buddy Account Recovery OTP Request",
  // text: req.body.message,
  html: `<h1>Dear ${user.username} ,</h1> 
  <br></br>
  <br></br>
  We hope this message finds you well. We are reaching out to you from Budget Buddy regarding a recent request for the recovery of your account associated with the email address ${user.email}.
  <br></br>
  <br></br>
  As part of our account recovery process and to ensure the security of your Budget Buddy account, we require you to verify your identity by providing a one-time password (OTP). Please find the OTP details below:
  <br></br>
  <br></br>
  <ul>
    <li><strong>OTP Code:</strong> ${otp}</li>
    <li><strong>Purpose:</strong> Account Recovery</li>
  </ul>
  <br></br>
  <br></br>
  Please enter the provided OTP on the account recovery page to complete the process. If you did not initiate this account recovery request, or if you have any concerns about the security of your account, please contact our support team immediately at support.budjetbuddy.com.
  <br></br>
  <br></br>
  It's important to us that your account remains secure, and we appreciate your prompt attention to this matter. Thank you for choosing Budget Buddy.
  <br></br>
  <br></br>
  Best regards,
  <br></br>
  <br></br>
  The Budget Buddy Team
  <br></br>
  support.budjetbuddy.com

  `,
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
      res.render("resetpassword" , {user , admin: req.user})
    }else{
      res.send("WRONG OTP")
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
  
router.get('/profile', islogin ,async function(req, res, next) {
  try {
    const userbudget = await req.user.populate("userexpenses")
    const user = userbudget.userexpenses
    var total = 0
    user.forEach(function(u){
      total += u.expenseamount
    })
    console.log(total)
    res.render("profile" , { admin: req.user , user , total})
  } catch (error) {
    res.send(error)
  }
});

router.get('/signout', islogin, function(req, res, next) {
  req.logout(() =>{
    res.redirect("/signin")
  })
});

router.get('/profilesetting', islogin, function(req, res, next) {
  res.render("profilesetting" , {admin: req.user})
});

function islogin(req , res , next){
  if(req.isAuthenticated()){
    next()
  }else{
    res.redirect("/signin")
  }
}

router.post('/search', islogin, async function(req, res, next) {
  try {
    var searcharr =[]
    const userbudget = await req.user.populate("userexpenses")
    const user = userbudget.userexpenses
    user.forEach((u)=>{
      if(u.catagory === req.body.search || u.subcatagory === req.body.search || u.expansesname === req.body.search){
        searcharr.push(u)
      }
    })
    console.log(searcharr)
    res.render("searchpage" , {admin: req.user , searcharr})
  } catch (error) {
    res.send(error)
  }
});

// /////////////// EXPENSES ////////////////

router.get('/addexpenses', islogin, function(req, res, next) {
  res.render('addexpenses', { admin: req.user });
});

router.post('/addexpenses', islogin, async function(req, res, next) {
  try {
    const newexpenses = new USEREXPENSES(req.body)
    req.user.userexpenses.push(newexpenses._id)
    newexpenses.user = req.user.id
    await newexpenses.save()
    await req.user.save()
    res.redirect("/profile")
  } catch (error) {
    res.send(error)
  }
});

router.get('/deleteexpenses/:id', islogin, async function(req, res, next) {
try {
  const expenseindex = req.user.userexpenses.findIndex((i)=>{
    i._id == req.params.id
  })
  req.user.userexpenses.splice(expenseindex , 0)
  await req.user.save() 
  await USEREXPENSES.findByIdAndDelete(req.params.id)
  res.redirect("/profile")
} catch (error) {
  res.send(error)
}
});

router.get('/updateexpenses/:id', islogin, async function(req, res, next) {
  try {
    const expense = await USEREXPENSES.findById(req.params.id)
    console.log(expense)
    res.render("updateexpenses" , {expense , admin: req.user})
  } catch (error) {
    res.send(error)
  }
});

router.post('/updateexpenses/:id', islogin, async function(req, res, next) {
  try {
    await USEREXPENSES.findByIdAndUpdate(req.params.id , req.body)
    res.redirect("/profile")
    } catch (error) {
    res.send(error)
  }
});

router.get('/clearallexpenses/:id', islogin, async function(req, res, next) {
  try {
    const all = req.user.userexpenses 
    all.forEach(async (a)=>{
      var delid = await USEREXPENSES.findByIdAndDelete(a._id)
    })
    req.user.userexpenses.splice(0)
    await req.user.save() 
    res.redirect("/profile")
  } catch (error) {
    res.send(error)
  }
  });

module.exports = router;
