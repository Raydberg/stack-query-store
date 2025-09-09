import { ProductList } from ".."
import { useProducts } from "../hooks/useProducts"


export const CompleteListPage = () => {

  const { products, isLoading } = useProducts({})

  if (products === undefined) {
    return <div>No hay productos</div>
  }
  return (
    <div className="flex-col">
      <h1 className="text-2xl font-bold">Todos los productos</h1>
      {
        isLoading && <div>Cargando...</div>
      }


      <ProductList products={products} />

    </div>
  )
}