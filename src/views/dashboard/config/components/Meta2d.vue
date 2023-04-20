<!-- eslint-disable no-console -->
<!--
 * @Description: 
 * @Author: G
 * @Date: 2021-10-13 11:10:11
 * @LastEditTime: 2021-10-13 14:05:59
-->
<script setup lang="ts">
  import { onMounted, ref, nextTick, getCurrentInstance, watch } from 'vue';
  // 测试本地使用
  // import { Meta2d } from "../../../../packages/core";
  // import { register as registerEcharts } from '@meta2d/chart-diagram';
  import { Pen, Meta2d } from '@meta2d/core';
  import { useMeta2dStore } from '@/store/index';

  const store = useMeta2dStore();
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const { $Bus } = getCurrentInstance()!.appContext.config.globalProperties;

  const visible = ref(false);
  const currentPen = ref<Pen>({});
  const meta2dref = ref<any>();
  // const width = ref(0);
  // const height = ref(0);
  onMounted(() => {
    const meta2d = new Meta2d('meta2d');

    // console.log(JSON.stringify(meta2dref.value));
    // registerEcharts();
    // const pen2: Pen = {
    //   name: 'rectangle',
    //   text: '矩形222',
    //   width: 100,
    //   height: 100,
    //   title: '# 矩形',
    //   // events: [
    //   //   {
    //   //     name: 'click',
    //   //     action: EventAction.Emit, // 执行动作
    //   //     value: 'showDialog',
    //   //   },
    //   // ],
    // };
    (window as any).mainMeta2d = meta2d;
    // 监听消息
    meta2d.on('showDialog', (e) => {
      console.log('showDialog2');
      currentPen.value = e.pen;
      // vue 打开弹窗
      visible.value = true;
    });
    meta2d.on('active', (e) => {
      // console.log(e);

      if (e.length === 1) {
        // currentPen.value = e[0];
        [currentPen.value] = e;
        store.setPen(e[0]);
        $Bus.emit('activePen', currentPen.value);
        // vue 打开弹窗
        // visible.value = true;
      }
    });
    meta2d.on('inactive', (e) => {
      // console.log(e);
      $Bus.emit('inactivePen');
    });
    meta2d.on('update', (e) => {
      console.log('update');
      if (e.current.length === 1) {
        store.setPen(e.current[0]);

        // $Bus.emit('activePen', currentPen.value);
        // vue 打开弹窗
        // visible.value = true;
      }
    });
    watch(store, () => {
      meta2d.setValue(store.pen);
    });
    nextTick(() => {
      // window.meta2d.addPen(pen2, true);
      // $Bus.emit('Event', { a: 'b' });
      // const { offsetWidth, offsetHeight } = meta2dref.value.parentNode;
      // console.log(JSON.stringify(offsetWidth));
      // width.value = offsetWidth;
      // height.value = 600;
      // console.log(width.value, height.value);
    });
    // meta2d.data() open()
  });
</script>

<template>
  <div id="meta2d" ref="meta2dref" class="meta2d"></div>
  <!-- :style="{ width: width + 'px', height: height + 'px' }" -->
  <a-modal v-model:visible="visible" :title="currentPen.text">
    <p>{{ currentPen.name }}</p>
    <p>{{ currentPen.text }}</p>
  </a-modal>
</template>

<style scoped>
  #meta2d {
    width: 100%;
    height: 450px;
  }
</style>
