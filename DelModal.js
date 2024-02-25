import { ref, onMounted } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js'

export default {
  props: ['tempProduct', 'deleteProduct'],
  template: `
  <div id="delProductModal" ref="delProductModalRef" class="modal fade" tabindex="-1" aria-labelledby="delProductModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content border-0">
        <div class="modal-header bg-danger text-white">
          <h5 id="delProductModalLabel" class="modal-title">
            <span>刪除產品</span>
          </h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          是否刪除
          <strong class="text-danger">{{tempProduct.title}}</strong> (刪除後將無法恢復)。
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">
            取消
          </button>
          <button @click="deleteProduct()" type="button" class="btn btn-danger">
            確認刪除
          </button>
        </div>
      </div>
    </div>
    </div>
  `,
  setup(props) {
    const delProductModalRef = ref(null)
    let delProductModal
    function openModal() {
      delProductModal.show()
    }
    function closeModal() {
      delProductModal.hide()
    }
    onMounted(() => {
      delProductModal = new bootstrap.Modal(delProductModalRef.value, {
        keyboard: false,
        backdrop: 'static'
      })
    })
    return {
      delProductModalRef,
      openModal,
      closeModal
    }
  }
}
