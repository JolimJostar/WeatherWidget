<template>
  <div class="input">
    <h3>Add location</h3>
    <n-input
      placeholder="Input city"
      type="text"
      size="large"
      v-model:value="inputController.searchText"
      @input="
        debounce(() => {
          getList();
        }, 300)
      "
    />
    <div class="input-result">
      <div v-if="isLoading" class="loader"><n-spin></n-spin></div>
      <div v-else>
        <div
          v-for="city in searchedCities"
          :key="city.name.toString"
          @click="() => onAddCity(city)"
        >
          <n-card
            hoverable
            size="small"
            content-style="padding: 5px 10px; cursor:pointer;"
            ><n-text>
              {{ `${city.name}, ${city.country.id}` }}
            </n-text></n-card
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, reactive } from "vue";
import { City } from "@/types/cities";
import { useStore } from "@/store";
import { ActionType } from "@/store/actions";
import { MutationType } from "@/store/mutations";
import { NInput, NSpin, NCard, NText } from "naive-ui";
const store = useStore();

export default defineComponent({
  setup() {
    function getList() {
      store.dispatch(ActionType.getSearchedCities, inputController.searchText);
    }

    function onAddCity(city: City) {
      store.commit(MutationType.AddSelectedCity, city);
      store.commit(MutationType.SetSearchedCities, []);
      inputController.searchText = "";
    }

    function createDebounce() {
      let timeout: number;
      return function (fnc: () => void, delayMs: number) {
        clearTimeout(timeout);
        timeout = setTimeout(() => {
          fnc();
        }, delayMs);
      };
    }

    const searchedCities = computed(() => store.getters.getSearchedCities);

    const isLoading = computed(() => store.getters.getLoadingStateSettings);

    const inputController = reactive({ searchText: "" });

    return {
      debounce: createDebounce(),
      onAddCity,
      getList,
      searchedCities,
      isLoading,
      inputController,
    };
  },
  components: {
    NInput,
    NSpin,
    NCard,
    NText,
  },
});
</script>

<style lang="scss" scoped>
h3 {
  margin: 0;
  text-align: left;
}

.input {
  &-result {
    display: flex;
    flex-direction: column;
  }
}
.loader {
  margin-top: 20px;
}
</style>
