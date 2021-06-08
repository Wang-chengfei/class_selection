<template>
  <div>
    <!-- 个人信息 -->
    <div id="changeInfo">
      <el-divider content-position="left">个人信息修改</el-divider>
      <span>姓名</span>
      <el-input v-model="stud_name" class="info" size="medium"> </el-input>
      <br />
      <span>学号</span>
      <el-input v-model="stud_id" class="info" size="medium"> </el-input>
      <br />
      <span>性别</span>
      <el-input v-model="gender_surface" class="info" size="medium"> </el-input>
      <br />
      <span>学院</span>
      <el-input v-model="depa_name" class="info" size="medium"> </el-input>
      <br />
      <span>专业</span>
      <el-input v-model="major" class="info" size="medium"> </el-input>
      <br />
      <span>总学分</span>
      <el-input v-model="total_credit" class="info" size="medium" disabled>
      </el-input>
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
import { ElMessage } from "element-plus";
export default {
  data() {
    return {
      stud_name: "",
      stud_id: "",
      gender: "",
      gender_surface: "",
      depa_name: "",
      major: "",
      total_credit: "",
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
          if (this.gender_surface != "男" && this.gender_surface != "女") {
            ElMessage.error("性别输入错误");
          } else {
            if (this.gender_surface == "男") this.gender = 1;
            else this.gender = 0;
            axios
              .post("http://muzi.fun:4455/class_selection/student/changeInfo", {
                stud_id: this.stud_id,
                stud_name: this.stud_name,
                gender: this.gender,
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
          }
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
      .post("http://muzi.fun:4455/class_selection/student/getById", {
        stud_id: this.$root.stud_id,
      })
      .then(function (response) {
        that.stud_name = response.data.stud_name;
        that.stud_id = response.data.stud_id;
        that.gender = response.data.gender;
        if (response.data.gender == 1) that.gender_surface = "男";
        else that.gender_surface = "女";
        that.depa_name = response.data.depa_name;
        that.major = response.data.major;
        that.total_credit = response.data.total_credit;
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