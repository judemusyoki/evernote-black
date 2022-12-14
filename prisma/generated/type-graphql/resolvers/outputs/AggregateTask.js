"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AggregateTask = void 0;
const tslib_1 = require("tslib");
const TypeGraphQL = tslib_1.__importStar(require("type-graphql"));
const TaskCountAggregate_1 = require("../outputs/TaskCountAggregate");
const TaskMaxAggregate_1 = require("../outputs/TaskMaxAggregate");
const TaskMinAggregate_1 = require("../outputs/TaskMinAggregate");
let AggregateTask = class AggregateTask {
};
tslib_1.__decorate([
    TypeGraphQL.Field(_type => TaskCountAggregate_1.TaskCountAggregate, {
        nullable: true
    }),
    tslib_1.__metadata("design:type", TaskCountAggregate_1.TaskCountAggregate)
], AggregateTask.prototype, "_count", void 0);
tslib_1.__decorate([
    TypeGraphQL.Field(_type => TaskMinAggregate_1.TaskMinAggregate, {
        nullable: true
    }),
    tslib_1.__metadata("design:type", TaskMinAggregate_1.TaskMinAggregate)
], AggregateTask.prototype, "_min", void 0);
tslib_1.__decorate([
    TypeGraphQL.Field(_type => TaskMaxAggregate_1.TaskMaxAggregate, {
        nullable: true
    }),
    tslib_1.__metadata("design:type", TaskMaxAggregate_1.TaskMaxAggregate)
], AggregateTask.prototype, "_max", void 0);
AggregateTask = tslib_1.__decorate([
    TypeGraphQL.ObjectType("AggregateTask", {
        isAbstract: true
    })
], AggregateTask);
exports.AggregateTask = AggregateTask;
