<template>
    <ul class="c-navigate" @click.stop="navHandle">
        <li :class="['nav-item',{'nav-active':index===pIndex}]" v-for="(item,index) in navList" :data-val="index" >
            <a>
            <span>
                <i :class="['iconfont',item.icon]"></i>
            </span>
                <span class="item-name">{{item.name}}</span>
            </a>
        </li>
    </ul>
</template>
<script>

    import {dataSet,getTarget} from "../service/dom.js";

    export default {
        name: 'Navigate',
        props:{
            navList:{
                type:Array,
                default:() => []
            }
        },
        data() {
            return {
                pIndex:0
            }
        },
        methods:{

            navHandle(event){
                let Target = getTarget(event,"nav-item");
                this.pIndex = dataSet(Target,'val');
                this.$emit("go-state",{
                    name:this.navList[this.pIndex].name,
                    path:this.navList[this.pIndex].path,
                });
            }
        }

    };
</script>

