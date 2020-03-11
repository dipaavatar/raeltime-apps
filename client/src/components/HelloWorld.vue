<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <p>Chat Apps</p>
    <div class="container">
      <b-form-input class="mb-2" v-model="username" placeholder="Username"></b-form-input>
      <form @submit.prevent="sendMessage()">
        <b-form-input v-model="text" placeholder="Enter your message"></b-form-input>
        <button type="submit" class="btn btn-primary mt-2">Send</button>
      </form>
      <div class="mt-2">
        <p class="my-2" v-for="(data ,i) in allText" :key="i">{{ data.username }}: {{ data.chat }}</p>
      </div>
    </div>
    <button @click="closeConection()" class="btn btn-danger">Close</button>
  </div>
</template>

<script>
import io from 'socket.io-client'
var socket = io.connect('http://localhost:3000')

export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  data () {
    return {
      text: '',
      allText: [],
      username: ''
    }
  },
  methods: {
    sendMessage () {
      socket.emit('my other event', { chat: this.text, username: this.username })
      this.allText.unshift({ chat: this.text, username: this.username })
      this.text = ''
    },
    receiveMessage () {
      socket.on('dataP', (data) => {
        console.log(data)
        this.allText.unshift(data)
      })
    },
    connectedSocket () {
      socket.on('news', function (data) {
        console.log(data)
      })
    },
    getWhoOnline () {
      socket.emit('onlinePerson')
      socket.on('onlinePerson2', (data) => {
        console.log(data)
      })
    },
    closeConection () {
      socket.emit('turnOfClientConnection')
    }
  },
  created () {
    this.connectedSocket()
    this.receiveMessage()
    this.getWhoOnline()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
