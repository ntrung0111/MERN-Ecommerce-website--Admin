import { NotificationsNone } from "@material-ui/icons";

const Topbar = () => {
  return (
    <div className="topbar">
      <div className="topbarWrapper">
        <div className="topLeft">
          <span className="logo">Koikko Vercel - Admin Dashboard</span>
        </div>
        <div className="topRight">
          <div className="topbarIconContainer">
            <NotificationsNone />
            <span className="topIconBadge">2</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Topbar;
