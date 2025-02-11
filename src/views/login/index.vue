<template>
  <div class="login_container">
    <el-row>
      <el-col :span="12" :xs="0"> <div class="zhanwei">zhanwei</div></el-col>
      <el-col :span="12" :xs="24" class="login_form">
        <el-form
          style="max-width: 600px"
          class="ruleForm"
          :model="loginForm"
          status-icon
          :rules="rules"
          ref="ruleFormRef"
        >
          <h1>登入</h1>
          <el-form-item prop="username">
            <el-input
              v-model="loginForm.username"
              placeholder="请输入用户名"
              :prefix-icon="User"
            ></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input
              v-model="loginForm.password"
              placeholder="Password"
              type="password"
              show-password
              autocomplete="off"
              :prefix-icon="Lock"
            />
          </el-form-item>
          <el-link type="primary" :underline="false" class="forgot_btn"
            >Forgot Password</el-link
          >
          <el-form-item>
            <el-button
              :loading="loading"
              type="primary"
              @click="login"
              class="login_btn"
            >
              Login
            </el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts" name="login">
import { reactive, ref } from "vue";
import { User, Lock } from "@element-plus/icons-vue";
import { useRouter, useRoute } from "vue-router";
import { ElNotification } from "element-plus";
import { getGreeting } from "@/utils/greeting";
import useUserStore from "@/store/modules/user";
// import { rejects } from "assert";

let useStore = useUserStore();
let $router = useRouter();
let $route = useRoute();
let loading = ref(false); // 按钮加载效果
const loginForm = reactive({
  username: "admin",
  password: "111111",
});
let ruleFormRef = ref();

const login = async () => {
  loading.value = true;

  try {
    await ruleFormRef.value.validate();
  } catch (error) {
    loading.value = false;
    return;
  }

  try {
    await useStore.userLogin(loginForm);
    // 判断登录的时候，路由路径当中是否有query参数，如果有就往query跳转，如没有就跳转到首页
    const redirect: any = $route.query.redirect;

    $router.push({ path: redirect || "/" });
    ElNotification({
      type: "success",
      message: "欢迎回来",
      title: `Hi, ${getGreeting()}好!`,
    });
    loading.value = false;
  } catch (error: string | any) {
    loading.value = false;
    ElNotification({
      type: "error",
      message: (error as Error).message,
    });
  }
};

// 正则表达式规则
// const usernameRegex = /^[a-zA-Z0-9_]+$/; // 只允许字母、数字和下划线
// const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/; // 至少8个字符，且必须包含字母和数字
// const passwordRegex = /^[A-Za-z\d]{6,}$/; // 至少6个字符，字母和数字也可以接受
const preventSQLInjection = (value: string): boolean => {
  const sqlInjectionRegex = /['";\-\/*#()|&<>*%+=]/;
  return sqlInjectionRegex.test(value);
};
const illegalChars = [
  "'",
  '"',
  ";",
  "-",
  "/",
  "*",
  "#",
  "(",
  ")",
  "|",
  "&",
  "<",
  ">",
  "%",
  "+",
  "=",
];

// 建立多条件校验
const validateUsername = (rule: string, value: string, callback: any) => {
  if (!value) {
    callback(new Error("用户名不能为空"));
  } else if (value.length < 5) {
    callback(new Error("用户长度名最少5位"));
  } else if (preventSQLInjection(value)) {
    callback(new Error(`不可使用非法字符 ${illegalChars.join(" ")}`));
  } else {
    callback();
  }
};

const validatePassword = (rule: string, value: string, callback: any) => {
  if (!value) {
    callback(new Error("密码不能为空"));
  } else if (value.length < 6) {
    callback(new Error("密码长度最少6位"));
  } else {
    callback();
  }
};

// el-form的内置表单校验
const rules = {
  username: [{ validator: validateUsername, trigger: ["blur", "change"] }],
  password: [{ validator: validatePassword, trigger: ["blur", "change"] }],
};
</script>

<style scoped lang="scss">
.login_container {
  width: 100%;
  height: 100vh;
  background-color: grey;

  h1 {
    font-size: 18px;
    font-weight: 600;
    margin-bottom: 20px;
  }

  .el-row {
    height: 100vh;
    display: flex;
    align-items: center;
    text-align: center;
    .zhanwei {
      background-color: aquamarine;
    }
    .login_form {
      display: flex;
      justify-content: center;
      direction: column;
      .ruleForm {
        background-color: rgba(50, 50, 50, 0.5);
        padding: 20px;
        width: 70%;
        min-width: 300px;
        border-radius: 10px;

        .forgot_btn {
          display: flex;
          justify-content: flex-end;
          margin-bottom: 20px;
        }
        .login_btn {
          width: 100%;
        }
      }
    }
  }
}
</style>
