import { CheckService } from "../domain/use-cases/checks/check-service";
import { LogRepositoryImpl } from "../infrastructure/repositories/log.repository.impl";
import { CronService } from "./cron/cron-service";
import { FileSystemDatasource } from "../infrastructure/datasources/file-system.datasource";

const fileSystemLogRepository = new LogRepositoryImpl(
    new FileSystemDatasource(),
);

export class Server{
    public static start(){
        console.log("Server started...");
        const time = 5;
        const time2 = 10;
        const time3 = 15;
        CronService.createJob(
            `*/${time} * * * * *`,
            () => {
                const url:string = "http://localhost:3000"
               new CheckService(
                fileSystemLogRepository,
                () => console.log(`success url: ${url}`),
                (error) => console.log(error),
               ).execute(url);
               //new CheckService().execute("http://localhost:3000");
            },
        );
    }
}