import nodemailer from 'nodemailer';
import { MailerConfig } from '../config';
import Mail from 'nodemailer/lib/mailer';
import { htmlOtpContentHandler, htmlVerifyContentHandler } from '../utilities';

const mailerTransporter = nodemailer.createTransport({
  service: 'hotmail',
  auth: {
    user: MailerConfig.username,
    pass: MailerConfig.password,
  },
});

export const sendMailToVerifyAccountHandler = (mail?: string, otp?: string) => {
  const options: Mail.Options = {
    from: MailerConfig.username,
    to: mail,
    subject: 'Verify Account Email Address',
    html: htmlVerifyContentHandler(otp),
  };
  mailerTransporter.sendMail(options, (error, info) => {
    if (error) console.log(error);
    if (info) console.log(info);
  });
};

export const sendOtpToEmailHandler = (mail?: string, otp?: string) => {
  const options: Mail.Options = {
    from: MailerConfig.username,
    to: mail,
    subject: 'Reset Password',
    html: htmlOtpContentHandler(otp),
  };
  mailerTransporter.sendMail(options, (error, info) => {
    if (error) console.log(error);
    if (info) console.log(info);
  });
};
