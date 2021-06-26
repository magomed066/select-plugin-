import { Select } from './select/select'
import './select/styles.scss'

const select = new Select('#select', {
	placeholder: 'Placeholder by default',
	selectedId: '4',
	data: [
		{ id: '1', value: 'React' },
		{ id: '2', value: 'Vue' },
		{ id: '3', value: 'Angular' },
		{ id: '4', value: 'React Native' },
		{ id: '5', value: 'Next' },
		{ id: '6', value: 'Nust' },
	],
})

window.s = select
