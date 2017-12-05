import {Body, JsonController, Post} from "routing-controllers";
import {UserService} from "../services/UserService";
import {UserDto} from "../dto/UserDto";

@JsonController()
export class UserController{

    private userService:UserService;

    constructor(userService:UserService){
        this.userService = userService;
    }

    @Post("/login")
    public login(@Body() user:UserDto):UserDto{
        console.log("POST request to login user " + user);
        return this.userService.login(user);
    }

}