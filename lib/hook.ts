import EventBus from './emit'

export default class Hook extends EventBus {
  hooks: Array<string>

  constructor(hooks = []) {
    super()

    this.hooks = hooks
    this.init()
  }

  init(): void {
    this.hooks.forEach(v => this.on(v, () => console.log(`invoke hooks: ${v}`)))
  }

  callHook(hookEvent: string, ...arg: any): void {
    if (!this.hooks.includes(hookEvent)) return console.error(`invalid hook: ${hookEvent}`)

    this.emit(hookEvent, ...arg)
  }
}
