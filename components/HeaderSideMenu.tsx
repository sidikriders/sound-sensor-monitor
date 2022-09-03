import styles from "../styles/SideMenu.module.css";
import { IconLinks } from "./Header";

const HeaderSideMenu = (props: { active: boolean; onClose: () => void }) => {
  return (
    <div
      className={styles.container + (props.active ? ` ${styles.active}` : "")}
    >
      <div className={styles.menuContainer}>
        <ul className={styles.menuLinkContainer}>
          <li onClick={props.onClose} className={styles.menuLink}>
            <span>Dashboard</span>
          </li>
          <li
            onClick={props.onClose}
            className={styles.menuLink + " " + styles.active}
          >
            <span>Alerts</span>
          </li>
        </ul>
        <div className={styles.iconLinks}>
          <IconLinks />
        </div>
      </div>

      {props.active && (
        <div className={styles.shadow} onClick={props.onClose}></div>
      )}
    </div>
  );
};

export default HeaderSideMenu;
