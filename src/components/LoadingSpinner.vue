<template>
  <transition>
    <div class="overlay">
      <div class="spinner">
        <span></span>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: "LoadingSpinner",
};
</script>

<style lang="scss" scoped>
.overlay {
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 2;
}

.spinner {
  padding: 50px;
  background-color: #fff;
  border-radius: 20px;
  color: #fff;
  text-align: center;
  position: absolute;
  height: 50px;
  width: 50px;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  z-index: 3;

  span {
    display: inline-block;
    position: absolute;
    left: 50%;
    margin-left: -25px;
    top: 50%;
    margin-top: -25px;
    width: 50px;
    height: 50px;
    border: 3px solid rgba(0, 0, 0, 0.185);
    border-radius: 100%;
    border-top-color: rgba(0, 0, 0, 0.473);
    animation: spin 1s ease-in-out infinite;
    -webkit-animation: spin 1s ease-in-out infinite;
  }
}

@keyframes spin {
  to {
    -webkit-transform: rotate(360deg);
  }
}

@-webkit-keyframes spin {
  to {
    -webkit-transform: rotate(360deg);
  }
}
</style>
