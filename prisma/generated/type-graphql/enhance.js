"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.applyInputTypesEnhanceMap = exports.applyOutputTypesEnhanceMap = exports.applyModelsEnhanceMap = exports.applyArgsTypesEnhanceMap = exports.applyResolversEnhanceMap = void 0;
const tslib_1 = require("tslib");
const tslib = tslib_1.__importStar(require("tslib"));
const crudResolvers = tslib_1.__importStar(require("./resolvers/crud/resolvers-crud.index"));
const argsTypes = tslib_1.__importStar(require("./resolvers/crud/args.index"));
const actionResolvers = tslib_1.__importStar(require("./resolvers/crud/resolvers-actions.index"));
const models = tslib_1.__importStar(require("./models"));
const outputTypes = tslib_1.__importStar(require("./resolvers/outputs"));
const inputTypes = tslib_1.__importStar(require("./resolvers/inputs"));
const crudResolversMap = {
    User: crudResolvers.UserCrudResolver,
    Task: crudResolvers.TaskCrudResolver
};
const actionResolversMap = {
    User: {
        aggregateUser: actionResolvers.AggregateUserResolver,
        createManyUser: actionResolvers.CreateManyUserResolver,
        createOneUser: actionResolvers.CreateOneUserResolver,
        deleteManyUser: actionResolvers.DeleteManyUserResolver,
        deleteOneUser: actionResolvers.DeleteOneUserResolver,
        findFirstUser: actionResolvers.FindFirstUserResolver,
        findFirstUserOrThrow: actionResolvers.FindFirstUserOrThrowResolver,
        users: actionResolvers.FindManyUserResolver,
        user: actionResolvers.FindUniqueUserResolver,
        getUser: actionResolvers.FindUniqueUserOrThrowResolver,
        groupByUser: actionResolvers.GroupByUserResolver,
        updateManyUser: actionResolvers.UpdateManyUserResolver,
        updateOneUser: actionResolvers.UpdateOneUserResolver,
        upsertOneUser: actionResolvers.UpsertOneUserResolver
    },
    Task: {
        aggregateTask: actionResolvers.AggregateTaskResolver,
        createManyTask: actionResolvers.CreateManyTaskResolver,
        createOneTask: actionResolvers.CreateOneTaskResolver,
        deleteManyTask: actionResolvers.DeleteManyTaskResolver,
        deleteOneTask: actionResolvers.DeleteOneTaskResolver,
        findFirstTask: actionResolvers.FindFirstTaskResolver,
        findFirstTaskOrThrow: actionResolvers.FindFirstTaskOrThrowResolver,
        tasks: actionResolvers.FindManyTaskResolver,
        task: actionResolvers.FindUniqueTaskResolver,
        getTask: actionResolvers.FindUniqueTaskOrThrowResolver,
        groupByTask: actionResolvers.GroupByTaskResolver,
        updateManyTask: actionResolvers.UpdateManyTaskResolver,
        updateOneTask: actionResolvers.UpdateOneTaskResolver,
        upsertOneTask: actionResolvers.UpsertOneTaskResolver
    }
};
const crudResolversInfo = {
    User: ["aggregateUser", "createManyUser", "createOneUser", "deleteManyUser", "deleteOneUser", "findFirstUser", "findFirstUserOrThrow", "users", "user", "getUser", "groupByUser", "updateManyUser", "updateOneUser", "upsertOneUser"],
    Task: ["aggregateTask", "createManyTask", "createOneTask", "deleteManyTask", "deleteOneTask", "findFirstTask", "findFirstTaskOrThrow", "tasks", "task", "getTask", "groupByTask", "updateManyTask", "updateOneTask", "upsertOneTask"]
};
const argsInfo = {
    AggregateUserArgs: ["where", "orderBy", "cursor", "take", "skip"],
    CreateManyUserArgs: ["data", "skipDuplicates"],
    CreateOneUserArgs: ["data"],
    DeleteManyUserArgs: ["where"],
    DeleteOneUserArgs: ["where"],
    FindFirstUserArgs: ["where", "orderBy", "cursor", "take", "skip", "distinct"],
    FindFirstUserOrThrowArgs: ["where", "orderBy", "cursor", "take", "skip", "distinct"],
    FindManyUserArgs: ["where", "orderBy", "cursor", "take", "skip", "distinct"],
    FindUniqueUserArgs: ["where"],
    FindUniqueUserOrThrowArgs: ["where"],
    GroupByUserArgs: ["where", "orderBy", "by", "having", "take", "skip"],
    UpdateManyUserArgs: ["data", "where"],
    UpdateOneUserArgs: ["data", "where"],
    UpsertOneUserArgs: ["where", "create", "update"],
    AggregateTaskArgs: ["where", "orderBy", "cursor", "take", "skip"],
    CreateManyTaskArgs: ["data", "skipDuplicates"],
    CreateOneTaskArgs: ["data"],
    DeleteManyTaskArgs: ["where"],
    DeleteOneTaskArgs: ["where"],
    FindFirstTaskArgs: ["where", "orderBy", "cursor", "take", "skip", "distinct"],
    FindFirstTaskOrThrowArgs: ["where", "orderBy", "cursor", "take", "skip", "distinct"],
    FindManyTaskArgs: ["where", "orderBy", "cursor", "take", "skip", "distinct"],
    FindUniqueTaskArgs: ["where"],
    FindUniqueTaskOrThrowArgs: ["where"],
    GroupByTaskArgs: ["where", "orderBy", "by", "having", "take", "skip"],
    UpdateManyTaskArgs: ["data", "where"],
    UpdateOneTaskArgs: ["data", "where"],
    UpsertOneTaskArgs: ["where", "create", "update"]
};
function applyResolversEnhanceMap(resolversEnhanceMap) {
    for (const resolversEnhanceMapKey of Object.keys(resolversEnhanceMap)) {
        const modelName = resolversEnhanceMapKey;
        const crudTarget = crudResolversMap[modelName].prototype;
        const resolverActionsConfig = resolversEnhanceMap[modelName];
        const actionResolversConfig = actionResolversMap[modelName];
        if (resolverActionsConfig._all) {
            const allActionsDecorators = resolverActionsConfig._all;
            const resolverActionNames = crudResolversInfo[modelName];
            for (const resolverActionName of resolverActionNames) {
                const actionTarget = actionResolversConfig[resolverActionName].prototype;
                tslib.__decorate(allActionsDecorators, crudTarget, resolverActionName, null);
                tslib.__decorate(allActionsDecorators, actionTarget, resolverActionName, null);
            }
        }
        const resolverActionsToApply = Object.keys(resolverActionsConfig).filter(it => it !== "_all");
        for (const resolverActionName of resolverActionsToApply) {
            const decorators = resolverActionsConfig[resolverActionName];
            const actionTarget = actionResolversConfig[resolverActionName].prototype;
            tslib.__decorate(decorators, crudTarget, resolverActionName, null);
            tslib.__decorate(decorators, actionTarget, resolverActionName, null);
        }
    }
}
exports.applyResolversEnhanceMap = applyResolversEnhanceMap;
function applyArgsTypesEnhanceMap(argsTypesEnhanceMap) {
    for (const argsTypesEnhanceMapKey of Object.keys(argsTypesEnhanceMap)) {
        const argsTypeName = argsTypesEnhanceMapKey;
        const typeConfig = argsTypesEnhanceMap[argsTypeName];
        const typeClass = argsTypes[argsTypeName];
        const typeTarget = typeClass.prototype;
        applyTypeClassEnhanceConfig(typeConfig, typeClass, typeTarget, argsInfo[argsTypeName]);
    }
}
exports.applyArgsTypesEnhanceMap = applyArgsTypesEnhanceMap;
function applyTypeClassEnhanceConfig(enhanceConfig, typeClass, typePrototype, typeFieldNames) {
    if (enhanceConfig.class) {
        tslib.__decorate(enhanceConfig.class, typeClass);
    }
    if (enhanceConfig.fields) {
        if (enhanceConfig.fields._all) {
            const allFieldsDecorators = enhanceConfig.fields._all;
            for (const typeFieldName of typeFieldNames) {
                tslib.__decorate(allFieldsDecorators, typePrototype, typeFieldName, void 0);
            }
        }
        const configFieldsToApply = Object.keys(enhanceConfig.fields).filter(it => it !== "_all");
        for (const typeFieldName of configFieldsToApply) {
            const fieldDecorators = enhanceConfig.fields[typeFieldName];
            tslib.__decorate(fieldDecorators, typePrototype, typeFieldName, void 0);
        }
    }
}
const modelsInfo = {
    User: ["id", "username", "email", "createdAt", "updatedAt"],
    Task: ["id", "title", "subtitle", "notes", "completed", "createdAt", "updatedAt", "authorId"]
};
function applyModelsEnhanceMap(modelsEnhanceMap) {
    for (const modelsEnhanceMapKey of Object.keys(modelsEnhanceMap)) {
        const modelName = modelsEnhanceMapKey;
        const modelConfig = modelsEnhanceMap[modelName];
        const modelClass = models[modelName];
        const modelTarget = modelClass.prototype;
        applyTypeClassEnhanceConfig(modelConfig, modelClass, modelTarget, modelsInfo[modelName]);
    }
}
exports.applyModelsEnhanceMap = applyModelsEnhanceMap;
const outputsInfo = {
    AggregateUser: ["_count", "_min", "_max"],
    UserGroupBy: ["id", "username", "email", "createdAt", "updatedAt", "_count", "_min", "_max"],
    AggregateTask: ["_count", "_min", "_max"],
    TaskGroupBy: ["id", "title", "subtitle", "notes", "completed", "createdAt", "updatedAt", "authorId", "_count", "_min", "_max"],
    AffectedRowsOutput: ["count"],
    UserCountAggregate: ["id", "username", "email", "createdAt", "updatedAt", "_all"],
    UserMinAggregate: ["id", "username", "email", "createdAt", "updatedAt"],
    UserMaxAggregate: ["id", "username", "email", "createdAt", "updatedAt"],
    TaskCountAggregate: ["id", "title", "subtitle", "notes", "completed", "createdAt", "updatedAt", "authorId", "_all"],
    TaskMinAggregate: ["id", "title", "subtitle", "notes", "completed", "createdAt", "updatedAt", "authorId"],
    TaskMaxAggregate: ["id", "title", "subtitle", "notes", "completed", "createdAt", "updatedAt", "authorId"]
};
function applyOutputTypesEnhanceMap(outputTypesEnhanceMap) {
    for (const outputTypeEnhanceMapKey of Object.keys(outputTypesEnhanceMap)) {
        const outputTypeName = outputTypeEnhanceMapKey;
        const typeConfig = outputTypesEnhanceMap[outputTypeName];
        const typeClass = outputTypes[outputTypeName];
        const typeTarget = typeClass.prototype;
        applyTypeClassEnhanceConfig(typeConfig, typeClass, typeTarget, outputsInfo[outputTypeName]);
    }
}
exports.applyOutputTypesEnhanceMap = applyOutputTypesEnhanceMap;
const inputsInfo = {
    UserWhereInput: ["AND", "OR", "NOT", "id", "username", "email", "createdAt", "updatedAt"],
    UserOrderByWithRelationInput: ["id", "username", "email", "createdAt", "updatedAt"],
    UserWhereUniqueInput: ["id", "email"],
    UserOrderByWithAggregationInput: ["id", "username", "email", "createdAt", "updatedAt", "_count", "_max", "_min"],
    UserScalarWhereWithAggregatesInput: ["AND", "OR", "NOT", "id", "username", "email", "createdAt", "updatedAt"],
    TaskWhereInput: ["AND", "OR", "NOT", "id", "title", "subtitle", "notes", "completed", "createdAt", "updatedAt", "authorId"],
    TaskOrderByWithRelationInput: ["id", "title", "subtitle", "notes", "completed", "createdAt", "updatedAt", "authorId"],
    TaskWhereUniqueInput: ["id"],
    TaskOrderByWithAggregationInput: ["id", "title", "subtitle", "notes", "completed", "createdAt", "updatedAt", "authorId", "_count", "_max", "_min"],
    TaskScalarWhereWithAggregatesInput: ["AND", "OR", "NOT", "id", "title", "subtitle", "notes", "completed", "createdAt", "updatedAt", "authorId"],
    UserCreateInput: ["id", "username", "email", "createdAt", "updatedAt"],
    UserUpdateInput: ["id", "username", "email", "createdAt", "updatedAt"],
    UserCreateManyInput: ["id", "username", "email", "createdAt", "updatedAt"],
    UserUpdateManyMutationInput: ["id", "username", "email", "createdAt", "updatedAt"],
    TaskCreateInput: ["id", "title", "subtitle", "notes", "completed", "createdAt", "updatedAt", "authorId"],
    TaskUpdateInput: ["id", "title", "subtitle", "notes", "completed", "createdAt", "updatedAt", "authorId"],
    TaskCreateManyInput: ["id", "title", "subtitle", "notes", "completed", "createdAt", "updatedAt", "authorId"],
    TaskUpdateManyMutationInput: ["id", "title", "subtitle", "notes", "completed", "createdAt", "updatedAt", "authorId"],
    StringFilter: ["equals", "in", "notIn", "lt", "lte", "gt", "gte", "contains", "startsWith", "endsWith", "mode", "not"],
    StringNullableFilter: ["equals", "in", "notIn", "lt", "lte", "gt", "gte", "contains", "startsWith", "endsWith", "mode", "not"],
    DateTimeFilter: ["equals", "in", "notIn", "lt", "lte", "gt", "gte", "not"],
    UserCountOrderByAggregateInput: ["id", "username", "email", "createdAt", "updatedAt"],
    UserMaxOrderByAggregateInput: ["id", "username", "email", "createdAt", "updatedAt"],
    UserMinOrderByAggregateInput: ["id", "username", "email", "createdAt", "updatedAt"],
    StringWithAggregatesFilter: ["equals", "in", "notIn", "lt", "lte", "gt", "gte", "contains", "startsWith", "endsWith", "mode", "not", "_count", "_min", "_max"],
    StringNullableWithAggregatesFilter: ["equals", "in", "notIn", "lt", "lte", "gt", "gte", "contains", "startsWith", "endsWith", "mode", "not", "_count", "_min", "_max"],
    DateTimeWithAggregatesFilter: ["equals", "in", "notIn", "lt", "lte", "gt", "gte", "not", "_count", "_min", "_max"],
    BoolFilter: ["equals", "not"],
    TaskCountOrderByAggregateInput: ["id", "title", "subtitle", "notes", "completed", "createdAt", "updatedAt", "authorId"],
    TaskMaxOrderByAggregateInput: ["id", "title", "subtitle", "notes", "completed", "createdAt", "updatedAt", "authorId"],
    TaskMinOrderByAggregateInput: ["id", "title", "subtitle", "notes", "completed", "createdAt", "updatedAt", "authorId"],
    BoolWithAggregatesFilter: ["equals", "not", "_count", "_min", "_max"],
    StringFieldUpdateOperationsInput: ["set"],
    NullableStringFieldUpdateOperationsInput: ["set"],
    DateTimeFieldUpdateOperationsInput: ["set"],
    BoolFieldUpdateOperationsInput: ["set"],
    NestedStringFilter: ["equals", "in", "notIn", "lt", "lte", "gt", "gte", "contains", "startsWith", "endsWith", "not"],
    NestedStringNullableFilter: ["equals", "in", "notIn", "lt", "lte", "gt", "gte", "contains", "startsWith", "endsWith", "not"],
    NestedDateTimeFilter: ["equals", "in", "notIn", "lt", "lte", "gt", "gte", "not"],
    NestedStringWithAggregatesFilter: ["equals", "in", "notIn", "lt", "lte", "gt", "gte", "contains", "startsWith", "endsWith", "not", "_count", "_min", "_max"],
    NestedIntFilter: ["equals", "in", "notIn", "lt", "lte", "gt", "gte", "not"],
    NestedStringNullableWithAggregatesFilter: ["equals", "in", "notIn", "lt", "lte", "gt", "gte", "contains", "startsWith", "endsWith", "not", "_count", "_min", "_max"],
    NestedIntNullableFilter: ["equals", "in", "notIn", "lt", "lte", "gt", "gte", "not"],
    NestedDateTimeWithAggregatesFilter: ["equals", "in", "notIn", "lt", "lte", "gt", "gte", "not", "_count", "_min", "_max"],
    NestedBoolFilter: ["equals", "not"],
    NestedBoolWithAggregatesFilter: ["equals", "not", "_count", "_min", "_max"]
};
function applyInputTypesEnhanceMap(inputTypesEnhanceMap) {
    for (const inputTypeEnhanceMapKey of Object.keys(inputTypesEnhanceMap)) {
        const inputTypeName = inputTypeEnhanceMapKey;
        const typeConfig = inputTypesEnhanceMap[inputTypeName];
        const typeClass = inputTypes[inputTypeName];
        const typeTarget = typeClass.prototype;
        applyTypeClassEnhanceConfig(typeConfig, typeClass, typeTarget, inputsInfo[inputTypeName]);
    }
}
exports.applyInputTypesEnhanceMap = applyInputTypesEnhanceMap;
