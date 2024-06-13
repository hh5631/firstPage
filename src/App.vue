
<template>
      <el-row>
        <el-col :span="1.5"><el-button text @click="goHome" :icon="House">首页</el-button></el-col>
        <el-col :span="1.5"><el-button text @click="goFileTD" :icon="Upload">上传</el-button></el-col>
        <el-col :span="1.5"><el-button text @click="goChat" :icon="ChatDotRound">聊天</el-button></el-col>
        <el-popover placement="bottom" :width="90" trigger="hover">
              <div class="popover-buttons">{{ uname_show }}</div>
              <div class="popover-buttons" v-if="uname_show!='未登录'">-------</div>
              <div class="popover-buttons" v-if ="uname_show!='未登录'">
                <el-button text class="popover-button" @click="logout" :icon="Delete">退出</el-button>
              </div>
              <template #reference>
                <el-col :span="0.5" :offset="19"><el-button text circle bg :disabled="uname_show!='未登录'" @click="loginVisible=true" :icon="UserFilled"></el-button></el-col> 
              </template>
        </el-popover>
        <el-popover placement="bottom" :width="90" trigger="hover">
              <div class="popover-buttons">
                <el-button text class="popover-button" :icon="Moon" @click="darkMode">深色模式</el-button>
              </div>
              <div class="popover-buttons">
                <el-button text class="popover-button" :icon="Sunny" @click="lightMode">浅色模式</el-button>
              </div>
              <template #reference>
                <el-col :span="0.5"><el-button text circle :icon="Setting"></el-button></el-col>
              </template>
        </el-popover>
      </el-row>
    <el-dialog v-model="loginVisible" center width="550px">
       <div class="in bt">欢迎登陆</div>
       <div class="in"><input class="put" type="text"  placeholder="请输入用户名" v-model="uname"></div>
       <div class="in"><input  class="put" type="password"  placeholder="请输入密码" v-model="passwd"></div>
       
       <template #footer>
          <div id="in"><button @click="login">{{ login_btn }}</button>
              <button @click="register">{{ register_btn}}</button>
          </div>
        </template>
    </el-dialog> 
    <el-dialog v-model="registerVisible" center width="550px">
       <div class="in bt">欢迎注册</div>
       <div class="in"><input class="put" type="text" placeholder="请输入用户名" v-model="uname"></div>
       <div class="in"><input class="put" type="text" placeholder="请输入密码" v-model="passwd" ></div>
       
       <template #footer>
        <div class="in"><button @click="cancle">{{ cancle_btn }}</button>
            <button @click="confirm">{{ confirm_btn}}</button>
       </div>
    </template>
</el-dialog>  
      <RouterView />
</template>


<script setup lang="ts">
import {RouterView } from 'vue-router'
import router from './router'
import axios from 'axios'
import { Search,Setting,Delete,Edit,Star,RefreshRight,UserFilled,ChatDotRound,Upload,House,Sunny,Moon} from '@element-plus/icons-vue'
import { ref,provide } from 'vue'
import { serverIp,uname,passwd } from '../config'

const loginVisible = ref(false)
const registerVisible = ref(false)
const login_btn = ref('登录')
const register_btn =  ref('注册')
const cancle_btn = ref('返回')
const confirm_btn =  ref('注册')
const uname_show = ref('未登录')

provide('uname_show',uname_show)

const body = document.body;
const buttons = document.getElementsByTagName('button');
const inputs = document.getElementsByTagName('input');
let originalStyles: Partial<CSSStyleDeclaration> = {};
  originalStyles = {
    backgroundImage: body.style.backgroundImage,
    color: '',
    border: '',
  };



const goHome =()=>{
  router.push('/')
}
const goFileTD =()=>{
  router.push('/filetd')
}

const goChat =()=>{
  router.push('/chat')
}

const login =()=>{ 
        login_btn.value='登陆中'
        axios.get(serverIp+'/login',{
            params:{
                username: uname.value,
                password: passwd.value
            }
          }
         ).then((res) => {
          alert(res.data)
          passwd.value=''
          login_btn.value='登录'

          if(res.data=='login success'){
            uname_show.value=uname.value
            loginVisible.value=false
            router.push('/')
          }          
        }).catch((err) => {
          alert(err)
          passwd.value=''
          login_btn.value='登录'
        })
      }

const register =()=>{
  registerVisible.value=true
  loginVisible.value=false
}
const cancle =()=>{
  registerVisible.value=false
  loginVisible.value=true
}
const confirm =()=>{
          register_btn.value='注册中'
          console.log(uname,passwd)
          axios.get(serverIp+'/register',{
            params:{
              username: uname.value,
              password: passwd.value
            }
          }
         ).then((res) => {
          alert(res.data)
          register_btn.value='注册'
          if(res.data=='register success'){
            registerVisible.value=false
            loginVisible.value=true
          }
        }).catch((err) => {
          alert(err)
          register_btn.value='注册'
        })
}

const logout =()=>{
  uname.value=''
  passwd.value=''
  uname_show.value='未登录'
}

const darkMode =()=>{

  body.style.backgroundImage = 'linear-gradient(to top, #413737cb 0%, #00000080 100%)';

  Array.from(buttons).forEach((button:any) => {
      button.style.color= 'rgb(208, 176, 205)';
  })

  Array.from(inputs).forEach((input:any) => {
      input.style.border= '1px solid #b79d75';
  })
}

const lightMode =()=>{
  body.style.backgroundImage = originalStyles.backgroundImage || '';

  Array.from(buttons).forEach((button) => {
    button.style.color = originalStyles.color || '';
  });

  Array.from(inputs).forEach((input) => {
    input.style.border = originalStyles.border || '';
  });
}



</script>


<style>
.put{
      border: 1px solid #b79d75;
      border-radius: 5px;
      
    }
.bl{
  height: 40px;
  text-align: center;
}
.bt{
  font-size: 20px;
  line-height: 1.5;
  color:rgb(208, 176, 205);
}
.in{
  text-align: center;
  margin: 10px 5px 0px 0px;
}

.popover-buttons{
  display: flex;
  flex-direction: column;
  align-items: center;
}

.popover-button {
  margin: 0,auto;
  text-align: center;
}
body {
     background-image: linear-gradient(to top, #ddeef1 0%, #e7dae3 100%);
}
     
</style>
