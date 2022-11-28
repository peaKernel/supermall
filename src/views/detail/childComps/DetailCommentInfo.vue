<template>
  <div>
    <p>我是评论，凑数的而已</p>
  </div>
</template>

<script>
export default {
  name: 'DetailCommentInfo',
  props: {
    commentInfo: {
      type: Object,
      default() {
        return {}
      }
    }
  }
}
</script>

<style>

</style>