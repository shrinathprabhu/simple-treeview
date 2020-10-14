<template>
  <div>
    <ul v-if="dataPopulated">
      <li v-for="(item, index) in items" :key="item.source + index">
        <div>
          <span
            class="clickable"
            v-if="item.children.length"
            @click.stop="toggle(index)"
            >{{ expansions[index].symbol }}</span
          >
          <span v-else style="margin-right: 15px">&nbsp;</span>
          <input
            class="children-selected"
            type="checkbox"
            :id="item.source + index"
          />
          <label :for="item.source + index">
            {{ item.source }}
          </label>
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

input,
label {
  cursor: pointer;
}

.children-selected:checked::after {
  content: \f054;
  color: white;
}
</style>

<script>
export default {
  name: "tree-view",
  props: ["items"],
  data: () => ({
    expansions: [],
    dataPopulated: false,
  }),
  computed: {},
  methods: {
    toggle(index) {
      this.$set(this.expansions, index, {
        symbol: this.expansions[index].symbol === "+" ? "-" : "+",
        value: !this.expansions[index].value,
      });
    },
  },
  mounted() {
    this.items.forEach((item, index) => {
      this.expansions.push();
      this.$set(this.expansions, index, {
        symbol: "+",
        value: false,
      });
    });
    this.dataPopulated = true;
  },
};
</script>