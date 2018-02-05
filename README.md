For database:
    Install MySql Workbench
    Start MySql Server on port 3306
    username: root
    password: welcome
    In MySql Workbench create database "duty_db"

To install all packages use "npm i"
To start app use "npm run start"

Routs:
    POST localhost:8456/authenticate - to login;

    POST localhost:8456/worker/add - to add worker;
    GET localhost:8456/worker/getReady - to get all workers with status READY;
    GET localhost:8456/worker/getFired - to get all workers with status FIRED;
    GET localhost:8456/worker/get/:id - to get worker by id;
    PUT localhost:8456/worker/update - to update worker;
    DELETE localhost:8456/worker/delete/:id - to delete worker by id;
    GET localhost:8456/worker/getByCurrentDuty - to get worker by current duty;

    POST localhost:8456/task/add - to add task;
    GET localhost:8456/task/get - to get all tasks;
    GET localhost:8456/task/get/:id - to get one task by id;
    PUT localhost:8456/task/update - to update task;
    DELETE localhost:8456/task/delete/:id - to delete task by id;

    GET localhost:8456/duty/get - to get all duties;
    GET localhost:8456/duty/getAllByWorkerId/:workerId - to get all duties by worker id;
    GET localhost:8456/duty/getPassedByWorkerId/:workerId - to get duties with status PASSED by worker id;
    GET localhost:8456/duty/getReadyByWorkerId/:workerId - to get duties with status READY by worker id;
    GET localhost:8456/duty/getByDate/:date - to get duty by date;
    GET localhost:8456/duty/swap/:id1/and/:id2 - to swap duty with status READY of worker with id1 and worker with id2;
