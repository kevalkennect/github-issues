<template>
  <div class="app">
    <button @click="getData">GET DATA</button>
  </div>
  <div></div>
</template>

<script>
import axios from "axios";
// import moment from "moment";
export default {
  data() {
    return {
      list: [],
      convertedData: {},
      years: [],
    };
  },
  computed: {
    // getYears() {
    //   const years = Object.Keys(this.convertedData);
    //   console.log(years);
    //   return years;
    // },
  },

  methods: {
    log(data) {
      console.log(data);
    },
    getWeek(data) {
      console.log(data);
      // console.log(Object.keys(data));
    },
    // getMonths(data) {
    //   const months = this.convertedData.map((res) => {
    //     console.log(res.(data));
    //   });
    //   return months;
    // },
    getYears(data) {
      return Object.keys(data);
    },
    async getData() {
      // let isEmpty = true;
      // let pageNumber = 0;
      // while (isEmpty) {
      //   axios.defaults.headers.common["Authorization"] =
      //     "token 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";
      //   const res = await axios.get(
      //     `https://api.github.com/repos/axios/axios/issues?per_page=100&state=all&direction=asc&page=${pageNumber}`
      //   );
      //   console.log(res.data.length);
      //   if (res.data.length == 0) {
      //     isEmpty = false;
      //     break;
      //   }
      //   res.data.map((tt) => {
      //     this.data.push({
      //       id: tt.id,
      //       created_at: tt.created_at,
      //       closed_at: tt.closed_at,
      //       status: tt.state,
      //     });
      //   });
      //   pageNumber++;
      // }

      const data = await axios.get("http://localhost:3001/res");
      // console.log(data);
      data.data.map((res) => {
        let date = res.created_at.split("T")[0];

        this.list.push({
          // created_at: res.created_at,
          created_at: date,
          id: res.id,
          closed_at: res.closed_at,
          status: res.status,
        });
      });
      // console.log(this.group(this.list));
      console.log(this.list);

      //   let res = {};

      //   let fn = (year, month, o = res, array = this.list) => {
      //     o[year][month] = {
      //       [month]: array.filter(
      //         ({ created_at: d }) => `${year}-${month}` === d.slice(0, 7)
      //       ),
      //     };
      //   };

      //   for (let { created_at } of this.list) {

      //     let [year, month] = created_at.match(/\d+/g);
      //     if (!res[year]) res[year] = {};
      //     fn(year, month);
      //   }
      // },
      // group(arr) {
      //   return arr.reduce((r, o) => {
      //     var p = o.created_at.split("-"); // get the parts: year, month and day
      //     var week = Math.floor(p.pop() / 7) + 1; // calculate the week number (Math.floor(day / 7) + 1) and remove day from the parts array (p.pop())
      //     var month = p.reduce((o, p) => (o[p] = o[p] || {}), r); // get the month object (first, get the year object (if not create one), then get the month object (if not create one)
      //     if (month[week]) month[week].push(o);
      //     // if there is an array for this week in the month object, then push this object o into that array
      //     else month[week] = [o]; // otherwise create a new array for this week that initially contains the object o
      //     return r;
      //   }, {});
      // this.mutate();
    },
    // mutate() {
    //   let arr = [];
    //   for (let i = 0; i < 10; i++) {
    //     arr.push(this.list[i]);
    //   }

    //   // closed_at: "2015-10-27T20:48:34Z"
    //   // created_at: "2015-08-04"
    //   // id: 99009201
    //   // status: "closed"
    //   const obj = {};
    //   this.list.forEach((el) => {
    //     const { created_at } = el;
    //     let arr = [];

    //     arr.push(el);
    //     obj[new Date(created_at).getFullYear()] = arr;
    //     // obj[new Date(created_at).getFullYear()] = el;
    //   });
    //   console.log(obj);
    //   // this.list.map(el);
    // },
  },
  mounted() {
    this.getData();
  },
};
</script>
