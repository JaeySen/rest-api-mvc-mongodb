const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../model/user');
const { sendMail, sendMailTemplate } = require('../middleware/send-mail');

const HandleRegister = (req, res) => {
  let name = req.body.username;
  let email = req.body.email;
  let password = req.body.password;
  // let phonecode = req.body.phonecode;
  // let phone = req.body.phone;
  // let country = req.body.country;

  const saltRounds = 11;
  let newUserModel = new User();

  bcrypt.genSalt(saltRounds, function (err, salt) {
    bcrypt.hash(password, salt, function (err, hash) {
      newUserModel.username = name;
      newUserModel.email = email;
      newUserModel.passwordHash = hash;
      newUserModel.isAdmin = false;
      newUserModel.created = new Date().getTime();
      newUserModel.organization = '650cfb52d499bdddb44a4d11';
      newUserModel.role = 'user';
      // newUserModel.phonecode=phonecode;
      // newUserModel.phone=phone;
      // newUserModel.country=country;
      newUserModel
        .save()
        .then((doc) => {
          res.status(202).json({
            success: true,
            message: 'SignUp Successfully',
            data: {
              username: doc.username,
              email: doc.email,
              role: doc.role,
              userId: doc._id,
            },
          });
          // sendMail(email, "Sign Up Successfully");
          sendMailTemplate(email, 'Verification Notice');
        })
        .catch((err) => {
          res.status(202).json({ success: false, message: err });
        });
    });
  });
};

const HandleLogin = (req, res) => {
  // let email = req.body.email;
  let username = req.body.username;
  let password = req.body.password;

  User.findOne({ username: username }).then((user) => {
    if (user === null) {
      res.status(404).json({ message: 'User not found' });
    } else {
      const hashPass = user.passwordHash;
      bcrypt.compare(password, hashPass, (err, result) => {
        if (result) {
          // sendMail(email,'Logged In Successfully')
          // sendMailTemplate(email, 'msg');

          const token = jwt.sign(
            {
              user: user.name,
              email: user.email,
            },
            'secret',
            { expiresIn: '1h' },
          );

          res.status(202).json({
            success: true,
            auth_token: token,
            message: 'Logged In Successfully',
            data: {
              username: user.username,
              email: user.email,
              role: user.role,
              userId: user._id,
              isAdmin: user.isAdmin,
              orgId: user.organization,
              //   phonecode: user.phonecode,
              //   phone: user.phone,
              //   country: user.country,
            },
          });
        } else {
          res.status(202).json({ success: false, message: 'Invalid Credentials', data: [] });
          // sendMail(email,'Someone trying to access your account');
          // sendMailTemplate(email, 'msg');
        }
      });
    }
  });
};

module.exports = {
  HandleRegister,
  HandleLogin,
};
