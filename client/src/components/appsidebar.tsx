import { LayoutDashboard, PackageSearch, Users } from "lucide-react"
import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "./ui/sidebar"


const items = [
    {
        title: 'Dashboard',
        icon: LayoutDashboard,
        url: '/98456523/admin/dashboard'
    },
    {
        title: 'Users',
        icon: Users,
        url: '/98456523/admin/users'
    },
    {
        title: 'Products',
        icon: PackageSearch,
        url: '/98456523/admin/products'
    },
]

export default function AppSidebar() {
    return (
        <>
            <Sidebar>
                <SidebarContent>
                    <SidebarGroup>
                        <SidebarGroupLabel>
                            Admin
                        </SidebarGroupLabel>
                        <SidebarGroupContent>
                            <SidebarMenu>
                                {items.map((item)=>(
                                    <SidebarMenuItem key={item.title}>
                                        <SidebarMenuButton asChild>
                                            <a href={item.url}>
                                                <item.icon />
                                                <span>{item.title}</span>
                                            </a>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                ))}
                            </SidebarMenu>
                        </SidebarGroupContent>
                    </SidebarGroup>
                </SidebarContent>
            </Sidebar>
        </>
    )
}