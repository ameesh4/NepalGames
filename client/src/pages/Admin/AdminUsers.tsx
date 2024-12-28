import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import axios from "axios";
import { Edit2, Search, Trash2, } from "lucide-react";
import { useEffect, useState } from "react";

type Users = {
    userId: number;
    name: string;
    email: string;
    age: number;
}

export default function AdminUsers() {
    const token = localStorage.getItem("adminToken");
    if (!token) {
        window.location.href = "/98456523/admin/signin";
    }

    const [users, setUsers] = useState([] as Users[]);

    const header = {
        headers: {
            Authorization: `${token}`
        }
    }

    useEffect(()=>{
        getUser();
    }, [])

    const getUser = () => {
        axios.post("http://localhost:8000/api/admin/getusers", {}, header).then((res)=>{
            if (res.status === 200) {
                setUsers(res.data.users);
            }
        }).catch((err)=>{
            console.log(err);
        })
    }

    const removeUser = (userId: number) => {
        axios.post("http://localhost:8000/api/admin/deleteuser", { "userId": userId }, header).then((res)=>{
            if (res.status === 200) {
                getUser();
            }
        }).catch((err)=>{
            console.log(err);
        })
    }

    const searchUser = (query: string) => {
        axios.post("http://localhost:8000/api/admin/searchuser", { "query": query }, header).then((res)=>{
            if (res.status === 200) {
                setUsers(res.data.users);
            }
        }).catch((err)=>{
            console.log(err);
        })
    }
    
    
    return (
        <div>
            <div className="flex bg-gray-100 h-16 items-center">
                <div className="text-left align-left w-1/2 text-3xl ml-4">
                    Users
                </div>
                <div className="flex w-1/2 justify-end mr-4 items-center align-right">
                    <Input className="w-52 rounded-r-none border-none bg-white" onBlur={(e)=>searchUser(e.target.value)}></Input>
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
                        <TableHead>Email</TableHead>
                        <TableHead>Age</TableHead> 
                        <TableHead className="w-32">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {users && users.map((user: Users)=>{
                        return (
                            <TableRow key={user.userId}>
                                <TableCell>{user.userId}</TableCell>
                                <TableCell>{user.name}</TableCell>
                                <TableCell>{user.email}</TableCell>
                                <TableCell>{user.age}</TableCell>
                                <TableCell>
                                    <button className="mr-2">
                                        <Edit2 className="bg-blue-400 p-1 rounded-md hover:bg-blue-500" color="white" />
                                    </button>
                                    <button 
                                    onClick={()=>removeUser(user.userId)}>
                                        <Trash2 className="bg-red-400 p-1 rounded-md hover:bg-red-500" color="white" />
                                    </button>
                                </TableCell>
                            </TableRow>
                        )
                    })}
                </TableBody>
            </Table>
        </div>
    )
}