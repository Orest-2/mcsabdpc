<template>
  <div
    v-if="res"
    class="pb-4"
  >
    <div class="text-center">
      <h4><b>Обчислення</b></h4>
    </div>
    <h5 class="my-3">
      <b>1 крок. Отримання прогнозованих значень</b>
    </h5>

    <div
      v-for="a, i in res.step1"
      :key="i"
      class="mb-4 text-center"
    >
      <b-row class="mb-1 align-items-center font-weight-bold">
        <b-col cols="1">
          X{{ i+1 }}
        </b-col>
        <b-col
          v-for="y in a.next3years"
          :key="y"
        >
          {{ y }}
        </b-col>
      </b-row>
      <b-row
        v-for="c, j in a.criterio"
        :key="j"
        class="border-bottom py-1"
        :class="{ 'border-top': j === 0 }"
      >
        <b-col cols="1">
          K{{ j+1 }}
        </b-col>
        <b-col
          v-for="d, l in c.data"
          :key="l"
        >
          {{ d.toFixed(4) }}
        </b-col>
      </b-row>
    </div>

    <h5 class="my-3">
      <b>2 крок. Знаходження темпу зростання</b>
    </h5>

    <div class="text-center">
      <b-row class="border-left">
        <b-col
          cols="1"
          class="py-1 border-top border-right"
        />
        <b-col
          v-for="a, i in numAlternatives"
          :key="i"
          class="py-1 border-top border-right"
        >
          X{{ a }}
        </b-col>
      </b-row>

      <b-row>
        <b-col
          cols="1"
          class="border-right border-left"
        >
          <b-row
            v-for="nc in numCriteria"
            :key="nc"
            class="border-bottom py-1"
            :class="{ 'border-top': nc === 1 }"
          >
            <b-col>
              K{{ nc }}
            </b-col>
          </b-row>
        </b-col>

        <b-col
          v-for="a, i in res.step2"
          :key="i"
          class="border-right"
        >
          <b-row
            v-for="c, j in a.criterio"
            :key="j"
            class="border-bottom py-1"
            :class="{ 'border-top': j === 0 }"
          >
            <b-col
              v-for="d, l in c.data"
              :key="l"
            >
              {{ d.toFixed(4) }}
            </b-col>
          </b-row>
        </b-col>
      </b-row>
    </div>

    <h5 class="my-3">
      <b>3 крок. Знаходження темпу середнього зростання</b>
    </h5>

    <div class="text-center">
      <b-row class="border-left">
        <b-col
          cols="1"
          class="py-1 border-top border-right"
        />
        <b-col
          v-for="a, i in numAlternatives"
          :key="i"
          class="py-1 border-top border-right"
        >
          X{{ a }}
        </b-col>
      </b-row>

      <b-row>
        <b-col
          cols="1"
          class="border-right border-left"
        >
          <b-row
            v-for="nc in numCriteria"
            :key="nc"
            class="border-bottom py-1"
            :class="{ 'border-top': nc === 1 }"
          >
            <b-col>
              K{{ nc }}
            </b-col>
          </b-row>
        </b-col>

        <b-col
          v-for="a, i in res.step3"
          :key="i"
          class="border-right"
        >
          <b-row
            v-for="c, j in a.criterio"
            :key="j"
            class="border-bottom py-1"
            :class="{ 'border-top': j === 0 }"
          >
            <b-col>
              {{ c.data.toFixed(4) }}
            </b-col>
          </b-row>
        </b-col>
      </b-row>
    </div>

    <h5 class="my-3">
      <b>4 крок. Нормалізація агрегованих значень</b>
    </h5>

    <div class="text-center">
      <b-row class="border-left">
        <b-col
          cols="1"
          class="py-1 border-top border-right"
        />
        <b-col
          v-for="a, i in numAlternatives"
          :key="i"
          class="py-1 border-top border-right"
        >
          X{{ a }}
        </b-col>
      </b-row>

      <b-row
        v-for="a, i in res.step4"
        :key="i"
        class="border-bottom border-left"
        :class="{ 'border-top': i === 0 }"
      >
        <b-col
          cols="1"
          class="py-1 border-right"
        >
          K{{ i+1 }}
        </b-col>
        <b-col
          v-for="d, j in a.data"
          :key="j"
          class="py-1 border-right"
        >
          {{ d.toFixed(4) }}
        </b-col>
      </b-row>
    </div>

    <h5 class="my-3">
      <b>5 крок. Знаходження нормованих вагових коефіцієнтів</b>
    </h5>

    <div class="d-flex align-items-center mx-auto justify-content-center">
      a = (<div
        v-for="d, i in res.step5"
        :key="i"
        class="p-2"
      >
        {{ d.toFixed(4) }},
      </div>)
    </div>

    <h5 class="my-3">
      <b>6 крок. Обчислення агрегованих оцінок та побудова ранжувального ряду</b>
    </h5>

    <div class="text-center">
      <b-row class="border-left">
        <b-col
          cols="1"
          class="py-1 border-top border-right"
        />
        <b-col
          v-for="a, i in ['Песимістична','Обережна','Середня','Оптимістична']"
          :key="i"
          class="py-1 border-top border-right"
        >
          {{ a }}
        </b-col>
      </b-row>
      <b-row
        v-for="a, i in res.step6"
        :key="i"
        class="border-bottom border-left"
        :class="{ 'border-top': i === 0 }"
      >
        <b-col
          cols="1"
          class="py-1 border-right"
        >
          X{{ i+1 }}
        </b-col>
        <b-col
          v-for="([, v], j) in Object.entries(a)"
          :key="j"
          class="py-1 border-right"
        >
          {{ v.toFixed(4) }}
        </b-col>
      </b-row>
    </div>

    <div class="text-center mt-2">
      <b-row class="border-left">
        <b-col
          v-for="[, v], i in t"
          :key="i"
          class="py-1 border-top border-right"
        >
          {{ v }}
        </b-col>
      </b-row>
      <b-row
        v-for="a, i in numAlternatives"
        :key="a+i"
        class="border-bottom border-left"
        :class="{ 'border-top': i === 0 }"
      >
        <b-col
          v-for="[k] in t"
          :key="k"
          class="py-1 border-right"
        >
          {{ Object.keys(Object.values(s6[k])[i])[0] }}
        </b-col>
      </b-row>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  computed: {
    ...mapState({
      numAlternatives: s => s.general.numAlternatives,
      numCriteria: s => s.general.numCriteria,
    }),
    ...mapState('calculator', {
      res: s => s.results,
    }),

    t () {
      return [
        ['pessimistic', 'Песимістична'],
        ['careful', 'Обережна'],
        ['average', 'Середня'],
        ['optimistic', 'Оптимістична'],
      ]
    },

    s6 () {
      return this.res.step6.reduce((res, v, i) => {
        res.pessimistic.push({ [`X${i + 1}`]: v.pessimistic })
        res.careful.push({ [`X${i + 1}`]: v.careful })
        res.average.push({ [`X${i + 1}`]: v.average })
        res.optimistic.push({ [`X${i + 1}`]: v.optimistic })

        if (this.res.step6.length - 1 === i) {
          res = Object.entries(res).map(([k, v]) => [k, v.sort((a, b) => Object.values(b)[0] - Object.values(a)[0])])

          res = Object.fromEntries(res)
        }

        return res
      }, {
        pessimistic: [],
        careful: [],
        average: [],
        optimistic: [],
      })
    },
  },
}
</script>

<style>
</style>
