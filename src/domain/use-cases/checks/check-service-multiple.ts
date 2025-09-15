import { LogEntity, LogSeverityLevel } from "../../entities/log.entity";
import { LogRepository } from "../../repository/log.repository";

interface CheckServiceMultipleUseCase{
    execute(url:string,origin:string):Promise<boolean>;
}

type SuccessCallback = (() => void) | undefined;
type ErrorCallback = ((error:string) => void) | undefined;

export class CheckServiceMultiple implements CheckServiceMultipleUseCase{

    constructor(
        private readonly logRepository: LogRepository[],
        private readonly successCallback:SuccessCallback,
        private readonly errorCallBack:ErrorCallback,
    ){}

    private callLogs(log:LogEntity){
        this.logRepository.forEach( logRepository =>{
            logRepository.saveLog(log);
        })
    }

    public async execute(url:string,origin:string):Promise<boolean>{
        
        try {
            const req = await fetch(url);
            if (!req.ok) throw new Error(`Error on check service: ${url}`);

            const options = {
                message:`Service ${url} working`,
                level:LogSeverityLevel.low,
                origin:origin
            }

            const log = new LogEntity(options);
            this.callLogs(log);
            this.successCallback && this.successCallback();
            return true;

        } catch (error) {

            const errorMessage = `${url} is not ok.${error}\nOrigin: ${origin}`;
            const options = {
                message:errorMessage,
                level:LogSeverityLevel.high,
                origin:origin
            }
            const log = new LogEntity(options);
            this.callLogs(log);
            this.errorCallBack && this.errorCallBack(errorMessage);
            return false;

        }
    

    }

}