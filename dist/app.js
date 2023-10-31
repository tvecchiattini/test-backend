"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.options = exports.app = void 0;
const path_1 = require("path");
const autoload_1 = __importDefault(require("@fastify/autoload"));
const mongo_1 = require("./modules/mongo");
const swagger_1 = __importDefault(require("@fastify/swagger"));
const swagger_ui_1 = __importDefault(require("@fastify/swagger-ui"));
const options = {};
exports.options = options;
const app = async (fastify, opts) => {
    fastify.withTypeProvider();
    const swaggerOptions = {
        swagger: {
            info: {
                title: "My Title",
                description: "My Description.",
                version: "1.0.0",
            },
            host: "localhost",
            schemes: ["http", "https"],
            consumes: ["application/json"],
            produces: ["application/json"],
            tags: [{ name: "Users", description: "Default" }],
        },
    };
    const swaggerUiOptions = {
        routePrefix: "/docs",
        exposeRoute: true,
    };
    await fastify.register(swagger_1.default, swaggerOptions);
    await fastify.register(swagger_ui_1.default, swaggerUiOptions);
    const username = 'tommasovecchiattini';
    const password = 'wLiAiGDTiUrqgcwz';
    const DbInstance = (0, mongo_1.DbInit)({
        dbName: 'ecommerce',
        env: 'local',
        url: `mongodb+srv://${username}:${password}@cluster0.deos3n2.mongodb.net/`
    });
    DbInstance.connect();
    void fastify.register(autoload_1.default, {
        dir: (0, path_1.join)(__dirname, 'routes'),
        options: opts
    });
};
exports.app = app;
exports.default = app;
//# sourceMappingURL=app.js.map