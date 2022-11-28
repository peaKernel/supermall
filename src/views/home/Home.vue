<template>
  <div id="home">
    <nav-bar class="home-nav"><div slot="center" >购物街</div></nav-bar>
    <tab-control    class="tab-control" 
                    :titles="['流行','新款','精选']"
                    @tabClick="tabClick" 
                    ref="tabControl1"
                    v-show="isTabFixed"
                    />
    <scroll class="content" ref="scroll" 
                            :probe-type="3" 
                            @scroll="contentScroll"
                            :pull-up-load="true" 
                            @pullingUp="loadMore"
                           >
      <home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad"></home-swiper>
      <recommend-view :recommends="recommends"></recommend-view>
      <feature-view/>
      <tab-control  :titles="['流行','新款','精选']"
                    @tabClick="tabClick" 
                    ref="tabControl2"
                    />
      <goods-list :goods="showGoods" />
    </scroll>
    <back-top @click.native="backClick" v-show="isShowBackTop" />
  </div>
</template>

<script>
  import HomeSwiper from './childComps/HomeSwiper.vue';
  import RecommendView from './childComps/RecommendView.vue';
  import FeatureView from './childComps/FeatureView.vue';
  
  import NavBar from 'components/common/navbar/NavBar.vue';
  import tabControl from '@/components/content/tabControl/tabControl.vue';
  import GoodsList from '@/components/content/goods/GoodsList.vue';
  import Scroll from '@/components/common/scroll/Scroll.vue';
  import BackTop from '@/components/content/backTop/BackTop.vue';

  import { getHomeMultidata,getHomeGoods } from '@/network/home';
  import {debounce} from "common/utils"


  export default {
    name: "Home",
    components: {
      HomeSwiper,
      RecommendView,
      FeatureView,
      NavBar,
      tabControl,
      GoodsList,
      Scroll,
      BackTop
    },
    computed:{
      showGoods() {
        return this.goods[this.currentType].list
      }
    },
    data() {
      return {
        banners: [],
        recommends: [],
        goods: {
          'pop': {page: 0, list: []},
          'new': {page: 0, list: []},
          'sell': {page: 0, list: []},
        },
        currentType: 'pop',
        isShowBackTop: false,
        tabOffsetTop: 0,
        isTabFixed: false,
        saveY: 0  
      }
    },
    activated() {
      this.$refs.scroll.scrollTo(0, this.saveY, 0)
      this.$refs.scroll.refresh()
    },
    deactivated() {
      this.saveY = this.$refs.scroll.getScrollY()
    },
    created() {    
      // 最好是把方法写到mothods里，然后在created中调用；created中写主要逻辑
      //创建的时候发送网络请求
      // 1.请求多个数据
      this.getHomeMultidata()

      //2.请求商品数据
      this.getHomeGoods('pop')
      this.getHomeGoods('new')
      this.getHomeGoods('sell')

    },
    mounted(){
      // 1.监听item中图片加载完成
      // 因为每张图片加载完都会调用一边这个函数，因此给服务器造成较大压力；
      // 解决办法是做防抖操作；
      // this.$bus.$on('itemImageLoad', () => {
      //   this.$refs.scroll.refresh()
      // })

      const refresh = debounce(this.$refs.scroll.refresh, 500)
      this.$bus.$on('itemImageLoad', () => {
        refresh()
      })


      //2.获取tabControl的offsetTop
      // console.log(this.$refs.tabControl.$el.offsetTop)
    },
    methods: { 
      /**
       *  事件监听相关方法 
       */
      tabClick(index) {
        switch (index) {
          case 0:
            this.currentType = 'pop'
            break;
          case 1:
            this.currentType = 'new'
            break;
          case 2:
            this.currentType = 'sell'
            break;
        }
        this.$refs.tabControl1.currentIndex = index
        this.$refs.tabControl2.currentIndex = index
      },

      backClick() {
        this.$refs.scroll.scrollTo(0, 0, 500);
      },  

      contentScroll(position) {
        // 1.判断BackTop是否显示
        this.isShowBackTop = (-position.y) > 1000

        // 2.决定tabControl是否吸顶
        this.isTabFixed = (-position.y) > this.tabOffsetTop
      },

      loadMore() {
        this.getHomeGoods(this.currentType)

      },
      /**
       * 网络请求相关方法  
       */
      getHomeMultidata() {
        getHomeMultidata().then((res) => {
          this.banners = res.data.banner.list
          this.recommends = res.data.recommend.list
        })
      },
      getHomeGoods(type) {
        const page = this.goods[type].page + 1
        getHomeGoods(type, page).then(res => {
          this.goods[type].list.push(...res.data.list)
          this.goods[type].page += 1

          this.$refs.scroll.finishPullUp()
          this.$refs.scroll.refresh()
        })
      },
      swiperImageLoad() {
        this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop
      }
    }
  }
</script>

<style scoped>
  #home {
    /* padding-top: 44px; */
    height: 100vh;
    position: relative;
  }
 .home-nav {
    background-color: var(--color-tint);
    color: #fff;

    /* position: fixed;
    top: 0;
    left: 0;
    right: 0;  
    z-index: 9;
     */
  }
  .tab-control {
    position: relative;
    z-index: 9;
  }
  /* .tab-control {
    position: sticky;
    top:44px;
    z-index: 9;
  } */

  .content {
    position: absolute;
    top:44px;
    bottom: 49px;
    left: 0;
    right: 0;

    overflow: hidden;
  }
  /* .content {
    height: calc(100% - 93px);
    overflow: hidden;
    margin-top: 44px;
  } */
  .fixed {
    position: fixed;
    left: 0;
    right: 0;
    top: 44px;
  }
</style>
