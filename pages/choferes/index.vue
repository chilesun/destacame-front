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
							<input class="input" v-model="currentDriver.run" name="run" type="number" max="99999999" required  />
							<span class="help">Sin puntos, guión ni dígito verificador</span>
						</div>
						<div class="field run">
							<label class="label" for="name">Nombre</label>
							<input class="input" v-model="currentDriver.name"  name="name" type="text" maxlength="40">
						</div>
						<div class="field run">
							<label class="label" for="last_name">Apellido</label>
							<input class="input" v-model="currentDriver.last_name"  name="last_name" type="text" maxlength="40">
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
						<thead>
							<tr>
								<th>Nombre</th>
								<th>Apellido</th>
								<th>RUN</th>
								<th>Opciones</th>
							</tr>
						</thead>
						<tbody>
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
						</tbody>
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
			try {
				this.drivers = await this.$http.$get('driver');

			} catch (err) {
				console.log(err.response.data)
			}
		},
		postDriver: async function () {
			try {
				const data = await this.$http.$post('driver/', this.currentDriver );
				this.cleanDriver()
				this.getDrivers()
			} catch (err) {
				console.log(err.response.data)
			}
		},
		putDriver: async function () {
			try {
				const data = await this.$http.$put('driver/' + this.currentDriver.id + '/' , this.currentDriver);
				this.cleanDriver()
				this.getDrivers()
				this.putMode = false
			} catch (err) {
				console.log(err.response.data)
			}
		},
		deleteDriver: async function (id) {
			try {
				await this.$http.delete('driver/' + id);
				this.getDrivers()
			} catch (err) {
				console.log(err.response.data)
			}
		}
	},
};
</script>