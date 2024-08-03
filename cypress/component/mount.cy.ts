import "./elements/counter-component";

describe("mount", () => {
    it("should mount element", () => {
        cy.mount(document.createElement("counter-component"));
        cy.get("counter-component").should("exist");
        cy.get("counter-component").shadow().contains("Count is 0");
    });

    it("should return chainable reference to element", () => {
        const counter = cy.mount<"counter-component">(document.createElement("counter-component"));
        counter.shadow().contains("Count is 0");
    });

    it("should clean DOM if mount is called more than one time", () => {
        const component1 = document.createElement("div");
        component1.id = "mount1";

        const component2 = document.createElement("div");
        component2.id = "mount2";

        cy.mount(component1);
        cy.mount(component2);

        cy.get("#mount1").should("not.exist");
        cy.get("#mount2").should("exist");
    });
});

describe("<counter-component .../>", () => {
    it("should mount", () => {
        cy.mount(document.createElement("counter-component"));
        cy.get("counter-component").should("exist");
    });

    it("should set attribute value", () => {
        const component = document.createElement("counter-component");
        component.setAttribute("value", "5");

        cy.mount(component);
        cy.get("counter-component").shadow().contains("Count is 5");

        cy.get("counter-component").should("have.prop", "value", 5);
    });

    it("should increment counter", () => {
        cy.mount(document.createElement("counter-component"));
        cy.get("counter-component").shadow().contains("+").click();

        cy.get("counter-component").shadow().contains("Count is 1");
    });

    it("should track value of counter", () => {
        cy.mount(document.createElement("counter-component"));
        cy.get("counter-component").should("have.prop", "value", 0);

        cy.get("counter-component").shadow().contains("+").click();

        cy.get("counter-component").should("have.prop", "value", 1);
    });
});
