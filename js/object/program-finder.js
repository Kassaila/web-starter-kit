/* global Vue */

function getFilterValues(_this, property) {
  /**
   * return an array of all the values from a certain property,
   * for getting all the filters we need in the sidebar
   */
  return _this.items.reduce((accumulator, currentValue) => {
    currentValue[property].forEach(item => {
      if (accumulator.indexOf(item) === -1) {
        accumulator.push(item);
      }
    });
    return accumulator;
  }, []);
}

export default {
  init() {
    if (!document.getElementById('program-list')) {
      return;
    }
    Vue.component('program-list', {
      data() {
        return {
          items: [],
          sortBy: 'department',
          currType: 'program_type_all',
          currDivision: 'program_division_all',
          currLocation: 'program_location_all',
          showFilters: false,
        };
      },

      props: ['url'],

      created() {
        $.getJSON(this.url, json => {
          this.items = _.sortBy(json, [item => item.title.toLowerCase()]);
        });
      },

      template: `
        <div class="program-finder">
          <button
            v-on:click="toggleFilters"
            class="program__filters__open"
            v-bind:aria-expanded="showFilters ? 'true' : 'false' " >
            Filters
          </button>
          <div class="program__filters">
            <fieldset class="program__filters__fieldset">
              <legend>Show Me</legend>
              <div class="program__filters__field">
                <input
                  type="radio"
                  name="program-type"
                  v-model="currType"
                  id="program-type-all"
                  value="program_type_all" />
                <label for="program-type-all">All Program Types</label>
              </div>
              <div class="program__filters__field" v-for="(item, index) in programType">
                <input
                  type="radio"
                  name="program-type"
                  v-model="currType"
                  v-bind:id="'program-type-'+index"
                  v-bind:value="item" />
                <label v-bind:for="'program-type-'+index">{{ item }}</label>
              </div>
            </fieldset>
            <fieldset class="program__filters__fieldset">
              <legend>From</legend>
              <div class="program__filters__field">
                <input
                  type="radio"
                  name="program-division"
                  v-model="currDivision"
                  id="program-division-all"
                  value="program_division_all" />
                <label for="program-division-all">All Colleges</label>
              </div>
              <div class="program__filters__field" v-for="(item, index) in programDivision">
                <input
                  type="radio"
                  v-model="currDivision"
                  name="program-division"
                  v-bind:id="'program-division-'+index"
                  v-bind:value="item" />
                <label v-bind:for="'program-division-'+index">{{ item }}</label>
              </div>
            </fieldset>
            <fieldset class="program__filters__fieldset">
              <legend>Located At</legend>
              <div class="program__filters__field">
                <input
                  type="radio"
                  name="program-location"
                  v-model="currLocation"
                  id="program-location-all"
                  value="program_location_all" />
                <label for="program-location-all">Any Location or Online</label>
              </div>
              <div class="program__filters__field" v-for="(item, index) in location">
                <input
                  type="radio"
                  v-model="currLocation"
                  name="program-location"
                  v-bind:id="'program-location-'+index"
                  v-bind:value="item" />
                <label v-bind:for="'program-location-'+index">{{ item }}</label>
              </div>
            </fieldset>
          </div>
          <div class="program--list">
            <div class="program--list__sort">
              <label for="sort-by">Sort By</label>
              <select v-model="sortBy" id="sort-by">
                <option value="department">Department</option>
                <option value="alphabetical">Alphabetical</option>
              </select>
            </div>
            <div class="program--list__block" v-for="item in groupedResults">
              <h2>{{ item.type }}</h2>
              <ul class="program--list__items">
                <li class="program--list__item" v-for="subitem in item.data">
                  <h3>
                    <a v-bind:href="subitem.url">
                      <span class="program--list__title"> {{ subitem.title }}</span>
                      <span class="program--list__cred"> ({{ subitem.credentialType.join(' ') }})</span>
                    </a>
                  </h3>
                </li>
              </ul>
            </div>
          </div>
        </div>
      `,

      filters: {
        formatId(value) {
          return value.replace(/\W/g, '_').toLowerCase();
        },
      },

      computed: {
        filteredResults() {
          let filteringTemp = this.items;

          // Filtering logic for each filter
          if (this.currDivision !== 'program_division_all') {
            filteringTemp = filteringTemp.filter(item => {
              return item.programDivision.indexOf(this.currDivision) !== -1;
            });
          }

          if (this.currLocation !== 'program_location_all') {
            filteringTemp = filteringTemp.filter(item => {
              return item.location.indexOf(this.currLocation) !== -1;
            });
          }

          if (this.currType !== 'program_type_all') {
            filteringTemp = filteringTemp.filter(item => {
              return item.programType.indexOf(this.currType) !== -1;
            });
          }

          return filteringTemp;
        },

        // Get the items for each filter category
        programType() {
          return getFilterValues(this, 'programType');
        },

        programDivision() {
          return getFilterValues(this, 'programDivision');
        },

        location() {
          return getFilterValues(this, 'location');
        },

        // Sortby logic
        groupedResults() {
          if (this.sortBy === 'department') {
            // Create a new program array with each item inside a nested array, grouped by dept
            const temp = this.filteredResults.reduce((acc, obj) => {
              // Drill down to each department item for each program
              obj.department.forEach(item => {
                /**
                 * Add program to the appropiate department array,
                 * Create new department array if there isn't one
                 */
                if (!acc[item]) {
                  acc[item] = [];
                }
                acc[item].push(obj);
              });
              return acc;
            }, {});
            return _(temp)
              .map((value, key) => {
                /**
                 * re-organize that array item so that it has the
                 * department and data as separate property/value pairs
                 * and sort it
                 */
                return {
                  type: key,
                  data: value,
                };
              })
              .sortBy([item => item.type.toLowerCase()])
              .value();
            // eslint-disable-next-line no-else-return
          } else {
            return _(this.filteredResults)
              .groupBy(item => item.title[0].toUpperCase())
              .map((value, key) => {
                return {
                  type: key,
                  data: value,
                };
              })
              .value();
          }
        },
      },

      methods: {
        toggleFilters() {
          $('.program__filters').slideToggle();
          this.showFilters = !this.showFilters;
        },
      },
    });

    // eslint-disable-next-line no-new
    new Vue({ el: '#program-list' });
  },
};
