import 'reflect-metadata';
import { bootstrapMicroframework } from 'microframework';
import { expressLoader } from './loaders/expressLoader';
import { iocLoader } from './loaders/iocLoader';
import {ormLoader} from "./loaders/ormLoader";
import 'datejs';

bootstrapMicroframework({
    loaders: [
        iocLoader,
        ormLoader,
        expressLoader
    ]
})
    .then(() => {console.log('Application is started!');})
    .catch(error => console.error('Application is crashed: ' + error));
