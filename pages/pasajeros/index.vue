<template>
	<div class="passengers">
		<h2>Pasajeros</h2>
		<p class="message" v-if="$fetchState.pending">Buscando pasajeros.</p>
		<p class="message" v-else-if="$fetchState.error">
			Bienvenido. Ha ocurrido un error. Procura darle un runserver a la API.
		</p>
		<div v-else class="the-passengers">
			<div class="inner">
				<div class="form-container">
					<form action="">
						<h3>Nuevo Pasajero</h3>
						<div class="field run">
							<label class="label" for="name">RUN</label>
							<input class="input" v-model="currentPassenger.run" name="run" type="number" maxlength="8" required  />
							<span class="help">Sin puntos, guión ni dígito verificador</span>
						</div>
						<div class="field run">
							<label class="label" for="name" >Nombre</label>
							<input class="input" v-model="currentPassenger.name"  name="name" type="text" maxlength="40">
						</div>
						<div class="field run">
							<label class="label" for="last_name">Apellido</label>
							<input class="input" v-model="currentPassenger.last_name"  name="last_name" type="text" maxlength="40">
						</div>
						<div class="selection-options">
							<button v-if="!putMode" class="button add" @click.prevent="postPassenger()">Añadir</button>
							<button v-if="putMode" class="button add" @click.prevent="putPassenger()">Editar</button>
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
							<tr v-for="passenger in passengers" :key="passenger.id">
								<td class="column name">
									{{ passenger.name }}
								</td>
								<td class="column last_name">
									{{ passenger.last_name }}
								</td>
								<td class="column run">
									{{ $formatRun(passenger.run) + "-" + passenger.check_digit }}
								</td>
								<td class="column options">
									<img @click="updatePassenger(passenger)" src="~/assets/images/edit.png" alt="" />
									<img
										@click="deletePassenger(passenger.id)"
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
	name: 'Pasajeros',
	data: () => ({
		passengers: [],
		currentPassenger: {
			name: null,
			last_name: null,
			run: null
		},
		putMode: false
	}),
	async fetch() {
		this.passengers = await this.$http.$get('passenger');
	},
	methods: {
		cancelEdit: function() {
			this.putMode = false
			this.cleanPassenger()
		},
		cleanPassenger: function() {
			this.currentPassenger = {
				name: null,
				last_name: null,
				run: null
			}
		},
		updatePassenger: function(passenger) {
			this.currentPassenger = passenger
			this.putMode = true
		},
		getPassengers: async function () {
			this.passengers = await this.$http.$get('passenger');
		},
		postPassenger: async function () {
			try {
				const data = await this.$http.$post('passenger/', this.currentPassenger );
				this.cleanPassenger()
				this.getPassengers()
			} catch (err) {
				console.log(err.response.data)
			}
		},
		putPassenger: async function () {
			try {
				const data = await this.$http.$put('passenger/' + this.currentPassenger.id + '/' , this.currentPassenger);
				this.getPassengers()
				this.cleanPassenger()
				this.putMode = false
			} catch (err) {
				console.log(err.response.data)
			}
		},
		deletePassenger: async function (id) {
			try {
				await this.$http.delete('passenger/' + id);
				this.getPassengers();
			} catch (err) {
				console.log(err.response.data)
			}
		}
	},
};
</script>