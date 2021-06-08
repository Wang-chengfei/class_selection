<template>
  <div>
    <!-- 个人信息 -->
    <div id="changeInfo">
      <el-divider content-position="left">个人信息修改</el-divider>
      <span>姓名</span>
      <el-input v-model="lect_name" class="info" size="medium"> </el-input>
      <br />
      <span>学号</span>
      <el-input v-model="lect_id" class="info" size="medium"> </el-input>
      <br />
      <span>学院</span>
      <el-input v-model="depa_name" class="info" size="medium"> </el-input>
      <br />
      <span>专业</span>
      <el-input v-model="major" class="info" size="medium"> </el-input>
      <br />
      <br />
    </div>

    <!-- 保存按钮 -->
    <el-button type="primary" @click="save" class="saveButton">
      确认修改
    </el-button>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      lect_name: "",
      lect_id: "",
      depa_name: "",
      major: "",
    };
  },
  methods: {
    save: function () {
      this.$confirm("你是否确认要修改个人信息？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          axios
            .post("http://muzi.fun:4455/class_selection/lect/changeInfo", {
              lect_name: this.lect_name,
              lect_id: this.lect_id,
              depa_name: this.depa_name,
              major: this.major,
            })
            .then(function (response) {
              console.log(response);
            })
            .catch(function (error) {
              console.log(error);
            });
          this.$message({
            type: "success",
            message: "修改成功",
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消操作",
          });
        });
    },
  },
  created() {
    let that = this;
    axios
      .post("http://muzi.fun:4455/class_selection/lect/getById", {
        lect_id: this.$root.lect_id,
      })
      .then(function (response) {
        that.lect_name = response.data.lect_name;
        that.lect_id = response.data.lect_id;
        that.depa_name = response.data.depa_name;
        that.major = response.data.major;
      })
      .catch(function (error) {
        console.log(error);
      });
  },
};
</script>

<style>
#changeInfo span {
  margin-left: 40px;
}

.info {
  width: 160px;
  margin: 20px;
}

.saveButton {
  width: 100px;
  margin-left: 50px;
  margin-top: 20px;
}
</style>