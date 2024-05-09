
<template>
      <el-row>
        <el-col :span="1.5"><el-button text @click="goHome" :icon="House">首页</el-button></el-col>
        <el-col :span="1.5"><el-button text @click="goFileTD" :icon="Upload">上传</el-button></el-col>
        <el-col :span="1.5"><el-button text @click="goChat" :icon="ChatDotRound">聊天</el-button></el-col>
        <el-popover placement="bottom" :width="90" trigger="hover">
              <div class="popover-buttons">{{ uname }}</div>
              <div class="popover-buttons">{{ uname==''?'未登录':'' }}</div>
              <div class="popover-buttons" v-if="uname!=''">-------</div>
              <div class="popover-buttons" v-if ="uname!=''">
                <el-button text class="popover-button" @click="logout" :icon="Delete">退出</el-button>
              </div>
              <template #reference>
                <el-col :span="0.5" :offset="17"><el-button text circle bg :disabled="uname!=''" @click="loginVisible=true" :icon="UserFilled"></el-button></el-col> 
              </template>
        </el-popover>
        <el-popover placement="bottom" :width="90" trigger="hover">
              <div class="popover-buttons">
                <el-button text class="popover-button" :icon="Moon">深色模式</el-button>
              </div>
              <div class="popover-buttons">
                <el-button text class="popover-button" :icon="Sunny">浅色模式</el-button>
              </div>
              <template #reference>
                <el-col :span="0.5"><el-button text circle :icon="Setting"></el-button></el-col>
              </template>
        </el-popover>
      </el-row>
    <el-dialog v-model="loginVisible" center width="550px">
       <div id="in" class="bt">欢迎登陆</div>
       <div id="in"><input type="text" id="put"  placeholder="请输入用户名" v-model="uname"></div>
       <div id="in"><input type="text" id="put" placeholder="请输入密码" v-model="passwd"></div>
       
       <template #footer>
          <div id="in"><button @click="login">{{ login_btn }}</button>
              <button @click="register">{{ register_btn}}</button>
          </div>
        </template>
    </el-dialog> 
    <el-dialog v-model="registerVisible" center width="550px">
       <div id="in" class="bt">欢迎注册</div>
       <div id="in"><input type="text" id="put"  placeholder="请输入用户名" v-model="uname"></div>
       <div id="in"><input type="text" id="put" placeholder="请输入密码" v-model="passwd"></div>
       
       <template #footer>
        <div id="in"><button @click="cancle">{{ cancle_btn }}</button>
            <button @click="confirm">{{ confirm_btn}}</button>
       </div>
    </template>
</el-dialog>  
      <RouterView />
</template>


<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import axios from 'axios'
import { Search,Setting,Delete,Edit,Star,RefreshRight,UserFilled,ChatDotRound,Upload,House,Sunny,Moon} from '@element-plus/icons-vue'
import { ref } from 'vue'
import router from './router'
import { serverIp,uname,passwd } from '../config'

const input2 = ref('')
const loginVisible = ref(false)
const registerVisible = ref(false)
const login_btn = ref('登录')
const register_btn =  ref('注册')
const cancle_btn = ref('返回')
const confirm_btn =  ref('注册')



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
          login_btn.value='登录'
          if(res.data=='login success'){
            loginVisible.value=false
            router.push('/')
          }          
        }).catch((err) => {
          alert(err)
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
        }).catch((err) => {
          alert(err)
          register_btn.value='注册'
        })
}

const logout =()=>{
  uname.value=''
  passwd.value=''
}

</script>


<style>
#put{
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
#in{
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
</style>
