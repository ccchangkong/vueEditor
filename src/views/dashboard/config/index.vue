<script lang="ts" setup>
  import { ref, onMounted } from 'vue';
  import Meta2d from './components/Meta2d.vue';
  import Icons from './components/Icons.vue';
  import Datas from './components/Datas.vue';

  const Meta2dBox = ref();
  onMounted(() => {
    console.log(Meta2dBox.value);
  });

  // import { formPens } from '@meta2d/form-diagram';
  // setup(props) {

  // }
</script>

<template>
  <div class="container">
    <a-row class="grid-demo" style="width: 100%" :gutter="10">
      <a-col :span="2">
        <Icons />
      </a-col>
      <a-col :span="16">
        <div ref="Meta2dBox" class="panel">
          <Meta2d />
        </div>
      </a-col>
      <a-col :span="6"> <Datas /> </a-col>
    </a-row>
  </div>
</template>

<style lang="less" scoped>
  .container {
    background-color: var(--color-fill-2);
    padding: 16px 20px;
    padding-bottom: 0;
    display: flex;
    height: 100%;
  }

  .panel {
    background-color: var(--color-bg-2);
    border-radius: 4px;
    overflow: auto;
    height: 100%;
    flex: 1;
  }

  :deep(.panel-border) {
    margin-bottom: 0;
    border-bottom: 1px solid rgb(var(--gray-2));
  }
</style>

<style lang="less" scoped>
  // responsive
  .mobile {
    .container {
      display: block;
    }
  }
</style>
