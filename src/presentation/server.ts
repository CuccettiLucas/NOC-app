import { CheckService } from "../domain/use-cases/checks/check-service";
import { LogRepositoryImpl } from "../infrastructure/repositories/log.repository.impl";
import { CronService } from "./cron/cron-service";
import { FileSystemDatasource } from "../infrastructure/datasources/file-system.datasource";
import { EmailService } from "./email/email.service";
import { SendEmailLogs } from "../domain/use-cases/email/send-email-logs";

const fileSystemLogRepository = new LogRepositoryImpl(
    new FileSystemDatasource(),
);
const emailService = new EmailService();

export class Server{
    public static start(){
        console.log("Server started...");
        const time = 5;

        new SendEmailLogs(
            emailService,
            fileSystemLogRepository
        ).execute(['nutriapp.777@gmail.com','cuccetti.lucas@gmail.com'])

        // const emailService = new EmailService();
        // emailService.sendEmailWithFileSystemLogs(
        //     ['nutriapp.777@gmail.com','cuccetti.lucas@gmail.com']
        // );

        // emailService.sendEmail({
        //     to:'cuccetti.lucas@gmail.com',
        //     //to:'nutriapp.777@gmail.com',
        //     subject:'Logs de sistema',
        //     htmlBody:`
        //         <h3>Logs del sistema - NOC</h3>
        //         <p>Texto falso Texto falso Texto falso Texto falso Texto falso Texto falso </p>
        //         <button>Ver Logs adjuntos</button>
        //     `,
        //     attachements:[]
        // });
        
        // CronService.createJob(
        //     `*/${time} * * * * *`,
        //     () => {
        //         const url:string = "http://localhost:3000"
        //        new CheckService(
        //         fileSystemLogRepository,
        //         () => console.log(`success url: ${url}`),
        //         (error) => console.log(error),
        //        ).execute(url,'Check-service.ts');
        //     },
        // );
    }
}