<template>
  <div class="text-center">
    <div class="my-2">
      Вага
    </div>
    <b-row
      cols="1"
      class="w-50 mx-auto"
    >
      <b-col
        v-for="(_, i) in weightsLoc"
        :key="i"
        class="d-flex align-items-center pb-1"
      >
        <div class="mr-2 text-nowrap">
          K{{ i+1 }} =
        </div>
        <b-form-input
          v-model.number="weightsLoc[i]"
          size="sm"
          type="number"
          debounce="500"
        />
      </b-col>
    </b-row>
  </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex'

export default {
  data () {
    return {
      weightsLoc: [],
    }
  },

  computed: {
    ...mapState({
      weights: s => s.general.weights,
    }),
  },

  watch: {
    weights: {
      handler (v) {
        this.weightsLoc = JSON.parse(JSON.stringify(v))
      },
      immediate: true,
    },

    weightsLoc: {
      handler (v) {
        const nv = JSON.stringify(v)
        const sv = JSON.stringify(this.weights)

        if (nv !== sv) {
          this.setWeights(v)
        }
      },
      deep: true,
    },
  },

  methods: {
    ...mapMutations('general', {
      setWeights: 'setWeights',
    }),
  },
}
</script>
