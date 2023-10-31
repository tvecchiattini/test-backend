"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DbInit = void 0;
const mongodb_1 = require("mongodb");
class DbService {
    static _instance;
    _client;
    _db;
    _config;
    constructor(config) {
        this._config = config;
        this._client = new mongodb_1.MongoClient(config.url, {
            maxPoolSize: 128,
        });
    }
    connect() {
        this._client
            .connect()
            .then(client => {
            this._db = client.db(this._config.dbName);
            console.info('✅ [data-access-layer] Init success');
        })
            .catch(err => {
            console.error('⛔️ [data-access-layer] Init error');
            console.error(err.message);
        });
    }
    disconnect() {
        if (this._client) {
            this._client.close();
        }
    }
    get db() {
        if (!this._db) {
            throw new Error('Db not initialized');
        }
        return this._db;
    }
    get config() {
        return this._config;
    }
    static instance(config) {
        if (!DbService._instance && config) {
            DbService._instance = new DbService(config);
        }
        return DbService._instance;
    }
}
exports.default = DbService;
const DbInit = (config) => DbService.instance(config);
exports.DbInit = DbInit;
//# sourceMappingURL=mongo.js.map