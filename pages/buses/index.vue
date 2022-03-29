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
						<div class="field number_plate">
							<label class="label" for="name">Patente</label>
							<input class="input" v-model="currentBus.number_plate"   />
						</div>
						<div class="field driver">
							<label class="label">Chofer</label>
							<v-select
								:options="drivers" 
								label="run"
								:reduce="(driver) => driver.id"
								v-model="currentBus.driver"
								>
									<template #option="{ name, last_name, run, check_digit }">
										{{ name }} {{ last_name }} | {{ $formatRun(run) }}-{{ check_digit }}  
									</template>
									<template #selected-option="{ name, last_name, run, check_digit  }">
										{{ name }} {{ last_name }} | {{ $formatRun(run) }}-{{ check_digit }} 
									</template>
								</v-select>
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
						<thead>
							<tr>
								<th>Patente</th>
								<th>Chofer</th>
								<th>Capacidad</th>
								<th>Opciones</th>
							</tr>
						</thead>
						<tbody>
							<tr v-for="bus in buss" :key="bus.id">
								<td class="column number_plate">
									{{ bus.number_plate }}
								</td>
								<td class="column number_plate">
										{{ $getData(drivers, bus.driver, "name") }} {{ $getData(drivers, bus.driver, "last_name") }}
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
						</tbody>
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
			driver: null
		},
		drivers: [],
		putMode: false
	}),
	async fetch() {
		this.buss = await this.$http.$get('bus');
		this.drivers = await this.$http.$get('driver');
	},
	methods: {
		cancelEdit: function() {
			this.putMode = false
			this.cleanBus()
		},
		cleanBus: function() {
			this.currentBus = {
				number_plate: null,
				driver: null
			}
		},
		updateBus: function(bus) {
			this.currentBus = bus
			this.putMode = true
		},
		getBus: async function () {
			try {
				this.buss = await this.$http.$get('bus');
			} catch (err) {
				console.log(err.response.data)
			}
		},
		postBus: async function () {
			try {
				const data = await this.$http.$post('bus/', this.currentBus )
				this.cleanBus()
				this.getBus();
			} catch (err) {
				console.log(err.response.data)
			}
		},
		putBus: async function () {
			try {
				const data = await this.$http.$put('bus/' + this.currentBus.id + '/' , this.currentBus);
				this.getBus();
				this.cleanBus();
				this.putMode = false
			} catch (err) {
				console.log(err.response.data)
			}
		},
		deleteBus: async function (id) {
			try {
				await this.$http.delete('bus/' + id);
				this.getBus();
			} catch (err) {
				console.log(err.response.data)
			}
		}
	},
};
</script>
