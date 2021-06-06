<template>
  <div>
    <div id="search_options">
      <el-divider content-position="left">新增课程信息</el-divider>
      <span>开课院系</span>
      <el-select v-model="depa_name" class="course_select" placeholder="请选择">
        <el-option
          v-for="item in depa_names"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>

      <span>课程名</span>
      <el-input
        size="medium"
        class="course_select"
        v-model="cour_name"
        clearable
      >
      </el-input>

      <span>课程号</span>
      <el-input v-model="cour_id" class="course_select" size="medium" clearable>
      </el-input>

      <span>课程类型</span>
      <el-select v-model="type" class="course_select" placeholder="请选择">
        <el-option
          v-for="item in types"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>

      <br />

      <span>考试类型</span>
      <el-select v-model="exam_type" class="course_select" placeholder="请选择">
        <el-option
          v-for="item in exam_types"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>

      <span>学分</span>
      <el-input size="medium" class="course_select" v-model="credit" clearable>
      </el-input>

      <span>选课限制</span>
      <el-input
        size="medium"
        class="course_select"
        v-model="requirement"
        clearable
      >
      </el-input>

      <span>先修课程</span>
      <el-input
        size="medium"
        class="course_select"
        v-model="prerequisite"
        clearable
      >
      </el-input>

      <el-button
        type="primary"
        icon="el-icon-upload"
        @click="addCourse"
        class="addButton"
        size="small"
        >添加课程</el-button
      >

      <br />
      <br />
      <br />
      <el-divider content-position="left">所有课程</el-divider>
    </div>

    <div id="result_list">
      <el-table
        :data="courseData"
        style="width: 100%"
        row-key="id"
        border
        :row-class-name="gray"
      >
        <el-table-column prop="depa_name" label="开课院系"></el-table-column>
        <el-table-column prop="cour_name" label="课程名"></el-table-column>
        <el-table-column prop="cour_id" label="课程号"></el-table-column>
        <el-table-column prop="type" label="课程类型"></el-table-column>
        <el-table-column prop="exam_type" label="考查类型"></el-table-column>
        <el-table-column prop="credit" label="学分"></el-table-column>
        <el-table-column prop="requirement" label="选课限制"></el-table-column>
        <el-table-column prop="prerequisite" label="先修课程"></el-table-column>
        <el-table-column fixed="right" label="操作">
          <template #default="scope">
            <el-button
              class="selectButton"
              @click="deleteCourse(scope.row)"
              type="text"
              size="middle"
              >删除</el-button
            >
            <el-button type="text" @click="updateCoursePre(scope.row)"
              >修改</el-button
            >
            <el-dialog title="修改课程信息" v-model="dialogFormVisible">
              <el-form :model="form">
                <el-form-item label="开课院系" :label-width="formLabelWidth">
                  <el-select v-model="form.depa_name" placeholder="请选择">
                    <el-option
                      label="计算机学院"
                      value="计算机学院"
                    ></el-option>
                    <el-option label="物理学院" value="物理学院"></el-option>
                    <el-option label="化学学院" value="化学学院"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="课程名" :label-width="formLabelWidth2">
                  <el-input
                    v-model="form.cour_name"
                    autocomplete="off"
                  ></el-input>
                </el-form-item>
                <el-form-item label="课程号" :label-width="formLabelWidth">
                  <el-input
                    v-model="form.cour_id"
                    autocomplete="off"
                  ></el-input>
                </el-form-item>
                <el-form-item label="课程类型" :label-width="formLabelWidth">
                  <el-select v-model="form.type" placeholder="请选择">
                    <el-option label="" value=""></el-option>
                    <el-option label="必修" value="必修"></el-option>
                    <el-option label="选修" value="选修"></el-option>
                    <el-option label="任选" value="任选"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="考试类型" :label-width="formLabelWidth">
                  <el-select v-model="form.exam_type" placeholder="请选择">
                    <el-option label="" value=""></el-option>
                    <el-option label="考试" value="考试"></el-option>
                    <el-option label="考查" value="考查"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="学分" :label-width="formLabelWidth">
                  <el-input v-model="form.credit" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="选课限制" :label-width="formLabelWidth">
                  <el-input
                    v-model="form.requirement"
                    autocomplete="off"
                  ></el-input>
                </el-form-item>
                <el-form-item label="先修课程" :label-width="formLabelWidth">
                  <el-input
                    v-model="form.prerequisite"
                    autocomplete="off"
                  ></el-input>
                </el-form-item>
              </el-form>
              <template #footer>
                <span class="dialog-footer">
                  <el-button @click="dialogFormVisible = false"
                    >取 消</el-button
                  >
                  <el-button type="primary" @click="updateCourse()"
                    >确 定</el-button
                  >
                </span>
              </template>
            </el-dialog>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { ElMessage } from "element-plus";
export default {
  data() {
    return {
      dialogFormVisible: false,
      form: {
        depa_name: "",
        cour_name: "",
        cour_id: "",
        type: "",
        exam_type: "",
        credit: "",
        requirement: "",
        prerequisite: "",
      },
      formLabelWidth: "120px",
      formLabelWidth2: "120px",
      depa_names: [
        {
          value: "计算机学院",
          label: "计算机学院",
        },
        {
          value: "化学学院",
          label: "化学学院",
        },
        {
          value: "物理学院",
          label: "物理学院",
        },
      ],
      depa_name: "",
      types: [
        {
          value: "",
          label: "",
        },
        {
          value: "必修",
          label: "必修",
        },
        {
          value: "选修",
          label: "选修",
        },
        {
          value: "任选",
          label: "任选",
        },
      ],
      type: "",
      exam_types: [
        {
          value: "",
          label: "",
        },
        {
          value: "考试",
          label: "考试",
        },
        {
          value: "考查",
          label: "考查",
        },
      ],
      exam_type: "",
      cour_name: "",
      cour_id: "",
      credit: "",
      requirement: "",
      prerequisite: "",
      courseData: [],
    };
  },
  methods: {
    getCourseList() {
      let that = this;
      axios
        .post("http://muzi.fun:4455/class_selection/admin/getCourseList", {
          depa_name: "*",
        })
        .then(function (response) {
          that.courseData = response.data;
          console.log(response.data);
        })
        .catch(function (error) {
          console.log(error);
        });
    },

    updateCoursePre(row) {
      this.dialogFormVisible = true;
      this.form.depa_name = row.depa_name;
      this.form.cour_name = row.cour_name;
      this.form.cour_id = row.cour_id;
      this.form.type = row.type;
      this.form.exam_type = row.exam_type;
      this.form.credit = row.credit;
      this.form.requirement = row.requirement;
      this.form.prerequisite = row.prerequisite;
    },

    updateCourse() {
      let that = this
      axios
        .post("http://muzi.fun:4455/class_selection/admin/updateCourse", {
          dialogFormVisible: true,
          depa_name: this.form.depa_name,
          cour_name: this.form.cour_name,
          cour_id: this.form.cour_id,
          type: this.form.type,
          exam_type: this.form.exam_type,
          credit: this.form.credit,
          requirement: this.form.requirement,
          prerequisite: this.form.prerequisite,
        })
        .then(function () {
          that.getCourseList();
          ElMessage.success({
            message: "修改成功",
            type: "success",
          });
          that.dialogFormVisible = false;
        })
        .catch(function (error) {
          console.log(error);
        });
    },

    deleteCourse(row) {
      let that = this;
      this.$confirm("是否确认要删除该课程?", "提示", {
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
            .post("http://muzi.fun:4455/class_selection/admin/dropCourse", {
              cour_id: row.cour_id,
            })
            .then(function () {
              that.getCourseList();
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

    addCourse() {
      let that = this;
      axios
        .post("http://muzi.fun:4455/class_selection/admin/addCourse", {
          depa_name: this.depa_name,
          cour_name: this.cour_name,
          cour_id: this.cour_id,
          type: this.type,
          exam_type: this.exam_type,
          credit: this.credit,
          requirement: this.requirement,
          prerequisite: this.prerequisite,
        })
        .then(function () {
          that.getCourseList();
          that.depa_name = "";
          that.cour_name = "";
          that.cour_id = "";
          that.type = "";
          that.exam_type = "";
          that.credit = "";
          that.requirement = "";
          that.prerequisite = "";
          ElMessage.success({
            message: "添加成功",
            type: "success",
          });
        })
        .catch(function (error) {
          console.log(error);
        });
    },
  },

  created() {
    this.getCourseList();
  },

  setup() {},
};
</script>

<style>
.addButton {
  float: right;
  margin-right: 80px;
  margin-top: 20px;
}

.course_select {
  width: 16%;
  margin: 20px;
}
</style>