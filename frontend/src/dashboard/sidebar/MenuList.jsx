import UserIcon from '../../assets/MenuList/user.svg'
import DesktopIcon from '../../assets/MenuList/desktop.svg'
import ModuleIcon from '../../assets/MenuList/module.svg'
import CostExplorer from '../../assets/MenuList/costExplorer.svg'
import Onboarding from '../../assets/MenuList/onboarding.svg'

const MenuList = [
  {
    id: 1,
    title: "Users",
    logo: UserIcon,
    path: "/dashboard/user",
    allowedRoles: ["ADMIN","READ_ONLY"],
  },
  {
    id: 2,
    title: "Onboarding",
    logo: Onboarding,
    path: "/dashboard/onboarding",
    allowedRoles: ["ADMIN","READ_ONLY"],
  },
  {
    id: 3,
    title: "Cost Explorer",
    logo: CostExplorer,
    path: "/dashboard/cost-explorer",
    allowedRoles: ["ADMIN", "CUSTOMER", "READ_ONLY"],
  },
  {
    id: 4,
    title: "AWS",
    logo: DesktopIcon,
    path: "/dashboard/aws",
    allowedRoles: ["ADMIN", "CUSTOMER","READ_ONLY"],
  },
];

export default MenuList;
