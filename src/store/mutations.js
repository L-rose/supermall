import {
  ADD_COUNTER,
  ADD_TO_CART
} from "./mutation-types";

export default {
  //mutations唯一目的就是修改state中状态
  //原则：单一职责
  addCounter(state,payload){
    payload.count++
  },

  // [ADD_TO_CART](state, payload) {
  //   state.cartList.push(payload)
  // }
  addToCart(state, payload) {
    payload.checked = true
    state.cartList.push(payload)
  }
}
