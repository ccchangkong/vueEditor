<!-- eslint-disable no-underscore-dangle -->
<!--
 * @Description:
 * @Author: G
 * @Date: 2021-10-13 11:09:59
 * @LastEditTime: 2021-10-13 14:26:48
-->
<script setup lang="ts">
  import { nextTick, ref, getCurrentInstance, onMounted } from 'vue';
  import { Pen } from '@meta2d/core';
  import { isObject } from '@/utils/is';
  import { useMeta2dStore } from '@/store/index';

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const { $Bus } = getCurrentInstance()!.appContext.config.globalProperties;

  const penRef = ref<Pen>({});
  const tabKey = ref<number>(1);
  const isActive = ref(false);
  const store = useMeta2dStore();

  onMounted(() => {
    // 监听事件
    $Bus.on('activePen', (res) => {
      // res 就是emit传过来的数据
      // console.log(res);
      if (isObject(res)) {
        penRef.value = res;
      }

      nextTick(() => {
        isActive.value = true;
        tabKey.value = 1;
      });

      // pen = reactive(res);
    });
    $Bus.on('inactivePen', () => {
      // res 就是emit传过来的数据
      nextTick(() => {
        isActive.value = false;
        tabKey.value = 4;
        // pen = reactive<Pen>({ text: '' });
        penRef.value = {};
      });
    });
  });
  // const xCt = computed(() => {
  //   return String(store.pen.x);
  // });
  const formatter = (value: number) => {
    return String(Math.round(value));
  };
  // const parser = (value: number) => {
  //   return String(value);
  // };
</script>

<template>
  <div class="datas">
    <a-tabs v-model="tabKey">
      <template v-if="isActive">
        <a-tab-pane key="1" title="外观">
          <a-list size="small">
            <!-- <template #header> List title </template> -->
            <a-list-item>
              <a-input-number
                v-model="store.pen.x"
                placeholder="x"
                :formatter="formatter"
              />

              <!-- {{ Math.round() }} -->
            </a-list-item>
            <a-list-item>y:{{ Math.round(store.pen.y) }} </a-list-item>
            <a-list-item>width:{{ Math.round(store.pen.width) }} </a-list-item>
            <a-list-item
              >height:{{ Math.round(store.pen.height) }}
            </a-list-item>
          </a-list>
        </a-tab-pane>
        <a-tab-pane key="2" title="数据">
          <a-list size="small">
            <!-- <template #header> List title </template> -->
            <a-list-item>{{ store.pen.id }} </a-list-item>
            <a-list-item> {{ store.pen.text }} </a-list-item>
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
