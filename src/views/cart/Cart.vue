<template>
  <div class="cart">
<!--    导航-->
    <nav-bar class="nav-bar">
      <div slot="center">购物车({{length}})</div>
    </nav-bar>

<!--    商品列表-->
    <cart-list/>
<!--    底部汇总-->
    <cart-button-bar/>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";
import CartList from "./childComps/CartList";
import CartButtonBar from "./childComps/CartButtonBar";
//从vuex中导入mapGetters，可以直接把store中的getter中的方法用到cart组件中
import {mapGetters} from 'vuex'

export default {
  name: "Cart",
  components: {
    NavBar,
    CartList,
    CartButtonBar
  },
  computed: {
    //两种用法
    ...mapGetters({
      length: "cartLength"
    })
    // ...mapGetters(['cartLength','cartList'])
  },

}
</script>

<style scoped>
.cart {
  height: 100vh;
}
.nav-bar {
  background-color: var(--color-tint);
  color: #fff;
}
</style>
