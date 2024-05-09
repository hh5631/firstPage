<template>
    <el-contain>
        <el-header height="100px">
            <div >
                <span>{{ currentTime }}</span>
            </div>

        </el-header>
        <el-main>
    <el-carousel :interval="4000" type="card" height="300px" motion-blur>
      <el-carousel-item  motion-blur>
        <el-image :src="img1" fit="fill"></el-image>
      </el-carousel-item>

      <el-carousel-item  motion-blur>
        <el-image :src="img2" fit="fill"></el-image>
      </el-carousel-item>

      <el-carousel-item  motion-blur>
        <el-image :src="img3" fit="scale-down"></el-image>
      </el-carousel-item>

    </el-carousel>
</el-main>
    </el-contain>
  </template>
  <script setup lang="ts">

    import { ref } from 'vue'
    import im1 from '../assets/1.jpg'
    import im2 from '../assets/2.jpg'
    import im3 from '../assets/3.jpg'
    const img1 = im1
    const img3 = im3
    const img2 = im2



    const currentTime = ref('');

const updateTime = () => {
  const now = new Date();
  const hours = now.getHours().toString().padStart(2, '0');
  const minutes = now.getMinutes().toString().padStart(2, '0');
  const seconds = now.getSeconds().toString().padStart(2, '0');
  currentTime.value = `${hours}:${minutes}:${seconds}`;
};

const intervalId = setInterval(updateTime, 1000);

updateTime();

</script>
  <style scoped>
  .el-carousel__item h3 {
    color: #475669;
    opacity: 0.75;
    line-height: 200px;
    margin: 0;
    text-align: center;
  }
  
  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }
  
  .el-carousel__item:nth-child(2n + 1) {
    background-color: #d3dce6;
  }

  div{
       text-align: center;
  }
  span{
        font-size: 45px;
        color: #db9fc38e;
  }

  </style>