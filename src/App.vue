<template>
  <div id="app">
    <tree-view :items="items"></tree-view>
  </div>
</template>

<script>
import TreeView from "./components/tree-view.vue";
export default {
  name: "App",
  components: {
    TreeView,
  },
  data: () => ({
    items: [],
  }),
  computed: {},
  mounted: async function () {
    let response = await this.$axios.get(
      "http://www.mocky.io/v2/5cff79fc3200007100eac68f"
    );
    if (response.status === 200) {
      let responseData = response.data.responseData;
      if (responseData instanceof Array) {
        this.items = responseData;
      } else {
        this.items = [responseData];
      }
    }
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
