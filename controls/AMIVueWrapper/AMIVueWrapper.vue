<script setup>
/*--------------------------------------------------------------------------------------------------------------------*/

import { ref, onMounted, onBeforeUnmount, watch } from 'vue';

/*--------------------------------------------------------------------------------------------------------------------*/

const props = defineProps({
	controlName: {
		type: String,
		required: true,
		validator: (value) => value && value.trim().length > 0
	},
	controlParams: {
		type: Object,
		default: () => ({})
	},
	controlOptions: {
		type: Object,
		default: () => ({})
	},
	autoReload: {
		type: Boolean,
		default: false
	}
});

/*--------------------------------------------------------------------------------------------------------------------*/

const emit = defineEmits(['mounted', 'rendered', 'error', 'destroyed']);

/*--------------------------------------------------------------------------------------------------------------------*/

const containerRef = ref(null);
const controlInstance = ref(null);
const controlConstructor = ref(null);
const isLoading = ref(false);
const error = ref(null);
const uniqueId = ref(`ami-ctrl-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`);

/*--------------------------------------------------------------------------------------------------------------------*/

const loadControl = async () => {
	isLoading.value = true;
	error.value = null;

	try {
		const resources = await amiWebApp.loadResources([`ctrl:${props.controlName}`]);

		if (!resources || resources.length === 0) {
			throw new Error(`Control "${props.controlName}" not found`);
		}

		controlConstructor.value = resources[0];

		emit('mounted', {
			controlName: props.controlName,
			constructor: controlConstructor.value
		});

	} catch (err) {
		error.value = err.message || 'Failed to load control';
		emit('error', err);
		console.error(`Error loading control "${props.controlName}":`, err);
	} finally {
		isLoading.value = false;
	}
};

/*--------------------------------------------------------------------------------------------------------------------*/

const renderControl = async () => {
	if (!controlConstructor.value || !containerRef.value) {
		return;
	}

	try {
		destroyControl();

		controlInstance.value = new controlConstructor.value();

		const selector = `#${uniqueId.value}`;

		const renderArgs = Object.values(props.controlParams);

		const renderPromise = controlInstance.value.render(
			selector,
			...renderArgs,
			props.controlOptions
		);

		if (renderPromise && typeof renderPromise.done === 'function') {
			renderPromise.done((...args) => {
				emit('rendered', {
					controlName: props.controlName,
					instance: controlInstance.value,
					result: args
				});
			}).fail((err) => {
				error.value = err.message || 'Failed to render control';
				emit('error', err);
				console.error(`Error rendering control "${props.controlName}":`, err);
			});
		} else {
			emit('rendered', {
				controlName: props.controlName,
				instance: controlInstance.value
			});
		}

	} catch (err) {
		error.value = err.message || 'Failed to render control';
		emit('error', err);
		console.error(`Error rendering control "${props.controlName}":`, err);
	}
};

/*--------------------------------------------------------------------------------------------------------------------*/

const destroyControl = () => {
	if (controlInstance.value) {
		try {
			if (typeof controlInstance.value.destroy === 'function') {
				controlInstance.value.destroy();
			}
			emit('destroyed', {
				controlName: props.controlName,
				instance: controlInstance.value
			});
		} catch (err) {
			console.error(`Error destroying control "${props.controlName}":`, err);
		}
		controlInstance.value = null;
	}
};

/*--------------------------------------------------------------------------------------------------------------------*/

const reload = async () => {
	await loadControl();
	await renderControl();
};

/*--------------------------------------------------------------------------------------------------------------------*/

defineExpose({
	reload,
	getControlInstance: () => controlInstance.value,
	getControlConstructor: () => controlConstructor.value,
	isLoading: () => isLoading.value,
	getError: () => error.value
});

/*--------------------------------------------------------------------------------------------------------------------*/

onMounted(async () => {
	await loadControl();
	await renderControl();
});

onBeforeUnmount(() => {
	destroyControl();
});

/*--------------------------------------------------------------------------------------------------------------------*/

if (props.autoReload) {
	watch(() => props.controlName, async () => {
		await reload();
	});

	watch(() => [props.controlParams, props.controlOptions], async () => {
		await renderControl();
	}, { deep: true });
}

/*--------------------------------------------------------------------------------------------------------------------*/
</script>

<!-- *********************************************************************************************************** -->

<template>
	<!-- *********************************************************************************************************** -->

	<div class="ami-control-vue-wrapper">

		<div v-if="isLoading" class="ami-control-loading">
			<div class="spinner-border text-primary" role="status">
				<span class="visually-hidden">Loading {{ controlName }}...</span>
			</div>
			<p class="mt-2">Loading control: <kbd>{{ controlName }}</kbd></p>
		</div>

		<div v-else-if="error" class="ami-control-error alert alert-danger" role="alert">
			<i class="bi bi-exclamation-triangle-fill me-2"></i>
			<strong>Error loading control:</strong> {{ error }}
			<button class="btn btn-sm btn-outline-danger ms-3" @click="reload">
				<i class="bi bi-arrow-clockwise"></i> Retry
			</button>
		</div>

		<div
			v-else
			:id="uniqueId"
			ref="containerRef"
			class="ami-control-container"
		></div>

	</div>

	<!-- *********************************************************************************************************** -->
</template>

<!-- *********************************************************************************************************** -->

<style scoped>
.ami-control-vue-wrapper {
	width: 100%;
	min-height: 50px;
}

.ami-control-loading {
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	padding: 30px;
	text-align: center;
}

.ami-control-error {
	margin: 15px;
}

.ami-control-container {
	width: 100%;
}
</style>
