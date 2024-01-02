import { Icons, ButtonWithDropdown } from "@components";
import {
  useGetActivityVersionQuery,
  useSaveContentMutation,
} from "@infrastructure";
import { useParams } from "next/navigation";

export const InsertButtons = ({ order }) => {
  const params = useParams();
  const activityId = params.activityId as string;
  const versionId = params.versionId as string;

  const saveContentMutation = useSaveContentMutation({ activityId, versionId });

  const classes = "flex bg-accent p-2 text-white rounded hover:bg-opacity-90";

  return (
    <div className="flex flex-row p-2 justify-around">
      <ButtonWithDropdown up right>
        <ButtonWithDropdown.Text className={classes}>
          Novo conteúdo <Icons.CARET_UP size={28} className="pl-1" />
        </ButtonWithDropdown.Text>
        <ButtonWithDropdown.DrawerItem
          onClick={() =>
            saveContentMutation.mutate({ type: "Text", payload: {}, order })
          }
        >
          Texto
        </ButtonWithDropdown.DrawerItem>
        <ButtonWithDropdown.DrawerItem
          onClick={() =>
            saveContentMutation.mutate({
              type: "Video",
              payload: { tracks: "" },
              order,
            })
          }
        >
          Vídeo
        </ButtonWithDropdown.DrawerItem>
        <ButtonWithDropdown.DrawerItem
          onClick={() =>
            saveContentMutation.mutate({ type: "Image", payload: {}, order })
          }
        >
          Imagem
        </ButtonWithDropdown.DrawerItem>
      </ButtonWithDropdown>
      <ButtonWithDropdown up right>
        <ButtonWithDropdown.Text className={classes}>
          Nova pergunta <Icons.CARET_UP size={28} className="pl-1" />
        </ButtonWithDropdown.Text>
        <ButtonWithDropdown.DrawerItem>
          Dissertativa
        </ButtonWithDropdown.DrawerItem>
        <ButtonWithDropdown.DrawerItem>
          Múltipla escolha
        </ButtonWithDropdown.DrawerItem>
      </ButtonWithDropdown>
    </div>
  );
};
