<template>
  <div>
    <ul>
      <li v-for="(item, index) in items" :key="item.source + index">
        <div>
          <span
            class="clickable"
            v-if="item.children.length"
            @click.stop="toggle(index)"
            >{{ expansions[index].symbol }}</span
          >
          <span v-else style="margin-right: 15px">&nbsp;</span>
          <span>{{ item.source }}</span>
        </div>
        <tree-view
          v-show="expansions[index].value"
          :items="item.children"
        ></tree-view>
      </li>
    </ul>
  </div>
</template>

<style scoped>
ul {
  list-style-type: none;
}
.clickable {
  cursor: pointer;
  margin-right: 5px;
}
</style>

<script>
export default {
  name: "tree-view",
  props: ["items"],
  data: () => ({
    expansions: [],
  }),
  computed: {},
  methods: {
    toggle(index) {
      this.$set(this.expansions, index, {
        symbol: this.expansions[index].symbol === "+" ? "-" : "+",
        value: !this.expansions[index].value,
      });
      console.log(this.expansions);
    },
  },
  created: function () {
    this.items.forEach(() => {
      this.expansions.push({
        symbol: "+",
        value: false,
      });
    });
  },
};
</script>