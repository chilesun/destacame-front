<template>
	<div class="trips">
		<h2>Viajes</h2>
		<p class="message" v-if="$fetchState.pending">Buscando viajes.</p>
		<p class="message" v-else-if="$fetchState.error">Bienvenido. Ha ocurrido un error. Procura darle un runserver a la API.</p>
		<div v-else class="the-trips">
			<div class="trip">
				<div class="filters">
					Mostrar viajes con capacidad vendida igual o superiora:
          <v-select
            :options="options"
						v-model="capacity"
            >
            </v-select><span class="span">%</span>
				</div>
				<div class="table-container">
					<table>
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
								{{ $getData(drivers, trip.driver, "name") }} {{ $getData(drivers, trip.driver, "last_name") }}
							</td>
							<td class="column capacity">
								{{ parseInt(trip.capacity) }}%
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
			10, 20, 30, 40, 50, 60, 70, 80, 90
		],
		capacity: null
	}),
	async fetch() {
		this.drivers = await this.$http.$get('driver');
		this.trips = await this.$http.$get('trip');
		this.journeys = await this.$http.$get('journey');
		this.bus = await this.$http.$get('bus');
	},
	watch: {
		capacity: function(val) {
			if (val !== null) {
				this.trips = this.trips.filter(obj => {
					return obj.capacity >= val
				})
			} else {
				this.getTrips()
			}
		}
	},
	methods: {
		deleteTrip: async function(id) {
			await this.$http.delete('trip/' + id)
			this.getTrips()
		},
		getTrips: async function() {
			this.trips = await this.$http.$get('trip');
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
				margin: 0 auto 20px
				width: 420px
				display: flex
				align-items: center
				.v-select
					width: 155px
					margin-right: 15px
				.span
					font-family: 'Montserrat'
			.table-container
				width: 100%
				table
					width: 100%
			@media screen and (max-width: 1400px)	
				.table-container
					overflow-x: auto
					table
						width: 1000px

</style>
