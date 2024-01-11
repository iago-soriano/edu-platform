import {
  Envelope,
  Question,
  Eye,
  EyeSlash,
  Check,
  PencilLine,
  CaretDown,
  CaretUp,
  Trash,
  DotsThreeVertical,
  SignOut,
  User,
  X,
  Plus,
  List,
  ArrowFatLinesUp,
  Play,
} from "@phosphor-icons/react";

export const Icons = {
  EDIT: (props) => <PencilLine {...props} />,
  CAN_SEE: (props) => <Eye {...props} size={props.size || 24} />,
  CANT_SEE: () => <EyeSlash size={24} />,
  CARET_DOWN: (props) => <CaretDown {...props} />,
  CARET_UP: (props) => <CaretUp {...props} />,
  QUESTION_CIRCLE: (props) => <Question size={20} {...props} />,
  CHECK: (props) => <Check {...props} />,
  EMAIL: (props) => <Envelope {...props} />,
  TRASH: (props) => <Trash {...props} />,
  SIGN_OUT: (props) => <SignOut {...props} />,
  USER: (props) => <User {...props} />,
  THREE_DOTS: (props) => <DotsThreeVertical {...props} />,
  X: (props) => <X {...props} />,
  PLUS: (props) => <Plus {...props} />,
  LIST: (props) => <List {...props} />,
  PUBLISH: (props) => <ArrowFatLinesUp {...props} />,
  PLAY: (props) => <Play {...props} />,
};
