<template>
  <div class="text-center">
    <hr>
    <b-row class="mb-1 align-items-center font-weight-bold">
      <b-col cols="1">
        X{{ $vnode.key+1 }}
      </b-col>
      <b-col
        v-for="y in getYearsRange"
        :key="y"
      >
        {{ y }}
      </b-col>
    </b-row>
    <b-row
      v-for="(c, i) in data.criterio"
      :key="i"
      class="mb-1 align-items-center"
    >
      <b-col cols="1">
        K{{ i+1 }}
      </b-col>
      <b-col
        v-for="(_, j) in c.data"
        :key="j"
      >
        <b-form-input
          v-model.number="c.data[j]"
          size="sm"
          type="number"
          debounce="500"
          step="0.1"
        />
      </b-col>
    </b-row>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  props: {
    data: {
      type: Object,
      default: () => ({}),
    },
  },

  computed: {
    ...mapGetters('general', {
      getYearsRange: 'getYearsRange',
    }),
  },
}
</script>

<style lang="scss" scoped>
input {
  text-align: center;
}
</style>
