import Link from "next/link";
import { useRouter } from "next/router";
import {
  LineStyle,
  Timeline,
  PermIdentity,
  Storefront,
  Category,
  ContactSupport,
} from "@material-ui/icons";

const Sidebar = () => {
  const router = useRouter();

  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Dashboard</h3>
          <ul className="sidebarList">
            <Link href="/" className="link">
              <li
                className={`sidebarListItem ${
                  router.route === "/" && "active"
                }`}
              >
                <LineStyle className="sidebarIcon" />
                Home
              </li>
            </Link>
            <li
              className={`sidebarListItem ${router.route === "#a" && "active"}`}
            >
              <Timeline className="sidebarIcon" />
              Analytics
            </li>
          </ul>
        </div>
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Manage</h3>
          <ul className="sidebarList">
            <Link href="/orders" className="link">
              <li
                className={`sidebarListItem ${
                  router.route === "/orders" && "active"
                }`}
              >
                <PermIdentity className="sidebarIcon" />
                Orders
              </li>
            </Link>
            <Link href="/products" className="link">
              <li
                className={`sidebarListItem ${
                  router.route === "/products" && "active"
                }`}
              >
                <Storefront className="sidebarIcon" />
                Products
              </li>
            </Link>
            <Link href="/categories" className="link">
              <li
                className={`sidebarListItem ${
                  router.route === "/categories" && "active"
                }`}
              >
                <Category className="sidebarIcon" />
                Categories
              </li>
            </Link>
            <Link href="/subcategories" className="link">
              <li
                className={`sidebarListItem ${
                  router.route === "/subcategories" && "active"
                }`}
              >
                <Category className="sidebarIcon" />
                SubCategories
              </li>
            </Link>
            <Link href="/contacts" className="link">
              <li
                className={`sidebarListItem ${
                  router.route === "/contacts" && "active"
                }`}
              >
                <ContactSupport className="sidebarIcon" />
                Contacts
              </li>
            </Link>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
