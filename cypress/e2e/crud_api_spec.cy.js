describe("API Automation using Cypress with JSONPlaceholder", () => {
    const baseUrl = "https://jsonplaceholder.typicode.com";

    it("GET - Retrieve list of all posts",() =>{
        cy.request({
            method: "GET",
            url: `${baseUrl}/posts`,
        }).then((response) =>{
            expect(response.status).to.eq(200);
            expect(response.body).to.have.length(100);
        });
    });


    it("POST - Create a new post" ,() => {
        cy.request({
            method: "POST",
            url: `${baseUrl}/posts`,
            body: {
                title: "test-one",
                body: "Post Test",
                userId: 9,
            }
        }).then((response) => {
            expect(response.status).to.eq(201);
            expect(response.body).to.have.property("title","test-one");
            expect(response.body).to.have.property("body","Post Test");
            expect(response.body).to.have.property("userId",9);
        });
    });

    it("PUT - Update an existing post" ,() => {
        cy.request({
            method: "PUT",
            url: `${baseUrl}/posts/1`,
            body: {
                id: 1,
                title: "test-updated",
                body: "body updated",
                userId: 1,
            }
        }).then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body).to.have.property("title","test-updated");
            expect(response.body).to.have.property("body","body updated");
            expect(response.body).to.have.property("userId",1);
        });
    });

    it("DELETE - Delete an existing post" ,() => {
        cy.request({
            method: "DELETE",
            url: `${baseUrl}/posts/1`,
        }).then((response) => {
            expect(response.status).to.eq(200);
        });
    });


    it("GET - Post verification after deletions",() =>{
        cy.request({
            method: "GET",
            url: `${baseUrl}/posts/1`,
        }).then((response) =>{
            expect(response.status).to.eq(200);
            expect(response.body).have.property("title","sunt aut facere repellat provident occaecati excepturi optio reprehenderit");
        });
    });


});