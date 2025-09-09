import { useQueryClient } from "@tanstack/react-query"
import { productService } from "../services/product.service"

export const usePrefetchProduct = () => {


    const queryClient = useQueryClient()

    const prefetchProduct = (id: number) => {
        queryClient.prefetchQuery({
            queryKey: ["product", id],
            queryFn: () => productService.getProductId(id),
            staleTime: 1000 * 60 * 60
        })
    }


    return {
        prefetchProduct
    }
}
