app.controller('MantemProdutoController', function ($scope, MantemProdutoService) {

    function buildProducts() { $scope.products = MantemProdutoService.products; };
    buildProducts();

    function buildProduct() { $scope.product = { "name": "", "description": "", "price": 1 }; };
    buildProduct();

    $scope.saveProduct = () => {
        if ($scope.product && $scope.product.id) {
            MantemProdutoService.editProduct($scope.product).then(() => {
                buildProduct();
            });

        } else {
            MantemProdutoService.addProduct($scope.product).then(() => { buildProduct(); });
        }
    };

    $scope.selectProduct = (index) => {
        let p = $scope.products[index];
        $scope.product = {
            "i": index,
            "id": p.id,
            "name": p.name,
            "description": p.description,
            "price": p.price
        };
    };

    $scope.deleteProduct = (id) => { MantemProdutoService.deleteProduct(id) };

}).config(($mdThemingProvider) => {
    // Configure a dark theme with primary foreground yellow
    $mdThemingProvider.theme('docs-dark', 'default')
        .primaryPalette('yellow')
        .dark();

});;