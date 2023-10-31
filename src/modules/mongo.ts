import { Db, MongoClient } from 'mongodb'

export type DbConfig = {
    url: string
    env: string
    dbName: string
}

class DbService {
    private static _instance: DbService
    private _client: MongoClient
    private _db: Db | undefined
    private _config: DbConfig

    private constructor(config: DbConfig) {
        this._config = config
        this._client = new MongoClient(config.url, {
            maxPoolSize: 128,
        })
    }

    connect() {
        this._client
            .connect()
            .then(client => {
                this._db = client.db(this._config.dbName)
                console.info('✅ [data-access-layer] Init success')
            })
            .catch(err => {
                console.error('⛔️ [data-access-layer] Init error')
                console.error(err.message)
            })
    }

    disconnect() {
        if (this._client) {
            this._client.close()
        }
    }

    get db(): Db {
        if (!this._db) {
            throw new Error('Db not initialized')
        }
        return this._db
    }

    public get config(): DbConfig {
        return this._config
    }

    public static instance(config?: DbConfig): DbService {
        if (!DbService._instance && config) {
            DbService._instance = new DbService(config)
        }
        return DbService._instance
    }
}

export default DbService
export const DbInit = (config: DbConfig) => DbService.instance(config)
