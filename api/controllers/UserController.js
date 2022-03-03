/**
 * UserController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

const nodemailer = require("nodemailer");
const ejs = require("ejs");

let transporter = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
        user: "adc6baef1e634b",
        pass: "d2fc1cfbf21728"
    }
});


module.exports = {

    async create(req, res) {
        try {
            let params = req.allParams();
            if (!params.name || !params.email) {
                res.json({
                    msg: "name and email both are required!"
                })
            } else {
                let newUser = await User.create({
                    name: params.name,
                    email: params.email
                });

                ejs.renderFile("./views/mailPage.ejs", { name: 'eemail' }, function (err, data) {
                    if (err) {
                        console.log(err);
                    } else {
                        var mainOptions = {
                            from: '"zignuts" heybuddy@sails.com',
                            to: params.email,
                            subject: 'Hello, world',
                            html: data
                        };
                        transporter.sendMail(mainOptions, function (err, info) {
                            if (err) {
                                console.log(err);
                            } else {
                                console.log('Message sent: ' + info.response);
                            }
                        });
                    }
                    
                });

                res.json({
                    msg: "success"
                })
            }

        } catch (err) {
            console.log("err in create user :: ", err);
            res.json({
                err: err
            })
        }
    },

    async find(req, res) {
        try {
            let users = await User.find({});

            res.json({
                msg: "success",
                allUsers: users
            })


        } catch (err) {
            console.log("err in create user :: ", err);
            res.json({
                err: err
            })
        }
    }

};

