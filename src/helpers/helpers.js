import bcrypt from "bcrypt"
import fetch from 'cross-fetch';


//password helpers

export const checkPassword = async (password, passwordHash) => {
    const match = await bcrypt.compare(password, passwordHash);
    if (match) {
        return true
    }
    return false
}


// export const hashPassword =  (password) =>  bcrypt.hashSync(password, 10);

export const generatePassword = async () => {
    var charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    var length = 8;
    var retVal = "";
    for (var i = 0, n = charset.length; i < length; ++i) {
        retVal += charset.charAt(Math.floor(Math.random() * n));
    }
    return retVal;
}

// Check Type the car
export const typeCar = async (weight) => {
    if (weight <= 200) {
        return 'car'
    } else if (weight > 200 && weight <= 800) {
        return 'small_truck'
    } else if (weight > 800 && weight <= 1600) {
        return 'big_truck'
    }
}

//Calculate Distance
export const distance = async (req,res) => {
    console.log('iam here');
     
    try {
        if (req.body.type == 'national') {
           
            console.log(req.body.type);
            console.log(req.body.from);
            console.log(req.body.to);
             
            const  data = await fetch(`https://www.distance24.org/route.json?stops=${req.body.from}%7C${req.body.to}`)
            if (data.status >= 400) {
                throw new Error("Bad response from server");
              }
              const distanceData =await  data.json();
              
              return distanceData.distance
            
        } 
    }
    catch (error) {
        res.status(404)
        
    }
}
//Calculating price 

export const calculatePrice = async (req, res) => {
    let price ;
    try {
        if (req.body.type === 'national') {
            if(req.body.weight > 3){
            req.body.price = `${120 + ((+req.body.weight - 3) * 5)}`
            // console.log(req.body.price);
            price = req.body.price;


            }else{
                 req.body.price = req.body.weight * 40 ;
                 price = req.body.price;
            }
            
        }
        console.log(price);
        return price;
    }
    catch (error) {
        res.status(404)
        
    }
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