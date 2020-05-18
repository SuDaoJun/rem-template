<template>
  <div class="wrapper">
    <h4 class='login-title'>{{$t('login.loginTitle')}}</h4>
    <van-form @submit="onSubmit"  class='login-form'>
      <van-field
        v-model="loginForm.userName"
        clearable
        :label="$t('login.userName')"
        :placeholder="$t('login.userName')"
        :rules="[{ required: true, message: $t('formPrompt.userName') }]"
      />
      <van-field
        v-model="loginForm.password"
        clearable
        :type="pwdShow?'text':'password'"
        :label="$t('login.password')"
        :placeholder="$t('login.password')"
        :right-icon="loginForm.password?'browsing-history':''"
        :rules="[{ required: true, message: $t('formPrompt.password') }]"
        @click-right-icon='pwdShow = !pwdShow'
      />
      <van-field
        v-model="loginForm.code"
        center
        clearable
        :label="$t('login.verification')"
        :placeholder="$t('login.verification')"
        :rules="[{ validator: codeValidator, message: codeMessage }]"
      >
        <template #button>
          <Identify :identifyCode='identifyCode' :contentWidth='115' :contentHeight='40'></Identify>
        </template>
      </van-field>
      <van-field
        readonly
        clickable
        :value="loginForm.lang"
        :default-index='defaultIndex'
        :label="$t('login.langSelect')"
        right-icon='arrow-down'
        @click="showPicker = true"
      />
      <van-popup v-model="showPicker" position="bottom">
        <van-picker
          show-toolbar
          :columns="langData"
          :title="$t('login.langSelect')"
          @confirm="langChange"
          @cancel="showPicker = false"
        />
      </van-popup>
      <div class='btn-submit'>
        <van-button  round block type="info" native-type="submit">
          {{$t('login.loginTitle')}}
        </van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import { setup } from "@/utils/locales";
import Identify from "@/components/Identify"
export default {
  data() {
    return {
      pwdShow: false,
      showPicker: false,
      identifyCode: '',
      loginForm: {
        userName: '',
        password: '',
        code: '',
        lang: ''
      },
      langData: [
        {
          text: '中文',
          value: 'zh'
        },
        {
          text: 'English',
          value: 'en'
        }
      ]
    }
  },
  created() {

  },
  mounted() {
    this.loginForm.lang = localStorage.getItem('language') === 'zh'?'中文':'English'
    this.refreshCode()
  },
  methods: {
    refreshCode(){
      let verificationCode = Math.floor(Math.random()*(9999-1000))+1000
      this.identifyCode = verificationCode.toString()
    },
    codeValidator(value){
      if(value === '' || value === undefined || value === null){
        return false
      }else if(value.length !== 4){
        return false
      }else if(value !== this.identifyCode){
        return false
      }
      return true
    },
    codeMessage(value){
      if(value === '' || value === undefined || value === null){
        return this.$t('formPrompt.codeEmpty')
      }else if(value.length !== 4){
        return this.$t('formPrompt.codeLength')
      }else if(value !== this.identifyCode){
        return this.$t('formPrompt.codeDifferent')
      }
    },
    langChange(data){
      if(this.loginForm.lang !== data.text){
        this.loginForm.lang = data.text
        this.$i18n.locale = data.value
        setup(data.value)
        this.$nextTick(() => {
          this.$router.replace({
            path: '/redirect' + this.$route.fullPath
          })
        })
      }
      this.showPicker = false
    },
    onSubmit(values){
      sessionStorage.setItem('userInfo','userInfo')
      this.$router.push({path: '/test'})
    }
  },
  watch: {

  },
  components: {
    Identify
  },
  computed: {
    defaultIndex(){
      return this.loginForm.lang === "中文"?"0":"1"
    }
  }
}
</script>

<style lang="scss" scoped>
  .wrapper{
    width: 100vw;
    height: 100vh;
    padding: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    background-image: linear-gradient(to top, #d5d4d0 0%, #d5d4d0 1%, #eeeeec 31%, #efeeec 75%, #e9e9e7 100%);
    .login-title{
      font-size: 28px;
      letter-spacing: 2px;
      text-align: center;
      margin-bottom: 20px;
    }
    /deep/ .login-form{
      width: 100%;
      .btn-submit{
        margin: 30px 16px 0;
        .btn-reset{
          margin-top: 20px;
        }
      }
      .van-cell{
        background-color: rgba(255,255,255,.2);
      }
    }
  }
</style>