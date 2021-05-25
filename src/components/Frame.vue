<template>
  <div>
    <el-container style="height: 800px; border: 1px solid #eee">
      <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
        <el-menu :default-openeds="['1', '3']">
          <el-submenu index="1">
            <template #title><i class="el-icon-message"></i>选课管理</template>
              <el-menu-item index="1-1" @click="changePage('Selection')">选课</el-menu-item>
              <el-menu-item index="1-2" @click="changePage('Drop')">退课</el-menu-item>
              <el-menu-item index="1-3" @click="changePage('History')">历年课表</el-menu-item>
          </el-submenu>

          <el-submenu index="2">
            <template #title><i class="el-icon-menu"></i>个人信息</template>
              <el-menu-item index="2-1" @click="changePage('ChangeInfo')">修改信息</el-menu-item>
              <el-menu-item index="2-2" @click="changePage('ChangePwd')">修改密码</el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>

      <el-container>
        <el-header style="text-align: right; font-size: 12px">
          <el-dropdown>
            <i class="el-icon-setting" style="margin-right: 15px"></i>
            <template #dropdown>
              <el-dropdown-menu>
                  <el-dropdown-item @click="changePage('Login')">退出登录</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
          <span>汪成飞</span>

        </el-header>

        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>

  </div>
</template>


<script>
  import { useRouter } from 'vue-router'
  export default {
    data() {
      return {
      }
    },
    setup() {
      const router = useRouter()
      const changePage = ((destination) => {
        router.push({
          name: destination
        })
      })
      return{
        changePage
      }
    }
  };
</script>

<style>
#Frame {
    font-family: "Avenir", Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
}

.el-header {
  background-color: #B3C0D1;
  color: #333;
  line-height: 60px;
}

.el-aside {
  color: #333;
}
</style>