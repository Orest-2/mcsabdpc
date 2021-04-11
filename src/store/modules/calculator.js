import { rangeArr } from './general'

const sum = (arr, mutFumc = (e) => e) => arr.reduce((s, e, i) => (s += mutFumc(e, i)), 0)
const mult = (arr, mutFumc = (e) => e) => arr.reduce((m, e, i) => (m *= mutFumc(e, i)), 1)

const transpose = (matrix) => {
  return matrix.reduce(
    (prev, next) =>
      next.data.map(
        (_, i) => {
          const data = (prev[i]?.data || []).concat(next.data[i])

          const res = { data }

          if ('max' in next) {
            res.max = Math.max(...data)
          }

          if ('min' in next) {
            res.min = Math.min(...data)
          }

          if ('sum' in next) {
            res.sum = sum(data)
          }

          return res
        },
      ),
    [],
  )
}

export const calculator = {
  state: {
    results: null,
  },

  mutations: {
    setResults (s, v) {
      s.results = v
    },
  },

  actions: {
    calculate ({ commit, rootState, rootGetters }) {
      console.time('calculate')
      const data = JSON.parse(JSON.stringify(rootState.general.data))
      const weights = JSON.parse(JSON.stringify(rootState.general.weights))
      const yearRangeTo = rootState.general.yearRange.to
      const yearsRange = rootGetters['general/getYearsRange']
      const l = yearsRange.length

      const eSum = sum(yearsRange)
      const e2Sum = sum(yearsRange, (y) => y ** 2)

      const next3years = rangeArr(yearRangeTo + 1, yearRangeTo + 3)

      const step1 = data.map(
        a => ({
          next3years,
          criterio: a.criterio.map(
            (c) => {
              const eQSum = sum(c.data, (v, i) => yearsRange[i] * v)
              const QSum = sum(c.data)

              const d = (1 / l) * QSum
              const q = (1 / l) * eSum

              const b = (l * eQSum - eSum * QSum) / (l * e2Sum - eSum ** 2)
              const a = d - b * q

              const data = next3years.map((y) => a + b * y)

              return { a, b, data }
            },
          ),
        }),
      )

      const { step2, step3, step4p } = step1.reduce(
        (res, a) => {
          const mDataArr = []

          const step2 = { criterio: [] }
          const step3 = { criterio: [] }

          a.criterio.forEach(c => {
            let mData = 1
            const data = []

            for (let i = 0; i < c.data.length - 1; i++) {
              const d = c.data[i + 1] / c.data[i]
              data.push(d)
              mData *= d
            }

            mDataArr.push(mData)

            step2.criterio.push({ data })
            step3.criterio.push({ data: mData })
          })

          res.step2.push(step2)
          res.step3.push(step3)
          res.step4p.push({ data: mDataArr, max: 0 })

          return res
        },
        {
          step2: [],
          step3: [],
          step4p: [],
        },
      )

      const step4 = transpose(step4p).map(({ data, max }) => ({ data: data.map(d => d / max) }))
      const step4T = transpose(step4)

      const sumW = sum(weights)
      const step5 = weights.map(w => w / sumW)

      const step6 = step4T.map(a => {
        const { m1, m2, m3, m4 } = a.data.reduce(
          (res, C, i) => {
            const a = step5[i]

            res.m1.push(a / C)
            res.m2.push(C ** a)
            res.m3.push(C * a)
            res.m4.push(a * C ** 2)

            return res
          },
          { m1: [], m2: [], m3: [], m4: [] },
        )

        return {
          pessimistic: 1 / sum(m1),
          careful: mult(m2),
          average: sum(m3),
          optimistic: Math.sqrt(sum(m4)),
        }
      })

      const result = {
        step1,
        step2,
        step3,
        step4,
        step5,
        step6,
      }

      console.log(result)

      commit('setResults', result)

      console.timeEnd('calculate')
    },
  },

  namespaced: true,
}
