<template>
  <div class="about">
    <h1>This is an about page</h1>
    <p>Pipeline state is <b>{{state}}</b></p>
    <p>Pipeline is on step <b>{{now}}</b></p>
    <button @click="refresh">refresh</button>
  </div>
</template>

<script>
import { EventBus } from '@/event-bus.js';

const STATE = {
  PENDING: 'pending',
  RUNNING: 'running',
  STOPED: 'stoped',
  ERROR: 'error',
  FINISHED: 'finished'
}

export default {
  data () {
    return {
      interval: undefined,
      state: '',
      now: ''
    }
  },
  mounted () {
    // method-1: setInterval

    // if (this.interval) {
    //   clearInterval(this.interval)
    // }

    // this.interval = setInterval(() => {
    //   console.log(`[${this.$route.path}] Do refresh.`)
    //   this.refresh()
    // }, 1000);

    // method-2: event-bus
    EventBus.$on('refresh', () => {
      let pipeline

      if ((this.state !== STATE.ERROR && this.state !== STATE.FINISHED)) {
        console.log(`Do refresh ${this.$route.params.id}.`)
        pipeline = this.getPipeline(this.$route.params.id)
        this.state = pipeline.state
        this.now = pipeline.now
      }
      
      setTimeout(() => {
        EventBus.$emit('refresh')
      }, 1000)
    })

    EventBus.$emit('refresh')
  },
  beforeRouteUpdate (to, from, next) {
    let pipeline = this.getPipeline(to.params.id)
    this.state = pipeline.state
    this.now = pipeline.now
    next()
  },
  methods: {
    refresh () {
      let pipeline = this.getPipeline(this.$route.params.id)
      this.state = pipeline.state
      this.now = pipeline.now

      // if (this.state === STATE.ERROR || this.state === STATE.FINISHED) {
      //   console.log('Stop refresh.')
      //   if (this.interval) {
      //     clearInterval(this.interval)
      //   }
      //   this.interval = undefined
      // }
    }
  },
  destroyed () {
    console.log('Stop refresh.')
    if (this.interval) {
      clearInterval(this.interval)
    }
    this.interval = undefined

    EventBus.$off('refresh')
  }
}
</script>

