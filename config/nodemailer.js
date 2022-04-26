const nodemailer = require('nodemailer')
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

module.exports = (user, email, verifyCode) => {
  let transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: process.env.USER_ACCOUNT,
      pass: process.env.USER_PASS
    },
  })

  let mailOptions = {
    from: process.env.USER_ACCOUNT,
    to: email,
    subject: '家庭記帳本-重設密碼',
    html: `
          <p>${user.name} 您好,</p>
          <p>請回到頁面後輸入 <strong>${verifyCode}</strong> 進行重設密碼的動作。</p>
        `
    ,
  }

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error)
    } else {
      console.log('訊息發送: ' + info.response)
    }
  })
}




