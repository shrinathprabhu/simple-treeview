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
          <span v-else style="margin-right: 14px"></span>
          <input
            class="children-selected"
            type="checkbox"
            :id="item.source + index"
            v-model="expansions[index].selection"
            @change="notifyParent(expansions[index].selection)"
          />
          <label :for="item.source + index">
            {{ item.source }}
          </label>
        </div>
        <tree-view
          v-if="expansions[index].value"
          :items="item.children"
          v-bind:selectAllChildren="expansions[index].selection"
          :parentNode="item.source + index"
          :parentIndex="index"
          @notify="notification"
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
</style>

<script>
export default {
  name: "tree-view",
  props: ["items", "selectAllChildren", "parentNode", "parentIndex"],
  data: () => ({
    expansions: [],
    dataPopulated: false,
  }),
  computed: {},
  methods: {
    toggle(index) {
      this.$set(this.expansions, index, {
        symbol: this.expansions[index].symbol === "+" ? "−" : "+",
        value: !this.expansions[index].value,
        selection: this.expansions[index].selection,
      });
    },

    notifyParent(selection) {
      let index = this.expansions.findIndex(
        (e) => e.selection == false || e.selection == undefined
      );
      let noneIndex = this.expansions.findIndex((e) => e.selection == true);
      let selectedAll = index === -1 ? true : false;
      let selectedNone = noneIndex === -1 ? true : false;
      this.$emit("notify", {
        parentNode: this.parentNode,
        selection,
        selectedAll,
        selectedNone,
        indeterminate:
          selection || (!selectedAll && !selectedNone) ? true : false,
      });
    },

    notification(e) {
      console.log(e);
      if (e.selectedAll) {
        document.getElementById(e.parentNode).checked = true;
        document.getElementById(e.parentNode).indeterminate = false;
      } else if (e.selectedNone && !e.indeterminate) {
        document.getElementById(e.parentNode).checked = false;
        document.getElementById(e.parentNode).indeterminate = false;
      } else {
        document.getElementById(e.parentNode).checked = false;
        document.getElementById(e.parentNode).indeterminate = true;
      }
      this.notifyParent(e.selection);
    },
  },
  mounted() {
    this.items.forEach((item, index) => {
      this.expansions.push();
      this.$set(this.expansions, index, {
        symbol: "+",
        value: false,
        selection: this.selectAllChildren
          ? Boolean(this.selectAllChildren)
          : false,
      });
    });
    this.dataPopulated = true;
  },
  watch: {
    selectAllChildren: function (newVal) {
      this.items.forEach((item, index) => {
        document.getElementById(item.source + index).indeterminate = false;
        document.getElementById(item.source + index).checked = newVal;
        this.$set(this.expansions, index, {
          symbol: this.expansions[index].symbol,
          value: this.expansions[index].value,
          selection: newVal,
        });
      });
    },
  },
};
</script>