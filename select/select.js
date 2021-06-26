function getTemplate(placeholder, data = [], selectedId) {
	let text = placeholder ?? ''

	const items = data.map((item) => {
		let cls = ''

		if (item.id === selectedId) {
			text = item.value
			cls = 'selected'
		}

		return `<li class="select__item ${cls}" data-type="item" data-id="${item.id}">${item.value}</li>`
	})

	return `
        <div class="select__overlay" data-type="overlay"></div>
        <div class="select__input" data-type="input">
            <span data-type="value">${text}</span>
            <i data-type="arrow" class="fas fa-chevron-down"></i>
        </div>
        <div class="select__dropdawn">
            <ul class="select__list">
                ${items.join('')}
            </ul>
        </div>
    `
}

export class Select {
	constructor(selector, options) {
		this.$el = document.querySelector(selector)
		this.options = options
		this.selectedId = options.selectedId

		this.#render()
		this.#listen()
	}

	#render() {
		const { data, placeholder } = this.options

		this.$el.innerHTML = getTemplate(placeholder, data, this.selectedId)
	}

	#listen() {
		this.onClickHandler = this.onClickHandler.bind(this)
		this.$el.addEventListener('click', this.onClickHandler)

		this.$arrow = this.$el.querySelector('[data-type="arrow"]')
		this.$value = this.$el.querySelector('[data-type="value"]')
	}

	onClickHandler(e) {
		const { type } = e.target.dataset

		if (type === 'input') {
			this.toggleClass()
		} else if (type === 'item') {
			const { id } = e.target.dataset
			this.select(id)
		} else if (type === 'overlay') {
			this.close()
		}
	}

	select(id) {
		this.selectedId = id
		this.$value.textContent = this.current.value
		this.close()

		this.$el
			.querySelectorAll(`[data-type="item"]`)
			.forEach((item) => item.classList.remove('selected'))

		this.$el
			.querySelector(`[data-id="${this.selectedId}"]`)
			.classList.add('selected')
	}

	get current() {
		return this.options.data.find((item) => item.id === this.selectedId)
	}

	get isOpen() {
		return this.$el.classList.contains('open')
	}

	toggleClass() {
		this.isOpen ? this.close() : this.open()
	}

	open() {
		this.$el.classList.add('open')

		this.$arrow.classList.remove('fa-chevron-down')
		this.$arrow.classList.add('fa-chevron-up')
	}

	close() {
		this.$el.classList.remove('open')
		this.$arrow.classList.remove('fa-chevron-up')
		this.$arrow.classList.add('fa-chevron-down')
	}

	destroy() {
		this.$el.removeEventListener('click', this.onClickHandler)
		this.$el.remove()
	}
}
