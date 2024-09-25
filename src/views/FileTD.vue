<template>
  <el-container>
    <el-header height="220px">
      <el-upload
    class="upload-demo"
    drag
    action="http://124.70.163.84:8095/upload"
    multiple
    :on-success="onSuccess"
    :show-file-list="false"
    :on-process="onProcess"
    :on-error="onError"
    :on-exceed="onExceed"
    accept="/"
    >
    <el-icon class="el-icon--upload"><upload-filled /></el-icon>
    <div class="el-upload__text">点击/拖拽上传</div>
  </el-upload>

    </el-header>
    <el-main>
   
  <el-table :data="tableData" style="width: 100%" max-height="500" stripe="true">
    <el-table-column prop="fileName" label="FileName" width=0.3*widght sortable/>
    <el-table-column prop="filePath" label="FilePath" width=0.5*widght sortable />
    <el-table-column label="Operation" width=0.2*widght>
      <template #default="scope">
        <el-button
          size="small"
          type="success"
          @click="handleDownload(scope.row)"
          circle 
          :icon="Download"
          ></el-button>

          <el-popconfirm
              confirm-button-text="Yes"
              cancel-button-text="No"
              :icon="InfoFilled"
              icon-color="#626AEF"
              title="delete this?"
              hide-after="50"
              @confirm="handleDelete(scope.row)"
            >
            <template #reference>
              <el-button size="small" type="danger" circle :icon="Delete"></el-button>
            </template>
          </el-popconfirm>
      </template>
  </el-table-column>
  </el-table>
</el-main>
  </el-container>
</template>
      


<script setup lang="ts">
import axios from 'axios';
import { h, ref } from 'vue'
import { UploadFilled } from '@element-plus/icons-vue'
import {Check,Delete,Edit,Message,Search,Star,Download,Promotion,InfoFilled} from '@element-plus/icons-vue'
import { ElMessage,ElNotification } from 'element-plus'
import {serverIp,uname} from '../../config'



const tableData = ref([])


//获取所有文件     
const showAll =async ()=>{
  const response2 = await axios.get(serverIp+'/showAll');
          response2.data.forEach((element: { fileName: any; filePath: any; }) => {
                  console.log(element.fileName+element.filePath);
          })
          tableData.value = response2.data
  
}


//文件上传的事件
const onSuccess =async ()=>{
  ElMessage.success('上传成功!');
  showAll();
}
const onProcess =async ()=>{
  ElMessage.success('文件传输中...');
}
const onError =async ()=>{
  ElMessage.error('文件传输失败!');
}
const onExceed =async ()=>{
  ElMessage.error('文件过大或数量超出限制!');
}




//下载和删除文件
const handleDownload = async (row: any) => {
  try {
    const decodedFilePath = decodeURIComponent(row.filePath);
    const response = await axios.get(serverIp + '/download', {
      params: {
        filepath: decodedFilePath,
      },
      responseType: 'blob', // 指定响应类型为二进制数据
    });

    const url = window.URL.createObjectURL(response.data);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', row.fileName); // 设置下载文件的名称

    // 触发点击链接操作
    link.style.display = 'none';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  } catch (error) {
    console.log('下载文件时出现错误：', error);
  }
};
const handleDelete =async (row:any)=>{
      try {
      const response = await axios.get(serverIp+'/delete', {
          params: {
              fileName: row.fileName
          },
      });
      ElMessage.success(response.data);
      showAll();
    } catch (error: any) {
      ElMessage.error('删除文件时出现错误：', error);
    }
}

showAll();
</script>

<style>
.upload-demo {
  margin: 0px 0px 10px 10px;
  background-color: antiquewhite;
}
button {
      margin: 0px 10px 10px 0px;
      background-color: rgb(231, 228, 210);
      border-radius: 8px;
      border: 1px solid #f4f2ef;
    }
</style>