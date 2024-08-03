class CounterComponent extends HTMLElement {
    private count: number;
    private shadow: ShadowRoot;

    constructor() {
        super();
        this.count = 0;
        this.shadow = this.attachShadow({ mode: "open" });

        this.shadow.innerHTML = `
          <div class="counter">
              <span id="count">Count is ${this.count}</span>
              <button id="increment">+</button>
          </div>
      `;

        this.shadow.querySelector("#increment")?.addEventListener("click", this.increment.bind(this));
    }

    static get observedAttributes() {
        return ["value"];
    }

    attributeChangedCallback(name: string, oldValue: string | null, newValue: string | null) {
        if (name === "value") {
            this.value = Number(newValue);
        }
    }

    get value() {
        return this.count;
    }

    set value(newValue: number) {
        this.count = newValue;
        this.updateCount();
    }

    increment() {
        this.value++;
    }

    decrement() {
        this.value--;
    }

    updateCount() {
        const countElement = this.shadow.querySelector("#count");
        if (countElement) {
            countElement.textContent = `Count is ${this.count}`;
        }
    }
}

customElements.define("counter-component", CounterComponent);
