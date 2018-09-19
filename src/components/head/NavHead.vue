<template>
  <div style="background-color: #2196f3" class="headClass">
    <div style="width: 100px">
      <mu-button flat  color="white" @click="back">
        <mu-icon value="arrow_back" left ></mu-icon>BACK
      </mu-button>
    </div>
    <div class="titleClass" style="width: 100px">
      <slot></slot>
    </div>
    <div style="width: 100px"></div>
  </div>

</template>

<script>
export default {
  name: 'NavHead',
  methods: {
    back () {
      this.$router.go(-1)
    }
  }
}
</script>

<style scoped>
  .headClass {
    display: flex;
    display: -webkit-flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    color: white;
  }
.titleClass {
  display: flex;
  display: -webkit-flex;
  align-items: center;
  justify-content: center;
  color: white;
}
</style>
