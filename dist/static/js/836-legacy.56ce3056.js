"use strict";(self["webpackChunkvue_shop"]=self["webpackChunkvue_shop"]||[]).push([[836],{91836:function(e,t,r){r.r(t),r.d(t,{default:function(){return o}});var a=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",[r("Breadcrumb",{attrs:{name1:"权限管理",name2:"权限列表"}}),r("el-card",[r("el-table",{attrs:{data:e.rightsList,border:"",stripe:""}},[r("el-table-column",{attrs:{label:"#",type:"index"}}),r("el-table-column",{attrs:{label:"权限名称",prop:"authName"}}),r("el-table-column",{attrs:{label:"路径",prop:"path"}}),r("el-table-column",{attrs:{label:"权限等级",prop:"level"},scopedSlots:e._u([{key:"default",fn:function(t){return["0"===t.row.level?r("el-tag",[e._v("一级")]):"1"===t.row.level?r("el-tag",{attrs:{type:"success"}},[e._v("二级")]):"2"===t.row.level?r("el-tag",{attrs:{type:"warning"}},[e._v("三级")]):e._e()]}}])})],1)],1)],1)},n=[],s=r(39873),l=(r(83040),{data:function(){return{rightsList:[]}},created:function(){this.getRightsList()},methods:{getRightsList:function(){var e=this;return(0,s.Z)(regeneratorRuntime.mark((function t(){var r,a;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,e.$http.get("rights/list");case 2:if(r=t.sent,a=r.data,200===a.meta.status){t.next=6;break}return t.abrupt("return",e.$message.error("获取权限列表失败！"));case 6:e.rightsList=a.data;case 7:case"end":return t.stop()}}),t)})))()}}}),u=l,i=r(1001),c=(0,i.Z)(u,a,n,!1,null,"a21d675e",null),o=c.exports}}]);
//# sourceMappingURL=836-legacy.56ce3056.js.map