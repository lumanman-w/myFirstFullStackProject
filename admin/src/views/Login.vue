<template class="login-container">
  <el-card header="请先登录" class="login-card">
    <el-form @submit.native.prevent="login">
      <el-form-item label="用户名">
        <el-input v-model="model.username"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input type="password" v-model="model.password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button native-type="submit" type="primary">登录</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
export default {
  data() {
    return {
      model: {},
    };
  },
  methods: {
    async login() {
      let res = await this.$http.post("login", this.model);
      console.log("res", res.data);
      localStorage.token = res.data.token; // 浏览器关闭后仍然存在
      // sessionStorage.token = res.data.token; // 浏览器关闭后，随之消失
      this.$router.push("/"); // 跳转到根路径
      this.$message({
        type: "success",
        message: "登录成功",
      });
    },
  },
};
</script>
<style>
.login-card {
  width: 25rem;
  margin: 6rem auto;
}
</style>
