import {
  FaMehRollingEyes,
  FaStarOfDavid,
  FaCanadianMapleLeaf,
  FaCodepen,
  FaFeatherAlt,
} from "react-icons/fa";

export const DATE_FORMAT = "YYYY-MM-DD";
export const USER_DETAIL = "ROMAND_USER";

export const categories = [
  { id: 1, name: "Comedy", icon: FaMehRollingEyes },
  { id: 2, name: "Sci-fi", icon: FaCodepen },
  { id: 3, name: "Romance", icon: FaCanadianMapleLeaf },
  { id: 4, name: "Fantasy", icon: FaStarOfDavid },
  { id: 5, name: "Poetry", icon: FaFeatherAlt },
];
export const REGEX_PASSWORD =
  /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&^_-]{8,}$/;
export const REGEX_EMAIL =
  /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
export const REGEX_PHONE =
  /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;

export const ADDRESS_TAG_COLOR = {
  Home: "blue",
  Office: "purple",
  Other: "volcano",
};

export const ORDER_STATUS = [
  {
    id: 0,
    value: "All",
    desc: "",
  },
  {
    id: 1,
    value: "Processing",
    desc: "Order is processed",
  },
  {
    id: 2,
    value: "Delivering",
    desc: "Your order is on the way",
  },
  {
    id: 3,
    value: "Completed",
    desc: "Order completed",
  },
  {
    id: 4,
    value: "Cancelled",
    desc: "Order canceled",
  },
];
