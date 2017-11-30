import Vue from 'vue'
import Post from '@/components/Post'

describe('Post.vue', () => {
  const createComponent = url => {
    const Constructor = Vue.extend(Post);
    const vm = new Constructor({
      propsData: {
        link: url
      }
    }).$mount();

    return vm;
  }

  it('should render correct link', () => {
    const url = 'http://www.google.com';
    const comp = createComponent(url);
    expect(comp.$el.querySelector('.card-footer a').getAttribute('href'))
      .to.equal(url);
  });

  // (done) callback passed for Mocha to wait until done is called before marking the test as done.
  it('should update element\'s href when property link changes', (done) => {
    const url = 'http://www.yahoo.com';
    const comp = createComponent('http://www.google.com');
    comp.link = url;
    // nextTick is for the DOM to update with the changes.
    Vue.nextTick(() => {
      expect(comp.$el.querySelector('.card-footer a').getAttribute('href'))
        .to.equal(url);
      done();
    });
  });
});
