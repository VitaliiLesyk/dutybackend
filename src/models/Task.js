"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var Entity_1 = require("typeorm/decorator/entity/Entity");
var typeorm_1 = require("typeorm");
var class_validator_1 = require("class-validator");
var Task = /** @class */ (function (_super) {
    __extends(Task, _super);
    function Task() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Task.prototype.setId = function (id) {
        this.id = id;
    };
    Task.prototype.getId = function () {
        return this.id;
    };
    Task.prototype.setName = function (name) {
        this.name = name;
    };
    Task.prototype.getName = function () {
        return this.name;
    };
    Task.prototype.setDescription = function (description) {
        this.description = description;
    };
    Task.prototype.getDescription = function () {
        return this.description;
    };
    Task.prototype.toString = function () {
        return "Task:{" +
            "id=[" + this.id + "]," +
            "name=[" + this.name + "]," +
            "description=[" + this.description + "]" +
            "}";
    };
    __decorate([
        typeorm_1.PrimaryGeneratedColumn()
    ], Task.prototype, "id", void 0);
    __decorate([
        class_validator_1.IsNotEmpty({ message: "Field name should be not empty!" }),
        class_validator_1.MaxLength(20, { message: "Name should have max size=[20]" }),
        typeorm_1.Column({ type: "varchar", nullable: false })
    ], Task.prototype, "name", void 0);
    __decorate([
        typeorm_1.Column({ type: "varchar", nullable: true })
    ], Task.prototype, "description", void 0);
    Task = __decorate([
        Entity_1.Entity()
    ], Task);
    return Task;
}(typeorm_1.BaseEntity));
exports.Task = Task;
