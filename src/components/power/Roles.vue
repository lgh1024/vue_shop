<template>
  <div>
    <!-- 面包屑导航区 -->
    <Breadcrumb name1="权限管理" name2="角色列表" />

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
        <el-table-column type="expand">
          <template v-slot="scope">
            <el-row
              :class="['bdbottom', i1 === 0 ? 'bdtop' : '', 'vcenter']"
              v-for="(item1, i1) in scope.row.children"
              :key="item1.id"
            >
              <!-- 渲染一级权限 -->
              <el-col :span="5">
                <el-tag closable
                      @close="removeRightById(scope.row, item1.id)">{{ item1.authName }}</el-tag>
                <i class="el-icon-caret-right"></i>
              </el-col>
              <!-- 渲染二级和三级权限 -->
              <el-col :span="19">
                <!-- 通过 for 循环 嵌套渲染二级权限 -->
                <el-row
                  :class="[i2 === 0 ? '' : 'bdtop', 'vcenter']"
                  v-for="(item2, i2) in item1.children"
                  :key="item2.id"
                >
                  <el-col :span="6">
                    <el-tag type="success" closable
                      @close="removeRightById(scope.row, item2.id)">{{ item2.authName }}</el-tag>
                    <i class="el-icon-caret-right"></i>
                  </el-col>
                  <!-- 渲染三级权限 -->
                  <el-col :span="18">
                    <el-tag
                      type="warning"
                      v-for="item3 in item2.children"
                      :key="item3.id"
                      closable
                      @close="removeRightById(scope.row, item3.id)"
                      >{{ item3.authName }}</el-tag
                    >
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
          </template>
        </el-table-column>
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
              @click="showSetRightDialog(scope.row)">分配权限</el-button
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

    <!-- 分配权限的对话框 -->
    <el-dialog
      title="提示"
      :visible.sync="setRightDialogVisible"
      width="50%"
      @close="setRightDialogClosed">
      <!-- 树形控件 -->
      <el-tree :data="rightslist" :props="treeProps" show-checkbox node-key="id" default-expand-all :default-checked-keys="defKeys" ref="treeRef"></el-tree>
      <span slot="footer" class="dialog-footer">
        <el-button @click="setRightDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="allotRights">确 定</el-button>
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
      // 控制分配权限对话框的显示与隐藏
      setRightDialogVisible: false,
      // 所有权限的数据
      rightslist: [],
      // 树形控件的属性绑定对象
      treeProps: {
        label: 'authName',
        children: 'children'
      },
      // 默认选中的节点Id值数组
      defKeys: [],
      // 当前即将分配角色的id
      roleId: '',
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
    // 提交修改用户的信息
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
    // 根据id删除对应的权限
    async removeRightById(role, rightId) {
      // 弹框提示用户是否要删除
      const confirmResult = await this.$confirm(
        "此操作将永久删除该文件, 是否继续?",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      ).catch((err) => err);
      if (confirmResult !== "confirm") {
        return this.$message.info('取消了删除！')
      }
      const { data: res } = await this.$http.delete(`roles/${role.id}/rights/${rightId}`)
      if(res.meta.status !== 200) {
        return this.$message.error('删除权限失败！')
      }
      // this.getRolesList()
      role.children = res.data
    },
    // 展示分配权限的对话框
    async showSetRightDialog(role) {
      this.roleId = role.id
      // 获取所有权限的数据
      const { data: res } = await this.$http.get('rights/tree')

      if(res.meta.status !== 200) {
        return this.$message.error('获取权限数据失败!')
      }

      this.rightslist = res.data
      // console.log(this.rightslist);

      // 递归获取三级节点的Id
      this.getLeafKeys(role, this.defKeys)

      // 显示弹出框
      this.setRightDialogVisible = true
    },
    // 通过递归的形式,获取角色下所有三级权限的id,并保存到 defKeys 数组中
    getLeafKeys(node, arr) {
      // 如果当前 node 节点不包含 children 属性,则是三级节点
      if(!node.children) {
        return arr.push(node.id)
      }
      node.children.forEach(item => {
        this.getLeafKeys(item, arr)
      })
    },
    // 监听分配权限对话框的关闭事件
    setRightDialogClosed() {
      this.defKeys = []
    },
    // 点击为角色分配权限
    async allotRights() {
      const keys = [
        ...this.$refs.treeRef.getCheckedKeys(),
        ...this.$refs.treeRef.getHalfCheckedKeys(),
      ]
      // console.log(keys);
      const idStr = keys.join(',')

      const { data: res} = await this.$http.post(`roles/${this.roleId}/rights`, { rids: idStr })
      if(res.meta.status !== 200) {
        return this.$message.error('分配权限失败!')
      }
      this.$message.success('分配权限成功!')
      this.getRolesList()
      this.setRightDialogVisible = false
    },
  },
};
</script>

<style lang="less" scoped>
.el-tag {
  margin: 7px;
}
.bdtop {
  border-top: 1px solid #eee;
}
.bdbottom {
  border-bottom: 1px solid #eee;
}
.vcenter {
  display: flex;
  align-items: center;
}
</style>
