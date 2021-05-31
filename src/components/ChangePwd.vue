<template>
  <div>
    <!-- 修改密码 -->
    <div id="changePassword">
      <el-divider content-position="left">密码修改</el-divider>
      <span>原密码</span>
      <el-input
        v-model="input_passwd"
        class="inpass"
        size="medium"
        show-password
      >
      </el-input>
      <br />
      <span>新密码</span>
      <el-input
        v-model="new_passwd1"
        class="inpass"
        size="medium"
        show-password
      >
      </el-input>
      <br />
      <span>确认新密码</span>
      <el-input
        v-model="new_passwd2"
        class="inpass"
        size="medium"
        show-password
      >
      </el-input>
      <br />
    </div>

    <!-- 保存按钮 -->
    <el-button type="primary" @click="save" class="saveButton">
      确认更改
    </el-button>
  </div>
</template>

<script>
import { ElMessage } from "element-plus";
import axios from "axios";
export default {
  data() {
    return {
      input_passwd: "",
      new_passwd1: "",
      new_passwd2: "",
    };
  },
  methods: {
    save: function () {
      let that = this;
      if (this.input_passwd != this.$root.passwd) {
        ElMessage.error("原密码输入错误");
      } else if (this.new_passwd1 != this.new_passwd2)
        ElMessage.error("两次密码输入不一致");
      else {
        axios
          .post("http://muzi.fun:4455/class_selection/student/changePasswd", {
            stud_id: this.$root.stud_id,
            old_passwd: this.$root.passwd,
            new_passwd: this.new_passwd1,
          })
          .then(function (response) {
            that.$root.passwd = that.new_passwd1
            console.log(response);
            ElMessage({
              showClose: true,
              message: "修改密码成功！",
              type: "success",
            });
          })
          .catch(function (error) {
            console.log(error);
          });
      }
    },
  },
};
</script>

<style>
#changePassword span {
  margin-left: 40px;
}

.inpass {
  width: 180px;
  margin: 20px;
}

.saveButton {
  width: 100px;
  margin-left: 50px;
  margin-top: 20px;
}
</style>