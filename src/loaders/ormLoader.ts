import {MicroframeworkLoader, MicroframeworkSettings} from "microframework";
import {createConnection} from "typeorm";
import {DutyService} from "../services/DutyService";
import {Container} from "typedi";
import {DutyCreateSchedule} from "../schedule/DutyCreateSchedule";

export const ormLoader: MicroframeworkLoader = async (settings: MicroframeworkSettings | undefined) => {

    const connection = await createConnection({
        type: 'mysql',
        host: 'localhost',
        port: 3306,
        username: 'root',
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
        dropSchema: true,
        timezone: 'local'
    });

    if (settings) {
        createAndStartDutySchedule();

        settings.setData('connection', connection);
        settings.onShutdown(() => connection.close());
    }
};

function createAndStartDutySchedule(){
    console.log("ormLoader: createAndStartDutySchedule method to create and start duty schedule");
    let dutyService: DutyService = Container.get<DutyService>(DutyService);
    let dutySchedule:DutyCreateSchedule = new DutyCreateSchedule(dutyService);
    dutySchedule.start();
}