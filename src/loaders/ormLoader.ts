import {MicroframeworkLoader, MicroframeworkSettings} from "microframework";
import {createConnection} from "typeorm";
import {DutyService} from "../services/DutyService";
import {Container} from "typedi";
import {DutyCreateSchedule} from "../schedule/DutyCreateSchedule";
import {WorkerService} from "../services/WorkerService";

export const ormLoader: MicroframeworkLoader = async (settings: MicroframeworkSettings | undefined) => {

    const connection = await createConnection({
        type: 'postgres',
        host: 'localhost',
        port: 5432,
        username: 'postgres',
        password: 'welcome',
        database: 'duty_db',
        synchronize: true,
        logging: false,
        entities: [
            "dist/models/**/*.js"
        ],
        migrations: [
            "dist/migration/**/*.js"
        ],
        subscribers: [
            "dist/subscriber/**/*.js"
        ],
        cli: {
            "entitiesDir": "dist/models",
            "migrationsDir": "dist/migration",
            "subscribersDir": "dist/subscriber"
        },
        dropSchema: false
    });

    if (settings) {
        createAndStartDutySchedule();

        settings.setData('connection', connection);
        settings.onShutdown(() => connection.close());
    }
};

function createAndStartDutySchedule(){
    console.log("ormLoader: createAndStartDutySchedule method to create and start duties schedule");
    let dutyService: DutyService = Container.get<DutyService>(DutyService);
    let workerService: WorkerService = Container.get<WorkerService>(WorkerService);
    let dutySchedule:DutyCreateSchedule = new DutyCreateSchedule(workerService, dutyService);
    dutySchedule.start();
}