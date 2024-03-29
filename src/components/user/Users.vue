<template>
  <div>
    <!-- 面包屑导航区 -->
    <Breadcrumb name1="用户管理" name2="用户列表" />

    <!-- 卡片视图区域 -->
    <el-card>
      <!-- 搜索与添加区域 -->
      <el-row :gutter="20">
        <el-col :span="8">
          <el-input
              placeholder="请输入内容"
              v-model="queryInfo.query"
              clearable
              @clear="getUserList"
          >
            <el-button
                slot="append"
                icon="el-icon-search"
                @click="getUserList"
            ></el-button>
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-button type="primary" @click="addDialogVisible = true"
          >添加用户
          </el-button
          >
        </el-col>
      </el-row>

      <!-- 用户列表区域 -->
      <el-table :data="userData.userList" border stripe>
        <el-table-column type="index" label="#"></el-table-column>
        <el-table-column prop="username" label="姓名"></el-table-column>
        <el-table-column prop="email" label="邮箱"></el-table-column>
        <el-table-column prop="mobile" label="电话"></el-table-column>
        <el-table-column prop="role_name" label="角色"></el-table-column>
        <el-table-column label="状态">
          <template v-slot="scope">
            <el-switch
                v-model="scope.row.mg_state"
                @change="userStateChanged(scope.row)"
            ></el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="180px">
          <template v-slot="scope">
            <!-- 修改按钮 -->
            <el-button
                type="primary"
                icon="el-icon-edit"
                size="mini"
                @click="showEditDialog(scope.row.id)"
            ></el-button>
            <!-- 删除按钮 -->
            <el-button
                type="danger"
                icon="el-icon-delete"
                size="mini"
                @click="removeUserById(scope.row.id)"
            ></el-button>
            <!-- 分配角色按钮 -->
            <el-tooltip
                effect="dark"
                content="分配角色"
                placement="top"
                :enterable="false"
            >
              <el-button
                  type="warning"
                  icon="el-icon-setting"
                  size="mini"
                  @click="setRoles(scope.row)"
              ></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>

      <!-- 分页 -->
      <el-pagination
          @current-change="handleCurrentChange"
          :current-page="queryInfo.pagenum"
          @size-change="handleSizeChange"
          :page-size="queryInfo.pagesize"
          :page-sizes="[2, 5, 10, 20]"
          layout="total, sizes, prev, pager, next, jumper"
          :total="userData.total"
      >
      </el-pagination>
    </el-card>

    <!-- 添加用户的对话框 -->
    <el-dialog
        title="添加用户"
        :visible.sync="addDialogVisible"
        width="50%"
        @close="addDialogClosed"
    >
      <!-- 内容主体区域 -->
      <el-form
          :model="addForm"
          :rules="addFormRules"
          ref="addFormRef"
          label-width="70px"
      >
        <el-form-item label="用户名" prop="username">
          <el-input v-model="addForm.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="addForm.password"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="addForm.email"></el-input>
        </el-form-item>
        <el-form-item label="手机" prop="mobile">
          <el-input v-model="addForm.mobile"></el-input>
        </el-form-item>
      </el-form>
      <!-- 底部区域 -->
      <span slot="footer" class="dialog-footer">
        <el-button @click="addDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addUser">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 修改用户的对话框 -->
    <el-dialog
        title="提示"
        :visible.sync="editDialogVisible"
        @close="editDialogClosed"
        width="50%"
    >
      <el-form
          ref="editFormRef"
          :model="editForm"
          :rules="editFormRules"
          label-width="70px"
      >
        <el-form-item label="用户名">
          <el-input v-model="editForm.username" disabled></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="editForm.email"></el-input>
        </el-form-item>
        <el-form-item label="手机" prop="mobile">
          <el-input v-model="editForm.mobile"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="editUserInfo">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 分配权限的对话框 -->
    <el-dialog title="提示" :visible.sync="setRoleDialogVisible" width="50%" @close="setRoleDialogClose">
      <div>
        <p>当前的用户: {{ userInfo.username }}</p>
        <p>当前的角色: {{ userInfo.role_name }}</p>
        <p>
          分配新角色:
          <el-select v-model="selectedRoleId" placeholder="请选择">
            <el-option
                v-for="item in rolesList"
                :key="item.id"
                :label="item.roleName"
                :value="item.id"
            >
            </el-option>
          </el-select>
        </p>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="setRoleDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="saveRoleInfo">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    // 验证邮箱的规则
    let checkEmail = (rule, value, cb) => {
      // 验证邮箱的正则表达式
      const regEmail = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/;
      if (regEmail.test(value)) {
        // 合法的邮箱
        return cb();
      }
      cb(new Error("请输入合法的邮箱"));
    };
    // 验证手机号的规则
    let checkMobile = (rule, value, cb) => {
      // 验证手机号的正则表达式
      // const regMobile = /^(0|86|17951)?(13[0-9]|15[0123456789]|17[678]|18[0-9]|14[57])[0-9]{8}$/;
      const regMobile = /^1[34578]\d{9}$/;
      if (regMobile.test(value)) {
        // 合法的手机号
        return cb();
      }
      cb(new Error("请输入合法的手机号"));
    };
    return {
      // 获取用户列表的参数对象
      queryInfo: {
        query: "",
        // 当前的页数
        pagenum: 1,
        // 当前每页显示多少条数据
        pagesize: 5,
      },
      // 存放用户的数据和数量
      userData: {
        userList: [],
        total: 0,
      },
      // 控制用户对话框的显示与隐藏
      addDialogVisible: false,
      // 添加用户数据的对象
      addForm: {
        username: "",
        password: "",
        email: "",
        mobile: "",
      },
      // 添加表示的验证规则对象
      addFormRules: {
        username: [
          {required: true, message: "请输入用户名", trigger: "blur"},
          {
            min: 2,
            max: 10,
            message: "密码的长度在2~10个字符之间",
            trigger: "blur",
          },
        ],
        password: [
          {required: true, message: "请输入用户名", trigger: "blur"},
          {
            min: 6,
            max: 15,
            message: "密码的长度在6~15个字符之间",
            trigger: "blur",
          },
        ],
        email: [
          {required: true, message: "请输入邮箱", trigger: "blur"},
          {validator: checkEmail, trigger: "blur"},
        ],
        mobile: [
          {required: true, message: "请输入手机", trigger: "blur"},
          {validator: checkMobile, trigger: "blur"},
        ],
      },
      // 控制修改对话框的显示和隐藏
      editDialogVisible: false,
      // 查询到的用户信息对象
      editForm: {},
      // 修改表单的验证规则
      editFormRules: {
        email: [
          {required: true, message: "请输入邮箱", trigger: "blur"},
          {validator: checkEmail, trigger: "blur"},
        ],
        mobile: [
          {required: true, message: "请输入手机", trigger: "blur"},
          {validator: checkMobile, trigger: "blur"},
        ],
      },
      // 控制分配角色对话框的显示与隐藏
      setRoleDialogVisible: false,
      // 需要被分配角色的用户信息
      userInfo: {},
      // 所有角色的数据列表
      rolesList: [],
      // 已选择的id值
      selectedRoleId: "",
    };
  },
  created() {
    this.getUserList();
  },
  methods: {
    async getUserList() {
      const {data: res} = await this.$http.get("users", {
        params: this.queryInfo,
      });
      if (res.meta.status !== 200) {
        return this.$message.error("获取用户列表失败！");
      }
      this.userData.userList = res.data.users;
      this.userData.total = res.data.total;
      // console.log(res);
    },
    // 监听 pagesize 改变的事件
    handleSizeChange(newSize) {
      // console.log(newSize);
      this.queryInfo.pagesize = newSize;
      this.getUserList();
    }, // 监听 页码值改变的事件
    handleCurrentChange(newPage) {
      // console.log(newPage);
      this.queryInfo.pagenum = newPage;
      this.getUserList();
    },
    // 监听 Switch 状态的改变
    async userStateChanged(userInfo) {
      const {data: res} = await this.$http.put(
          `users/${userInfo.id}/state/${userInfo.mg_state}`
      );
      if (res.meta.status !== 200) {
        userInfo.mg_state = !userInfo.mg_state;
        return this.$message.error("更新用户状态失败！");
      }
      return this.$message.success("更新用户状态成功！");
    },
    // 监听添加用户对话框的关闭事件
    addDialogClosed() {
      this.$refs.addFormRef.resetFields();
    },
    // 点击按钮，添加新用户
    addUser() {
      this.$refs.addFormRef.validate(async (valid) => {
        if (!valid) return;
        // 添加新用户
        const {data: res} = await this.$http.post("users", this.addForm);
        if (res.meta.status !== 201) {
          return this.$message.error("添加用户失败！");
        }
        this.$message.success("添加用户成功！");
        // 隐藏添加用户的对话框
        this.addDialogVisible = false;
        // 添加成后重新获取用户数据,不需要用户手动刷新
        this.getUserList();
        return this.$message.success("用户添加成功了~");
      });
    },
    // 展示编辑用户的对话框
    async showEditDialog(id) {
      const {data: res} = await this.$http.get("users/" + id);
      // console.log(res);
      if (res.meta.status !== 200) {
        return this.$message.error("查询用户信息失败！");
      }
      this.editForm = res.data;
      this.editDialogVisible = true;
    },
    // 监听修改用户对话框的关闭事件
    editDialogClosed() {
      this.$refs.editFormRef.resetFields();
    },
    // 修改用户信息并提交
    editUserInfo() {
      this.$refs.editFormRef.validate(async (valid) => {
        if (!valid) return;
        // 发起修改用户信息的数据请求
        const {data: res} = await this.$http.put(
            "users/" + this.editForm.id,
            {
              email: this.editForm.email,
              mobile: this.editForm.mobile,
            }
        );
        if (res.meta.status !== 200) {
          return this.$message.error("更新用户信息失败！");
        }
        // 关闭对话框
        this.editDialogVisible = false;
        // 刷新数据列表
        this.getUserList();
        // 提示修改成功
        this.$message.success("更新用户信息成功！");
      });
    },
    // 根据id删除对应的用户信息
    async removeUserById(id) {
      // 弹框询问用户是否删除数据
      const confimResult = await this.$confirm(
          "此操作将永久删除该用户, 是否继续?",
          "提示",
          {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning",
          }
      ).catch(err => err);
      // 如果用户确认删除，则返回值为字符串 confirm
      // 如果用户取消删除，则返回值为字符串 cancel
      // console.log(confimResult);
      if (confimResult !== "confirm") {
        return this.$message.info("已经取消了删除！");
      }
      const {data: res} = await this.$http.delete("users/" + id);
      if (res.meta.status !== 200) {
        return this.$message.error("删除用户失败！");
      }
      this.$message.success("用户删除成功！");
      this.getUserList();
      // console.log(res);
    },
    // 展示分配角色的对话框
    async setRoles(userInfo) {
      this.userInfo = userInfo;

      // 在展示对话框之前,获取所有角色的列表
      const {data: res} = await this.$http.get("roles");
      if (res.meta.status !== 200) {
        return this.$message.error("获取角色列表失败!0");
      }
      this.rolesList = res.data;

      this.setRoleDialogVisible = true;
    },
    // 点击按钮,分配角色
    saveRoleInfo() {
      if (!this.selectedRoleId) {
        return this.$message.error("请选择要分配的角色!");
      }
      this.$http
          .put(`users/${this.userInfo.id}/role`, {rid: this.selectedRoleId})
          .then((res) => {
            // console.log(res);
            if (res.status !== 200) {
              return this.$message.error("更新角色失败! ");
            }
            this.$message.success("更新角色成功!");
            this.getUserList();
            this.setRoleDialogVisible = false;
          });
    },
    // 监听分配角色对话框的关闭事件
    setRoleDialogClose() {
      this.selectedRoleId = ''
      this.userInfo = {}
    },
  },
};
</script>

<style lang="less" scoped></style>
