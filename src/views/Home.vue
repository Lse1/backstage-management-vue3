<template>
  <el-container class="app-wrapper">
    <el-aside :width="asideWidth"
              class="sidebar-container">
      <Menu></Menu>
    </el-aside>
    <el-container class="container"
                  :class="{ hidderContainer: $store.getters.isCollapse }">
      <el-header>
        <Headers />
      </el-header>
      <el-main>
        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
// @ is an alias to /src
import Menu from '../components/Menu.vue'
import Headers from '../components/Headers.vue'
import { computed } from 'vue'
import variables from '@/styles/variables.scss'
import { useStore } from 'vuex'
export default {
  name: 'Home',
  component: {
    Menu,
    Headers
  },
  setup () {
    const store = useStore()
    const asideWidth = computed(() => {
      return store.getters.isCollapse
        ? variables.hideSideBarWidth
        : variables.sideBarWidth
    })
    return {
      asideWidth
    }
  }
}
</script>

<style scoped lang="scss">
.app-container {
  position: relative;
  width: 100%;
  height: 100%;
}
.container {
  width: calc(100% - 210px);
  height: 100%;

  position: fixed;
  top: 0;
  right: 0;
  z-index: 9;
  transition: all 0.28s;
  &.hidderContainer {
    width: calc(100% - 67px);
  }
}
::v-deep .el-header {
  padding: 0;
}
</style>
