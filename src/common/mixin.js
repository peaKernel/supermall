import BackTop from '@/components/content/backTop/BackTop.vue';

export const backTopMixin = {
  data() {
    return {
      isShowBackTop: false,
    }
  },
  methods: {
    backClick() {
      this.$refs.scroll.scrollTo(0, 0, 500);
    },
    listionShow(position) {
      this.isShowBackTop = -position.y > 700
    }
  },
  components: {
    BackTop
  }

}