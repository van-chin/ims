<template>

  <div class="vidage">
    <video id="vidage" class="vidage-video" preload="metadata" loop autoplay muted>
      <source src="/src/assets/videos/index/bg.mp4" type="video/mp4">
    </video>
  </div>

  <div class="flex justify-center   items-center h-screen  ">
    <div class="flex flex-col justify-center   items-center h-200px  text-white">
      <div class="text-stroke-1 text-5xl">Vidage.js</div>
      <div class="mt-18px">YOUR SOLUTION TO BACKGROUND VIDEO & IMAGE</div>

      <div class="mt-18px"><a-button size="large" shape="round" ghost type="default">Get Started</a-button></div>
    </div>
  </div>


</template>

<script lang="ts" setup>

import Vidage from 'vidage'

// console.info('Vidage =>',Vidage);

// defineOptions({
//   name:'AppIndex',
//   inheritAttrs:false,
// })


onMounted(()=>{
  new Vidage('#vidage')
})
</script>

<style lang="less" scoped>
.vidage:after,.vidage:before{position:absolute;top:0;right:0;bottom:0;left:0}.vidage-ready .vidage:before{display:none}.vidage-ready .vidage-video{display:block}.vidage{position:fixed;top:0;right:0;bottom:0;left:0;min-width:100%;min-height:100%;z-index:-1}.vidage:before{content:"";background-image:url(/src/assets/images/index/bg.jpg);background-position:50%;background-repeat:no-repeat;background-size:cover}.vidage:after{content:""}.vidage-video{position:absolute;top:0;left:0;width:100%;height:100%;-o-object-fit:cover;object-fit:cover;display:none;pointer-events:none}@supports not ((-o-object-fit:cover) or (object-fit:cover)){.vidage-video{top:50%;left:50%;-webkit-transform:translateX(-50%) translateY(-50%);transform:translateX(-50%) translateY(-50%)}}
</style>
