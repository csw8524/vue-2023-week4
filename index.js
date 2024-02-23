import {createApp, onMounted, ref} from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js'

const URL = 'https://ec-course-api.hexschool.io/v2'
const PATH = 'ryann'


createApp({
  setup() {
    const products = ref([])
    const productModalRef = ref(null)
    const delProductModalRef = ref(null)
    const isEdit = ref(false)
    const tempProduct = ref({
      imagesUrl: []
    })
    let productModal
    let delProductModal

    const checkLogin = async () => {
      try {
        const token = document.cookie.replace(
          /(?:(?:^|.*;\s*)hexToken\s*\=\s*([^;]*).*$)|^.*$/,
          "$1",
        )
        axios.defaults.headers.common['Authorization'] = token

        await axios.post(`${URL}/api/user/check`)
      } catch(err) {
        alert(err.response.data.message)
        window.location = 'login.html'
      }
    }

    const getProducts = async () => {
      try {
        const res = await axios.get(`${URL}/api/${PATH}/admin/products`)

        products.value = res.data.products
      } catch(err) {
        alert(err.response.data.message)
      }
    }
    const openModal = (mode, item = {}) => {
      tempProduct.value = {
        imagesUrl: [],
        ...item
      }

      if (mode === 'create') {
        isEdit.value = false
        productModal.show()
      } else if (mode === 'edit') {
        isEdit.value = true
        productModal.show()
      } else if (mode === 'delete') {
        delProductModal.show()
      }
    }
    // 新增商品、編輯商品 利用 isEdit 判斷模式
    const submitProduct = async () => {
      try {
        let res
        if (isEdit.value) {
          res = await axios.put(`${URL}/api/${PATH}/admin/product/${tempProduct.value.id}`, {data: tempProduct.value})
        } else {
          res = await axios.post(`${URL}/api/${PATH}/admin/product`, {data: tempProduct.value})
        }
        getProducts()
        alert(res.data.message)
      } catch (err) {
        alert(err.response.data.message)
      } finally {
        productModal.hide()
      }

    }
    // 刪除商品
    const deleteProduct = async () => {
      try {
        const res = await axios.delete(`${URL}/api/${PATH}/admin/product/${tempProduct.value.id}`)
        getProducts()
        alert(res.data.message)
      } catch (err) {
        alert(err.response.data.message)
      } finally {
        delProductModal.hide()
      }
    }
 
    onMounted(async () => {
      try {
        await checkLogin()
        await getProducts()

        productModal = new bootstrap.Modal(productModalRef.value, {
          keyboard: false,
          backdrop: 'static'
        })
        delProductModal = new bootstrap.Modal(delProductModalRef.value, {
          keyboard: false,
          backdrop: 'static'
        })
      } catch (err) {
        alert('出現未經處理的錯誤')
      }
    })

    return {
      products,
      productModalRef,
      delProductModalRef,
      isEdit,
      tempProduct,
      openModal,
      submitProduct,
      deleteProduct,
    }
  }
}).mount('#app')