import nodemailer from 'nodemailer';
import { envs } from '../../config/plugins/env.plugin';
import { LogRepository } from '../../domain/repository/log.repository';
import { LogEntity, LogSeverityLevel } from '../../domain/entities/log.entity';

interface sendEmailOptions{
    to:string | string[];
    subject:string;
    htmlBody:string;
    attachements:Attachment [];
}

interface Attachment{
    filename?:string;
    path?:string;
}

export class EmailService{

    private transporter = nodemailer.createTransport({
        service: envs.MAILER_EMAIL,
        auth:{
            user: envs.MAILER_EMAIL,
            pass: envs.MAILER_SECRET_KEY,
        }
    });

    constructor(){}

    async sendEmail(options:sendEmailOptions):Promise<boolean>{
        const {to,subject,htmlBody, attachements=[]} = options;

        try {
            const sentInformation = await this.transporter.sendMail({
                to:to,
                subject:subject,
                html:htmlBody,
                attachments:attachements,
            });
            const log = new LogEntity({
                level: LogSeverityLevel.low,
                message: 'Email Sent',
                origin:'email.service.ts'
            })
            return true;
        } catch (error) {
            const log = new LogEntity({
                level: LogSeverityLevel.high,
                message: 'Email not Sent',
                origin:'email.service.ts'
            })
            return false;
        }
    }

    async sendEmailWithFileSystemLogs(to: string | string[]){
        const subject = 'Logs del servidor';
        const htmlBody = `
            <h3>Logs del sistema - NOC</h3>
            <p>con atachment Texto falso Texto falso Texto falso Texto falso Texto falso Texto falso </p>
            <button>Ver Logs adjuntos</button>
        `;
        const attachements:Attachment[] = [
            {filename:'logs-all.log', path:'./logs/logs-all.log'},
            {filename:'logs-medium.log', path:'./logs/logs-medium.log'},
            {filename:'logs-high.log', path:'./logs/logs-high.log'},
        ]

        const response = this.sendEmail({
            to,subject,attachements,htmlBody
        });

        return response;
    }



}