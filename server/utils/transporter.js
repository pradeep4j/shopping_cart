import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();

// configure the transporter for nodemailer to use gmail account to send mails
const transporter = nodemailer.createTransport({
	service: 'gmail',
	host: 'smtp.gmail.com',
	port: 465,
        secure: true, // false for other ports like 587, true for 465
	auth: {
		type: 'OAuth2',
		user: process.env.MAIL_USERNAME,
		clientId: process.env.OAUTH_CLIENT_ID,
		clientSecret: process.env.OAUTH_CLIENT_SECRET,
		refreshToken: process.env.OAUTH_REFRESH_TOKEN,
		accessToken: process.env.OAUTH_ACCESS_TOKEN,
    		expires: 1484314697598,
	},
});

export default transporter;
