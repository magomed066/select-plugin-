function getTemplate() {
	return `
        <div class="select__input" data-type="input">
            <span>Select something</span>
            <i class="fas fa-chevron-down"></i>
        </div>
        <div class="select__dropdawn">
            <ul class="select__list">
                <li class="select__item">123</li>
                <li class="select__item">123</li>
                <li class="select__item">123</li>
                <li class="select__item">123</li>
                <li class="select__item">123</li>
                <li class="select__item">123</li>
                <li class="select__item">123</li>
            </ul>
        </div>
    `
}

export class Select {
	constructor(selector, options) {
		this.$el = document.querySelector(selector)
		this.options = options

		this.#render()
		this.#listen()
	}

	#render() {
		this.$el.innerHTML = getTemplate()
	}

	#listen() {
		this.onClickHandler = this.onClickHandler.bind(this)
		this.$el.addEventListener('click', this.onClickHandler)
	}

	onClickHandler(e) {
		const { type } = e.target.dataset

		if (type === 'input') {
			this.toggleClass()
		}
	}

	get isOpen() {
		return this.$el.classList.contains('open')
	}

	toggleClass() {
		this.isOpen ? this.close() : this.open()
	}

	open() {
		this.$el.classList.add('open')
	}

	close() {
		this.$el.classList.remove('open')
	}
}
