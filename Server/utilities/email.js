const nodemailer = require('nodemailer');

const email = async(to,subject,text) => {
    let transporter = nodemailer.createTransport({
        host: "smtp.ethereal.email",
        port:587,
        service:process.env.SERVICES,
        secure:true,
        auth:{
            user:process.env.EMAIL,
            pass:process.env.PASSWORD
        }
    });
    const mailOption = {
        from: process.env.EMAIL,
        to:to,
        subject:subject,
        text:text
    };
    await transporter.sendMail(mailOption,(err,data,res)=>{
        if(err){
            console.log(err)
        }else{
            console.log('Confirmation Link Send Successfully');
        }
    });
}

module.exports = email;