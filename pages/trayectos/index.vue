<template>
	<div class="journeys">
		<h2>Trayectos</h2>
		<p class="message" v-if="$fetchState.pending">Buscando trayectos.</p>
		<p class="message" v-else-if="$fetchState.error">
			Bienvenido. Ha ocurrido un error. Procura darle un runserver a la API.
		</p>
		<div v-else class="the-journeys">
			<div class="inner">
				<div class="form-container">
					<form action="">
						<h3>Nuevo Trayecto</h3>

						<div class="field run">
							<label class="label" for="name">Origen</label>
							<v-select
								:options="comunas" 
								label="nombre"
								:reduce="(comuna) => comuna.nombre"
								v-model="currentJourney.origin"
								>
							</v-select>
						</div>
						<div class="field run">
							<label class="label" for="name">Destino</label>
							<v-select
								:options="comunas" 
								label="nombre"
								:reduce="(comuna) => comuna.nombre"
								v-model="currentJourney.destination"
								>
							</v-select>
						</div>
						<div class="field run">
							<label class="label" for="duration">Duración en horas</label>
							<input class="input" v-model="currentJourney.duration"  name="duration" type="number">
						</div>
						<div class="selection-options">
							<button v-if="!putMode" class="button add" @click.prevent="postJourney()">Añadir</button>
							<button v-if="putMode" class="button add" @click.prevent="putJourney()">Editar</button>
							<button v-if="putMode" class="button remove" @click.prevent="cancelEdit()">Cancelar</button>
						</div>
					</form>
				</div>
				<div class="table-container">
					<table>
						<tr>
							<th>Origen</th>
							<th>Destino</th>
							<th>Duración</th>
							<th>Opciones</th>
						</tr>
						<tr v-for="journey in journeys" :key="journey.id">
							<td class="column origin">
								{{ journey.origin }}
							</td>
							<td class="column destination">
								{{ journey.destination }}
							</td>
							<td class="column duration">
								{{ journey.duration }}
							</td>
							<td class="column options">
								<img @click="updateJourney(journey)" src="~/assets/images/edit.png" alt="" />
								<img
									@click="deleteJourney(journey.id)"
									src="~/assets/images/delete.png"
									alt=""
								/>
							</td>
						</tr>
					</table>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'Trayectos',
	data: () => ({
		journeys: [],
		currentJourney: {
			origin: null,
			destination: null,
			duration: null
		},
		comunas: null,
		putMode: false
	}),
	async fetch() {
		this.journeys = await this.$http.$get('journey');
		this.comunas = await this.$http.$get('https://apis.digital.gob.cl/dpa/comunas');
	},
	methods: {
		cancelEdit: function() {
			this.putMode = false
			this.cleanJourney()
		},
		cleanJourney: function() {
			this.currentJourney = {
				origin: null,
				destination: null,
				duration: null
			}
		},
		updateJourney: function(journey) {
			this.currentJourney = journey
			this.putMode = true
		},
		getJourneys: async function () {
			try {
				this.journeys = await this.$http.$get('journey')
			} catch (err) {
				console.log(err.response.data)
			}
		},
		postJourney: async function () {
			try {
				if (this.currentJourney.origin !== this.currentJourney.destination) {
					const data = await this.$http.$post('journey/', this.currentJourney );
					this.cleanJourney()
					this.getJourneys();
				}
			} catch (err) {
				console.log(err.response.data)
			}
		},
		putJourney: async function () {
			try {
				if (this.currentJourney.origin !== this.currentJourney.destination) {
					const data = await this.$http.$put('journey/' + this.currentJourney.id + '/' , this.currentJourney);
					this.cleanJourney()
					this.getJourneys();
					this.putMode = false
				}
			} catch (err) {
				console.log(err.response.data)
			}
		},
		deleteJourney: async function (id) {
			try {
				await this.$http.delete('journey/' + id)
				this.getJourneys();
			} catch (err) {
				console.log(err.response.data)
			}
		}
	},
};
</script>

<style lang="sass">
.journeys
	.inner
		display: flex
		width: 100%
		flex-wrap: wrap
		.table-container
			width: 70%
			align-self: flex-start
		.form-container
			width: 30%
			display: flex
			justify-content: center
			form
				max-width: 400px
		@media screen and (max-width: $lg)
			.form-container
				margin: 0 auto 40px
				width: 100%
			.table-container
				width: 100%
				overflow-x: auto
				table
					margin: 0 auto
					width: 700px

</style>