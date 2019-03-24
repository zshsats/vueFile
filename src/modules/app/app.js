import Vue from 'vue'
let tpl= require('./app.html');
import Navigate from "../../components/navigate.vue";
import vertical from "../../components/vertical.vue";
const App= Vue.component('App', {
    template: tpl,
    components:{
        "navigate":Navigate,
        "vertical":vertical
    },
    data() {
        return {
            navList:[
                {
                    icon:"icon-shouye",
                    name:"首页",
                    path:"home",

                },
                {
                    icon:"icon-bangong0",
                    name:"高效办公",
                    path:"home",
                },
            ],
            isMin:false,
            dataList:[
                {
                    icon:"icon-shouye",
                    name:"疑难文章",
                    path:"article",

                },
                {
                    icon:"icon-shouye",
                    name:"免费教程",
                    children:[
                        {
                            name:"疑难文章",
                            path:"article"
                        },
                        {
                            name:"疑难文章",
                            path:"article"
                        }
                    ]
                },
                {
                    icon:"icon-shouye",
                    name:"免费教程",
                    children:[
                        {
                            name:"疑难文章",
                            path:"article"
                        },
                        {
                            name:"疑难文章",
                            path:"article"
                        }
                    ]
                }
            ]
        }
    },
    methods:{

        goWhere(item){
            this.$router.push(`/${item.path}`);

        },
        foldHandle(isFold){
            this.isMin = isFold;
        },
        goState(item){}



    }
});
export default App;