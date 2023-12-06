import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Envelope,
  Question,
  Eye,
  EyeSlash,
  Check,
  Pencil,
  CaretDown,
} from "@phosphor-icons/react";
import {
  faTimes,
  faAngleRight,
  faAngleDown,
  faGlobe,
  faSearch,
  faHourglassHalf,
  faPlus,
  faList,
  faUserPlus,
  faFolderOpen,
  faStar,
  faArrowRightFromBracket,
  faUser,
} from "@fortawesome/free-solid-svg-icons";

export const Icons = {
  CLOSE: () => <FontAwesomeIcon icon={faTimes} />,
  DELETE: () => (
    // <div style={{ padding: "5px" }}>
    <FontAwesomeIcon icon={faTimes} />
    // </div>
  ),
  EDIT: (props) => <Pencil {...props} />,
  CAN_SEE: () => <Eye size={24} />,
  CANT_SEE: () => <EyeSlash size={24} />,
  CHEVRON_RIGHT: ({ onClick }: any) => {
    return <FontAwesomeIcon icon={faAngleRight} onClick={onClick} />;
  },
  CARET_DOWN: (props) => <CaretDown {...props} />,
  QUESTION_CIRCLE: (props) => <Question size={20} {...props} />,
  GLOBE: () => <FontAwesomeIcon icon={faGlobe} />,
  SEARCH: () => <FontAwesomeIcon icon={faSearch} />,
  CHECK: (props) => <Check {...props} />,
  IN_PROGRESS: () => <FontAwesomeIcon icon={faHourglassHalf} />,
  PLUS: () => <FontAwesomeIcon icon={faPlus} />,
  LIST: () => <FontAwesomeIcon icon={faList} />,
  USER_PLUS: () => <FontAwesomeIcon icon={faUserPlus} />,
  FOLDER: () => <FontAwesomeIcon icon={faFolderOpen} />,
  STAR: () => <FontAwesomeIcon icon={faStar} />,
  EXIT: (props) => (
    <FontAwesomeIcon icon={faArrowRightFromBracket} {...props} />
  ),
  USER: () => <FontAwesomeIcon icon={faUser} />,
  EMAIL: (props) => <Envelope {...props} />,
  // EMPTY_HEART: () => <FaRegHeart />,
  // FULL_HEART: () => <FaHeart />,
};
