import { useQuery } from "@tanstack/react-query"
import { productService } from "../services/product.service"


interface Options {
    filterKey?: string
}

export const useProducts = ({ filterKey }: Options) => {
    const { data: products = [], isError, isLoading, isFetching, error } = useQuery({
        queryKey: ['products', { filterKey }],
        queryFn: () => productService.getProducts({ filterKey }),
        staleTime: 1000 * 60 * 60

    })

    return {
        error,
        isFetching,
        isLoading,
        products,
        isError
    }
}
