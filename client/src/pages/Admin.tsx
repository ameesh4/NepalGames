

export default function Admin(){
    const token = localStorage.getItem("adminToken");
    if (!token) {
        window.location.href = "/98456523/admin/signin";
    }
    
    return (
        <div>
            <h1>Admin</h1>
        </div>
    )
}