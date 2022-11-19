<template>
  <div class="recommend">
    <div v-for= "item,index in recommends" :key="index" class="recommend-item">
      <a :href="item.link">
        <img :src="item.image">
        <div>{{item.title}}</div>
      </a>
    </div>
  </div>

</template>

<script>
export default {
  name: 'RecommendView',
  props: {
    recommends: {
      type: Array,
      default() {
        return []
      }
    }
  }
}
</script>

<style>
  .recommend {
    width: 100%;
    display: flex;
    font-size: 12px;
    padding: 10px 0 30px;
    border-bottom: 10px solid #eee;
  }
  .recommend-item {
    flex: 1;
    text-align: center;
  }
  .recommend-item img {
    width: 70px;
    height: 70px;
    margin-bottom: 10px;
  }
</style>