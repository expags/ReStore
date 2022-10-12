import { useState, useEffect } from "react";
import agent from "../../app/api/agent";
import LoadingComponent from "../../app/layout/LoadingComponent";
import { Product } from "../../app/models/product";
import ProductList from "./ProductList";

function Catalog() {

    // const [products, setProducts] = useState([
    //   {name: 'product 1', price: 100.00},
    //   {name: 'product 2', price: 200.00},
    // ]);

    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // fetch('http://localhost:5000/api/products')
        // .then(response => response.json())
        // .then(data => setProducts(data))
        agent.Catalog.list()
        .then(products => setProducts(products))
        .catch(error => console.log(error))
        .finally(() => setLoading(false));
    }, [])

    function addProduct() {
        // setProducts([...products, {name: 'product 3', price: 300.00}])
        setProducts(prevState => [...prevState,
        {
            id: prevState.length + 101,
            name: 'product' + (prevState.length + 1),
            price: (prevState.length * 100) + 100,
            brand: 'some brand',
            description: 'some description',
            pictureUrl: 'http://picsum.photos/200'
        }])
    }

    if (loading) return <LoadingComponent message='Loading products...' />

    return (
        <ProductList products={products}/>
    )
}

export default Catalog;