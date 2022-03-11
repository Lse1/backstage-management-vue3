<template>
  <el-menu active-text-color="#ffd04b"
           background-color="#304156"
           :default-active="$route.name"
           text-color="#fff"
           :collapse="$store.getters.isCollapse"
           unique-opened
           @open="handleOpen"
           @close="handleClose">
    <div v-for="item in menu"
         :key="item.path">
      <el-menu-item v-if="!item.children"
                    :index="item.name"
                    @click="handleRedirect(item.path)">
        <el-icon>
          <component :is="item.icon"></component>
        </el-icon>
        <span :class="this.$store.getters.isCollapse ? 'hidden' : ''">{{ item.label }}</span>
      </el-menu-item>
      <el-sub-menu :index="item.name"
                   v-if="item.children">
        <template #title>
          <el-icon>
            <component :is="item.icon"></component>
          </el-icon>
          <span :class="this.$store.getters.isCollapse ? 'hidden hiddeni' : ''">{{ item.label }}</span>
        </template>
        <el-menu-item v-for="itemChildren in item.children"
                      :key="itemChildren.path"
                      :index="itemChildren.name"
                      @click="handleRedirect(itemChildren.path)">
          {{ itemChildren.label }}
        </el-menu-item>
      </el-sub-menu>
    </div>
  </el-menu>
</template>

<script>
import { useRouter } from 'vue-router'

export default {
  data () {
    return {
      menu: [
        {
          path: '/home',
          name: 'home',
          label: '首页',
          icon: 'HomeFilled'
        },
        {
          path: '/category',
          name: 'category',
          label: '数据管理',
          icon: 'List',
          children: [
            {
              path: '/shopData',
              name: 'shopData',
              label: '商品数据',
              icon: 'List'
            },
            {
              path: '/homeData',
              name: 'homeData',
              label: '首页数据',
              icon: 'List'
            },
            {
              path: '/otherData',
              name: 'otherData',
              label: '其他数据',
              icon: 'List'
            }
          ]
        },
        {
          path: '/user',
          name: 'user',
          label: '用户管理',
          icon: 'user'
        }
      ]
    }
  },
  setup () {
    const router = useRouter()
    const handleRedirect = (path) => { // eslint-disable-line no-unused-vars
      router.push(path)
    }
    return {
      handleRedirect
    }
  }
}
</script>

<style lang="scss" scoped>
/*隐藏*/
.hidden {
  display: none;
}
/*隐藏 > */
.hiddeni + ::v-deep i {
  display: none;
}
</style>
