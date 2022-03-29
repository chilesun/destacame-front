<template>
	<div class="trips">
		<h2>Viajes</h2>
		<p class="message" v-if="$fetchState.pending">Buscando viajes.</p>
		<p class="message" v-else-if="$fetchState.error">Bienvenido. Ha ocurrido un error. Procura darle un runserver a la API.</p>
		<div v-else class="the-trips">
			<div class="trip">
				<div class="filters">
					<div class="filter filter-journey">
						Trayecto
						<v-select
							label="id"
							:options="journeys" 
							:reduce="(journey) => journey.id"
							v-model="journey"
							>
							<template #option="{ origin, destination }">
								{{ origin }}-{{ destination }}
							</template>
							<template #selected-option="{ origin, destination }">
								{{ origin }}-{{ destination }}
							</template>
						</v-select>
					</div>
					<div class="filter filter-capacity">
						Capacidad
          	<v-select
          	  :options="options"
							v-model="capacity"
          	  >
          	  </v-select><span class="span">%</span>
					</div>
				</div>
				<div class="table-container">
					<table>
						<thead>
							<tr>
								<th>Origen</th>
								<th>Destino</th>
								<th>Salida</th>
								<th>Llegada</th>
								<th>Bus</th>
								<th>Chofer</th>
								<th>Capacidad V.</th>
								<th>Opciones</th>
							</tr>
						</thead>
						<tbody>
							<tr v-for="trip in trips" :key="trip.id">
								<td class="column origin">
									{{ $getData(journeys, trip.journey, "origin") }}
								</td>
								<td class="column destiny">
									{{ $getData(journeys, trip.journey, "destination") }}
								</td>
								<td class="column departure">
									{{ $formatDate(trip.start_time) }}
								</td>
								<td class="column arrival">
									{{ $formatDate(trip.end_time) }}
								</td>
								<td class="column bus">
									{{ $getData(bus, trip.bus, "number_plate") }}
								</td>
								<td class="column driver">
									{{ $getData(drivers, ($getData(bus, trip.bus, "driver")), "name") }} {{ $getData(drivers, ($getData(bus, trip.bus, "driver")), "last_name") }}
								</td>
								<td class="column capacity">
									{{ trip.capacity }}%
								</td>
								<td class="column options">
									<NuxtLink :to="'/asientos/' + trip.id ">
										<img src="~/assets/images/passenger.png" alt="">
									</NuxtLink>
									<NuxtLink :to="'/viaje/' + trip.id ">
										<img src="~/assets/images/edit.png" alt="">
									</NuxtLink>
									<img @click="deleteTrip(trip.id)" src="~/assets/images/delete.png" alt="">
								</td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>
		</div>
		<NuxtLink :to="'/viaje/nuevo'">
			<Add />
		</NuxtLink>
	</div>
</template>

<script>
export default {
	name: 'Home',
	data: () => ({
		trips: null,
		journeys: [],
		drivers: [],
		bus: [],
		options: [
			10, 20, 30, 40, 50, 60, 70, 80, 90, 100
		],
		capacity: null,
		journey: null
	}),
	async fetch() {
		this.drivers = await this.$http.$get('driver');
		this.trips = await this.$http.$get('trip');
		this.journeys = await this.$http.$get('journey');
		this.bus = await this.$http.$get('bus');
	},
	watch: {
		capacity: function() {
			this.filterTrips()
		},
		journey: function() {
			this.filterTrips()
		}
	},
	methods: {
		filterTrips: async function(){
			if (this.capacity == null) {
				this.capacity = ''
			}
			if (this.journey == null) {
				this.journey = ''
			}
			this.trips = await this.$http.$get('trip?journey=' + this.journey + '&capacity=' + this.capacity)
		},
		deleteTrip: async function(id) {
			try {
				await this.$http.delete('trip/' + id)
				this.getTrips()
			} catch (err) {
				console.log(err.response.data)
			}
		},
		getTrips: async function() {
			try {
				this.trips = await this.$http.$get('trip');
			} catch (err) {
				console.log(err.response.data)
			}
		}
	}
};
</script>

<style lang="sass">
.trips
	.the-trips
		display: flex
		flex-wrap: wrap
		.trip
			width: 100%
			display: flex
			padding: 15px 15px
			margin-bottom: 0px
			flex-wrap: wrap
			.filters
				display: flex
				flex-wrap: wrap
				justify-content: center
				width: 100%
				margin-bottom: 15px
				.filter-title
					width: 100%
					margin-bottom: 10px
					text-align: center
				.filter
					display: flex
					align-items: center
					padding-left: 15px
					padding-right: 15px
					.v-select
						margin-left: 15px
					.span
						font-family: 'Montserrat'
				.filter-capacity
					.v-select
						margin-right: 5px
					.vs__dropdown-toggle
						width: 155px
				.filter-journey
					@media screen and (max-width: $md)
						margin-bottom: 10px
					.v-select
						width: 250px
					.vs__dropdown-toggle
						width: 250px
			.table-container
				width: 100%
				table
					width: 100%
			@media screen and (min-width: 1400px)
				.table-container
					height: 70vh
					overflow-y: scroll
			@media screen and (max-width: 1400px)	
				.table-container
					overflow-x: auto
					table
						width: 1000px

</style>
