// 两个对象中有重复的代码，使用混入
import {debounce} from "@/components/common/utils";
import BackTop from "@/components/content/backTop/BackTop";
export const itemListenerMixin = {
  data() {
    return {
      itemImgListener: null
    }
  },
  mounted() {
    const refresh = debounce(this.$refs.scroll.refresh,200)
    this.itemImgListener = () => {
      refresh()
    }
    this.$bus.$on('itemImgLoad',this.itemImgListener);
    // console.log('i am the mixin');
  }
}

export  const backTopMixin = {
  components: {
    BackTop
  },
  data() {
    return {
      isShowBackTop: true
    }
  },
  methods: {
    backClick(){
      //500毫秒
      this.$refs.scroll.scrollTo(0,0);
    },
  }

}
