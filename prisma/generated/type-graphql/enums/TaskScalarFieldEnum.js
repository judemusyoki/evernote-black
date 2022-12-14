"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskScalarFieldEnum = void 0;
const tslib_1 = require("tslib");
const TypeGraphQL = tslib_1.__importStar(require("type-graphql"));
var TaskScalarFieldEnum;
(function (TaskScalarFieldEnum) {
    TaskScalarFieldEnum["id"] = "id";
    TaskScalarFieldEnum["title"] = "title";
    TaskScalarFieldEnum["subtitle"] = "subtitle";
    TaskScalarFieldEnum["notes"] = "notes";
    TaskScalarFieldEnum["completed"] = "completed";
    TaskScalarFieldEnum["createdAt"] = "createdAt";
    TaskScalarFieldEnum["updatedAt"] = "updatedAt";
    TaskScalarFieldEnum["authorId"] = "authorId";
})(TaskScalarFieldEnum = exports.TaskScalarFieldEnum || (exports.TaskScalarFieldEnum = {}));
TypeGraphQL.registerEnumType(TaskScalarFieldEnum, {
    name: "TaskScalarFieldEnum",
    description: undefined,
});
