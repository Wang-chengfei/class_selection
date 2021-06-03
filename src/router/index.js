import { createRouter, createWebHashHistory } from "vue-router";

const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("@/components/Login"),
  },
  {
    path: "/hello",
    name: "Hello",
    component: () => import("@/components/HelloWorld")
  },
  {
    path: "/studentFrame",
    name: "StudentFrame",
    component: () => import("../components/Student/StudentFrame"),
    children: [
      {
        path: '/selection',
        name: 'Selection',
        component: () => import("@/components/Student/Selection")
      },
      {
        path: '/drop',
        name: 'Drop',
        component: () => import("@/components/Student/Drop")
      },{
        path: '/history',
        name: 'History',
        component: () => import("@/components/Student/History")
      },{
        path: '/studentChangeInfo',
        name: 'StudentChangeInfo',
        component: () => import("@/components/Student/StudentChangeInfo")
      },{
        path: '/studentChangePwd',
        name: 'StudentChangePwd',
        component: () => import("@/components/Student/StudentChangePwd")
      },{
        path: '/queryScore',
        name: 'QueryScore',
        component: () => import("@/components/Student/QueryScore")
      },
    ]
  },
  {
    path: '/lectureFrame',
    name: 'LectureFrame',
    component: () => import("@/components/Lecturer/LecturerFrame"),
    children: [
      {
        path: '/teachingTable',
        name: 'TeachingTable',
        component : () => import("@/components/Lecturer/TeachingTable")
      }, {
        path: '/studentList',
        name: 'StudentList',
        component: () => import("@/components/Lecturer/StudentList")
      }, {
        path: '/lecturerChangeInfo',
        name: 'LecturerChangeInfo',
        component: () => import("@/components/Lecturer/LecturerChangeInfo")
      }, {
        path: '/lecturerChangePwd',
        name: 'LecturerChangePwd',
        component: () => import("@/components/Lecturer/LecturerChangePwd")
      }
    ]
  },
  {
    path: '/adminFrame',
    name: 'AdminFrame',
    component: () => import("@/components/Admin/AdminFrame"),
    children: [
      {
        path: '/manageCourse',
        name: 'ManageCourse',
        component : () => import("@/components/Admin/ManageCourse")
      }, {
        path: '/updateCourse',
        name: 'UpdateCourse',
        component: () => import("@/components/Admin/UpdateCourse")
      }, {
        path: '/courseArrange',
        name: 'CourseArrange',
        component: () => import("@/components/Admin/CourseArrange")
      }, {
        path: '/distributeCourse',
        name: 'DistributeCourse',
        component: () => import("@/components/Admin/DistributeCourse")
      }, {
        path: '/manageStudent',
        name: 'ManageStudent',
        component: () => import("@/components/Admin/ManageStudent")
      },  {
        path: '/manageTeacher',
        name: 'ManageTeacher',
        component: () => import("@/components/Admin/ManageTeacher")
      },
    ]
  }
];

export const router = createRouter({
  history: createWebHashHistory(),
  routes: routes
});