<template>
  <el-container>
    <el-header  height="220px">
      <div class="divBl">当前在线人数：</div>
      <el-button  v-for="(uname,index) in unameList" :key="index"  type="primary" round  :icon="User" color="#705697">{{ uname }} </el-button>
    </el-header>
     <el-main height="240px">
          <el-row class="row">
            <el-col :span="23">
              <el-input v-model="input" placeholder="请输入内容" autosize class="input-send" @keydown.enter="sendMessage"/>
            </el-col>
            <el-col :span="1">
              <el-button type="primary" round @click="sendMessage" :icon="Promotion" color="#705697"></el-button>
            </el-col>
          </el-row>
          <textarea v-model="text" class="tt" readonly/>

     </el-main> 

  </el-container>
</template>
      


<script setup lang="ts">
import axios from 'axios';
import { h, inject, ref } from 'vue'
import {Check,Delete,Edit,Message,Search,Star,Download,Promotion,InfoFilled,User} from '@element-plus/icons-vue'
import { ElMessage,ElNotification } from 'element-plus'
import {serverIp,uname} from '../../config'



const input = ref('')
const text = ref('')
const unameList = ref([])
const uname_show:any = inject('uname_show')
let socket:WebSocket;

if(uname_show.value!='未登录'){
  socket=new WebSocket('ws://112.124.49.204:8095/websocket/'+uname.value)
  socket.onopen = function(event:any) {
  console.log('WebSocket连接已建立');

  axios.get(serverIp+'/getOnlineUser').then((res) => {
    unameList.value = res.data
  })

  showAllMessage();

};
// 当收到服务器消息时触发
  socket.onmessage = function(event:any) {
      let data:any = JSON.parse(event.data)
      // 更新消息列表
      if(data.type=='online'){
      unameList.value = JSON.parse(data.data)
      }
      if(data.type=='message'){
        text.value += data.data+'\n'+'——————————————————————————————————————————————\n';
      }

  };
  socket.onclose = function(event:any) {
      console.log('WebSocket连接已关闭');
  };

  socket.onerror = function(event:any) {
      console.log('WebSocket发生了错误');
  };

}



const sendMessage =async ()=>{
  if(uname_show.value=='未登录'){
    ElNotification({
      title: '提示',
      message: '请先登录',
      type: 'warning',
      dangerouslyUseHTMLString: true
    })
    return
  }
  if(input.value==''){
    ElMessage.warning('发送内容不能为空')
    return
  }
  socket.send(input.value);  
  text.value += uname_show.value+' :    '+input.value+'\n'+'——————————————————————————————————————————————\n';
  input.value='';   
}


//获取所有聊天记录
const showAllMessage =async ()=>{

  const response = await axios.get(serverIp+'/getAllMessage');
          text.value='';
      response.data.forEach((element: { name: string; message: string; }) => {
          text.value+=element.name+' :    '+element.message+'\n'+'——————————————————————————————————————————————\n';
      })

}

</script>

<style>
.divBl{
  height: 40px;
  text-align: left;
}
.row{
  margin-top: 300px;
}
.tt{
  text-align: left;
  margin: 5px;
  margin-top: 5px;
  padding: 10px;
  width: 97%;
  height: 250px;
  line-height: 1.2;
  border-radius: 5px;
  border: 1px solid #ac8bd8;
  background-color: transparent;
  color: rgb(180, 56, 100);
  font-size: 15px;
  outline: none;
}

.input-send{
  margin: 0px 10px 10px 0px;
  border-radius: 5px;
  border: 1px solid #ac8bd8;
}
</style>