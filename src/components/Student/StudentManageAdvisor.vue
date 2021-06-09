<template>
  <div>
    <!-- 申请指导 -->
    <div>
      <el-divider content-position="left">申请指导</el-divider>
      <span>教师编号</span>
      <el-input
        v-model="lect_id"
        class="student_advisor_select"
        size="medium"
        clearable
      >
      </el-input>

      <span>指导内容</span>
      <el-input
        v-model="content"
        class="student_advisor_select"
        size="medium"
        clearable
      >
      </el-input>

      <el-button
        type="primary"
        icon="el-icon-search"
        @click="getLect"
        class="getButton"
        size="small"
        >查看所有指导老师</el-button
      >

      <el-dialog title="所有指导老师信息" v-model="dialogTableVisible">
        <el-table :data="lectData">
          <el-table-column property="lect_name" label="教师姓名"></el-table-column>
          <el-table-column property="lect_id" label="教师编号"></el-table-column>
          <el-table-column property="depa_name" label="学院"></el-table-column>
          <el-table-column property="major" label="专业"></el-table-column>
        </el-table>
      </el-dialog>

      <el-button
        type="primary"
        icon="el-icon-upload"
        @click="addAdvisor"
        class="addButton"
        size="small"
        >发起申请</el-button
      >
    </div>
    <br />

    <!-- 当前已有指导 -->
    <div>
      <el-divider content-position="left">当前指导</el-divider>
      <div id="advisorTable">
        <el-table
          :data="advisorData"
          style="width: 100%"
          row-key="id"
          border
          stripe
        >
          <el-table-column
            prop="lect_name"
            label="指导老师姓名"
          ></el-table-column>
          <el-table-column
            prop="lect_id"
            label="指导老师编号"
          ></el-table-column>
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
                @click="deleteAdvisor(scope.row)"
                type="text"
                size="middle"
                >删除指导</el-button
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
      dialogTableVisible: false,
      lect_id: "",
      content: "",
      advisorData: [],
      lectData: []
    };
  },
  methods: {
    getAdvisor() {
      let that = this;
      axios
        .post("http://muzi.fun:4455/class_selection/student/getGuideList", {
          stud_id: this.$root.stud_id,
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

    addAdvisor() {
      let that = this;
      axios
        .post("http://muzi.fun:4455/class_selection/student/addGuide", {
          stud_id: this.$root.stud_id,
          lect_id: this.lect_id,
          content: this.content,
          replied: 0,
        })
        .then(function (response) {
          if (response.data == 1) {
            ElMessage.success({
              message: "申请成功",
              type: "success",
            });
          }
          that.getAdvisor();
        })
        .catch(function (error) {
          console.log(error);
        });
    },

    getLect() {
      let that = this;
      axios
        .post("http://muzi.fun:4455/class_selection/student/getLecturerList", {
          depa_name: "",
          major: "",
          lect_name: "",
          lect_id: "",
        })
        .then(function (response) {
          that.dialogTableVisible = true
          that.lectData = response.data
        })
        .catch(function (error) {
          console.log(error);
        });
    },

    deleteAdvisor(row) {
      let that = this;
      this.$confirm("是否确认要删除该指导?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          that.$message({
            type: "success",
            message: "删除成功",
          });
          axios
            .post("http://muzi.fun:4455/class_selection/student/deleteGuide", {
              stud_id: that.$root.stud_id,
              lect_id: row.lect_id,
            })
            .then(function () {
              that.getAdvisor();
            })
            .catch(function (error) {
              console.log(error);
            });
        })
        .catch(() => {
          that.$message({
            type: "info",
            message: "已取消删除",
          });
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
  margin-left: 50px;
}

.getButton {
  margin-left: 80px;
}
</style>