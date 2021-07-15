var app = new Vue({
  el: '#app',
  data: {
    greeting: 'Welcome To Balance Check!',
    image: '/images/goodVibesOnly.jpg',
    options: [
      { value: 'Groceries' },
      { value: 'Barber' },
      { value: 'Pet' },
      { value: 'Other' }
    ],
    selected: '',
    message: 'You loaded this page on ' + new Date().toLocaleString()
  },
  methods: {
    reverseGreeting: function(){
      this.greeting = this.greeting.split('').reverse().join('')
    }
  }
})
