<template>
    <div :class="['c-vertical',{'vertical-min':isTransform}]">
        <ul  @click="clickHandle">
            <li :class="['menu-item',{'parent-active':index===pIndex&&isActive}]" :data-val="index"
                v-for="(item,index) in menuList"
                :key="index"
            >
                <a href="javascript:;" class="clearFix">
                    <i :class="['iconfont',item.icon]"></i>
                    <span>
                        {{item.name}}
                    </span>
                    <i :class="['iconfont','icon-xiangyoujiantou',{'rotate-icon':pIndex===index&&isActive}]" v-if="item.children"></i>
                </a>
                <ul v-slide="item.children&&index===pIndex&&isActive">
                    <li :class="['child-item',{'child-active':cIndex===num}]"
                        :data-val="num"
                        v-for="(unit,num) in item.children" :key="num"
                    >
                        <a>
                            <span>{{unit.name}}</span>
                        </a>
                    </li>
                </ul>
            </li>
        </ul>
        <div :class="['fold-bottom',{'transform-min':isTransform}]" @click="transformHandle">
           <span>
               <i :class="['iconfont','icon-xiangyoujiantou',{'fold-icon':isTransform}]"></i>
           </span>
        </div>
    </div>
</template>
<script>
    import {hasClass,dataSet,getTarget} from "../service/dom.js";
    export default {
        name: 'vertical',
        props:{
            menuList:{
                type:Array,
                default:() => []
            },
            initIndex:{
                type:Number,
                default:0
            },

        },
        data() {
            return {
                pIndex:this.initIndex,
                cIndex:0,
                childHeight:0,
                isActive:true,
                isTransform:false
            }
        },
        created(){

        },

        methods:{
            clickHandle(event){
                let isChild = true,pNum;
                let parentTarget = getTarget(event,"menu-item");
                let childTarget = getTarget(event,"child-item");
                isChild =this.isTouchChild(childTarget);
                pNum = dataSet(parentTarget,"val");
                if(isChild){
                    this.cIndex = dataSet(childTarget,'val');
                    if(this.menuList[this.pIndex].children){
                        this.$emit("go-state",{
                            name:this.menuList[this.pIndex].children[this.cIndex].name,
                            path:this.menuList[this.pIndex].children[this.cIndex].path
                        });
                    }

                }else{
                    if(this.pIndex===pNum){
                        this.isActive=!this.isActive;
                    }else{
                        this.isActive = true;
                        this.pIndex = pNum;
                    }
                    this.cIndex = 0;
                    this.$emit("go-state",{
                        name:this.menuList[this.pIndex].name,
                        path:this.menuList[this.pIndex].path
                    });


                }
            },
            isTouchChild(childTarget){
                if(childTarget===NaN || childTarget===null || childTarget===undefined){
                    return false;
                }else{
                    return true;
                }
            },
            transformHandle(){
                this.isTransform=!this.isTransform;
                this.isActive=false;
                this.$emit("fold-body",this.isTransform);
            }
        },
        directives: {
            slide: {
                inserted:function(el,binding){
                    if(binding.value){
                        let height = el.scrollHeight;
                        el.style.cssText = `height:${height}px;`;
                    }
                },
                update: function (el,binding) {
                    let newVal = binding.value,oldVal=binding.oldValue;
                    if(newVal===oldVal){
                        return;
                    };
                    if(binding.value){
                        let height = el.scrollHeight;
                        el.style.cssText = `height:${height}px;`;
                    }else{
                        el.style.cssText=`height:0;`;
                    }
                },


            }
        },

    };
</script>
