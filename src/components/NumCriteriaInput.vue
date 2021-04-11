<template>
  <div>
    <b-form-group>
      <template #label>
        Кількість критеріїв
      </template>

      <b-form-input
        v-model.number="numCriteriaModel"
        type="number"
        debounce="500"
      />
    </b-form-group>
  </div>
</template>

<script>
export default {
  computed: {
    numCriteriaModel: {
      get () {
        return this.$store.state.general.numCriteria
      },
      set (val) {
        this.$store.commit('general/setNumCriteria', val)
      },
    },
  },
}
</script>

<style>
</style>
