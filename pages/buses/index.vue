<template>
	<div class="bus">
		<h2>Buses</h2>
		<p class="message" v-if="$fetchState.pending">Buscando buses.</p>
		<p class="message" v-else-if="$fetchState.error">
			Bienvenido. Ha ocurrido un error. Procura darle un runserver a la API.
		</p>
		<div v-else class="the-buss">
			<div class="inner">
				<div class="form-container">
					<form action="">
						<h3>Nuevo Bus</h3>
						<div class="field run">
							<label class="label" for="name">Patente</label>
							<input class="input" v-model="currentBus.number_plate"   />
						</div>
						<div class="selection-options">
							<button v-if="!putMode" class="button add" @click.prevent="postBus()">Añadir</button>
							<button v-if="putMode" class="button add" @click.prevent="putBus()">Editar</button>
							<button v-if="putMode" class="button remove" @click.prevent="cancelEdit()">Cancelar</button>
						</div>
					</form>
				</div>
				<div class="table-container">
					<table>
						<tr>
							<th>Patente</th>
							<th>Capacidad</th>
							<th>Opciones</th>
						</tr>
						<tr v-for="bus in buss" :key="bus.id">
							<td class="column number_plate">
								{{ bus.number_plate }}
							</td>
							<td class="column capacity">
								{{ bus.seats }}
							</td>
							<td class="column options">
								<img @click="updateBus(bus)" src="~/assets/images/edit.png" alt="" />
								<img
									@click="deleteBus(bus.id)"
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
	name: 'Buses',
	data: () => ({
		buss: [],
		currentBus: {
			number_plate: null,
		},
		putMode: false
	}),
	async fetch() {
		this.buss = await this.$http.$get('bus');
	},
	methods: {
		cancelEdit: function() {
			this.putMode = false
			this.cleanBus()
		},
		cleanBus: function() {
			this.currentBus = {
				number_plate: null
			}
		},
		updateBus: function(bus) {
			this.currentBus = bus
			this.putMode = true
		},
		getBus: async function () {
			this.buss = await this.$http.$get('bus');
		},
		postBus: async function () {
			const data = await this.$http.$post('bus/', this.currentBus );
			this.cleanBus()
			this.getBus();
		},
		putBus: async function () {
			const data = await this.$http.$put('bus/' + this.currentBus.id + '/' , this.currentBus);
			this.getBus();
			this.cleanBus();
			this.putMode = false
		},
		deleteBus: async function (id) {
			await this.$http.delete('bus/' + id);
			this.getBus();
		}
	},
};
</script>

<style lang="sass">
.bus
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
					width: 700px

</style>