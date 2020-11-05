<template>
  <div id="app">
    <p>
      A simple checkbox tree view created using Vue.js. Here the data is fetched
      from a mocky api and then the response is passed as props to tree-view
      component. Response should contain object/ array of source(string) and
      children(array) and children will contain objects of source(string) and
      children(array) and so on.
      <br />
      The tree-view component is constructed such that it takes an array of
      objects as props named as items. Object in those array should be key value
      pair containing source(string) and children(array). Children will again
      contain objects containing source(string) and children(array) and so on.
    </p>
    <p>
      Source code for this project is available on
      <a
        href="https://github.com/shrinathprabhu/simple-treeview"
        target="__blank"
      >
        Github
      </a>
    </p>
    <p>
      You can contact me on
      <a
        href="https://www.linkedin.com/in/shrinath-prabhu-459107b2/"
        target="__blank"
      >
        Linkedin
      </a>
    </p>
    <p>Click on + to expand</p>
    <tree-view v-if="items.length" :items="items"></tree-view>
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
  created: async function () {
    let response = await this.$axios.get(
      "https://www.mocky.io/v2/5cff79fc3200007100eac68f"
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
  margin-top: 30px;
  padding-left: 30px;
  padding-right: 30px;
}
a {
  color: lightseagreen;
}
</style>
