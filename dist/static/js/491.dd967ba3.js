"use strict";(self["webpackChunkvue_shop"]=self["webpackChunkvue_shop"]||[]).push([[491],{491:function(e,t,a){a.r(t),a.d(t,{default:function(){return u}});var s=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",[a("Breadcrumb",{attrs:{name1:"商品管理",name2:"商品列表"}}),a("el-card",[a("el-row",{attrs:{gutter:20}},[a("el-col",{attrs:{span:8}},[a("el-input",{attrs:{placeholder:"请输入内容",clearable:""},on:{clear:e.getGoodsList},model:{value:e.queryInfo.query,callback:function(t){e.$set(e.queryInfo,"query",t)},expression:"queryInfo.query"}},[a("el-button",{attrs:{slot:"append",icon:"el-icon-search"},on:{click:e.getGoodsList},slot:"append"})],1)],1),a("el-col",{attrs:{span:4}},[a("el-button",{attrs:{type:"primary"},on:{click:e.goAddpage}},[e._v("添加商品")])],1)],1),a("el-table",{attrs:{data:e.goodslist,border:"",stripe:""}},[a("el-table-column",{attrs:{label:"#",type:"index"}}),a("el-table-column",{attrs:{label:"商品名称",prop:"goods_name"}}),a("el-table-column",{attrs:{label:"商品价格(元)",prop:"goods_price",width:"95px"}}),a("el-table-column",{attrs:{label:"商品重量",prop:"goods_weight",width:"70px"}}),a("el-table-column",{attrs:{width:"220px",label:"创建时间"},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v(" "+e._s(e._f("dataFormat")(t.row.add_time))+" ")]}}])}),a("el-table-column",{attrs:{label:"操作",width:"130px"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("el-button",{attrs:{type:"primary",icon:"el-icon-edit",size:"mini"}}),a("el-button",{attrs:{type:"danger",icon:"el-icon-delete",size:"mini"},on:{click:function(a){return e.removeById(t.row.goods_id)}}})]}}])})],1),a("el-pagination",{attrs:{"current-page":e.queryInfo.pagenum,"page-sizes":[5,10,15,20],"page-size":e.queryInfo.pagesize,layout:"total, sizes, prev, pager, next, jumper",total:e.total,background:""},on:{"size-change":e.handleSizeChange,"current-change":e.handleCurrentChange}})],1)],1)},o=[],n={data(){return{queryInfo:{query:"",pagenum:1,pagesize:10},goodslist:[],total:0}},created(){this.getGoodsList()},methods:{async getGoodsList(){const{data:e}=await this.$http.get("goods",{params:this.queryInfo});if(200!==e.meta.status)return this.$message.error("获取商品列表失败！");this.$message.success("获取商品列表成功！"),this.goodslist=e.data.goods,this.total=e.data.total},handleSizeChange(e){this.queryInfo.pagesize=e,this.getGoodsList()},handleCurrentChange(e){this.queryInfo.pagenum=e,this.getGoodsList()},async removeById(e){const t=await this.$confirm("此操作将永久删除该文件, 是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).catch((e=>e));if("confirm"!==t)return this.$message.info("已经取消删除！");const{data:a}=await this.$http.delete(`goods/${e}`);if(200!==a.meta.status)return this.$message.error("删除失败！");this.$message.success("删除成功！"),this.getGoodsList()},goAddpage(){this.$router.push("/goods/add")}}},r=n,l=a(1001),i=(0,l.Z)(r,s,o,!1,null,"960b621a",null),u=i.exports}}]);
//# sourceMappingURL=491.dd967ba3.js.map