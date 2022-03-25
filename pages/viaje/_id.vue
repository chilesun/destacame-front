<template>
  <div class="new-trip">
    <h2>Editar Viaje</h2>
    <form>
      <div class="inner-form">
        <div class="field journey">
          <label class="label">Trayecto</label>
          <v-select
            :options="journeys" 
            :reduce="(journey) => journey.id"
            v-model="trip.journey"
            >
            <template #option="{ origin, destination }">
              {{ origin }}-{{ destination }}
            </template>
            <template #selected-option="{ origin, destination }">
              {{ origin }}-{{ destination }}
            </template>
          </v-select>
        </div>
        <div class="field start_time">
          <label class="label">Salida</label>
          <input class="input" v-model="trip.start_time" type="datetime-local">
        </div>
        <div class="field bus">
          <label class="label">Bus</label>
          <v-select
            :options="bus" 
            label="number_plate"
            :reduce="(bus) => bus.id"
            v-model="trip.bus"
            ></v-select>
        </div>
        <div class="field driver">
          <label class="label">Chofer</label>
          <v-select
            :options="drivers" 
            label="run"
            :reduce="(driver) => driver.id"
            v-model="trip.driver"
            >
              <template #option="{ name, last_name, run, check_digit }">
                {{ name }} {{ last_name }} | {{ $formatRun(run) }}-{{ check_digit }}  
              </template>
              <template #selected-option="{ name, last_name, run, check_digit  }">
                {{ name }} {{ last_name }} | {{ $formatRun(run) }}-{{ check_digit }} 
              </template>
            </v-select>
        </div>
      </div>
      <div class="submit">
        <button class="button add" @click.prevent="putTrip()">Editar Viaje</button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
	data: () => ({
		trip: {
    },
		journeys: [],
		drivers: [],
		bus: []
	}),
	async fetch() {
		this.drivers = await this.$http.$get('driver');
		this.journeys = await this.$http.$get('journey');
		this.bus = await this.$http.$get('bus');
		this.trip = await this.$http.$get('trip/' + this.$route.params.id);
	},
  methods: {
    putTrip: async function() {
      let date = new Date(this.trip.start_time)
      this.trip.start_time = date.toISOString()
      await this.$http.put('trip/' + this.trip.id + '/', this.trip )
			this.$router.push('/')
    }
  }  
}
</script>

<style lang='sass'>
@import 'vue-select/dist/vue-select.css'
.new-trip
  form
    margin: 0 auto
    max-width: 400px
    .inner-form
      width: 100%
      display: flex
      flex-wrap: wrap
      .field
        width: 100%

</style>