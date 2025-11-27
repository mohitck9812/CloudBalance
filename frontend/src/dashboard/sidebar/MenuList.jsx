import UserIcon from '../../assets/MenuList/user.svg'
import DesktopIcon from '../../assets/MenuList/desktop.svg'
import ModuleIcon from '../../assets/MenuList/module.svg'
import CostExplorer from '../../assets/MenuList/costExplorer.svg'

const MenuList = [
  {   
    id: 1,
    title: "Users",
    logo: UserIcon,
    path: '/dashboard/user',
  },
  {
    id: 2,
    title: "Dashboard Control Grid",
    logo: DesktopIcon,
    path: '/dashborad/dashboard-control-grid',
  },
  {
    id: 3,
    title: "Module Control Grid",
    logo: ModuleIcon,
    path: '/dashboard/module-control-grid',
  },
  {
    id:4,
    title: "Cost Explorer",
    logo: CostExplorer,
    path: '/dashboard/cost-explorer',

  }
];

export default MenuList;
