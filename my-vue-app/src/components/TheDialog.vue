<script setup lang="ts">
import { type Ref } from 'vue'

const props = defineProps<{
	text: string,
	formParams?: any,
	actionParent?: AsyncFunction
}>()

const submit = (e: Event, isActive: Ref<boolean>): void => {
	//console.log('Submit form : ')
	//console.log(props.formRef)
	isActive.value = false
	props.actionParent(e, props.formParams)
}
</script>

<template>
	<v-dialog
		width="auto"
		transition="dialog-bottom-transition"
		activator="parent">
		<template v-slot:default="{isActive}">
			<v-card
				max-width="400"
				prepend-icon="fas fa-comment-dots"
				:text="props.text"
				title="Confirmation Dialog">
				<template v-slot:actions>
					<v-btn
						color="primary"
						class="ms-auto"
						text="Yes"
						@click="submit($event, isActive)">
					</v-btn>
					<v-btn
						color="error"
						class="ms-auto"
						text="No"
						@click="isActive.value = false">
					</v-btn>
				</template>
			</v-card>
		</template>
	</v-dialog>
</template>