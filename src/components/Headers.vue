<template>
  <div class="navbar">
    <el-icon class="hamburger-container"
             size='30px'
             color='#303133'>
      <component :is="this.$store.getters.isCollapse ? 'Expand' :'Fold'"
                 @click="shrink"></component>
    </el-icon>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item v-for="(item, index) in breadcrumbList"
                          :key="index"
                          :to="item.path">
        <span>{{
        menus[`${item.name}`]
      }}</span>
      </el-breadcrumb-item>
    </el-breadcrumb>
    <el-dropdown class="navbar-right">
      <span class="el-dropdown-link">
        <img :src="require('../assets/images/user.png')"
             alt="">
      </span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item @click="logout">退出</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<script>
import { useRouter, useRoute } from 'vue-router'
import { watch, ref } from 'vue'
import { useStore } from 'vuex'
export default {
  data () {
    return {
      Menu1: 'Expand',
      Menu2: 'Fold',
      menus: {
        Home: '首页',
        home: '首页',
        shopData: '商品数据',
        homeData: '首页数据',
        otherData: '其他数据',
        user: '用户管理'
      }
    }
  },
  setup () {
    const route = useRoute()
    const router = useRouter()
    const store = useStore()
    const breadcrumbList = ref([])
    const click = () => {
      console.log(route.matched[1])
      console.log(router)
    }
    const initBreadcrumbList = () => {
      breadcrumbList.value = route.matched
      breadcrumbList.value = breadcrumbList.value.filter((breadcrumbList) => {
        return breadcrumbList.name !== 'home'
      })
    }
    const shrink = () => {
      store.commit('collapseMenu')
    }
    const logout = () => {
      localStorage.removeItem('token')
      // history.go(0)
      router.push({ name: 'register' })
    }
    watch(
      route,
      () => {
        initBreadcrumbList()
      },
      { deep: true, immediate: true }
    )
    return {
      click,
      breadcrumbList,
      shrink,
      logout
    }
  }
}
</script>

<style lang="scss" scope>
.navbar {
  width: 100%;
  height: 60px;
  overflow: hidden;
  background-color: #fff;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
  padding: 0 16px;
  display: flex;
  align-items: center;
  box-sizing: border-box;
  position: relative;
  .hamburger-container {
    margin-right: 16px;
    box-sizing: border-box;
    cursor: pointer;
  }
  .navbar-right {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    img {
      height: 50px;
    }
    ::v-deep .navbar-item {
      display: inline-block;
      margin-left: 18px;
      font-size: 22px;
      color: #5a5e66;
      box-sizing: border-box;
      cursor: pointer;
    }
  }
}
</style>
