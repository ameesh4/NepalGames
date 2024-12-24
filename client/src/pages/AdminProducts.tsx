import DialogWrapper from "@/components/dialogWrapper";
import ProductForm from "@/components/ProductForm";
import { Input } from "@/components/ui/input";
import { TableHead, TableHeader, TableRow, Table, TableBody, TableCell } from "@/components/ui/table";
import { ClipboardPlus, Edit2, Search, Trash2 } from "lucide-react";

export default function AdminProducts() {
    const products = [
        {
            "productId": 1,
            "name": "Product 1",
            "description": "Description 1",
            "price": 100,
            "quantity": 10,
            "picture": "https://via.placeholder.com/150",
            "category": "Category 1"
        },
        {
            "productId": 2,
            "name": "Product 2",
            "description": "Description 2",
            "price": 200,
            "quantity": 20,
            "picture": "https://via.placeholder.com/150",
            "category": "Category 2"
        },
        {
            "productId": 3,
            "name": "Product 3",
            "description": "Description 3",
            "price": 300,
            "quantity": 30,
            "picture": "https://via.placeholder.com/150",
            "category": "Category 3"
        },
        {
            "productId": 4,
            "name": "Product 4",
            "description": "Description 4",
            "price": 400,
            "quantity": 40,
            "picture": "https://via.placeholder.com/150",
            "category": "Category 4"
        },
        {
            "productId": 5,
            "name": "Product 5",
            "description": "Description 5",
            "price": 500,
            "quantity": 50,
            "picture": "https://via.placeholder.com/150",
            "category": "Category 5"
        }
    ]
    
    const searchProduct = (query: string) => {
        console.log(query);
    }

    return (
        <div>
            <div className="flex bg-gray-100 h-16 items-center">
                <div className="text-left align-left w-1/2 text-3xl ml-4">
                    Products
                </div>
                <div className="flex w-1/2 justify-end mr-4 items-center align-right">
                    <DialogWrapper 
                        trigger={<button className="flex items-center bg-black text-white px-4 py-2 text-sm rounded-full hover:bg-white hover:text-black mr-4"><ClipboardPlus className="sm:mr-2" />Add Product</button>}
                        title="Add Product"
                        content={<ProductForm />}
                    />
                    <Input className="w-52 rounded-r-none border-none bg-white" onBlur={(e)=>searchProduct(e.target.value)}></Input>
                    <div className="flex border-2 border-white h-9 items-center hover:bg-white rounded-r-md">
                        <Search className="mx-2" />
                    </div>
                </div>
            </div>
            <Table>
                <TableHeader>
                   <TableRow>
                        <TableHead className="w-32">ID</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Description</TableHead>
                        <TableHead>Price</TableHead>
                        <TableHead>Quantity</TableHead>
                        <TableHead>Picture</TableHead>
                        <TableHead>Category</TableHead>
                        <TableHead className="w-32">Actions</TableHead>
                    </TableRow> 
                </TableHeader>
                <TableBody>
                    {
                        products && products.map((product)=>{
                            return(
                                <TableRow key={product.productId}>
                                    <TableCell>{product.productId}</TableCell>
                                    <TableCell>{product.name}</TableCell>
                                    <TableCell>{product.description}</TableCell>
                                    <TableCell>{product.price}</TableCell>
                                    <TableCell>{product.quantity}</TableCell>
                                    <TableCell><img src={product.picture} alt={product.name} className="w-10 h-10" /></TableCell>
                                    <TableCell>{product.category}</TableCell>
                                    <TableCell><button className="mr-2"><Edit2 className="bg-blue-400 p-1 rounded-md hover:bg-blue-500" color="white" /></button><button><Trash2 className="bg-red-400 p-1 rounded-md hover:bg-red-500" color="white" /></button></TableCell>
                                </TableRow>
                            )
                        })
                    }
                </TableBody>
            </Table>
        </div>
    )
}