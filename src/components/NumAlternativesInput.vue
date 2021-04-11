<template>
  <div>
    <b-form-group>
      <template #label>
        Кількість альтернатив
      </template>

      <b-form-input
        v-model.number="numAlternativesModel"
        type="number"
        debounce="500"
      />
    </b-form-group>
  </div>
</template>

<script>
export default {
  computed: {
    numAlternativesModel: {
      get () {
        return this.$store.state.general.numAlternatives
      },
      set (val) {
        this.$store.commit('general/setNumAlternatives', val)
      },
    },
  },
}
</script>

<style>
</style>
