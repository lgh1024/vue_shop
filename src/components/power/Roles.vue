<template>
  <div>
    <!-- 面包屑导航区 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>角色列表</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 卡片视图区域 -->
    <el-card>
      <!-- 添加角色按钮区域 -->
      <el-row>
        <el-col>
          <el-button type="primary" @click="addDialogVisible = true"
            >添加用户</el-button
          >
        </el-col>
      </el-row>

      <!-- 角色列表区域 -->
      <el-table :data="rolelist" border stripe>
        <!-- 展开列 -->
        <el-table-column type="expand"></el-table-column>
        <!-- 索引列 -->
        <el-table-column label="#" type="index"></el-table-column>
        <el-table-column label="角色名称" prop="roleName"></el-table-column>
        <el-table-column label="角色描述" prop="roleDesc"></el-table-column>
        <el-table-column label="操作" width="300px">
          <template v-slot="scope">
            <el-button
              size="mini"
              type="primary"
              icon="el-icon-edit"
              @click="showEditDialog(scope.row.id)"
              >编辑</el-button
            >
            <el-button
              size="mini"
              type="danger"
              @click="rolesdelete(scope.row.id)"
              icon="el-icon-delete"
              >删除</el-button
            >
            <el-button size="mini" type="warning" icon="el-icon-setting"
              >分配权限</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <!-- 添加角色对话框 -->
    <el-dialog
      title="添加角色"
      :visible.sync="addDialogVisible"
      @close="addDislogClosed"
    >
      <el-form
        :model="addRolesForm"
        :rules="addFormRules"
        ref="addRolesForm"
        label-width="100px"
      >
        <el-form-item label="角色名称" prop="roleName">
          <el-input v-model="addRolesForm.roleName"></el-input>
        </el-form-item>
        <el-form-item label="角色描述" prop="roleDesc">
          <el-input v-model="addRolesForm.roleDesc"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addRolesUser">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 编辑对话框 -->
    <el-dialog title="修改角色" :visible.sync="editDialogVisible" width="30%">
      <el-form
        :model="editRolesForm"
        :rules="editFormRules"
        ref="editFormRef"
        label-width="100px"
      >
        <el-form-item label="角色名称" prop="roleName">
          <el-input v-model="editRolesForm.roleName"></el-input>
        </el-form-item>
        <el-form-item label="角色描述" prop="roleDesc">
          <el-input v-model="editRolesForm.roleDesc"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="editFormInfo">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 所有角色的列表
      rolelist: [],
      // 所有权限的数据
      rightsList: [],
      // 添加角色对话框的显示和隐藏
      addDialogVisible: false,
      addFormRules: {
        roleName: [
          { required: true, message: "请输入角色名字", trigger: "blur" },
          {
            min: 2,
            max: 10,
            message: "输入的范围是 2 ~ 10 为字符",
            triggetr: "nlur",
          },
        ],
        roleDesc: [
          { required: true, message: "请输入角色描述", trigger: "blur" },
          {
            min: 3,
            max: 20,
            message: "输入的范围是 3 ~ 20 为字符",
            triggetr: "nlur",
          },
        ],
      },
      editFormRules: {
        roleName: [
          { required: true, message: "请输入角色名字", trigger: "blur" },
          {
            min: 2,
            max: 10,
            message: "输入的范围是 2 ~ 10 为字符",
            triggetr: "nlur",
          },
        ],
        roleDesc: [
          { required: true, message: "请输入角色描述", trigger: "blur" },
          {
            min: 3,
            max: 20,
            message: "输入的范围是 3 ~ 20 为字符",
            triggetr: "nlur",
          },
        ],
      },
      // 编辑对话框的显示和隐藏
      editDialogVisible: false,
      // 分配权限对话框的显示和隐藏
      SetRightDialogVisible: false,
      addRolesForm: {
        roleName: "",
        roleDesc: "",
      },
      editRolesForm: {},
      // 树形控件的绑定对象
      treeProps: {
        children: "children",
        label: "authName",
      },
      // 树形控件 -> 默认选中的节点id值数组
      defKeys: [],
      // 当前即将分配权限的角色的ID
      rolesId: "",
    };
  },
  created() {
    this.getRolesList();
  },
  methods: {
    // 获取所有角色的列表
    async getRolesList() {
      const { data: res } = await this.$http.get("roles");
      if (res.meta.status !== 200) {
        return this.$message.error("获取角色列表失败!");
      }
      this.rolelist = res.data;
      // console.log(this.rolelist);
    },
    // 添加角色
    addRolesUser() {
      this.$refs.addRolesForm.validate(async (valid) => {
        if (!valid) return;
        const { data: res } = await this.$http.post("roles", this.addRolesForm);
        console.log(res);
        if (res.meta.status !== 201) {
          return this.$message.error("添加角色失败!");
        }
        this.$message.success("添加角色成功!");
        this.getRolesList();
        this.addDialogVisible = false;
      });
      // console.log(this.addRolesForm)
    },
    // 清空添加角色对话框
    addDislogClosed() {
      this.$refs.addRolesForm.resetFields();
    },
    // 删除角色
    async rolesdelete(id) {
      const confirmRusult = await this.$confirm(
        "此操作将永久删除该角色, 是否继续?",
        "删除角色",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      ).catch((err) => err);
      // 没有使用await
      if (confirmRusult !== "confirm") {
        return this.$message.info("已取消该删除操作");
      }
      this.$http.delete("roles/" + id).then((res) => {
        const { data: response } = res;
        // console.log(response)
        if (response.meta.status !== 200) {
          return this.$message.error("该用户删除失败");
        }
        this.$message.success("该用户已经删除");
        this.getRolesList();
      });
    },

    // 得到修改用户的信息
    async showEditDialog(id) {
      const { data: res } = await this.$http.get("roles/" + id);
      if (res.meta.status !== 200) {
        return this.$message.error("查询角色失败!");
      }
      this.editRolesForm = res.data;
      console.log(this.editRolesForm);
      this.editDialogVisible = true;
    },
    editFormInfo() {
      this.$refs.editFormRef.validate((valid) => {
        if (!valid) return;
        this.$http
          .put("roles/" + this.editRolesForm.roleId, {
            roleName: this.editRolesForm.roleName,
            roleDesc: this.editRolesForm.roleDesc,
          })
          .then((res) => {
            if (res.data.meta.status !== 200) {
              return this.$message.error("修改角色失败!");
            }
            this.$message.success("修改角色成功!");
            this.getRolesList();
          });
        this.editDialogVisible = false;
      });
    },
  },
};
</script>

<style lang="less" scoped></style>
