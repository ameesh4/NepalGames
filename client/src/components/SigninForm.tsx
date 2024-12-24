import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "./ui/form";
import { Input } from "./ui/input";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "./ui/button";
import { toast } from "@/hooks/use-toast";
import axios from "axios";
import { EyeOff } from "lucide-react";

const schema: z.Schema = z.object({
    email: z.string().email({ message: "Invalid email address" }),
    password: z.string().min(6, { message: "Password must be at least 6 characters long" }),
})


export default function SigninForm() {
    const methods = useForm<z.infer<typeof schema>>({
        resolver: zodResolver(schema),
    });


    const { register, handleSubmit, formState: { errors }, control } = methods;

    const onSubmit: SubmitHandler<z.infer<typeof schema>> = (data) => {
        let request = {
            email: data.email,
            password: data.password,
        }
        console.log(request);

        axios.post("http://localhost:8000/api/login", request).then((res)=>{
            if (res.status === 200) {
                toast({
                    title: "Success",
                    variant: "success",
                    description: "Sign in successful",
                    duration: 5000,
                })
                localStorage.setItem("token", res.data.token);
            }
            window.location.href = "/";
        }).catch((err)=>{
            toast({
                title: "Error",
                variant: "destructive",
                description: err.response.data.error,
                duration: 5000,
            })
        })
    }

    const revealPassword = () => {
        let password = document.getElementById("password") as HTMLInputElement;
        if (password.type === "password") {
            password.type = "text";
        } else {
            password.type = "password";
        }

        let eye = document.getElementById("eye") as HTMLButtonElement;
        if (eye.firstChild?.nodeValue === "EyeOff") {
            eye.firstChild.nodeValue = "Eye";
        }
        
        if (eye.firstChild?.nodeValue === "Eye") {
            eye.firstChild.nodeValue = "EyeOff";
        }
    }
    
    return (
        <>
            <Form {...methods}>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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
                    name="password"
                    render={() => (
                        <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                            <div className="flex">
                                <Input id="password" type="password" {...register("password")} className="rounded-r-none" placeholder="Enter your Password"/>
                                <button type="button" className="bg-white px-1 border-y border-r hover:bg-gray-100 border-zinc-300" onClick={()=>revealPassword()}><EyeOff id="eye" color="black"/></button>
                            </div>
                        </FormControl>
                        {errors.password && <FormMessage>{String(errors.password.message)}</FormMessage>}
                        </FormItem>
                    )}
                    />
                    <Button type="submit" className="w-full">
                    Log In
                    </Button>
                </form>
            </Form>
        </>
    )
}