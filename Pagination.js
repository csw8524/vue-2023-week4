export default {
  props: ['pages', 'getProducts'],
  template: `
    <nav aria-label="Page navigation">
      <ul class="pagination">
        <li class="page-item" :class="{disabled: !pages.has_pre}">
          <a @click="getProducts(pages.current_page - 1)" class="page-link" href="#" aria-label="Previous">
            <span aria-hidden="true">&laquo;</span>
          </a>
        </li>
        <li v-for="page in pages.total_pages" :key="page + 123" class="page-item" :class="{active: page === pages.current_page}">
          <a @click="getProducts(page)" class="page-link" href="#">{{ page }}</a>
        </li>
        <li class="page-item" :class="{disabled: !pages.has_next}">
          <a @click="getProducts(pages.current_page + 1)" class="page-link" href="#" aria-label="Next">
            <span aria-hidden="true">&raquo;</span>
          </a>
        </li>
      </ul>
    </nav>
  `
}