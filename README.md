# Cypress Component Testing for HTML elements

<p align="center">
  <img width="250" height="250" src="https://upload.wikimedia.org/wikipedia/commons/6/61/HTML5_logo_and_wordmark.svg">
</p>

> "Use all the power of cypress component testing with simple html elements and web components. ⚡"

This package provides configuration and commands for testing html elements with the power of cypress.

## Getting started

To install, run:

```bash
npm install -D cypress-ct-html
```

Once you have the package installed alongside Cypress, you can run `npx cypress open`, choose "Component Testing", and HTML should appear in the list of frameworks available.

Learn more about [third-party definitions](https://docs.cypress.io/guides/component-testing/third-party-definitions)

## Configuration

Add `cypress-ct-html` framework to your `cypress.config.{ts,js}` file

```ts
export default defineConfig({
    component: {
        devServer: {
            framework: "cypress-ct-html",
            // more config here
        },
    },
});
```

If you're using TypeScript, you may get a type error when setting the framework property. If so, you'll need to typecast it as `any`

```ts
framework: 'cypress-ct-html' as any,
```

## Adding mount Command

Next, add the following lines to your `component.{js.ts}`

```ts
import { mount } from "cypress-ct-html";

Cypress.Commands.add("mount", mount);
```

Optionally, this package brings its custom types definitions. Add the following to `tsconfig.json` or `jsconfig.json` in your project.

```json
{
    "compilerOptions": {
        // more compiler options...
        "types": ["cypress", "cypress-ct-html"]
    }
}
```

## Usage notes

You can now mount any html element in a component test, for example:

```ts
it("should display content", () => {
    const div = document.createElement("div");
    div.textContent = "Hello, World!";
    cy.mount(div);

    cy.get("#content").should("contain.text", "Hello, World!");
});
```

Or find content inside your web component

```ts
import "path/to/my-element";

it("should render its children", () => {
    const myElement = document.createElement("my-element");
    cy.mount(myElement);

    cy.get("my-element").shadow().find(".my-part").should("exist");
});
```

For more examples and basic usages see ´cypress/component´ examples

> **Note**: You may prefer use `includeShadowDom` option to avoid write `shadow()` command on every test.
>
> ```typescript
> export default defineConfig({
>     includeShadowDom: true,
>     component: {
>         devServer: {
>             framework: "cypress-ct-html",
>             // more config here
>         },
>     },
> });
> ```

## Credits

Much of the code and inspiration for this package comes from the work of [redfox-mx](https://github.com/redfox-mx) and his [cypress-lit](https://github.com/redfox-mx/cypress-lit) repository. A big thank you for his contributions to the community.
