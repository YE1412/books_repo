<script setup lang="ts">
defineProps<{
	pageTitle: String,
	isDark?: Boolean
}>()
/*defineProps({
	pageTitle: {
		type: String,
		required: true
	}
})*/
</script>

<template>
	<v-col class="pa-0"
		cols="12">
			<v-sheet
				class="ma-2"
				rounded
				:theme="isDark ? 'dark' : 'light'">
					<div
						class="py-4">
						<div
							class="text-h2 text-center py-4"
							v-text="pageTitle">
							
						</div>
					</div>
			</v-sheet>
	</v-col>
</template>