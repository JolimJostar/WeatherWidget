<template>
  <div class="settings">
    <div class="header">
      <h3>Settings</h3>
      <n-icon size="20" class="close-button" @click="onCloseSettingsClick">
        <img src="@/assets/icons/Close.svg"
      /></n-icon>
    </div>
    <SelectedCities />
    <SettingsInput />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useStore } from "@/store";
import { MutationType } from "@/store/mutations";
import { Routes } from "@/types/routes";
import { NIcon } from "naive-ui";
import SelectedCities from "./Settings/SelectedCities.vue";
import SettingsInput from "./Settings/SettingInput.vue";
const store = useStore();

export default defineComponent({
  setup() {
    function onCloseSettingsClick() {
      store.commit(MutationType.SetRoute, Routes.Weather);
    }

    return {
      onCloseSettingsClick,
    };
  },
  components: {
    NIcon,
    SelectedCities,
    SettingsInput,
  },
});
</script>

<style lang="scss" scoped>
h3 {
  margin: 0;
  text-align: left;
}
.close-button {
  cursor: pointer;
}

.header {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}
</style>
