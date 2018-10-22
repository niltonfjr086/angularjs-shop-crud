var app = angular.module('ShopApp', ['ngMaterial', 'ngMessages']);

app.service('MantemProdutoService', function ($http) {

    this.products = [];

    if (angular.fromJson(window.localStorage.getItem('productsIds'))) {

        let ids = ((angular.fromJson(window.localStorage.getItem('productsIds')))[0]).split(',').sort();

        ids.forEach((id) => {
            httpGetById(id).then((r) => {
                this.products.push(r);

                this.products.sort((a, b) => {
                    if (a.id > b.id) return 1
                    else if (a.id < b.id) return -1
                    else return 0;
                });
            });
        });

    } else {
        // window.localStorage.removeItem('productsIds');
        let initialData = [];
        initialData.push({ "name": 'Laptop', "description": '14p', "price": 3000 });
        initialData.push({ "name": 'Mouse', "description": 'Wireless', "price": 300 });
        initialData.push({ "name": 'Smartphone', "description": 'Android 8', "price": 2000 });
        initialData.push({ "name": 'Mousepad', "description": 'Blue', "price": 40.5 });

        let ids = [];
        initialData.forEach(element => {
            httpPostProduct(element).then((r) => {
                this.products.push(r);
                ids.push(r.id);
                window.localStorage.setItem('productsIds', angular.toJson([ids.join(',')]));
            });
        });

    };


    this.addProduct = (object) => {
        return httpPostProduct(object)
            .then((r) => {
                this.products.push(r);

                let ids = ((angular.fromJson(window.localStorage.getItem('productsIds')))[0]).split(',');
                ids.push(r.id);

                window.localStorage.setItem('productsIds', angular.toJson([ids.join(',')]));
            })
    };
    function httpPostProduct(item) {
        return $http({
            url: 'https://s-shop-test.herokuapp.com/product',
            method: "POST",
            headers: { 'Content-Type': 'application/json; charset=UTF-8' },

            data: { "name": item.name, "description": item.description, "price": item.price }

        }).then((response) => {
            return response.data;
        }, (e) => {
            console.error(e);
        });

    };


    this.getById = (objectId) => { return httpGetById(objectId) };
    function httpGetById(id) {
        return $http({
            url: 'https://s-shop-test.herokuapp.com/product/' + id,
            method: "GET",
            headers: { 'Content-Type': 'application/json; charset=UTF-8' },

        }).then((response) => {
            return response.data;
        }, (e) => {
            console.error(e);
        });
    };


    this.editProduct = (object) => {
        return httpPutProduct(object).then((r) => {

            this.products[object.i] = object;
        })
    };
    function httpPutProduct(item) {
        return $http({
            url: 'https://s-shop-test.herokuapp.com/product/' + item.id,
            method: "PUT",
            headers: { 'Content-Type': 'application/json; charset=UTF-8' },

            data: { "name": item.name, "description": item.description, "price": item.price }

        }).then((response) => {
            return response.data;
        }, (e) => {
            console.error(e);
        });

    };


    this.deleteProduct = (objectId) => {
        return httpDeleteProduct(objectId).then(() => {

            let ids = ((angular.fromJson(window.localStorage.getItem('productsIds')))[0]).split(',').sort();
            (Object.values(ids)).forEach((element, i) => {
                if (element == objectId) {
                    ids.splice(i, 1);
                    this.products.splice(i, 1);
                }
            });
            window.localStorage.setItem('productsIds', angular.toJson([ids.join(',')]));
        })
    };
    function httpDeleteProduct(id) {
        return $http({
            url: 'https://s-shop-test.herokuapp.com/product/' + id,
            method: "DELETE",
            headers: { 'Content-Type': 'application/json; charset=UTF-8' }

        }).then((response) => {
            return response.data;
        }, (e) => {
            console.error(e);
        });
    };

});