<template>
  <div>
    <div class="container" @click="showDialog">
      <el-tooltip class="item" effect="dark" content="锁屏" placement="bottom">
        <i class="el-icon-lock"></i>
      </el-tooltip>
    </div>

    <el-dialog
      title="设置锁屏密码"
      :modal-append-to-body="false"
      :visible.sync="dialogVisible"
      width="30%"
    >
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="锁屏密码" prop="password">
          <el-input show-password v-model="ruleForm.password"></el-input>
        </el-form-item>
        <el-form-item>
          <div class="btn">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button style="marginLeft:50px" type="primary" @click="submitForm('ruleForm')">确 定</el-button>
          </div>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dialogVisible: false,
      ruleForm: {
        password: ""
      },
      rules: {
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 6, max: 15, message: "长度在 6 到 15 个字符", trigger: "blur" }
        ]
      }
    };
  },
  components: {},
  props: {},
  methods: {
    showDialog() {
      this.dialogVisible = true;
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          sessionStorage.setItem("lockPwd", this.ruleForm.password);
          sessionStorage.setItem("isLock", 0);
          sessionStorage.setItem("path", this.$route.path);
          this.$router.push("/lockView");
        } else {
          this.$notify({
            title: "请输入正确",
            type: "warning"
          });
        }
      });
    }
  },
  mounted() {},
  watch: {},
  computed: {}
};
</script>

<style scoped lang='scss'>
.btn {
  display: flex;
  align-items: center;
  justify-content: flex-end;
}
i {
  font-size: 22px;
}
</style>