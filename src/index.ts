import { getContainerEl, setupHooks } from "@cypress/mount-utils";

let dispose: () => void = () => void 0;

function cleanup() {
    dispose?.();
}

export function mount<T>(component: HTMLElement | string): Cypress.Chainable<JQuery<T>> {
    cleanup();

    if (typeof component === "string") {
        const template = document.createElement("template");
        template.innerHTML = component;

        if (template.content.children.length > 1)
            throw new Error("The provided HTML string must have a single root element");

        component = template.content.firstElementChild as HTMLElement;

        if (!component) throw new Error("The provided HTML string was not able to be parsed into a valid HTML element");
    }

    const root = getContainerEl();
    render(component, root);

    dispose = () => {
        render(null, root);
    };

    return cy
        .wrap(root, { log: false })
        .wait(0, { log: false })
        .children({ log: false })
        .first({ log: false })
        .then((element) => {
            const name = element.prop("tagName").toLowerCase();

            // safe cast for current html element
            const el = document.getElementsByTagName(name)[0];

            return cy.wrap(el, { log: false });
        });
}

function render(component: HTMLElement | null, root: HTMLElement) {
    root.innerHTML = "";
    if (!component) return;
    root.appendChild(component);
}

setupHooks(cleanup);

declare global {
    namespace Cypress {
        interface Chainable {
            /**
             * Mount your component into Cypress sandbox
             * @param component content (HTMLElement) to render
             * @type Name of the element to be mounted (as a string)
             * @throws Error if the provided HTML string has more than one root element
             * @throws Error if the provided HTML string is not able to be parsed into a valid HTML element
             */
            mount: typeof mount;
        }
    }
}
