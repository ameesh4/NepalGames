import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const orders = [
  {
    id: "ORD-001",
    date: "2024-03-20",
    status: "Delivered",
    total: "$299.00",
    items: 2
  },
  {
    id: "ORD-002",
    date: "2024-03-15",
    status: "In Transit",
    total: "$159.00",
    items: 1
  },
  {
    id: "ORD-003",
    date: "2024-03-10",
    status: "Delivered",
    total: "$488.00",
    items: 3
  }
];

export function OrderHistory() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Order History</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {orders.map((order) => (
            <div
              key={order.id}
              className="flex items-center justify-between p-4 border rounded-lg"
            >
              <div className="space-y-1">
                <p className="font-medium">{order.id}</p>
                <p className="text-sm text-muted-foreground">{order.date}</p>
              </div>
              <div className="text-right space-y-1">
                <Badge variant={order.status === "Delivered" ? "default" : "secondary"}>
                  {order.status}
                </Badge>
                <p className="font-medium">{order.total}</p>
                <p className="text-sm text-muted-foreground">{order.items} items</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}