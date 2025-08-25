export interface IMenuItem {
  id: number;
  key: string;
  label: string;
  active: boolean;
  path?: string;
  name?: string;
}

export interface IHeaderProps {
  title?: string;
  menuItems?: IMenuItem[];
}
