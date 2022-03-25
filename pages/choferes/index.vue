<template>
	<div class="drivers">
		<h2>Choferes</h2>
		<p class="message" v-if="$fetchState.pending">Buscando choferes.</p>
		<p class="message" v-else-if="$fetchState.error">
			Bienvenido. Ha ocurrido un error. Procura darle un runserver a la API.
		</p>
		<div v-else class="the-drivers">
			<div class="inner">
				<div class="form-container">
					<form action="">
						<h3>Nuevo Pasajero</h3>
						<div class="field run">
							<label class="label" for="name">RUN</label>
							<input class="input" v-model="currentDriver.run" name="run" type="number" max="99999999" min="9999999" required  />
							<span class="help">Sin puntos, guión ni dígito verificador</span>
						</div>
						<div class="field run">
							<label class="label" for="name">Nombre</label>
							<input class="input" v-model="currentDriver.name"  name="name" type="text">
						</div>
						<div class="field run">
							<label class="label" for="last_name">Apellido</label>
							<input class="input" v-model="currentDriver.last_name"  name="last_name" type="text">
						</div>
						<div class="selection-options">
							<button v-if="!putMode" class="button add" @click.prevent="postDriver()">Añadir</button>
							<button v-if="putMode" class="button add" @click.prevent="putDriver()">Editar</button>
							<button v-if="putMode" class="button remove" @click.prevent="cancelEdit()">Cancelar</button>
						</div>
					</form>
				</div>
				<div class="table-container">
					<table>
						<tr>
							<th>Nombre</th>
							<th>Apellido</th>
							<th>RUN</th>
							<th>Opciones</th>
						</tr>
						<tr v-for="driver in drivers" :key="driver.id">
							<td class="column name">
								{{ driver.name }}
							</td>
							<td class="column last_name">
								{{ driver.last_name }}
							</td>
							<td class="column run">
								{{ $formatRun(driver.run) + "-" + driver.check_digit }}
							</td>
							<td class="column options">
								<img @click="updateDriver(driver)" src="~/assets/images/edit.png" alt="" />
								<img
									@click="deleteDriver(driver.id)"
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
	name: 'Choferes',
	data: () => ({
		drivers: [],
		currentDriver: {
			name: null,
			last_name: null,
			run: null,
		},
		putMode: false
	}),
	async fetch() {
		this.drivers = await this.$http.$get('driver');
	},
	methods: {
		cancelEdit: function() {
			this.putMode = false
			this.cleanDriver()
		},
		cleanDriver: function() {
			this.currentDriver = {
				name: null,
				last_name: null,
				run: null
			}
		},
		updateDriver: function(driver) {
			this.currentDriver = driver
			this.putMode = true
		},
		getDrivers: async function () {
			this.drivers = await this.$http.$get('driver');
		},
		postDriver: async function () {
			const data = await this.$http.$post('driver/', this.currentDriver );
			this.cleanDriver()
			this.getDrivers()
		},
		putDriver: async function () {
			const data = await this.$http.$put('driver/' + this.currentDriver.id + '/' , this.currentDriver);
			this.cleanDriver()
			this.getDrivers()
			this.putMode = false
		},
		deleteDriver: async function (id) {
			await this.$http.delete('driver/' + id);
			this.getDrivers()
		}
	},
};
</script>

<style lang="sass">
.drivers
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