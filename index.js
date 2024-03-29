import {createApp, onMounted, ref} from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js'
import Pagination from './Pagination.js'
import ProductModal from './ProductModal.js'
import DelModal from './DelModal.js'

const URL = 'https://ec-course-api.hexschool.io/v2'
const PATH = 'ryann'


const app = createApp({
  setup() {
    const products = ref([])
    const pages = ref({})
    const productModal = ref(null)
    const delProductModal = ref(null)
    const isEdit = ref(false)
    const tempProduct = ref({
      imagesUrl: []
    })

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

    const getProducts = async (page = 1) => {
      try {
        const res = await axios.get(`${URL}/api/${PATH}/admin/products?page=${page}`)
        products.value = res.data.products
        pages.value = res.data.pagination
        /*
          "pagination": {
            "total_pages": 2,
            "current_page": 2,
            "has_pre": true,
            "has_next": false,
            "category": ""
          },
         */
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
        productModal.value.openModal()
      } else if (mode === 'edit') {
        isEdit.value = true
        productModal.value.openModal()
      } else if (mode === 'delete') {
        delProductModal.value.openModal()
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
        productModal.value.closeModal()
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
        delProductModal.value.closeModal()
      }
    }
 
    onMounted(async () => {
      try {
        await checkLogin()
        await getProducts()
      } catch (err) {
        alert('出現未經處理的錯誤')
      }
    })

    return {
      products,
      productModal,
      delProductModal,
      isEdit,
      tempProduct,
      getProducts,
      openModal,
      submitProduct,
      deleteProduct,
      pages
    }
  }
})

app.component('pagination', Pagination)
  .component('product-modal', ProductModal)
  .component('del-modal', DelModal)

app.mount('#app')