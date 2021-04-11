import { data, weights } from '../../data/data'

export const rangeArr = (start, stop, step = 1) =>
  Array(Math.ceil((stop - start + 1) / step))
    .fill(start)
    .map((x, y) => Number(`${x + y * step}`))

const date = new Date()

const qs = {
  get params () {
    return new URLSearchParams(location.search)
  },
}

const test = qs.params.get('test') === '1'

export const general = {
  state: {
    numAlternatives: 3,
    numCriteria: 4,
    yearRange: {
      from: date.getFullYear() - 3,
      to: date.getFullYear(),
    },
    data: [],
    weights: [],
  },

  mutations: {
    setNumAlternatives (s, v) {
      s.numAlternatives = Number(v)
    },

    setNumCriteria (s, v) {
      s.numCriteria = Number(v)
    },

    setYearRange (s, { k, v }) {
      s.yearRange[k] = v
    },

    setData (s, v) {
      s.data = v
    },

    setWeights (s, v) {
      s.weights = v
    },
  },

  getters: {
    getYearsRange (s) {
      const { from, to } = s.yearRange
      return from <= to ? rangeArr(from, to) : []
    },
  },

  actions: {
    initData ({ state, commit, getters }) {
      const dataLoc = data.map(
        a => ({
          criterio: a.criterio.map(
            c => ({
              data: test ? c.data : Array(getters.getYearsRange.length).fill(0),
            }),
          ),
        }),
      )

      commit('setData', dataLoc)
      commit(
        'setWeights',
        test
          ? weights
          : Array(state.numCriteria).fill(0),
      )
    },
  },

  namespaced: true,
}
