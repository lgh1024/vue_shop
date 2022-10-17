"use strict";(self["webpackChunkvue_shop"]=self["webpackChunkvue_shop"]||[]).push([[445],{1445:function(t,e,a){a.r(e),a.d(e,{default:function(){return u}});var s=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("Breadcrumb",{attrs:{name1:"商品管理",name2:"参数列表"}}),a("el-card",[a("el-alert",{attrs:{title:"注意：只允许为第三级分类设置相关参数！",type:"warning",closable:!1,"show-icon":""}}),a("el-row",{staticClass:"cat_opt"},[a("el-col",[a("span",[t._v("选择商品分类：")]),a("el-cascader",{attrs:{options:t.catelist,props:Object.assign({},{expandTrigger:"hover"},t.cateProps)},on:{change:t.handleChange},model:{value:t.selectdCateKeys,callback:function(e){t.selectdCateKeys=e},expression:"selectdCateKeys"}})],1)],1),a("el-tabs",{on:{"tab-click":t.handleTabClick},model:{value:t.activeName,callback:function(e){t.activeName=e},expression:"activeName"}},[a("el-tab-pane",{attrs:{label:"动态参数",name:"many"}},[a("el-button",{attrs:{type:"primary",size:"mini",disabled:t.isBtnDisabled},on:{click:function(e){t.addDialogVisible=!0}}},[t._v("添加参数")]),a("el-table",{attrs:{data:t.manyTableData,border:"",stripe:""}},[a("el-table-column",{attrs:{type:"expand"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._l(e.row.attr_vals,(function(s,i){return a("el-tag",{key:i,attrs:{closable:""},on:{close:function(a){return t.handleClose(i,e.row)}}},[t._v(" "+t._s(s)+" ")])})),e.row.inputVisible?a("el-input",{ref:"saveTagInput",staticClass:"input-new-tag",attrs:{size:"small"},on:{blur:function(a){return t.handleInputConfirm(e.row)}},nativeOn:{keyup:function(a){return!a.type.indexOf("key")&&t._k(a.keyCode,"enter",13,a.key,"Enter")?null:t.handleInputConfirm(e.row)}},model:{value:e.row.inputValue,callback:function(a){t.$set(e.row,"inputValue",a)},expression:"scope.row.inputValue"}}):a("el-button",{staticClass:"button-new-tag",attrs:{size:"small"},on:{click:function(a){return t.showInput(e.row)}}},[t._v("+ New Tag")])]}}])}),a("el-table-column",{attrs:{label:"#",type:"index"}}),a("el-table-column",{attrs:{label:"参数名称",prop:"attr_name"}}),a("el-table-column",{attrs:{label:"操作"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("el-button",{attrs:{size:"mini",type:"primary",icon:"el-icon-edit"},on:{click:function(a){return t.showEditDialog(e.row.attr_id)}}},[t._v("编辑")]),a("el-button",{attrs:{size:"mini",type:"danger",icon:"el-icon-delete"},on:{click:function(a){return t.removeParams(e.row.attr_id)}}},[t._v("删除")])]}}])})],1)],1),a("el-tab-pane",{attrs:{label:"静态属性",name:"only"}},[a("el-button",{attrs:{type:"primary",size:"mini",disabled:t.isBtnDisabled},on:{click:function(e){t.addDialogVisible=!0}}},[t._v("添加属性")]),a("el-table",{attrs:{data:t.onlyTableData,border:"",stripe:""}},[a("el-table-column",{attrs:{type:"expand"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._l(e.row.attr_vals,(function(s,i){return a("el-tag",{key:i,attrs:{closable:""},on:{close:function(a){return t.handleClose(i,e.row)}}},[t._v(" "+t._s(s)+" ")])})),e.row.inputVisible?a("el-input",{ref:"saveTagInput",staticClass:"input-new-tag",attrs:{size:"small"},on:{blur:function(a){return t.handleInputConfirm(e.row)}},nativeOn:{keyup:function(a){return!a.type.indexOf("key")&&t._k(a.keyCode,"enter",13,a.key,"Enter")?null:t.handleInputConfirm(e.row)}},model:{value:e.row.inputValue,callback:function(a){t.$set(e.row,"inputValue",a)},expression:"scope.row.inputValue"}}):a("el-button",{staticClass:"button-new-tag",attrs:{size:"small"},on:{click:function(a){return t.showInput(e.row)}}},[t._v("+ New Tag")])]}}])}),a("el-table-column",{attrs:{label:"#",type:"index"}}),a("el-table-column",{attrs:{label:"属性名称",prop:"attr_name"}}),a("el-table-column",{attrs:{label:"操作"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("el-button",{attrs:{size:"mini",type:"primary",icon:"el-icon-edit"},on:{click:function(a){return t.showEditDialog(e.row.attr_id)}}},[t._v("编辑")]),a("el-button",{attrs:{size:"mini",type:"danger",icon:"el-icon-delete"},on:{click:function(a){return t.removeParams(e.row.attr_id)}}},[t._v("删除")])]}}])})],1)],1)],1)],1),a("el-dialog",{attrs:{title:"添加"+t.titleText,visible:t.addDialogVisible,width:"50%"},on:{"update:visible":function(e){t.addDialogVisible=e},close:t.addDialogClosed}},[a("el-form",{ref:"addFormRef",attrs:{model:t.addForm,rules:t.addFormRules,"label-width":"100px"}},[a("el-form-item",{attrs:{label:t.titleText,prop:"attr_name"}},[a("el-input",{model:{value:t.addForm.attr_name,callback:function(e){t.$set(t.addForm,"attr_name",e)},expression:"addForm.attr_name"}})],1)],1),a("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:function(e){t.addDialogVisible=!1}}},[t._v("取 消")]),a("el-button",{attrs:{type:"primary"},on:{click:t.addParams}},[t._v("确 定")])],1)],1),a("el-dialog",{attrs:{title:"添加"+t.titleText,visible:t.editDialogVisible,width:"50%"},on:{"update:visible":function(e){t.editDialogVisible=e},close:t.editDialogClosed}},[a("el-form",{ref:"editFormRef",attrs:{model:t.editForm,rules:t.editFormRules,"label-width":"100px"}},[a("el-form-item",{attrs:{label:t.titleText,prop:"attr_name"}},[a("el-input",{model:{value:t.editForm.attr_name,callback:function(e){t.$set(t.editForm,"attr_name",e)},expression:"editForm.attr_name"}})],1)],1),a("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:function(e){t.editDialogVisible=!1}}},[t._v("取 消")]),a("el-button",{attrs:{type:"primary"},on:{click:t.editParams}},[t._v("确 定")])],1)],1)],1)},i=[],r={data(){return{catelist:[],cateProps:{value:"cat_id",label:"cat_name",children:"children"},selectdCateKeys:[],activeName:"many",manyTableData:[],onlyTableData:[],addDialogVisible:!1,addForm:{attr_name:""},addFormRules:{attr_name:[{required:!0,message:"请输入参数名称",trigger:"blur"}]},editDialogVisible:!1,editForm:{},editFormRules:{attr_name:[{required:!0,message:"请输入参数名称",trigger:"blur"}]}}},created(){this.getCateList()},methods:{async getCateList(){const{data:t}=await this.$http.get("categories");if(200!==t.meta.status)return this.$message.error("获取商品分类失败！");this.catelist=t.data},handleChange(){this.getParamsData()},handleTabClick(){this.getParamsData()},async getParamsData(){if(3!==this.selectdCateKeys.length)return this.selectdCateKeys=[],this.manyTableData=[],void(this.onlyTableData=[]);const{data:t}=await this.$http.get(`categories/${this.cateId}/attributes`,{params:{sel:this.activeName}});if(200!==t.meta.status)return this.$message.error("获取参数列表失败！");t.data.forEach((t=>{t.attr_vals=t.attr_vals?t.attr_vals.split(" "):[],t.inputVisible=!1,t.inputValue=""})),"many"===this.activeName?this.manyTableData=t.data:this.onlyTableData=t.data},addDialogClosed(){this.$refs.addFormRef.resetFields()},addParams(){this.$refs.addFormRef.validate((async t=>{if(!t)return;const{data:e}=await this.$http.post(`categories/${this.cateId}/attributes`,{attr_name:this.addForm.attr_name,attr_sel:this.activeName});if(201!==e.meta.status)return this.$message.error("添加参数失败！");this.$message.success("添加参数成功！"),this.addDialogVisible=!1,this.getParamsData()}))},async showEditDialog(t){const{data:e}=await this.$http.get(`categories/${this.cateId}/attributes/${t}`,{params:{attr_sel:this.activeName}});if(200!==e.meta.status)return this.$message.error("获取参数信息失败！");this.editForm=e.data,this.editDialogVisible=!0},editDialogClosed(){this.$refs.editFormRef.resetFields()},editParams(){this.$refs.editFormRef.validate((async t=>{if(!t)return;const{data:e}=await this.$http.put(`categories/${this.cateId}/attributes/${this.editForm.attr_id}`,{attr_name:this.editForm.attr_name,attr_sel:this.activeName});if(200!==e.meta.status)return this.$message.error("修改参数失败！");this.$message.success("修改参数成功！"),this.getParamsData(),this.editDialogVisible=!1}))},async removeParams(t){const e=await this.$confirm("此操作将永久删除该参数, 是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).catch((t=>t));if("confirm"!==e)return this.$message.info("已取消删除！");const{data:a}=await this.$http.delete(`categories/${this.cateId}/attributes/${t}`);if(200!==a.meta.status)return this.$message.error("删除参数失败！");this.$message.success("删除参数成功！"),this.getParamsData()},async handleInputConfirm(t){if(0===t.inputValue.trim().length)return t.inputValue="",void(t.inputVisible=!1);t.attr_vals.push(t.inputValue.trim()),t.inputValue="",t.inputVisible=!1,this.saveAttrVals(t)},async saveAttrVals(t){const{data:e}=await this.$http.put(`categories/${this.cateId}/attributes/${t.attr_id}`,{attr_name:t.attr_name,attr_sel:t.attr_sel,attr_vals:t.attr_vals.join(" ")});if(200!==e.meta.status)return this.$message.error("修改参数项失败！");this.$message.success("修改参数项成功！")},showInput(t){t.inputVisible=!0,this.$nextTick((()=>{this.$refs.saveTagInput.$refs.input.focus()}))},handleClose(t,e){e.attr_vals.splice(t,1),this.saveAttrVals(e)}},computed:{isBtnDisabled(){return 3!==this.selectdCateKeys.length},cateId(){return 3===this.selectdCateKeys.length?this.selectdCateKeys[2]:null},titleText(){return"many"===this.activeName?"动态参数":"静态属性"}}},l=r,n=a(1001),o=(0,n.Z)(l,s,i,!1,null,"5e8051e8",null),u=o.exports}}]);
//# sourceMappingURL=445.b24fad2d.js.map