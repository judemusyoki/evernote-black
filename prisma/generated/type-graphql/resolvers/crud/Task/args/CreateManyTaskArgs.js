"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateManyTaskArgs = void 0;
const tslib_1 = require("tslib");
const TypeGraphQL = tslib_1.__importStar(require("type-graphql"));
const TaskCreateManyInput_1 = require("../../../inputs/TaskCreateManyInput");
let CreateManyTaskArgs = class CreateManyTaskArgs {
};
tslib_1.__decorate([
    TypeGraphQL.Field(_type => [TaskCreateManyInput_1.TaskCreateManyInput], {
        nullable: false
    }),
    tslib_1.__metadata("design:type", Array)
], CreateManyTaskArgs.prototype, "data", void 0);
tslib_1.__decorate([
    TypeGraphQL.Field(_type => Boolean, {
        nullable: true
    }),
    tslib_1.__metadata("design:type", Boolean)
], CreateManyTaskArgs.prototype, "skipDuplicates", void 0);
CreateManyTaskArgs = tslib_1.__decorate([
    TypeGraphQL.ArgsType()
], CreateManyTaskArgs);
exports.CreateManyTaskArgs = CreateManyTaskArgs;
