import Image from "next/image";
import Style from "../styles/MainHeader.module.css";

const MainHeader = () => {
  return (
    <div className={Style["main-header"]}>
      <div className={Style["content-container"]}>
        <div className="left">
          <Image
            src="/GroundUp.png"
            alt="GroundUp Logo"
            width={164}
            height={25}
            style={{ marginRight: 15 }}
          />
          <ul className={Style["menu-list"]}>
            <li>
              <span>Dashboard</span>
            </li>
            <li className={Style["active"]}>
              <span>Alerts</span>
            </li>
          </ul>
        </div>
        <div className="right">
          <div className={Style["user-name"]}>
            <span>Welcome Admin!</span>
          </div>
          <ul className={Style["menu-icon-list"]}>
            <li>
              <div className={Style["icon-container"]}>
                <p className={Style.counter}>3</p>
                <Image
                  src="/icons/icon-notification.png"
                  alt="icon-notification"
                  width={20}
                  height={20}
                  objectFit="contain"
                />
              </div>
            </li>
            <li>
              <div className={Style["icon-container"]}>
                <Image
                  src="/icons/icon-user.png"
                  alt="icon-user"
                  width={20}
                  height={20}
                  objectFit="contain"
                />
              </div>
            </li>
            <li>
              <div className={Style["icon-container"]}>
                <Image
                  src="/icons/icon-gear.png"
                  alt="icon-gear"
                  width={20}
                  height={20}
                  objectFit="contain"
                />
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default MainHeader;
