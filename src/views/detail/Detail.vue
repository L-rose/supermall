<template>
  <div id="detail">
    <detail-nav-bar class="detail_nav" @titlesClick="titlesClick" ref="nav"/>
    <scroll class="content" ref="scroll" :probe-type="3" @scroll="contentScroll">
<!--      <ul>-->
<!--        <li v-for="item in $store.state.cartList">-->
<!--          {{item}}-->
<!--        </li>-->
<!--      </ul>-->

      <detail-swiper :top-images="topImage"/>
      <detail-base-info :goods="goods"/>
      <detail-shop-info :shop="shop"/>
      <detail-goods-info :detail-info="detailInfo" @imgLoad="imgLoad"/>
      <detail-param-info ref="params" :param-info="paramInfo"/>
      <detail-comment-info ref="comment" :comment-info="commentInfo"/>
      <good-list ref="recommend" :goods="recommends"/>
    </scroll>
    <back-top @click.native ="backClick" v-show="isShowBackTop"></back-top>
    <detail-bottom-bar @addCart="addToCart"/>

  </div>
</template>

<script>
import DetailNavBar from "./childComps/DetailNavBar";
import DetailSwiper from "./childComps/DetailSwiper";
import DetailBaseInfo from "./childComps/DetailBaseInfo";
import DetailShopInfo from "./childComps/DetailShopInfo";
import DetailGoodsInfo from "./childComps/DetailGoodsInfo";
import DetailParamInfo from "./childComps/DetailParamInfo";
import DetailCommentInfo from "./childComps/DetailCommentInfo";
import DetailBottomBar from "./childComps/DetailBottomBar";

import Scroll from "@/components/common/scroll/Scroll";
import GoodList from "@/components/content/goods/GoodList";

import {getDetail,Goods,Shop,GoodsParam,getRecommend} from "network/detail";

import {itemListenerMixin,backTopMixin} from "common/mixin";
import {debounce} from "@/components/common/utils";

//将actions方法映射到methods
import {mapActions} from 'vuex'

export default {
  name: "Detail",
  components:{
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    DetailBottomBar,
    Scroll,
    GoodList
  },
  mixins:[itemListenerMixin,backTopMixin],
  data(){
    return{
      iid:null,
      topImage: [],
      goods: {},
      shop: {},
      detailInfo: {},
      paramInfo: {},
      commentInfo:{},
      recommends: [],
      themTopYs: [],
      getThemeTopY: null,
      currentIndex: 0,

    }
  },
  created() {
    //1.保存传入的iid
    this.iid = this.$route.params.iid
    //2.根据iid请求详情数据
    getDetail(this.iid).then(res => {
      //1.获取顶部的图片轮播数据
      const data =res.result;
      this.topImage = data.itemInfo.topImages
      //2.获取商品信息
      this.goods = new Goods(data.itemInfo,data.columns,data.shopInfo.services)
    //  3.创建店铺信息
      this.shop = new Shop(data.shopInfo)
      //4.保存商品的详情数据
      this.detailInfo = data.detailInfo;
      //5.获取参数信息
      this.paramInfo = new GoodsParam(data.itemParams.info,data.itemParams.rule)
      //6.取出评论信息
      if (data.rate.cRate !== 0) {
        this.commentInfo = data.rate.list[0]
      }

      //第一次获取，不对，值不对
      //原因：this.$refs.params.$el压根没有渲染
      // this.themTopYs = []
      // this.themTopYs.push(0);
      // this.themTopYs.push(this.$refs.params.$el.offsetTop)
      // this.themTopYs.push(this.$refs.comment.$el.offsetTop)
      // this.themTopYs.push(this.$refs.recommend.$el.offsetTop)
      // console.log(this.themTopYs);

      // this.$nextTick(() => {
      //   //第二次获取：值不对
      //   //原因：图片没有计算在内
      //   //根据最新的数据，对应的DOM是已经被渲染出来
      //   //但是图片依然是没有加载完（目前获取offsetTop不包含其中的图片）
      //   offsetTop值不对的时候，都是因为图片的问题
      //   this.themTopYs = []
      //   this.themTopYs.push(0);
      //   this.themTopYs.push(this.$refs.params.$el.offsetTop)
      //   this.themTopYs.push(this.$refs.comment.$el.offsetTop)
      //   this.themTopYs.push(this.$refs.recommend.$el.offsetTop)
      //   console.log(this.themTopYs);
      // })

    })

  //  3.请求推荐数据
    getRecommend().then( res => {
      this.recommends = res.data.list
    })
    //4.给getThemeTopY赋值
    this.getThemeTopY = debounce( () => {
      this.themTopYs = []
      this.themTopYs.push(0);
      this.themTopYs.push(this.$refs.params.$el.offsetTop)
      this.themTopYs.push(this.$refs.comment.$el.offsetTop)
      this.themTopYs.push(this.$refs.recommend.$el.offsetTop)
      this.themTopYs.push(Number.MAX_VALUE)
      // console.log(this.themTopYs);
    },100)
  },
  mounted() {

  },

  methods: {
    ...mapActions(['addCart']),
    imgLoad() {
      this.$refs.scroll.refresh()
      this.getThemeTopY()
    },
    titlesClick(index) {
      this.$refs.scroll.scrollTo(0,-this.themTopYs[index],100)
    },
    contentScroll(position){
      // console.log(position);
      //1.获取y值
      const positionY = -position.y;
      //2.positionY和主题中值进行对比
      let length = this.themTopYs.length
      for (let i = 0; i < length; i++){
        if (this.currentIndex !== i && (i < length -1 && positionY >= this.themTopYs[i] && positionY < this.themTopYs[i+1]) ){
          this.currentIndex = i;
          this.$refs.nav.currentIndex = this.currentIndex
        }
        //3.是否显示回到顶部
        this.isShowBackTop = -position.y > 1000
        // if (this.currentIndex !== i && (i < length - 1 && positionY >= this.themTopYs[i] && positionY < this.themTopYs[i+1] ||
        //   (i === length -1 && positionY >= this.themTopYs[i])) ){
        //   this.currentIndex = i;
        //   // console.log(this.currentIndex);
        //   this.$refs.nav.currentIndex = this.currentIndex;
        // }
      }
    },
    addToCart() {
    // 1.获取购物车需要展示的信息
      const product = {}
      product.image = this.topImage[0];
      product.title = this.goods.title;
      product.desc = this.goods.desc;
      product.price = this.goods.realPrice;
      product.iid = this.iid;

    //  2.将商品添加到购物车(promise,mapActions)
    //   this.$store.commit('addCart',product)
      this.addCart(product).then(res => {
        console.log(res);
      })
      // this.$store.dispatch('addCart',product).then(res => {
      //   console.log(res);
      // })

    //  3.添加购物车
    }
  },

//  actived/deactived是在有缓存的keep-alive上
//  而没有缓存的用destoryed
  destroyed() {
    this.$bus.$off('itemImgLoad', this.itemImgListener)
  }
}
</script>

<style scoped>
#detail {
  position: relative;
  z-index: 9;
  background-color: #fff;
  height: 100vh;
}
.content {
  height: calc(100% - 44px - 49px);
}

.detail_nav {
  position: relative;
  z-index: 9;
  background-color: #fff;
}
</style>
