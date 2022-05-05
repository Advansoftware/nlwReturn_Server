import express from 'express';
import { prisma } from './prisma';
import nodemailer from 'nodemailer';

const app = express();

app.use(express.json());

const transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "33d88fca1ff902",
      pass: "3f0f051a8069db"
    }
  });

app.post('/feedbacks', async  (req, res) => {
    const { type, comment, screenshot} = req.body;
    const feedback = await prisma.feedback.create({
        data: {
            type,
            comment,
            screenshot,
        }
    })
    await transport.sendMail({
        from: 'Equipe Feeget <oi@feedget.com>',
        to: 'Bruno Antunes <brunoantunes100@gmail.com>',        
        subject: 'Novo feedback',
        html: [
            `<div style="font-family: sans-serif; font-size: 16px; color: #111;">`,
            `<p>Tipo do feedback: ${ type }</p>`,
            `<p>Comentario: ${ comment } <div /p>`,
            `</div>`
        ].join('\n')

    })
    return res.status(201).json({data: feedback});
});

app.listen(3333, () => {
    console.log('HTTP server runing');
});