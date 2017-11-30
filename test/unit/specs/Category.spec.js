import Vue from 'vue'
import store from '@/store/index.js'
import VueRouter from 'vue-router'
import Category from '@/components/Category'

describe('Category.vue', () => {
    it('should load front-end links', done => {
        Vue.use(VueRouter);
        const router = new VueRouter({
            routes: [
                { path: '/', component: Category }
            ]
        });

        // create app with router and store
        const vm = new Vue({
            el: document.createElement('div'),
            router,
            store,
            render: h => h('router-view')
        });

        // category component will make an api request to get the data, which returns 6 records.
        store.watch(state => {
            return state.postsModule.posts;
        },
            () => {
                expect(vm.$el.querySelectorAll('.col-md-3').length).to.equal(6);
                done();
            }
        )

        // TODO: mock service response by adding a spy or something.
    });
});