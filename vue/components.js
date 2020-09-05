Vue.component("item-element", {
	props: ["data"],
	template: `
	<li class="element-storage" :id="data.sym">
		<div class="element" :class="data.cls" :style="data.st" v-on:click="$emit('element-click', data)">
			<div class="symbol">{{ data.sym }}</div>
			<div class="num-and-rad-storage" style="">
				<div class="number">{{ data.num }}</div>
				<div class="radioactive" v-if="data.rad"><img src="./img/radiation.svg" alt=""></div>
			</div>				
			<div class="Ar">{{ data.Ar }}</div>
			<ol class="oxidation">
				<li v-for="i in data.oxs">{{ i }}</li>
			</ol>
			<div class="name-ru">{{ data.ru }}</div>
			<div class="name-la">{{ data.la }}</div>
		</div>
	</li>`
});

Vue.component("alert-period", {
	template: `
		<div class="period-text">
			<h2>В периодах справа налево</h2>
			<ol>
				<li>металлические и восстановительные свойства ослабевают</li>
				<li>неметаллические и окислительные свойства усиливаются</li>
				<li>электроотрицательность увеличивается</li>
				<li>радиус атомов уменьшается</li>
			</ol>
			<slot></slot>
		</div>
	`
});

Vue.component("alert-group", {
	template: `
		<div class="group-text">
			<h2>В группах с увеличением заряда ядра (сверху вниз)</h2>
			<ol>
				<li>радиус атомов увеличивается</li>
				<li>электроотрицательность уменьшается</li>
				<li>металлические свойства усиливаются</li>
				<li>неметаллические свойства ослабевают</li>
				<li>восстановительные свойства усиливаются</li>
				<li>окислительные свойства ослабевают</li>
			</ol>
			<slot></slot>
		</div>

	`
});

Vue.component("alert-text", {
	template: "<div><slot></slot></div>"
});