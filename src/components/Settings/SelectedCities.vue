<template>
  <div class="selected-cities">
    <draggable
      v-model="selctedCities"
      group="people"
      item-key="id"
      handle=".drag-icon"
    >
      <template #item="{ element }">
        <n-card
          embedded
          size="small"
          content-style="display: flex;flex-direction: row;justify-content: space-between;padding: 15px 10px;"
        >
          <div class="title-holder">
            <n-icon size="20" class="drag-icon">
              <img src="@/assets/icons/Hamburger.svg"
            /></n-icon>
            <n-text>
              {{ `${element.name}, ${element.country.id}` }}
            </n-text>
          </div>
          <n-icon
            size="20"
            class="drag-icon"
            @click="() => onRemoveCity(element)"
          >
            <img src="@/assets/icons/Delete.svg"
          /></n-icon>
        </n-card>
      </template>
    </draggable>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, WritableComputedRef } from "vue";
import draggable from "vuedraggable";
import { City } from "@/types/cities";
import { useStore } from "@/store";
import { MutationType } from "@/store/mutations";
import { NIcon, NCard, NText } from "naive-ui";
const store = useStore();

export default defineComponent({
  setup() {
    function onRemoveCity(city: City) {
      store.commit(MutationType.RemoveSelectedCity, city);
    }

    const selctedCities: WritableComputedRef<City[]> = computed({
      get() {
        return store.getters.getSelectedCities;
      },
      set(newValue) {
        store.commit(MutationType.SetSelectedCities, newValue);
      },
    });

    return {
      onRemoveCity,
      selctedCities,
    };
  },
  components: {
    draggable,
    NIcon,
    NCard,
    NText,
  },
});
</script>

<style lang="scss" scoped>
.drag-icon {
  cursor: pointer;
  margin-right: 10px;
}

.title-holder {
  display: flex;
  flex-direction: row;
  align-items: center;
}
.selected-cities {
  margin-bottom: 20px;
}
</style>
