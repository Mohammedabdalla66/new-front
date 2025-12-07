// Type shims for JS-based UI components to fix TypeScript import errors
declare module '../components/ui/card' {
  export const Card: any;
  export const CardContent: any;
  export const CardHeader: any;
  export const CardTitle: any;
}

declare module '../components/ui/button' {
  export const Button: any;
}

declare module '../components/ui/input' {
  export const Input: any;
}

declare module '../components/ui/badge' {
  export const Badge: any;
}

declare module '../components/ui/select' {
  export const Select: any;
  export const SelectContent: any;
  export const SelectItem: any;
  export const SelectTrigger: any;
  export const SelectValue: any;
}

declare module '../components/ui/table' {
  export const Table: any;
  export const TableBody: any;
  export const TableCell: any;
  export const TableHead: any;
  export const TableHeader: any;
  export const TableRow: any;
}

declare module '../components/ui/dialog' {
  export const Dialog: any;
  export const DialogContent: any;
  export const DialogHeader: any;
  export const DialogTitle: any;
  export const DialogDescription: any;
}

declare module '../components/ui/alert-dialog' {
  const AlertDialog: any;
  export default AlertDialog;
}

declare module '../components/ui/toast' {
  const Toast: any;
  export default Toast;
}

declare module '../components/Layout/Navbar' {
  const Navbar: any;
  export default Navbar;
}

declare module '../components/Layout/Sidebar' {
  const Sidebar: any;
  export default Sidebar;
}

declare module '../components/Layout/Sidebar.jsx' {
  const Sidebar: any;
  export default Sidebar;
}

// Dashboard components
declare module '../components/dashboard/StatsCard' {
  const StatsCard: any;
  export default StatsCard;
}

declare module '../components/dashboard/RevenueChart' {
  const RevenueChart: any;
  export default RevenueChart;
}

declare module '../components/dashboard/ServicePie' {
  const ServicePie: any;
  export default ServicePie;
}

declare module '../components/dashboard/RecentActivity' {
  const RecentActivity: any;
  export default RecentActivity;
}

declare module '../components/dashboard/PendingList' {
  const PendingList: any;
  export default PendingList;
}

// Redux store and features
declare module '../features/dashboard/dashboardSlice' {
  export const fetchDashboard: any;
  export const fetchRecentActivity: any;
  export const fetchPendingItems: any;
  export const selectDashboardStats: any;
  export const selectRevenueSeries: any;
  export const selectRequestsByService: any;
  export const selectRecentActivity: any;
  export const selectPendingItems: any;
  export const selectDashboardLoading: any;
  export const selectDashboardError: any;
}
