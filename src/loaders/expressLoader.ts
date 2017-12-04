import { createExpressServer } from 'routing-controllers';
import { MicroframeworkSettings, MicroframeworkLoader } from 'microframework';
import {TaskController} from "../controllers/TaskController";
import {WorkerController} from "../controllers/WorkerController";
import {ErrorHandlerMiddleware} from "../middlewares/ErrorHandlerMiddleware";
import {DutyController} from "../controllers/DutyController";


export const expressLoader: MicroframeworkLoader = (settings: MicroframeworkSettings | undefined) => {
    if (settings) {
        const expressApp = createExpressServer({
            defaultErrorHandler: false,
            controllers: [TaskController, WorkerController, DutyController],
            middlewares: [ErrorHandlerMiddleware]

        });

        expressApp.listen(8456);


        settings.setData('express_app', expressApp);
    }
};