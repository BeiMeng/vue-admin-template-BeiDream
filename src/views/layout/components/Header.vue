<!--  -->
<style lang='scss'>
    @import '@/styles/variables.scss';
    .menuModule
    > .el-tabs__header
    > .el-tabs__nav-wrap
    > .el-tabs__nav-scroll
    > .el-tabs__nav
    > .el-tabs__item {
    font-size: 16px;
    line-height: $headerHeight;
    height: $headerHeight;
}
    .menuModule{
        .el-tabs__item.is-active {
            color: white;
        }
        .el-tabs__item:hover{
            color: white;
        }
        .el-tabs__active-bar{
            background-color: white
        }      
    }

.el-tabs__nav-wrap::after {
    display: none;
}
</style>

<style lang='scss' scoped>
  @import '@/styles/variables.scss';
  .header{
    height: $headerHeight;
    background-color: #41B883;
    width: 100%;
    .menuModule{
        margin-left:230px;
        
    } 
    .logo{
        height: $headerHeight;
        width:200px;
        margin-left:5px;
        float: left;
    }
  }

</style>

<template>
  <div class='header'>
      <img class="logo" src="@/assets/lg.png">
      <el-tabs class="menuModule" v-model="activeName" @tab-click="tabClick">
    <!-- <el-tab-pane label="用户管理" name="first">
        <span slot="label"><i class="el-icon-date"></i> 用户管理</span>
    </el-tab-pane>
    <el-tab-pane label="配置管理" name="second">
        <span slot="label"><i class="el-icon-date"></i> 配置管理</span>
    </el-tab-pane>
    <el-tab-pane label="角色管理" name="third">
        <span slot="label"><i class="el-icon-date"></i> 角色管理</span>
    </el-tab-pane> -->
    <el-tab-pane :label="item.title" :name="item.title" v-for="item in headerMenus" :key="item.title" >
        <span slot="label"><i class="el-icon-date"></i> {{item.title}}</span>
    </el-tab-pane>
      </el-tabs>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
  export default {
    components: {},
    data () {
      return {
          activeName: ''
      };
    },

    props: {

    },

    computed: {
     ...mapGetters([
      'headerMenus'
    ])    
    },

    mounted(){
        this.activeName=this.headerMenus.filter(p=>p.default==true)[0].title
    },

    methods: {
        tabClick(tab){
            this.$store.commit("SET_HMROUTERS",tab.name)
        }
    }
  }

</script>