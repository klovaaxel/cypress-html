import { getContainerEl, setupHooks } from "@cypress/mount-utils";

let dispose: () => void = () => void 0;

function cleanup() {
    dispose?.();
}

export function mount<T>(component: HTMLElement): Cypress.Chainable<JQuery<T>> {
    cleanup();

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
             */
            mount: typeof mount;
        }
    }
}
