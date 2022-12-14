"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskWhereUniqueInput = void 0;
const tslib_1 = require("tslib");
const TypeGraphQL = tslib_1.__importStar(require("type-graphql"));
let TaskWhereUniqueInput = class TaskWhereUniqueInput {
};
tslib_1.__decorate([
    TypeGraphQL.Field(_type => String, {
        nullable: true
    }),
    tslib_1.__metadata("design:type", String)
], TaskWhereUniqueInput.prototype, "id", void 0);
TaskWhereUniqueInput = tslib_1.__decorate([
    TypeGraphQL.InputType("TaskWhereUniqueInput", {
        isAbstract: true
    })
], TaskWhereUniqueInput);
exports.TaskWhereUniqueInput = TaskWhereUniqueInput;
