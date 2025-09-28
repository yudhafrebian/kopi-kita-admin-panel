import { useLocation } from "react-router-dom";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "../ui/breadcrumb";

const DynamicBreadcrumb = () => {
  const location = useLocation();
  const pageName = location.pathname ? 
    (location.pathname.split("/").pop()?.split("-").join(" ") || "").charAt(0).toUpperCase() + 
    (location.pathname.split("/").pop()?.split("-").join(" ") || "").slice(1) : 
    "UNKNOWN";

  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink>Home</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage>{pageName}</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  )
};

export default DynamicBreadcrumb;
