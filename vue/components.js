Vue.component("item-cell", {
	props: ["data"],
	template: `
		<div class="element radioactive f-dark metal" v-bind:class="data.cls" v-bind:id="data.sym">
			<div class="symbol">{{ data.sym }}</div>
			<div class="number">{{ data.num }}</div>
			<div class="Ar">{{ data.Ar }}</div>
			<ol class="oxidation">
				<li v-for='oxidation in data.oxs'>oxidation</li>
			</ol>
			<div class="name-ru">data.ru</div>
			<div class="name-la">data.la</div>
		</div>
	`
});