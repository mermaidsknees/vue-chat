<template>
  <div class="homepage">
    <homepage />
    <router-view>
      <chat />
    </router-view>
  </div>
</template>

<script>
import homepage from "@/components/Home.vue";
import chat from "@/components/Chat.vue";

export default {
  name: "Home",
  components: {
    homepage,
    chat,
  },
};
</script>

<style lang="scss" scoped>
.homepage {
  display: flex;
}
</style>
