import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { toast } from "@/hooks/use-toast"
import axios from "axios"
import { Edit2, Trash2 } from "lucide-react"
import { useEffect, useState } from "react"

type Category = {
    categoryId : number;
    name : string;
}

export default function AdminCategory(){
    const [categoryButton, setCategoryButton] = useState("Add Category");
    const token = localStorage.getItem("adminToken");
    if (!token) {
        window.location.href = "/98456523/admin/signin";
    }

    const [categories, setCategories] = useState([] as Category[]);

    useEffect(()=>{
        getCategories();
    }, [])
    
    const getCategories = () => {
        axios.post("http://localhost:8000/api/admin/getcategories", {}, {
            headers: {
                Authorization: `${token}`
            }
        }).then((res)=>{
            if (res.status === 200) {
                console.log(res.data.categories);
                setCategories(res.data.categories);
            }
        }).catch((err)=>{
            console.log(err);
        })
    }

    const AddCategory = () => {
        let categoryName = document.getElementsByName("categoryName")[0] as HTMLInputElement;
        if (categoryButton === "Add Category") {
            setCategoryButton("Add");
            categoryName.classList.remove("hidden");
        }
        
        if (categoryButton === "Add") {
            const name = categoryName.value;
            axios.post("http://localhost:8000/api/admin/addcategory", { "name": name }, {
                headers: {
                    Authorization: `${token}`
                }
            }).then((res)=>{
                if (res.status === 200) {
                    getCategories();
                    setCategoryButton("Add Category");
                    categoryName.classList.add("hidden");
                    categoryName.value = "";
                    toast({
                        title: "Success",
                        variant: "success",
                        description: "Category added successfully",
                        duration: 5000,
                    })
                }
            }).catch((err)=>{
                console.log(err);
            })
        }
    }

    const deleteCategory = (name: string) => {
        axios.post("http://localhost:8000/api/admin/deletecategory", {"name": name}, {
            headers: {
                Authorization: `${token}`
            }
        }).then((res)=>{
            if (res.status === 200) {
                getCategories();
                toast({
                    title: "Success",
                    variant: "success",
                    description: "Category deleted successfully",
                    duration: 5000,
                })
            }
        }).catch((err)=>{
            console.log(err);
        })
        getCategories();
    }

    return (
        <div>
            <div className="flex bg-gray-100 h-16 items-center">
                <div className="text-left align-left w-1/2 text-3xl ml-4">
                    Categories
                </div>
                <div className="flex w-1/2 justify-end mr-4 items-center align-right">
                    <Input name="categoryName" className="hidden bg-white w-48 mr-2 hidden" />
                    <Button onClick={()=>AddCategory()}>{categoryButton}</Button>
                </div>
            </div>
            <Table>
                <TableHeader>
                   <TableRow>
                        <TableHead className="w-32">Category ID</TableHead>
                        <TableHead>Category Name</TableHead>
                        <TableHead className="w-32">Actions</TableHead>
                    </TableRow> 
                </TableHeader>
                <TableBody>
                    {
                        categories && categories.map((category: Category)=>{
                            return(
                                <TableRow key={category.categoryId}>
                                    <TableCell>{category.categoryId}</TableCell>
                                    <TableCell>{category.name}</TableCell>
                                    <TableCell><button onClick={()=>deleteCategory(category.name)}><Trash2 className="bg-red-400 p-1 rounded-md hover:bg-red-500" color="white" /></button></TableCell>
                                </TableRow>
                            )
                        })
                    }
                </TableBody>
            </Table>
        </div>
    )
}