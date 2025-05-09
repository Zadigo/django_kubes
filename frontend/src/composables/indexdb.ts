// import { asyncComputed, useAsyncQueue, useAsyncState } from '@vueuse/core'

interface StoreIndex {
  name: string
  keyPath: string
  options?: IDBIndexParameters
}

interface StoreConfig {
  name: string
  keyPath: string
  autoIncrement: boolean
  indexes: StoreIndex[]
}

export function useIndexDatabase(dbName: string, version: number = 1, storeConfigs: StoreConfig[] = []) {
  // const nameRef = ref<string>(dbName)
  const db = shallowRef<IDBDatabase | null>(null)
  const isReady = ref<boolean>(false)
  const error = ref<Error | null>(null)

  function open(): Promise<IDBDatabase> {
    return new Promise((resolve, reject) => {
      try {
        const request = indexedDB.open(dbName, version)

        request.onsuccess = (e) => {
          const target = e.target as IDBOpenDBRequest | null

          console.log('1. open', e)

          if (target) {
            db.value = target.result as IDBDatabase
            isReady.value = true
            resolve(db.value)
            console.log('2. open success', db.value)
          }
        }

        request.onerror = (e) => {
          console.error('2. open', e)
        }

        request.onupgradeneeded = (e) => {
          const store = e.currentTarget as IDBObjectStore | null

          console.log('onupgradeneeded', store && db.value)

          if (db.value) {
            storeConfigs.forEach((config) => {
              // Create store if it doesn't exist
              if (!db.value.objectStoreNames.contains(config.name)) {
                const store = db.value.createObjectStore(config.name, {
                  keyPath: config.keyPath,
                  autoIncrement: config.autoIncrement
                })

                config.indexes.forEach((indexConfig) => {
                  if (!store.indexNames.contains(indexConfig.name)) {
                    store.createIndex(
                      indexConfig.name,
                      indexConfig.keyPath,
                      indexConfig.options || { unique: false }
                    )
                  }
                })
              }
            })
          }
        }
      } catch (e) {
        const catchError = e instanceof Error ? e : new Error('Unknown error during database initialization')
        error.value = catchError
        reject(catchError)
      }
    })
  }

  /**
   * @param name The name of the store
   * @param mode Either readonly or
   */
  function getStore(storeName: string, mode: IDBTransactionMode) {
    if (!db.value && !isReady.value) {
      console.log('not loaded')
      return null
    }

    console.log('3. getStore', db.value)
    const transaction = db.value?.transaction(storeName, mode)
    return transaction?.objectStore(storeName)
  }

  function add(storeName: string): Promise<IDBValidKey> {
    return new Promise((resolve, reject) => {
      let req: IDBRequest

      const store = getStore(storeName, 'readwrite')

      console.log('5. add', store)

      try {
        if (store) {
          req = store.add({ celebrityId: 1, name: 'Kylie' })

          req.onsuccess = (e) => {
            const target = e.target as IDBRequest
            resolve(target.result)
          }

          req.onerror = (e) => {
            const target = e.target as IDBRequest
            reject(new Error(`Failed to add record: ${target.error?.message || 'Unknown error'}`))
          }
        }
      } catch (e) {
        console.error('5. add', e)
      }
    })
  }

  return {
    isReady,
    error,

    open,
    add,
    getStore
  }
}
