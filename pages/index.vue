<template>
  <v-app>
    <v-main>
      <v-container> </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  // async asyncData(context) {
  //   try {
  //     const res = await fetch(
  //       "http://localhost:3000/res"
  //     );
  //     const { data } = await res.json();
  //     return { data };
  //   } catch (error) {
  //     throw new Error(error);
  //   }
  // },
  mounted() {
    this.getData();
  },
  data() {
    return {
      issues: [],
    };
  },

  methods: {
    async getData() {
      const data = await fetch("http://localhost:3001/res");
      const res = await data.json();
      for (let i = 2; i < 1000; i++) {
        this.issues.push(res[i]);
      }

      // this.issues = res;
      //   closed_at: "2016-04-21T16:43:54Z"
      // created_at: "2014-09-12T21:45:07Z"
      // id: 42673765
      // status: "closed"

      // limitedObj.forEach((el, i, arr) => {
      //   const { created_at } = el;

      //   const [date, month, year] = new Date(created_at)
      //     .toLocaleDateString()
      //     .split("/");
      //   console.log(month, year);
      //   obj[year][month] = {};
      // });
      // let res = {};

      // let fn = (year, month, o = res, array = res) => {
      //   o[year][month] = {
      //     [month]: array.filter(
      //       ({ date: d }) => `${year}-${month}` === d.slice(0, 7)
      //     ),
      //   };
      // };

      // for (let { date } of res) {
      //   let [year, month] = date.match(/\d+/g);
      //   if (!res[year]) res[year] = {};
      //   fn(year, month);
      // }
      console.log(res);
      const getDate = (str) => {
        const [date, month, year] = new Date(str)
          .toLocaleDateString()
          .split("/");
        let day = new Date(str).getDay();
        let date2 = new Date(str).getDate();
        const weekOfMonth = Math.ceil((date2 + 6 - day) / 7);

        return {
          date,
          month,
          year,
          weekOfMonth,
        };
      };
      let mainObj = {};
      const createObj = (year, month, week, el, obj = mainObj) => {
        obj[year][month] = {
          ...obj[year][month],
          [week]: [],
        };
      };

      for (const el of res) {
        const { created_at } = el;
        const [date, month, year] = new Date(created_at)
          .toLocaleDateString()
          .split("/");
        let day = new Date(created_at).getDay();
        let date2 = new Date(created_at).getDate();
        const weekOfMonth = Math.ceil((date2 + 6 - day) / 7);

        if (!mainObj[year]) mainObj[year] = {};
        createObj(year, month, weekOfMonth, el);
      }
      console.log(mainObj);

      for (const [i, el] of res.entries()) {
        const { created_at, closed_at } = el;

        const {
          date: openDate,
          month: openMonth,
          year: openYear,
          weekOfMonth: openWeek,
        } = getDate(created_at);
        const {
          date: closedDate,
          month: closedMonth,
          year: closedYear,
          weekOfMonth: closedWeek,
        } = getDate(closed_at);
        mainObj[openYear][openMonth][openWeek].push(el);
      }

      console.log(mainObj);
    },
  },
};
</script>
