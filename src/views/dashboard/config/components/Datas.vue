<!-- eslint-disable no-underscore-dangle -->
<!--
 * @Description:
 * @Author: G
 * @Date: 2021-10-13 11:09:59
 * @LastEditTime: 2021-10-13 14:26:48
-->
<script setup lang="ts">
  import {
    nextTick,
    ref,
    reactive,
    getCurrentInstance,
    onMounted,
    toRefs,
  } from 'vue';
  import { Pen } from '@meta2d/core';
  import { isObject } from '@/utils/is';

  const { $Bus } = getCurrentInstance()!.appContext.config.globalProperties;

  const penRef = ref<Pen>({});
  const tabKey = ref<number>(1);
  const isActive = ref(false);
  nextTick(() => {
    // 此处只注册，未将数据放置到工具栏
    // data.ts 中配置的最后一项即为该图形库中的内容
    // (window as any).registerToolsNew();
    // (window as any).meta2dTools = undefined;
  });

  onMounted(() => {
    // 监听事件
    $Bus.on('activePen', (res) => {
      // res 就是emit传过来的数据
      console.log(res);
      if (isObject(res)) {
        penRef.value = res;
      }
      tabKey.value = 1;
      isActive.value = true;
      // pen = reactive(res);
    });
    $Bus.on('inactivePen', () => {
      // res 就是emit传过来的数据
      tabKey.value = 4;

      isActive.value = false;

      // pen = reactive<Pen>({ text: '' });
      penRef.value = {};
    });
  });
</script>

<template>
  <div class="datas">
    <a-tabs v-model="tabKey">
      <template v-if="isActive">
        <a-tab-pane key="1" title="外观">
          <a-list size="small">
            <!-- <template #header> List title </template> -->
            <a-list-item>{{ penRef.x }} </a-list-item>
            <a-list-item>{{ penRef.y }} </a-list-item>
            <a-list-item>{{ penRef.width }} </a-list-item>
            <a-list-item>{{ penRef.height }} </a-list-item>
          </a-list>
        </a-tab-pane>
        <a-tab-pane key="2" title="数据">
          <a-list size="small">
            <!-- <template #header> List title </template> -->
            <a-list-item>{{ penRef.id }} </a-list-item>
            <a-list-item> {{ penRef.text }} </a-list-item>
          </a-list>
        </a-tab-pane>
        <!-- <a-tab-pane key="3" title="事件"> </a-tab-pane> -->
      </template>
      <template v-else>
        <a-tab-pane key="4" title="图纸"> Content of Tab Panel 1 </a-tab-pane>
        <a-tab-pane key="5" title="通信"> </a-tab-pane>
        <a-tab-pane key="6" title="图层"> </a-tab-pane>
      </template>
    </a-tabs>
  </div>
</template>

<style scoped>
  .datas {
    /* width: 100%; */
    height: calc(100% - 61px);
    border-right: 1px solid #ccc;
    background-color: #fff;
    box-sizing: border-box;
  }
</style>
