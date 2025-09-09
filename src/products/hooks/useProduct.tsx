import { useQuery } from "@tanstack/react-query"
import { productService } from "../services/product.service"

interface Options {
    id: number
}

export const useProduct = ({ id }: Options) => {
    const { data: product = [], isError, isLoading, isFetching, error } = useQuery({
        queryKey: ['product', id],
        queryFn: () => productService.getProductId(id)

    })

    return {
        error,
        isFetching,
        isLoading,
        product,
        isError
    }
}
