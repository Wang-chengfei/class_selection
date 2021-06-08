<template>
  <div>
    <!-- 当前所有指导 -->
    <div>
      <el-divider content-position="left">所有指导</el-divider>
      <div id="advisorTable">
        <el-table
          :data="advisorData"
          style="width: 100%"
          row-key="id"
          border
          stripe
        >
          <el-table-column prop="stud_name" label="学生姓名"></el-table-column>
          <el-table-column prop="stud_id" label="学生学号"></el-table-column>
          <el-table-column prop="depa_name" label="学院"></el-table-column>
          <el-table-column prop="major" label="专业"></el-table-column>
          <el-table-column prop="content" label="指导内容"></el-table-column>
          <el-table-column
            prop="replied_face"
            label="回复情况"
          ></el-table-column>
          <el-table-column fixed="right" label="操作">
            <template #default="scope">
              <el-button
                @click="agreeAdvisor(scope.row)"
                type="text"
                size="middle"
                >同意</el-button
              >
              <el-button
                @click="refuseAdvisor(scope.row)"
                type="text"
                size="middle"
                >拒绝</el-button
              >
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>

<script>
import { ElMessage } from "element-plus";
import axios from "axios";
export default {
  data() {
    return {
      advisorData: "",
    };
  },
  methods: {
    getAdvisor() {
      let that = this;
      axios
        .post("http://muzi.fun:4455/class_selection/lect/getGuideList", {
          lect_id: this.$root.lect_id,
        })
        .then(function (response) {
          that.advisorData = response.data;
          for (let i = 0; i < that.advisorData.length; i++) {
            if (that.advisorData[i].replied == 0)
              that.advisorData[i].replied_face = "未回复";
            else if (that.advisorData[i].replied == 1)
              that.advisorData[i].replied_face = "已同意";
            else that.advisorData[i].replied_face = "已拒绝";
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    },

    agreeAdvisor(row) {
      let that = this;
      axios
        .post("http://muzi.fun:4455/class_selection/lect/agreeGuide", {
          lect_id: this.$root.lect_id,
          stud_id: row.stud_id,
        })
        .then(function (response) {
          if (response.data == 1) {
            ElMessage.success({
              message: "同意成功",
              type: "success",
            });
            that.getAdvisor();
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    },

    refuseAdvisor(row) {
      let that = this;
      axios
        .post("http://muzi.fun:4455/class_selection/lect/refuseGuide", {
          lect_id: this.$root.lect_id,
          stud_id: row.stud_id,
        })
        .then(function (response) {
          if (response.data == 1) {
            ElMessage.success({
              message: "拒绝成功",
              type: "success",
            });
            that.getAdvisor();
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    },
  },

  created() {
    this.getAdvisor();
  },
  setup() {},
};
</script>

<style>
.student_advisor_select {
  width: 20%;
  margin: 20px;
}

.addButton {
  margin-left: 300px;
}
</style>