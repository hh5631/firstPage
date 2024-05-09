<template>
  <el-container>
    <el-header height="220px">
      <div>当前在线人数：</div>
      <el-button  v-for="(uname,index) in unameList" :key="index"  type="primary" round  :icon="User" color="#705697">{{ uname }} </el-button>
     </el-header>
     <el-main height="240px">
      
     </el-main> 
    <el-footer>
      <el-row>
      <el-col :span="23">
        <el-input v-model="input" placeholder="请输入内容" autosize type="textarea"></el-input>
      </el-col>
      <el-col :span="1">
        <el-button type="primary" round @click="sendMessage" :icon="Promotion" color="#705697"></el-button>
      </el-col>
    </el-row>
      <el-input v-model="text" :rows="9" type="textarea" readonly="true" class="text"></el-input>
    </el-footer>
  </el-container>
</template>
      


<script setup lang="ts">
import axios from 'axios';
import { h, ref } from 'vue'
import {Check,Delete,Edit,Message,Search,Star,Download,Promotion,InfoFilled,User} from '@element-plus/icons-vue'
import { ElMessage,ElNotification } from 'element-plus'
import {serverIp,uname} from '../../config'




const input = ref('')
const text = ref('')
const unameList = ref([])
const socket = new WebSocket('ws://192.168.100.32:8095/websocket/'+uname.value);
socket.onopen = function(event) {
  console.log('WebSocket连接已建立');

  axios.get(serverIp+'/getOnlineUser').then((res) => {
    unameList.value = res.data
  })

  showAllMessage();

};
// 当收到服务器消息时触发
socket.onmessage = function(event) {
    let data:any = JSON.parse(event.data)
    // 更新消息列表
    if(data.type=='online'){
     unameList.value = JSON.parse(data.data)
    }
    if(data.type=='message'){
      text.value += data.data+'\n';
    }

};
socket.onclose = function(event) {
    console.log('WebSocket连接已关闭');
};

socket.onerror = function(event) {
    console.log('WebSocket发生了错误');
};

const sendMessage =async ()=>{
  if(uname.value==''){
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
  input.value='';   
}


//获取所有聊天记录
const showAllMessage =async ()=>{

  const response = await axios.get(serverIp+'/getAllMessage');
          text.value='';
      response.data.forEach((element: { name: string; message: string; }) => {
          text.value+=element.name+' :    '+element.message+'\n';
      })

}

</script>

<style>
.text{
  color: purple; /* 设置文字颜色为紫色 */
  font-family: 'Arial'; /* 设置字体样式 */
  font-size: 13px; /* 设置字体大小 */
  line-height: 1.5; /* 设置行高 */

}
</style>