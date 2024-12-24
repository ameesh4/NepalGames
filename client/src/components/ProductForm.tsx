import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "./ui/form";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { useState } from "react";
import axios from "axios";
import { toast } from "@/hooks/use-toast";



const schema: z.Schema = z.object({
    name: z.string().nonempty({ message: "Name is required" }),
    description: z.string().nonempty({ message: "Description is required" }),
    price: z.number().int().positive({ message: "Price must be a positive integer" }),
    quantity: z.number().int().positive({ message: "Quantity must be a positive integer" }),
    picture: z.string().url({ message: "Invalid URL" }),
    category: z.string().nonempty({ message: "Category is required" }),
})

export default function ProductForm() {
    const token = localStorage.getItem("adminToken");
    const header = {
        headers: {
            Authorization: `${token}`,
        }
    }

    const [isSubmitting, setIsSubmitting] = useState(false);

    const methods = useForm<z.infer<typeof schema>>({
        resolver: zodResolver(schema),
    });

    const { register, handleSubmit, formState: { errors }, control } = methods;

    const onSubmit = (data: z.infer<typeof schema>) => {
        try{
            setIsSubmitting(true);
            let request = {
                name: data.name,
                description: data.description,
                price: data.price,
                quantity: data.quantity,
                picture: data.picture,
                category: data.category,
            }

            axios.post("http://localhost:8000/api/admin/addproduct", request, header).then((res)=>{
                if (res.status === 200) {
                    toast({
                        title: "Success",
                        variant: "success",
                        description: "Product added successfully",
                        duration: 5000,
                    })
                }
            }).catch((err)=>{
                toast({
                    title: "Error",
                    variant: "destructive",
                    description: err.response.data.error,
                    duration: 5000,
                })
            })
        }catch(err){
            console.log(err);
        }finally{
            setIsSubmitting(false);
        }
    }

    return (
        <Form {...methods}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <FormField
            control={control}
            name="name"
            render={() => (
                <FormItem>
                <FormLabel>Product Name</FormLabel>
                <FormControl>
                    <Input placeholder="Enter product name" {...register("name")} />
                </FormControl>
                {errors.name && <FormMessage>{String(errors.name.message)}</FormMessage>}
                </FormItem>
            )}
            />

            <FormField
            control={control}
            name="description"
            render={() => (
                <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                    <Textarea
                    placeholder="Enter product description"
                    className="resize-none"
                    {...register("description")}
                    />
                </FormControl>
                <FormMessage />
                </FormItem>
            )}
            />

            <div className="grid grid-cols-2 gap-4">
            <FormField
                control={control}
                name="price"
                render={() => (
                <FormItem>
                    <FormLabel>Price</FormLabel>
                    <FormControl>
                    <Input type="number" step="0.01" {...register("price")} />
                    </FormControl>
                    <FormMessage />
                </FormItem>
                )}
            />

            <FormField
                control={control}
                name="stock"
                render={() => (
                <FormItem>
                    <FormLabel>Stock</FormLabel>
                    <FormControl>
                    <Input type="number" {...register("quantity")} />
                    </FormControl>
                    <FormMessage />
                </FormItem>
                )}
            />
            </div>

            <FormField
            control={control}
            name="category"
            render={() => (
                <FormItem>
                <FormLabel>Category</FormLabel>
                <FormControl>
                    <Input placeholder="Enter product category" {...register("category")} />
                </FormControl>
                <FormMessage />
                </FormItem>
            )}
            />

            <FormField
            control={control}
            name="imageUrl"
            render={() => (
                <FormItem>
                <FormLabel>Image URL</FormLabel>
                <FormControl>
                    <Input placeholder="Enter image URL" {...register("picture")} />
                </FormControl>
                <FormMessage />
                </FormItem>
            )}
            />

            <div className="flex justify-end space-x-4">
            <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Saving...' : 'Add Product'}
            </Button>
            </div>
        </form>
        </Form>
    )
}