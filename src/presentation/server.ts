import { CheckServiceMultiple } from "../domain/use-cases/checks/check-service-multiple";
import { LogRepositoryImpl } from "../infrastructure/repositories/log.repository.impl";
import { CronService } from "./cron/cron-service";
import { FileSystemDatasource } from "../infrastructure/datasources/file-system.datasource";
import { EmailService } from "./email/email.service";
import { SendEmailLogs } from "../domain/use-cases/email/send-email-logs";
import { MongoLogDatasource } from "../infrastructure/datasources/mongo-log.datasource";
import { PostgresLogDatasource } from "../infrastructure/datasources/postgre-log.datasource";

const fsLogRepository = new LogRepositoryImpl(
    new FileSystemDatasource(),
);
const MongoLogRepository = new LogRepositoryImpl(
    new MongoLogDatasource(),
);
const PostgresLogRepository = new LogRepositoryImpl(
    new PostgresLogDatasource(),
);
const emailService = new EmailService();

export class Server{
    public static start(){
        console.log("Server started...");
        const time =10;

        // new SendEmailLogs(
        //     emailService,
        //     fileSystemLogRepository
        // ).execute(['nutriapp.777@gmail.com','cuccetti.lucas@gmail.com'])

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
        
        CronService.createJob(
            `*/${time} * * * * *`,
            () => {
                const url:string = "http://localhost3000"
               new CheckServiceMultiple(
                [fsLogRepository,MongoLogRepository,PostgresLogRepository],
                () => console.log(`success url: ${url}`),
                (error) => console.log(error),
               ).execute(url,'Check-service.ts');
            },
        );
    }
}