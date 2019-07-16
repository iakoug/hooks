export default class EventBus {
  store: object

  constructor() {
    this.store = {}
  }

  on(event, callback, ctx = null): void {
    if (typeof callback !== 'function') return console.error('arguments[1] must be a function')

    this.store[event] = this.store[event] || []
    this.store[event].push({ctx, callback})
  }

  emit(event, ...args): void {
    const store = this.store[event]

    if (store) store.forEach(v => v.callback.apply(v.ctx, args))
  }

  off(...args): void {
    const [event, fn] = args
    const store = this.store[event]

    if (!store) return
    if (args.length === 1) return this.store[event] = null

    store.splice(store.findIndex(v => v.callback === fn), 1)
  }
}
