<template>
  <div id="wholePage">
    <div id="loginPage">
      <div class="infoBox welcome">欢迎登录选课系统</div>
      <!-- 选择身份 -->
      <div class="chooseIdentity">请选择登录身份</div>
      <div class="chooseBox">
        <el-radio-group v-model="identity">
          <el-radio-button label="学生"></el-radio-button>
          <el-radio-button label="教师"></el-radio-button>
          <el-radio-button label="管理员"></el-radio-button>
        </el-radio-group>
      </div>

      <!-- 登录信息填写 -->
      <div class="infoBox">
        <span>账号</span>
        <el-input v-model="stud_id" class="in_login" size="medium"> </el-input>
      </div>

      <div class="infoBox">
        <span>密码</span>
        <el-input v-model="passwd" class="in_login" size="medium" show-password>
        </el-input>
      </div>

      <!-- 登录按钮 -->
      <el-button type="primary" @click="login" class="loginButton">
        登录
      </el-button>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { ElMessage } from "element-plus";
export default {
  data() {
    return {
      identity: "学生",
      stud_id: "",
      passwd: "",
      verify: "",
    };
  },
  methods: {
    login: function () {
      let that = this;
      if (this.identity == "学生") {
        axios
          .post("http://muzi.fun:4455/class_selection/student/login", {
            stud_id: this.stud_id,
            passwd: this.passwd,
          })
          .then(function (response) {
            that.verify = response.data;
            if (that.verify == false) {
              ElMessage.error("账号或密码错误");
            } else {
              that.$root.stud_id = that.stud_id;
              that.$root.passwd = that.passwd;
              axios
                .post("http://muzi.fun:4455/class_selection/student/getById", {
                  stud_id: that.$root.stud_id,
                })
                .then(function (response) {
                  that.$root.stud_name = response.data.stud_name;
                })
                .catch(function (error) {
                  console.log(error);
                });
              that.$router.push({
                name: "Selection",
              });
            }
          })
          .catch(function (error) {
            console.log(error);
          });
      } else if (this.identity == "教师") {
        console.log("教师登录");
      } else {
        console.log("管理员登录");
      }
    },
  },
};
</script>

<style>
#loginPage {
  text-align: center;
  border-radius: 20px;
  margin: 150px auto;
  background-color: #dbf8fe;
  width: 400px;
  height: 560px;
}

.chooseBox {
  margin-bottom: 40px;
}

.chooseIdentity {
  font-weight: 500;
  font-size: 16px;
  margin-bottom: 20px;
  margin-top: 30px;
}

.infoBox {
  width: 300px;
  margin: 10px auto;
}

.welcome {
  font-size: 25px;
  font-weight: 700;
  position: relative;
  top: 40px;
  margin-bottom: 70px;
}

.in_login {
  width: 220px;
  margin: 10px;
}

.loginButton {
  display: block;
  width: 100px;
  margin: 35px auto;
}
</style>