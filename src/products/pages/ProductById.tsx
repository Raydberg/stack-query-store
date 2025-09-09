import { useParams } from "react-router-dom"
import { ProductCard } from ".."
import { useProduct } from "../hooks/useProduct"
import { useEffect } from "react"


export const ProductById = () => {
    const { id } = useParams()
    const { product, isLoading } = useProduct({ id: +id! })


    useEffect(() => {
        window.scrollTo(0, 0)
    })


    return (
        <div className="flex-col">
            <h1 className="text-2xl font-bold">Todos los productos</h1>
            {
                isLoading && <div>Cargando...</div>
            }
            {
                product && !Array.isArray(product) && (<ProductCard product={product} fullDescription />)

            }


        </div>
    )
}
