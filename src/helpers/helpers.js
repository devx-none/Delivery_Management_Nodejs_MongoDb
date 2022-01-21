import bcrypt from "bcrypt"


//password helpers

export const checkPassword = async (password, passwordHash) => {
    const match = await bcrypt.compare(password, passwordHash);
    if (match) {
        return true
    }
    return false
}


export const hashPassword =  (password) =>  bcrypt.hashSync(password, 10);

export const generatePassword = async () => {
    var charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    var length = 8;
    var retVal = "";
    for (var i = 0, n = charset.length; i < length; ++i) {
        retVal += charset.charAt(Math.floor(Math.random() * n));
    }
    return retVal;
}

export const sendEmail = async (email, password) => {

    let transporter = nodemailer.createTransport({
        host: "smtp.ethereal.email",
        port: 587,
        secure: false, // true for 465, false for other ports
        service: "Gmail",
        auth: {
            user: process.env.EMAIL,
            pass: process.env.PASS,
        },
    });

    let info = await transporter.sendMail({
        from: 'Welcome <checker.safiairline@gmail.com>',
        to: email,
        subject: " send new account ",
        text: " Test ",
        html: `<b>Email :  ${email}</b>
        <b> password : ${password}</b>`,
    });

    console.log("Preview URL: %s", info);


}