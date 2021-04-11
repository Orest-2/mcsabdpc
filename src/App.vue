<template>
  <div id="app">
    <div id="nav">
      <nav-bar />
    </div>
    <b-container>
      <router-view />
    </b-container>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapState } from 'vuex'
import NavBar from './components/NavBar.vue'

export default {
  components: { NavBar },

  computed: {
    ...mapState({
      numAlternatives: s => s.general.numAlternatives,
      numCriteria: s => s.general.numCriteria,
      yearRangeFrom: s => s.general.yearRange.from,
      yearRangeTo: s => s.general.yearRange.to,
      alternatives: s => s.general.data,
      weights: s => s.general.weights,
    }),
    ...mapGetters({
      getYearsRange: 'general/getYearsRange',
    }),
  },
  watch: {
    numAlternatives (nv, ov) {
      this.updateData(1, 'end', nv - ov)
    },
    numCriteria (nv, ov) {
      this.updateData(2, 'end', nv - ov)
    },
    yearRangeFrom (nv, ov) {
      this.updateData(3, 'begin', ov - nv)
    },
    yearRangeTo (nv, ov) {
      this.updateData(3, 'end', nv - ov)
    },
  },

  created () {
    this.initData()
  },

  methods: {
    ...mapActions('general', {
      initData: 'initData',
    }),

    updateData (level, from, dir) {
      let newData = JSON.parse(JSON.stringify(this.alternatives))
      let newWeights = JSON.parse(JSON.stringify(this.weights))

      if (level === 1) {
        if (dir > 0) {
          newData.push(...Array(dir)
            .fill({
              criterio: Array(this.numCriteria)
                .fill({
                  data: Array(this.getYearsRange.length).fill(0),
                }),
            }),
          )
        }
        if (dir < 0) {
          newData = newData.slice(0, dir)
        }
      }

      if (level === 2) {
        newData = newData.map(
          c => {
            if (dir > 0) {
              c.criterio.push(...Array(dir)
                .fill({
                  data: Array(this.getYearsRange.length).fill(0),
                }),
              )
            }
            if (dir < 0) {
              c.criterio = c.criterio.slice(0, dir)
            }

            return c
          },
        )

        if (dir > 0) {
          newWeights.push(0)
        }
        if (dir < 0) {
          newWeights = newWeights.slice(0, dir)
        }
      }

      if (level === 3) {
        newData = newData.map(
          a => ({
            criterio: a.criterio.map(
              c => {
                switch (from) {
                  case 'begin':
                    if (dir > 0) {
                      c.data.unshift(...Array(dir).fill(0))
                    }
                    if (dir < 0) {
                      c.data = c.data.slice(-dir)
                    }
                    break
                  case 'end':
                    if (dir > 0) {
                      c.data.push(...Array(dir).fill(0))
                    }
                    if (dir < 0) {
                      c.data = c.data.slice(0, dir)
                    }
                    break
                }
                return c
              },
            ),
          }),
        )
      }

      this.$store.commit('general/setData', newData)
      this.$store.commit('general/setWeights', newWeights)
    },
  },
}
</script>

<style lang="scss" scoped>
</style>
