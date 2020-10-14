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
          :selectAllChildren="expansions[index].seletion"
          :parentNode="item.source + index"
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
  props: ["items", "selectAllChildren", "parentNode"],
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
      let selectedAll = index === -1 ? true : false;
      this.$emit("notify", {
        parentNode: this.parentNode,
        selection,
        selectedAll,
      });
    },

    notification(e) {
      if (e.selectedAll) {
        document.getElementById(e.parentNode).checked = true;
        this.notifyParent(true);
      } else if (e.selection) {
        document.getElementById(e.parentNode).indeterminate = true;
        this.notifyParent(true);
      } else {
        document.getElementById(e.parentNode).checked = false;
        document.getElementById(e.parentNode).indeterminate = false;
        this.notifyParent(false);
      }
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
      console.log("Changes happend", newVal, this.items.length);
    },
  },
};
</script>