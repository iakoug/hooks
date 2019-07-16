export default class Workflow {
  chain: Array<Array<Function | undefined>>

  constructor(chain = []) {
    this.chain = chain
  }

  push(...fns: any) {
    this.chain.push(fns)
  }

  invoke(options) {
    return this.chain.reduce(
      (promise: PromiseLike<any>, fns: any) => (promise = promise.then(...fns)),
      Promise.resolve(options),
    );
  }
}
