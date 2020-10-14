import { shallowMount, mount } from '@vue/test-utils';
import TreeView from '../../src/components/tree-view.vue';

let noChildItems = [
  {
    source: "AAA",
    children: []
  }
];

let singleChildItems = [
  {
    source: "AAA",
    children: [
      {
        source: "BBB",
        children: []
      }
    ]
  }
];

test('Is a vue instance', () => {
  let wrapper = mount(TreeView, {
    propsData: {
      items: noChildItems
    }
  });

  expect(wrapper.vm).toBeTruthy();
});

test('Contains source label', done => {
  let wrapper = shallowMount(TreeView, {
    propsData: {
      items: noChildItems
    }
  });

  setTimeout(() => {
    expect(wrapper.html()).toContain("AAA");
    done();
  }, 1);
});

test('Contains checkbox', done => {
  let wrapper = shallowMount(TreeView, {
    propsData: {
      items: noChildItems
    }
  });

  setTimeout(() => {
    expect(wrapper.find("input[type=checkbox]").isVisible()).toBeTruthy();
    done();
  }, 1);
});

test('Contains + button if children exist', done => {
  let wrapper = shallowMount(TreeView, {
    propsData: {
      items: singleChildItems
    }
  });

  setTimeout(() => {
    expect(wrapper.html()).toContain("+");
    done();
  }, 1);
});

test('Does not contain + button if children doesn\'t exist', done => {
  let wrapper = shallowMount(TreeView, {
    propsData: {
      items: noChildItems
    }
  });

  setTimeout(() => {
    expect(wrapper.html()).not.toContain("+");
    done();
  }, 1);
});

test('Expands the tree when + is clicked and children are shown. Also + is replace with -', done => {
  let wrapper = shallowMount(TreeView, {
    propsData: {
      items: singleChildItems
    }
  });

  setTimeout(() => {
    // wrapper.setMethods({
    //   toggle: jest.fn()
    // });
    wrapper.find(".clickable").trigger('click');
    expect(wrapper.html()).toContain("-");
    setTimeout(() => {
      expect(wrapper.find("tree-view-stub").isVisible()).toBeTruthy();
      done();
    });
  }, 1);
});

test('Children aren\'t visible until + is pressed', done => {
  let wrapper = shallowMount(TreeView, {
    propsData: {
      items: singleChildItems
    }
  });

  setTimeout(() => {
    expect(wrapper.find("tree-view-stub").exists()).toBeFalsy();
    wrapper.find(".clickable").trigger('click');
    setTimeout(() => {
      expect(wrapper.find("tree-view-stub").exists()).toBeTruthy();
      expect(wrapper.find("tree-view-stub").isVisible()).toBeTruthy();
      done();
    }, 1);
  }, 1);
});