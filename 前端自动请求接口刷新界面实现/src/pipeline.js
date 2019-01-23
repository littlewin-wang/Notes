const STATE = {
  PENDING: 'pending',
  RUNNING: 'running',
  STOPED: 'stoped',
  ERROR: 'error',
  FINISHED: 'finished'
}

export default class Pipeline {
  constructor(steps, failure) {
    this.init(steps, failure)
  }

  init (steps = 100, failure = 0.05) {
    this.steps = parseInt(steps, 10)
    if (isNaN(this.steps) || this.steps < 0) {
      throw Error('Pipeline parameter steps is illegal!')
    }
    this.failure = parseFloat(failure, 10)
    if (isNaN(this.failure) || this.failure < 0 || this.failure >= 1) {
      throw Error('Pipeline parameter failure is illegal!')
    }
    
    // console.log(`Pipeline init with steps ${this.steps} and failure ${this.failure}`)

    this.now = 0
    this.state = STATE.PENDING
    
    if (this.stepInterval) {
      clearInterval(this.stepInterval)
    }
    this.stepInterval = undefined
  }

  run () {
    if (this.state === STATE.PENDING || this.state === STATE.STOPED) {
      // console.log('Pipeline run...')
      this.state = STATE.RUNNING
      this.stepInterval = this.stepInterval || setInterval(function () {
        if (Math.random() <= this.failure) {
          this.state = STATE.ERROR
          // console.log(`Pipeline errors on step ${this.now}`)

          if (this.stepInterval) {
            clearInterval(this.stepInterval)
          }
          this.stepInterval = undefined

          return
        }

        this.now += 1
        // console.log(`Pipeline step to ${this.now}`)

        if (this.now === this.steps) {
          this.state = STATE.FINISHED
          // console.log(`Pipeline finished.`)

          if (this.stepInterval) {
            clearInterval(this.stepInterval)
          }
          this.stepInterval = undefined
        }
      }.bind(this), 1000)
    } else {
      // console.log(`Can not run pipeline because pipeline state is ${this.state}!`)
    }
  }

  stop () {
    if (this.state === STATE.RUNNING) {
      // console.log(`Pipeline stops on step ${this.now}`)

      if (this.stepInterval) {
        clearInterval(this.stepInterval)
      }
      this.stepInterval = undefined
    } else {
      // console.log(`Can not stop pipeline because pipeline state is ${this.state}!`)
    }
  }
}
