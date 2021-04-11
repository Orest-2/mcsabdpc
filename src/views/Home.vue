<template>
  <div>
    <b-row>
      <b-col
        cols="6"
        lg="3"
      >
        <num-alternatives-input />
      </b-col>
      <b-col
        cols="6"
        lg="3"
      >
        <num-criteria-input />
      </b-col>
      <b-col
        cols="12"
        lg="6"
      >
        <preriod-input />
      </b-col>
    </b-row>

    <alternative-matrix
      v-for="(a, i) in dataLoc"
      :key="i"
      :data="a"
    />

    <weights-input />

    <div class="text-center py-3">
      <b-btn @click="calculate">
        Обчислити
      </b-btn>
    </div>

    <calculation />
  </div>
</template>

<script>
import { mapActions, mapMutations, mapState } from 'vuex'
import AlternativeMatrix from '../components/AlternativeMatrix.vue'
import Calculation from '../components/Calculation.vue'
import NumAlternativesInput from '../components/NumAlternativesInput.vue'
import NumCriteriaInput from '../components/NumCriteriaInput.vue'
import PreriodInput from '../components/PreriodInput.vue'
import WeightsInput from '../components/WeightsInput.vue'

export default {
  components: { PreriodInput, NumAlternativesInput, NumCriteriaInput, AlternativeMatrix, WeightsInput, Calculation },

  data () {
    return {
      dataLoc: [],
    }
  },

  computed: {
    ...mapState('general', {
      data: s => s.data,
    }),
  },

  watch: {
    data: {
      handler (v) {
        this.dataLoc = JSON.parse(JSON.stringify(v))
      },
      immediate: true,
    },

    dataLoc: {
      handler (v) {
        const nv = JSON.stringify(v)
        const sv = JSON.stringify(this.data)

        if (nv !== sv) {
          this.setData(v)
        }
      },
      deep: true,
    },
  },

  methods: {
    ...mapMutations('general', {
      setData: 'setData',
    }),

    ...mapActions({
      calculate: 'calculator/calculate',
    }),
  },
}
</script>

<style lang="scss" scoped>
</style>
