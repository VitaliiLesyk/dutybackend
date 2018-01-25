import {Action, createExpressServer, useExpressServer} from 'routing-controllers';
import { MicroframeworkSettings, MicroframeworkLoader } from 'microframework';
import {TaskController} from "../controllers/TaskController";
import {WorkerController} from "../controllers/WorkerController";
import {ErrorHandlerMiddleware} from "../middlewares/ErrorHandlerMiddleware";
import {DutyController} from "../controllers/DutyController";
import {CompressionMiddleware} from "../middlewares/CompressionMiddleware";
import {SecurityMiddleware} from "../middlewares/SecurityMiddleware";
import {SecurityHstsMiddleware} from "../middlewares/SecurityHstsMiddleware";
import {SecurityNoCacheMiddleware} from "../middlewares/SecurityNoCacheMiddleware";
import {AuthController} from "../controllers/AuthController";

export const expressLoader: MicroframeworkLoader = (settings: MicroframeworkSettings | undefined) => {
    if (settings) {
        let expressApp = createExpressServer({
            cors: true,
            defaultErrorHandler: false,
            controllers: [TaskController, WorkerController, DutyController, AuthController],
            middlewares: [ErrorHandlerMiddleware, CompressionMiddleware, SecurityMiddleware, SecurityHstsMiddleware, SecurityNoCacheMiddleware]
        });
        expressApp.listen(8456);

        settings.setData('express_app', expressApp);
    }
};