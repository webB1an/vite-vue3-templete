<template>
  count: {{ stateCount }}
  <br>
  double: {{ stateGetterDouble }}
  <br>
  <button @click="testMutationAdd">testMutationAdd</button>
  <button @click="testMutationSub">testMutationSub</button>
  <br>
  <button @click="TestActionCommit">TestActionCommit</button>
  <button @click="TestActionDispatch">TestActionDispatch</button>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useStore } from 'vuex'

// 使用 store
const store = useStore()
const a = 4
// mutation
const testMutationAdd = () => store.commit('ADD')
const testMutationSub = () => store.commit('SUB')

// dispatch
const TestActionCommit = async () => {
  const result = await store.dispatch('TestActionCommit')
  console.log('---------------result---------------', result)
}
const TestActionDispatch = () => store.dispatch('TestActionDispatch', 1)

const stateCount = computed(() => store.state.count)
const stateGetterDouble = computed(() => store.getters.double)
</script>

<style lang="scss">
button {
  background-color: aqua;
}
</style>
