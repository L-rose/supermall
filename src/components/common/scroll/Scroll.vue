<template>
<!--  ref/children-->
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
export default {
  name: "Scroll",
  props: {
    probeType: {
      type:Number,
      default: 0
    },
    pullUpLoad: {
      type: Boolean,
      default: false
    }
  },
  data(){
    return{
      scroll: null
    }
  },
  mounted() {
    //通过这种方式获取方式不好，wrapper若是重复的，拿到错误的wrapper
    // this.scroll = new BScroll(document.querySelector('wrapper'))
    //1.创建BScroll对象
    this.scroll = new BScroll(this.$refs.wrapper,{
      // probeType:2,
      click: true,
      mouseWheel:true,
      observeDOM:true,
      probeType: this.probeType,
      pullUpLoad: this.pullUpLoad
    })
    //2.监听滚动的位置
    if (this.probeType === 2 || this.probeType === 3){
      this.scroll.on('scroll',(position) => {
        this.$emit('scroll',position)
      })
    }

    //3.监听scroll滚动到底部
    if (this.pullUpLoad){
      this.scroll.on('pullingUp', () => {
        // console.log('加载更多');
        this.$emit('pullingUp')
      })
    }


    this.scroll.refresh()
  },
  methods: {
    scrollTo(x,y,time=300){
      this.scroll && this.scroll.scrollTo(x,y,time);
    },
    finishPullUp(){
      this.scroll.finishPullUp()
    },
    refresh(){
      // console.log('----');
      this.scroll && this.scroll.refresh()
    },
    getScrollY(){
      return this.scroll ? this.scroll.y : 0
    }
  }
}
</script>

<style scoped>

</style>
