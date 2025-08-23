<template>
  <div class="modal fade" :id="id" tabindex="-1" :aria-labelledby="id" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header dark-blue-bg text-light">
            <slot name="header">
              <!-- Default Header Content start -->
              <h1 class="modal-title fs-5">[ -- HEADER -- ]</h1>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              <!-- Default Header Content end -->
            </slot>
          </div>
          <div class="modal-body ghost-bg">
            <slot name="body">
              <!-- Default Body Content start -->
              [ -- BODY -- ]
              <!-- Default Body Content end -->
            </slot>
          </div>
          <div class="modal-footer ghost-bg">
            <slot name="footer">
              <!-- Default Footer Content start -->
              [ -- FOOTER -- ]
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
              <button type="button" class="btn btn-primary">Submit</button>
              <!-- Default Footer Content end -->
            </slot>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
export default {
  props: {
    id: {type: String, required: true}
  },

  setup(){
    return {}
  }
}
</script>


<style lang="scss" scoped>

</style>