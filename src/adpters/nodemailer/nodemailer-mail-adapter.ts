import nodemailer from 'nodemailer';
import { MailAdapter, SendMailData } from '../mail-adpter';
const transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "33d88fca1ff902",
      pass: "3f0f051a8069db"
    }
  });

export class NodemailerMailAdapter implements MailAdapter{

    async sendMail({subject, body}: SendMailData) {
        await transport.sendMail({
            from: 'Equipe Feeget <oi@feedget.com>',
            to: 'Bruno Antunes <brunoantunes100@gmail.com>',        
            subject,
            html: body
    
        })
    };
}