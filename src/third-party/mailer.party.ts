import nodemailer from 'nodemailer';
import { MailerConfig } from '../config';
import Mail from 'nodemailer/lib/mailer';
import { htmlContentHandler } from '../utilities';

const mailerTransporter = nodemailer.createTransport({
  service: 'hotmail',
  auth: {
    user: MailerConfig.username,
    pass: MailerConfig.password,
  },
});

export const sendMailToVerifyAccountHandler = (mail?: string, _id?: string) => {
  const options: Mail.Options = {
    from: MailerConfig.username,
    to: mail,
    subject: 'Verify Account Email Address',
    html: htmlContentHandler(_id),
  };
  mailerTransporter.sendMail(options, (error, info) => {
    if (error) console.log(error);
    if (info) console.log(info);
  });
};
