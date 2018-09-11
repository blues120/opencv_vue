<template>
<div>
  <router-view></router-view>
  <div class="Bottom-Nav-Class">
    <mu-container style="max-width: 400px; width:100%;">
      <mu-bottom-nav :value.sync="shift" @change="BottomNavChange">
        <mu-bottom-nav-item value="home" title="home" icon="home"></mu-bottom-nav-item>
        <mu-bottom-nav-item value="mine" title="mine" icon="mine"></mu-bottom-nav-item>
      </mu-bottom-nav>
    </mu-container>
  </div>

</div>
</template>

<script>
export default {
  data () {
    return {
      shift: 'books'
    }
  },
  created () {
    this.$router.push('/mine')
  },
  methods: {
    BottomNavChange (value) {
      if (value === 'home') {
        this.$router.push({ name: 'home' })
      } else {
        this.$router.push({name: 'mine'})
      }
    }
  }
}
</script>

<style scoped>

</style>

<style lang="less" scoped>
  .demo-text {
    padding: 16px;
    background: #fff;
    p {
      margin: 8px 0;
    }
  }
  .Bottom-Nav-Class{
    position:fixed;
    width: 100%;
    bottom: 0;
    table-layout: fixed;
  }
</style>
