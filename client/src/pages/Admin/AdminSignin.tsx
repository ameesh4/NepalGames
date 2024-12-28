import { Button } from "@/components/ui/button";
import { Form, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { EyeOff } from "lucide-react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";

const schema: z.Schema = z.object({
    email: z.string().min(3, { message: "Email must be at least 3 characters long" }),
    password: z.string().min(6, { message: "Password must be at least 6 characters long" }),
});
 
export default function AdminSignin() {
    const token = localStorage.getItem("adminToken");
    if (token && token != "undefined") {
        window.location.href = "/98456523/admin";
    }

    const methods = useForm<z.infer<typeof schema>>({
        resolver: zodResolver(schema),
        defaultValues: {
            email: "",
            password: "",
        }
    });

    const { register, handleSubmit, formState: { errors }, control } = methods;

    const onSubmit: SubmitHandler<z.infer<typeof schema>> = (data) => {
        let request = {
            email: data.email,
            password: data.password,
        }
        console.log(request);

        axios.post("http://localhost:8000/api/admin/login", request).then((res)=>{
            console.log(res);
            if (res.status === 200) {
                toast({
                    title: "Success",
                    description: "Sign in successful",
                    variant: "success",
                    duration: 5000,
                })
                localStorage.removeItem("token")
                localStorage.setItem("adminToken", res.data.token);
                window.location.href = "/98456523/admin";
            }
        }).catch((err)=>{
            toast({
                title: "Error",
                variant: "destructive",
                description: err.response.data.message,
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
        <div className="flex justify-center items-center min-h-screen">
            <div className="w-96 h-full shadow-xl rounded-lg">
                <div className="m-8">
                    <h1 className="text-3xl font-bold mb-2">Admin</h1>
                    <Form {...methods}>
                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-2">
                            <FormField
                                name="email"
                                control={control}
                                render={() => (
                                    <FormItem>
                                        <FormLabel>
                                            Name
                                        </FormLabel>
                                        <Input id="email" {...register("email")} />
                                        {errors.email && <FormMessage>{String(errors.email.message)}</FormMessage>}
                                    </FormItem>    
                            )} />
                            <FormField
                                name="password"
                                control={control}
                                render={() => (
                                    <FormItem>
                                        <FormLabel>
                                            Password
                                        </FormLabel>
                                        <div className="flex">
                                            <Input id="password" type="password" {...register("password")} className="rounded-r-none"/>
                                            <button type="button" className="bg-white px-1 border-y border-r hover:bg-gray-100 border-zinc-300" onClick={revealPassword}><EyeOff id="eye" color="black"/></button>
                                        </div>
                                        {errors.password && <FormMessage>{String(errors.password.message)}</FormMessage>}
                                    </FormItem>
                            )} />
                            <Button className="" type="submit">Submit</Button>
                        </form>
                    </Form>
                    <a href="/signup" className="underline underline-offset-2 text-sm mt-8">Don't have an account?</a>
                </div>
            </div>
        </div>
    )
}