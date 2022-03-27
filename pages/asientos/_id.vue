<template>
	<div class="seats">
    <p class="message" v-if="$fetchState.pending">Buscando asientos.</p>
		<h2 v-else>Asientos {{ journey.origin }}-{{ journey.destination }} {{ $formatDate(trip.end_time) }}</h2>
    <div class="the-seats">
      <div class="seat-selection">
        <div class="seat" v-for="seat in seats" :key="seat.id">
          <div :class="{ taken: seat.passenger !== null }" @click="selectSeat(seat)" class="seat-number">
            {{ seat.number }}
          </div>
        </div>
      </div>
      <div class="passenger-selection">
        <form>
          <h3 class="form-title">Pasajero Asiento <span v-if="selectedSeat !== null">{{ selectedSeat.number }}</span></h3>
          <div class="field run">
            <label class="label" for="name">RUN</label>
            <input class="input" v-model="passenger.run" name="run" type="number" max="99999999" min="9999999" required :disabled="selectedSeat == null" />
            <span class="help">Sin puntos, guión ni dígito verificador</span>
          </div>
          <div class="field run">
            <label class="label" for="name">Nombre</label>
            <input class="input" v-model="passenger.name"  name="name" type="text" required :disabled="selectedSeat == null" />
          </div>
          <div class="field run">
            <label class="label" for="last_name">Apellido</label>
            <input class="input" v-model="passenger.last_name"  name="last_name" type="text" required :disabled="selectedSeat == null" />
          </div>
          <div class="selection-options">
            <button v-if="!has && selectedSeat !== null" class="button add" @click.prevent="asignSeat()">Asignar</button>
            <button v-if="has" class="button remove" @click.prevent="cleanSeat()">Remover Pasajero</button>
          </div>
        </form>
      </div>
    </div>
	</div>
</template>

<script>
export default {
	data: () => ({
		seats: [],
    trip: null,
    journey: null,
    selectedSeat: null,
    passenger: {
      id: null,
      run: null,
      name: null,
      last_name: null
    },
    passengerCheck: [],
    latestPassenger: null
	}),
  watch: {
    'passenger.run': function (val) {
      if(val >= 999999 && val < 99999999 && this.selectedSeat.passenger == null) {
        this.getPassenger()
      } else if ( val > 99999999 && this.selectedSeat.passenger == null) {
        this.passenger.id = null
        this.passenger.name = null
        this.passenger.last_name = null   
      }
    }
  },
  computed: {
    has: function() {
      if (this.selectedSeat !== null) {
        if (this.selectedSeat.passenger !== null) {
          return true
        }
      }
      return false
    }
  },
	async fetch() {
		this.seats = await this.$http.$get('seat/?trip=' + this.$route.params.id);
    this.trip = await this.$http.$get('trip/' + this.$route.params.id);
    this.journey = await this.$http.$get('journey/' + this.trip.journey);
	},
  methods: {
    selectSeat: function(seat) {
      this.selectedSeat = seat
      if (seat.passenger !== null) {
        this.getPassenger()
      } else {
        Object.keys(this.passenger).forEach(key => {
          this.passenger[key] = null;
        });
      }
    },
    asignSeat: async function() {
      if (this.selectedSeat.passenger == null) {
        this.passengerCheck = await this.checkPassenger(this.passenger.run)
        if (this.passengerCheck.length > 0) {
          this.selectedSeat.passenger = this.passenger.id
          await this.putSeat(this.selectedSeat.id)
          this.getSeats()
          console.log('exist')
        } else {
          console.log('no existe')
          await this.postPassenger()
          this.selectedSeat.passenger = await this.latestPassenger
          await this.putSeat(this.selectedSeat.id)
          this.getSeats()
        }
      }
    },
    cleanSeat: async function() {
      if (this.selectedSeat.passenger !== null) {
        this.selectedSeat.passenger = null
        await this.putSeat(this.selectedSeat.id)
        Object.keys(this.passenger).forEach(key => {
          this.passenger[key] = null;
        })
        this.getSeats()
      }
    },
    getSeats: async function() {
			try {
        this.seats = await this.$http.$get('seat/?trip=' + this.trip.id)
			} catch (err) {
				console.log(err.response.data)
      }
    },
    putSeat: async function (id) {
			try {
        await this.$http.$put('seat/' + id + '/', this.selectedSeat)
			} catch (err) {
				console.log(err.response.data)
      }
    },
    checkPassenger: async function(run) {
			try {
        let isPassanger = await this.$http.$get('passenger/?run=' + run)
        return isPassanger
			} catch (err) {
				console.log(err.response.data)
      }
    },
    getPassenger: async function() {
			try {
        if (this.selectedSeat.passenger !== null) {
          this.passenger = await this.$http.$get('passenger/' + this.selectedSeat.passenger)
        } else {
          this.passengerCheck = await this.checkPassenger(this.passenger.run)
          if (this.passengerCheck.length > 0) {
            this.passenger = this.passengerCheck[0]
          } else {
            this.passenger.id = null
            this.passenger.name = null
            this.passenger.last_name = null
          }
        }
			} catch (err) {
				console.log(err.response.data)
      }
    },
    postPassenger: async function() {
			try {
        const data = await this.$http.$post('passenger/', this.passenger)
        this.latestPassenger = data.id
			} catch (err) {
				console.log(err.response.data)
      }
    }
  }
};
</script>

<style lang="sass">
.the-seats
  padding-top: 30px
  display: flex
  justify-content: center
  width: 100%
  .seat-selection
    display: flex
    flex-wrap: wrap
    width: 300px
    .seat
      width: 40%
      .seat-number
        cursor: pointer
        font-size: 20px
        background-color: #27ae60
        display: flex
        color: white
        width: 45px
        height: 45px
        margin-bottom: 25px
        justify-content: center
        align-items: center
      .taken
        background-color: #7f8c8d
  .passenger-selection
    form
      width: 250px
      h3
        margin-bottom: 15px
      .field
        display: flex
        flex-direction: column
        margin-bottom: 20px
        label
          font-size: 20px
          margin-bottom: 5px
        input
          width: 100%
          font-size: 16px
          height: 40px
          padding: 0 5px
          border: 1px solid #bdc3c7
        .help
          margin-top: 3px
          font-size: 12px
  @media screen and (max-width: $sm)  
    flex-direction: column
    align-items: center
    .seat-selection
      margin: 0 auto 40px
      justify-content: center
      .seat
        display: flex
        justify-content: center
</style>