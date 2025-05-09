export function useIndexDatabase() {
  const db = ref<IDBDatabase>()

  function open() {
    const req = indexedDB.open('test-db', 1)

    req.onsuccess = (e) => {
      const target = e.target as IDBOpenDBRequest | null
      console.log(e)
      if (target) {
        db.value = target.result as IDBDatabase
      }
    }

    req.onerror = (e) => {
      console.error('indexDB', e)
    }

    req.onupgradeneeded = (e) => {
      const store = e.currentTarget as IDBObjectStore | null

      if (store && db.value) {
        db.value.createObjectStore('test-db', { keyPath: 'id', autoIncrement: true })

        store.createIndex('celebrityId', 'celebrityId', { unique: true })
        store.createIndex('name', 'name', { unique: false })
      }
    }
  }

  function getStore(name: string, mode: IDBTransactionMode) {
    if (db.value) {
      const transaction = db.value.transaction(name, mode)
      return transaction.objectStore(name)
    }
  }

  return {
    open,
    getStore
  }
}
