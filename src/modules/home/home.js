import Vue from 'vue'
let tpl= require('./home.html');
console.log(tpl);
import "./home.less";

const Home= Vue.component('Home', {
    template: tpl,

    data() {
        return {
            name:1,
            url:"/assets/images/55.jpg"

        }
    },
    created(){
        const that = this;
        this.test().then(function (result) {
            console.log(result);
            that.name = result;
        })

    },
    methods:{

      test() {
          const that = this;
          return new Promise(function (resolve, reject) {
              setTimeout(function () {

                  resolve(22)
              }, 5000)
          })
      }




    }
});
export default Home;