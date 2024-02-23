import {createApp, ref} from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js'

const URL = 'https://ec-course-api.hexschool.io/v2'
const PATH = 'ryann'

const app = {
  setup() {
    const email = ref('')
    const password = ref('')
    const isFailed = ref(false)

    const login = async () => {
      try {
        isFailed.value = false
        const res = await axios.post(`${URL}/admin/signin`, {
          username: email.value,
          password: password.value
        })
  
        const { token, expired } = res.data
        document.cookie = `hexToken=${token}; expires=${new Date(expired)};`
        window.location= 'index.html'
      } catch(err) {
        isFailed.value = true
        password.value = ''
      }
      

    }
    return {
      email,
      password,
      isFailed,
      login
    }
  }
}

createApp(app).mount('#app')