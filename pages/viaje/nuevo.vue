<template>
  <div class="new-trip">
    <h2>Nuevo Viaje</h2>
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
      </div>
      <div class="submit">
        <button class="button add" @click.prevent="postTrip()">Crear Viaje</button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
	data: () => ({
		trip: {
      bus: null,
      journey: null,
      start_time: null
    },
		journeys: [],
		bus: []
	}),
	async fetch() {
		this.journeys = await this.$http.$get('journey');
		this.bus = await this.$http.$get('bus');
	},
  methods: {
    postTrip: async function() {
      try {
        let date = new Date(this.trip.start_time)
        this.trip.start_time = date.toISOString()
        await this.$http.post('trip/', this.trip )
        this.$router.push('/')
      } catch (err) {
        console.log(err.response.data)
      }
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