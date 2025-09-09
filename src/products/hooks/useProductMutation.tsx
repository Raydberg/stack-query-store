import { useMutation, useQueryClient } from "@tanstack/react-query"
import { productService } from "../services/product.service"
import { Product } from "../interfaces/product"
import { generateNumericId } from "../../helpers/generateNumericId"

export const useProductMutation = () => {

    const queryClient = useQueryClient()

    const productMutation = useMutation({
        //Se ejecuta despues de onMutate
        mutationFn: productService.createProduct,
        //Data lo que es enviado al servicio
        //Crea el producto y lo muestra inmediatamente
        //Proposito que la UI se vea rapida
        onMutate: (product) => {
            console.log("Mutando - Optimistic update")

            //Producto optimizado
            const optimisticProduct = { id: generateNumericId(), ...product }
            //Meterlo en el cache del queryClient
            queryClient.setQueryData<Product[]>(
                ["products", { "filterKey": product.category }],
                (oldData) => {
                    if (!oldData) return [optimisticProduct];
                    return [...oldData, optimisticProduct]
                }
            )
            return { optimisticProduct }
        },
        //Resultado del backend -> product
        onSuccess: (product, _, context) => {
            //Context -> lo que regresa el onMutate osea contiene el optimisticProduct
            //Product -> resultado de la promesa , lo que viene el backend

            //Eliminamos el queryKey del producto temporal
            queryClient.removeQueries({
                queryKey: ["products", context.optimisticProduct.id],
            })
            //Sobreponemos el producto de la DB en vez del producto temporal
            queryClient.setQueryData<Product[]>(
                ["products", { "filterKey": product.category }],
                (oldProduct) => {
                    if (!oldProduct) return [product];

                    return oldProduct.map(cacheProduct => {
                        return cacheProduct.id === context.optimisticProduct.id ?
                            product :
                            cacheProduct
                    })
                }
            )
        },
        onError: (error, variables, context) => {
            queryClient.removeQueries({
                queryKey: ["products", context?.optimisticProduct.id],
            })
            //Sobreponemos el producto de la DB en vez del producto temporal
            queryClient.setQueryData<Product[]>(
                ["products", { "filterKey": variables.category }],
                (oldProduct) => {
                    if (!oldProduct) return [];

                    return oldProduct.filter(cacheProduct =>
                        cacheProduct.id !== context?.optimisticProduct.id
                    )
                }
            )
        }
    })

    return {
        productMutation
    }
}
