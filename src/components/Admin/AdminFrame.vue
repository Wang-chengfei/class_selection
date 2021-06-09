<template>
  <div>
    <el-container class="container">
      <el-aside
        width="200px"
        style="background-color: rgb(238, 241, 246); height: 1000px"
      >
        <el-menu :default-openeds="['1', '2', '3', '4']">
          <el-submenu index="1">
            <template #title><i class="el-icon-s-management"></i>课程管理</template>
            <el-menu-item index="1-1" @click="changePage('ManageCourse')"
              >课程管理</el-menu-item
            >
          </el-submenu>

          <el-submenu index="2">
            <template #title><i class="el-icon-s-order"></i>授课管理</template>
            <el-menu-item index="2-1" @click="changePage('CourseArrange')"
              >课程安排</el-menu-item
            >
          </el-submenu>

          <el-submenu index="3">
            <template #title><i class="el-icon-s-custom"></i>教师管理</template>
            <el-menu-item index="3-1" @click="changePage('ManageTeacher')"
              >教师管理</el-menu-item
            >
          </el-submenu>

          <el-submenu index="4">
            <template #title><i class="el-icon-user-solid"></i>学生管理</template>
            <el-menu-item index="4-1" @click="changePage('ManageStudent')"
              >学生管理</el-menu-item
            >
          </el-submenu>
        </el-menu>
      </el-aside>

      <el-container>
        <el-header style="text-align: right; font-size: 12px">
          <el-dropdown>
            <i class="el-icon-setting" style="margin-right: 15px"></i>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item @click="changePage('Login')"
                  >退出登录</el-dropdown-item
                >
              </el-dropdown-menu>
            </template>
          </el-dropdown>
          <span id="admin_name"> {{ admin_name }} </span>
        </el-header>

        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>


<script>
import { useRouter } from "vue-router";
export default {
  data() {
    return {
      admin_name: "管理员",
    };
  },
  mounted() {
    // this.admin_name = this.$root.admin_name
  },
  setup() {
    const router = useRouter();
    const changePage = (destination) => {
      router.push({
        name: destination,
      });
    };
    return {
      changePage,
    };
  },
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
  background-color: #b3c0d1;
  color: #333;
  line-height: 60px;
}

.el-aside {
  color: #333;
}

html,
body {
  height: 100%;
}

.container {
  height: 100%;
}
</style>