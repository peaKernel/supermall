<template>
  <div class="bottom-bar">
    <span>底部工具栏</span> 
    <div class="toCart" @click="addToCart">加入购物车</div>
  </div>
</template>

<script>
export default {
  name: 'DetailBottomBar',
  methods: {
    addToCart() {
      this.$emit('addCart')
    }
  }
}
</script>

<style scoped>
  .bottom-bar {
    height: 49px;
    background-color: red;
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0; 
  }
  .toCart {
    color: #fff;
    font-size: 16px;
    text-align: center;
    cursor: pointer;
    background-color: skyblue;
  }
</style>