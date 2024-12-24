import { toast } from "@/hooks/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "./ui/form";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { EyeOff } from "lucide-react";

const schema: z.Schema = z.object({
    name: z.string().min(3, { message: "Name must be at least 3 characters long" }),
    email: z.string().email({ message: "Invalid email address" }),
    age: z.string().min(1, { message: "Age must be at least 1" }),
    password: z.string().min(6, { message: "Password must be at least 6 characters long" }),
    confirmPassword: z.string(),
}).refine(data => data.password === data.confirmPassword, {"message": "Passwords do not match", path: ["confirmPassword"]});


export default function SignupForm() {

    const methods = useForm<z.infer<typeof schema>>({
        resolver: zodResolver(schema),
        defaultValues: {
            name: "",
            email: "",
            age: 0,
            password: "",
            confirmPassword: "",
        }
    });

    const { register, handleSubmit, formState: { errors }, control } = methods;

    const onSubmit: SubmitHandler<z.infer<typeof schema>> = (data) => {
        let request = {
            name: data.name,
            email: data.email,
            age: parseInt(data.age),
            password: data.password,
        }

        axios.post("http://localhost:8000/api/signup", request).then((res)=>{
            if (res.status === 201) {
                toast({
                    title: "Success",
                    description: "Account created successfully",
                    duration: 5000,
                })
            }
            window.location.href = "/signin";
        }).catch((err)=>{
            toast({
                title: "Error",
                description: err.response.data.message,
                duration: 5000,
            })
        })
    }

    const revealPassword = (id: string) => {
        const password = document.getElementById(id) as HTMLInputElement;

        if (password.type === "password") {
            password.type = "text";
        } else {
            password.type = "password";
        }
    }
    return (
        <Form {...methods}>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                    control={control}
                    name="name"
                    render={() => (
                        <FormItem>
                        <FormLabel>Full Name</FormLabel>
                        <FormControl>
                            <Input placeholder="Enter your full name" {...register("name")} />
                        </FormControl>
                        {errors.name && <FormMessage>{String(errors.name.message)}</FormMessage>}
                        </FormItem>
                    )}
                />
                <FormField
                control={control}
                name="email"
                render={() => (
                    <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                        <Input placeholder="Enter your email" {...register("email")} />
                    </FormControl>
                    {errors.email && <FormMessage>{String(errors.email.message)}</FormMessage>}
                    </FormItem>
                )}
                />
                <FormField
                control={control}
                name="age"
                render={() => (
                    <FormItem>
                    <FormLabel>Age</FormLabel>
                    <FormControl>
                        <Input type="number" placeholder="Enter your age" {...register("age")} />
                    </FormControl>
                    {errors.age && <FormMessage>{String(errors.age.message)}</FormMessage>}
                    </FormItem>
                )}
                />
                <FormField
                control={control}
                name="password"
                render={() => (
                    <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                        <div className="flex">
                            <Input id="password" type="password" {...register("password")} className="rounded-r-none" placeholder="Enter your password" />
                            <button type="button" className="bg-white px-1 border-y border-r hover:bg-gray-100 border-zinc-300" onClick={()=>revealPassword("password")}><EyeOff id="eye" color="black"/></button>
                        </div>
                    </FormControl>
                    {errors.password && <FormMessage>{String(errors.password.message)}</FormMessage>}
                    </FormItem>
                )}
                />
                <FormField
                control={control}
                name="confirmPassword"
                render={() => (
                    <FormItem>
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl>
                        <div className="flex">
                            <Input id="confirmPassword" type="password" {...register("confirmPassword")} className="rounded-r-none" placeholder="Confirm your password"/>
                            <button type="button" className="bg-white px-1 border-y border-r hover:bg-gray-100 border-zinc-300" onClick={()=>revealPassword("confirmPassword")}><EyeOff id="eye" color="black"/></button>
                        </div>
                    </FormControl>
                    {errors.confirmPassword && <FormMessage>{String(errors.confirmPassword.message)}</FormMessage>}
                    </FormItem>
                )}
                />
                <Button type="submit" className="w-full">
                Create Account
                </Button>
            </form>
        </Form>
    )
}