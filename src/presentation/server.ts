import { CheckService } from "../domain/use-cases/checks/check-service";
import { CronService } from "./cron/cron-service";

export class Server{
    public static start(){
        console.log("Server started...");
        const time = 5;
        const time2 = 10;
        const time3 = 15;
        CronService.createJob(
            `*/${time} * * * * *`,
            () => {
                const url:string = "https://google.com"
               new CheckService(
                () => console.log(`success url: ${url}`),
                (error) => console.log(error),
               ).execute(url);
               //new CheckService().execute("http://localhost:3000");
            },
        );
    }
}