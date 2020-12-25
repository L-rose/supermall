<template>
<!-- wrapper这个属性下只能包含一个属性-->
  <div class="wrapper">
    <ul class="content">
      <button @click="btn">按钮</button>
      <li>分类列表</li>
      <li>分类列表</li>
      <li>分类列表</li>
      <li>分类列表</li>
      <li>分类列表</li>
      <li>分类列表</li>
      <li>分类列表</li>
      <li>分类列表</li>
      <li>分类列表</li>
      <li>分类列表</li>
      <li>分类列表</li>
      <li>分类列表</li>
      <li>分类列表</li>
      <li>分类列表</li>
      <li>分类列表</li>
      <li>分类列表</li>
      <li>分类列表</li>
      <li>分类列表</li>
      <li>分类列表</li>
      <li>分类列表</li>
      <li>分类列表</li>
      <li>分类列表</li>
      <li>分类列表</li>
      <li>分类列表</li>
      <li>分类列表</li>
      <li>分类列表</li>
      <li>分类列表</li>
      <li>分类列表</li>
      <li>分类列表</li>
      <li>分类列表</li>
      <li>分类列表</li>
      <li>分类列表</li>
      <li>分类列表</li>
      <li>分类列表</li>
      <li>分类列表</li>
      <li>分类列表</li>
      <li>分类列表</li>
      <li>分类列表</li>
      <li>分类列表</li>
      <li>分类列表</li>
      <li>分类列表</li>
      <li>分类列表</li>
      <li>分类列表</li>
      <li>分类列表</li>
      <li>分类列表</li>
      <li>分类列表</li>
      <li>分类列表</li>
      <li>分类列表</li>
      <li>分类列表</li>
      <li>分类列表</li>
      <li>分类列表</li>
      <li>分类列表</li>
      <li>分类列表</li>
      <li>分类列表</li>
      <li>分类列表</li>
      <li>分类列表</li>
      <li>分类列表</li>
      <li>分类列表</li>
      <li>分类列表</li>
      <li>分类列表</li>
      <li>分类列表</li>
      <li>分类列表</li>
      <li>分类列表</li>
      <li>分类列表</li>
      <li>分类列表</li>
      <li>分类列表</li>
      <li>分类列表</li>
      <li>分类列表</li>
      <li>分类列表</li>
      <li>分类列表</li>
      <li>分类列表</li>
      <li>分类列表</li>
      <li>分类列表</li>
      <li>分类列表</li>
      <li>分类列表</li>
      <li>分类列表</li>
      <li>分类列表</li>
    </ul>
    <back-top @click.native ="backClick" v-show="isShowBackTop"></back-top>
  </div>

</template>


<script>

import BScroll from 'better-scroll'
import {backTopMixin} from "common/mixin";
export default {
  name: "Category",
  mixins:[backTopMixin],
  data(){
    return{
      scroll: null
    }
  },

  mounted() {
    //默认情况下BScroll是不可以实时的监听滚动位置
    // probeType: 0和1都是不侦测实时的位置
    //2：在手指滚动的过程中侦测,手指离开过的惯性不侦测
    //3.只要是滚动就侦测
    //pullUpLoad:上拉加载更多，因为只能接受一次，所以需要发送网络请求，请求更多页的数据
    //等数据请求完成，并且将新的数据展示出来后调用一个finishPullUp()
    this.scroll = new BScroll(document.querySelector('.wrapper'),{
      probeType:3,
      //这个click之前不特别进行设置为true时，是不会监听的
      // click: true,可以不加
      pullUpLoad: true
    })
    this.scroll.on('scroll',(position) => {
      console.log(position);
    })
    this.scroll.on('pullingUp',() =>{
      console.log("上拉加载更多");
    })
  },
  methods: {
    btn(){
      console.log('btnclick');
    }
  }

}
</script>


<style scoped>
/*<!--使用原生的滚动方式,在移动端是非常卡顿的，做不到很圆滑-->*/
.wrapper {
  height: 150px;
  background-color: rosybrown;
  overflow: hidden;
  /*overflow-y: scroll;*/
}
</style>
