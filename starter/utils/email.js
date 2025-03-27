const nodemailer = require('nodemailer')
const { htmlToText } = require('html-to-text')

module.exports = class Email{
  constructor(user,url){
    console.log("user",user);
    console.log('reset url',url);
    this.to = user.email
    this.firstname = user.name.split(' ')[0]
    this.url = url
    this.form = `ayush <${process.env.EMAIL_FORM}>`
  }

  newTransport(){
    if(process.env.NODE_ENV === 'production'){
      return 1
    }

    
      return nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth: {
          user: process.env.EMAIL_USERNAME, 
          pass: process.env.EMAIL_PASSWORD
        }
      });
    
  }

  async send(template,subject){
    //send the actual email
    //1) render html based on a pug template
    const html='define your customize html formate at email.js line number 34'

    //2)define email options
    const mailOptions ={
      from:this.form,
      to : this.to,
      subject,
      html,
      text: htmlToText(html), // Use htmlToText() instead of fromString()

  }
  console.log(mailOptions);
   
    //3)create a transport and send email
    await this.newTransport().sendMail(mailOptions)
  }  

  async sendWelcome(){
    await this.send('welcome','welcome to the natours family')
  }
  async sendpassword(){
    await this.send(
      'passwordReset',
      'Your pwd reset token(valid for 10min)'
    )
  }
}




//sendgrid EGDYU7SYFDX5T4TU6YK84VRQ