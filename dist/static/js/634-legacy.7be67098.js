"use strict";(self["webpackChunkvue_shop"]=self["webpackChunkvue_shop"]||[]).push([[634],{68634:function(e,t,a){a.r(t),a.d(t,{default:function(){return m}});var r=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",[a("Breadcrumb",{attrs:{name1:"商品管理",name2:"添加商品"}}),a("el-card",[a("el-alert",{attrs:{title:"添加商品信息",type:"info",center:"","show-icon":"",closable:!1}}),a("el-steps",{attrs:{space:200,active:1*e.activeIndex,"finish-status":"success","align-center":""}},[a("el-step",{attrs:{title:"基本信息"}}),a("el-step",{attrs:{title:"商品参数"}}),a("el-step",{attrs:{title:"商品属性"}}),a("el-step",{attrs:{title:"商品图片"}}),a("el-step",{attrs:{title:"商品内容"}}),a("el-step",{attrs:{title:"完成"}})],1),a("el-form",{ref:"addFormRef",attrs:{model:e.addForm,rules:e.addFormRules,"label-position":"top","label-width":"100px"}},[a("el-tabs",{attrs:{"tab-position":"left","before-leave":e.beforeTableLeave},on:{"tab-click":e.tabClicked},model:{value:e.activeIndex,callback:function(t){e.activeIndex=t},expression:"activeIndex"}},[a("el-tab-pane",{attrs:{label:"基本信息",name:"0"}},[a("el-form-item",{attrs:{label:"商品名称",prop:"goods_name"}},[a("el-input",{model:{value:e.addForm.goods_name,callback:function(t){e.$set(e.addForm,"goods_name",t)},expression:"addForm.goods_name"}})],1),a("el-form-item",{attrs:{label:"商品价格",prop:"goods_price"}},[a("el-input",{attrs:{type:"number"},model:{value:e.addForm.goods_price,callback:function(t){e.$set(e.addForm,"goods_price",t)},expression:"addForm.goods_price"}})],1),a("el-form-item",{attrs:{label:"商品重量",prop:"goods_weight"}},[a("el-input",{attrs:{type:"number"},model:{value:e.addForm.goods_weight,callback:function(t){e.$set(e.addForm,"goods_weight",t)},expression:"addForm.goods_weight"}})],1),a("el-form-item",{attrs:{label:"商品数量",prop:"goods_number"}},[a("el-input",{attrs:{type:"number"},model:{value:e.addForm.goods_number,callback:function(t){e.$set(e.addForm,"goods_number",t)},expression:"addForm.goods_number"}})],1),a("el-form-item",{attrs:{label:"商品分类",prop:"goods_cat"}},[a("el-cascader",{attrs:{options:e.catelist,props:Object.assign({},{expandTrigger:"hover"},e.cateProps)},on:{change:e.handleChange},model:{value:e.addForm.goods_cat,callback:function(t){e.$set(e.addForm,"goods_cat",t)},expression:"addForm.goods_cat"}})],1)],1),a("el-tab-pane",{attrs:{label:"商品参数",name:"1"}},e._l(e.manyTableData,(function(t){return a("el-form-item",{key:t.attr_id,attrs:{label:t.attr_name}},[a("el-checkbox-group",{model:{value:t.attr_vals,callback:function(a){e.$set(t,"attr_vals",a)},expression:"item.attr_vals"}},e._l(t.attr_vals,(function(e,t){return a("el-checkbox",{key:t,attrs:{label:e,border:""}})})),1)],1)})),1),a("el-tab-pane",{attrs:{label:"商品属性",name:"2"}},e._l(e.onlyTableData,(function(t){return a("el-form-item",{key:t.attr_id,attrs:{label:t.attr_name}},[a("el-input",{model:{value:t.attr_vals,callback:function(a){e.$set(t,"attr_vals",a)},expression:"item.attr_vals"}})],1)})),1),a("el-tab-pane",{attrs:{label:"商品图片",name:"3"}},[a("el-upload",{attrs:{action:e.uploadURL,"on-preview":e.handlePreview,"on-remove":e.handleRemove,"list-type":"picture",headers:e.headersObj,"on-success":e.handleSuccess}},[a("el-button",{attrs:{size:"small",type:"primary"}},[e._v("点击上传")])],1)],1),a("el-tab-pane",{attrs:{label:"商品内容",name:"4"}},[a("quill-editor",{ref:"myQuillEditor",model:{value:e.addForm.goods_introduce,callback:function(t){e.$set(e.addForm,"goods_introduce",t)},expression:"addForm.goods_introduce"}}),a("el-button",{staticClass:"AddBtn",attrs:{type:"primary"},on:{click:e.addShop}},[e._v("添加商品")])],1)],1)],1)],1),a("el-dialog",{attrs:{title:"图片预览",visible:e.previewDialogVisible,width:"50%"},on:{"update:visible":function(t){e.previewDialogVisible=t}}},[a("img",{staticClass:"perviewImg",attrs:{src:e.previewPath,alt:""}})])],1)},s=[],o=a(39873),n=(a(41539),a(54747),a(74916),a(23123),a(15306),a(34553),a(40561),a(69600),a(83040),a(64900)),i=a.n(n),l={data:function(){return{activeIndex:"0",addForm:{goods_name:"",goods_price:0,goods_weight:0,goods_number:0,goods_cat:[],pics:[],goods_introduce:"",attrs:[]},addFormRules:{goods_name:[{required:!0,message:"请输入商品名称",trigger:"blur"}],goods_price:[{required:!0,message:"请输入商品价格",trigger:"blur"}],goods_weight:[{required:!0,message:"请输入商品重量",trigger:"blur"}],goods_number:[{required:!0,message:"请输入商品数量",trigger:"blur"}],goods_cat:[{required:!0,message:"请输入商品分类",trigger:"blur"}]},catelist:[],cateProps:{label:"cat_name",value:"cat_id",children:"children"},manyTableData:[],onlyTableData:[],uploadURL:"http://192.168.43.144:8888/api/private/v1/upload",headersObj:{Authorization:window.sessionStorage.getItem("token")},previewPath:"",previewDialogVisible:!1}},created:function(){this.getCateList()},methods:{getCateList:function(){var e=this;return(0,o.Z)(regeneratorRuntime.mark((function t(){var a,r;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,e.$http.get("Categories");case 2:if(a=t.sent,r=a.data,200===r.meta.status){t.next=6;break}return t.abrupt("return",e.$message.error("获取商品分类数据失败！"));case 6:e.catelist=r.data;case 7:case"end":return t.stop()}}),t)})))()},handleChange:function(){3!==this.addForm.goods_cat.length&&(this.addForm.goods_cat=[])},beforeTableLeave:function(e,t){if("0"===t&&3!==this.addForm.goods_cat.length)return this.$message.error("请先选中分类！"),!1},tabClicked:function(){var e=this;return(0,o.Z)(regeneratorRuntime.mark((function t(){var a,r,s,o;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:if("1"!==e.activeIndex){t.next=11;break}return t.next=3,e.$http.get("categories/".concat(e.cateId,"/attributes"),{params:{sel:"many"}});case 3:if(a=t.sent,r=a.data,200===r.meta.status){t.next=7;break}return t.abrupt("return",e.$message.error("获取动态参数列表失败！"));case 7:r.data.forEach((function(e){e.attr_vals=0===e.attr_vals.length?[]:e.attr_vals.split(" ")})),e.manyTableData=r.data,t.next=19;break;case 11:if("2"!==e.activeIndex){t.next=19;break}return t.next=14,e.$http.get("categories/".concat(e.cateId,"/attributes"),{params:{sel:"only"}});case 14:if(s=t.sent,o=s.data,200===o.meta.status){t.next=18;break}return t.abrupt("return",e.$message.error("获取动态参数列表失败！"));case 18:e.onlyTableData=o.data;case 19:case"end":return t.stop()}}),t)})))()},handlePreview:function(e){this.previewPath=e.response.data.url.replace("http://127.0.0.1","http://192.168.43.144"),this.previewDialogVisible=!0,console.log("预览图片",e.response.data.url)},handleRemove:function(e){var t=e.response.data.tmp_path,a=this.addForm.pics.findIndex((function(e){return e.pic===t}));this.addForm.pics.splice(a,1),console.log("移除图片",e,this.addForm)},handleSuccess:function(e){var t={pic:e.data.tmp_path};this.addForm.pics.push(t)},addShop:function(){var e=this;this.$refs.addFormRef.validate(function(){var t=(0,o.Z)(regeneratorRuntime.mark((function t(a){var r,s,o;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:if(a){t.next=2;break}return t.abrupt("return",e.$message.error("请填写必要的表单项"));case 2:return r=i().cloneDeep(e.addForm),r.goods_cat=r.goods_cat.join(","),e.manyTableData.forEach((function(t){var a={attr_id:t.attr_id,attr_vals:t.attr_vals.join(" ")};e.addForm.attrs.push(a)})),e.onlyTableData.forEach((function(t){var a={attr_id:t.attr_id,attr_vals:t.attr_vals};e.addForm.attrs.push(a)})),r.attrs=e.addForm.attrs,t.next=9,e.$http.post("goods",r);case 9:if(s=t.sent,o=s.data,201===o.meta.status){t.next=13;break}return t.abrupt("return",e.$message.error("添加商品失败!"));case 13:e.$message.success("添加商品成功!"),e.$router.push("/goods");case 15:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}())}},computed:{cateId:function(){return 3===this.addForm.goods_cat.length?this.addForm.goods_cat[2]:null}}},d=l,c=a(1001),u=(0,c.Z)(d,r,s,!1,null,"a2973ee6",null),m=u.exports}}]);
//# sourceMappingURL=634-legacy.7be67098.js.map