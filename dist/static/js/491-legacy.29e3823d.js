"use strict";(self["webpackChunkvue_shop"]=self["webpackChunkvue_shop"]||[]).push([[491],{80491:function(e,t,n){n.r(t),n.d(t,{default:function(){return c}});var r=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",[n("Breadcrumb",{attrs:{name1:"商品管理",name2:"商品列表"}}),n("el-card",[n("el-row",{attrs:{gutter:20}},[n("el-col",{attrs:{span:8}},[n("el-input",{attrs:{placeholder:"请输入内容",clearable:""},on:{clear:e.getGoodsList},model:{value:e.queryInfo.query,callback:function(t){e.$set(e.queryInfo,"query",t)},expression:"queryInfo.query"}},[n("el-button",{attrs:{slot:"append",icon:"el-icon-search"},on:{click:e.getGoodsList},slot:"append"})],1)],1),n("el-col",{attrs:{span:4}},[n("el-button",{attrs:{type:"primary"},on:{click:e.goAddpage}},[e._v("添加商品")])],1)],1),n("el-table",{attrs:{data:e.goodslist,border:"",stripe:""}},[n("el-table-column",{attrs:{label:"#",type:"index"}}),n("el-table-column",{attrs:{label:"商品名称",prop:"goods_name"}}),n("el-table-column",{attrs:{label:"商品价格(元)",prop:"goods_price",width:"95px"}}),n("el-table-column",{attrs:{label:"商品重量",prop:"goods_weight",width:"70px"}}),n("el-table-column",{attrs:{width:"220px",label:"创建时间"},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v(" "+e._s(e._f("dataFormat")(t.row.add_time))+" ")]}}])}),n("el-table-column",{attrs:{label:"操作",width:"130px"},scopedSlots:e._u([{key:"default",fn:function(t){return[n("el-button",{attrs:{type:"primary",icon:"el-icon-edit",size:"mini"}}),n("el-button",{attrs:{type:"danger",icon:"el-icon-delete",size:"mini"},on:{click:function(n){return e.removeById(t.row.goods_id)}}})]}}])})],1),n("el-pagination",{attrs:{"current-page":e.queryInfo.pagenum,"page-sizes":[5,10,15,20],"page-size":e.queryInfo.pagesize,layout:"total, sizes, prev, pager, next, jumper",total:e.total,background:""},on:{"size-change":e.handleSizeChange,"current-change":e.handleCurrentChange}})],1)],1)},a=[],o=n(39873),s=(n(83040),{data:function(){return{queryInfo:{query:"",pagenum:1,pagesize:10},goodslist:[],total:0}},created:function(){this.getGoodsList()},methods:{getGoodsList:function(){var e=this;return(0,o.Z)(regeneratorRuntime.mark((function t(){var n,r;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,e.$http.get("goods",{params:e.queryInfo});case 2:if(n=t.sent,r=n.data,200===r.meta.status){t.next=6;break}return t.abrupt("return",e.$message.error("获取商品列表失败！"));case 6:e.$message.success("获取商品列表成功！"),e.goodslist=r.data.goods,e.total=r.data.total;case 9:case"end":return t.stop()}}),t)})))()},handleSizeChange:function(e){this.queryInfo.pagesize=e,this.getGoodsList()},handleCurrentChange:function(e){this.queryInfo.pagenum=e,this.getGoodsList()},removeById:function(e){var t=this;return(0,o.Z)(regeneratorRuntime.mark((function n(){var r,a,o;return regeneratorRuntime.wrap((function(n){while(1)switch(n.prev=n.next){case 0:return n.next=2,t.$confirm("此操作将永久删除该文件, 是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).catch((function(e){return e}));case 2:if(r=n.sent,"confirm"===r){n.next=5;break}return n.abrupt("return",t.$message.info("已经取消删除！"));case 5:return n.next=7,t.$http.delete("goods/".concat(e));case 7:if(a=n.sent,o=a.data,200===o.meta.status){n.next=11;break}return n.abrupt("return",t.$message.error("删除失败！"));case 11:t.$message.success("删除成功！"),t.getGoodsList();case 13:case"end":return n.stop()}}),n)})))()},goAddpage:function(){this.$router.push("/goods/add")}}}),u=s,i=n(1001),l=(0,i.Z)(u,r,a,!1,null,"960b621a",null),c=l.exports}}]);
//# sourceMappingURL=491-legacy.29e3823d.js.map