import { ButtonWithDropdown } from "@components";
import { Icons } from "@components";
import {
  useGetActivityVersionQuery,
  useSaveContentMutation,
} from "@infrastructure";
import { useParams } from "next/navigation";

export const InsertButtons = () => {
  // const saveContentMutation = useSaveContentMutation({ activityId, versionId });
  const params = useParams();
  const activityId = Number(params.activityId as string);
  const versionId = Number(params.versionId as string);
  return (
    <div className="flex flex-row p-2 justify-around">
      <ButtonWithDropdown>
        <ButtonWithDropdown.Text>
          Novo conteúdo <Icons.CARET_DOWN size={28} className="pl-1" />
        </ButtonWithDropdown.Text>
        <ButtonWithDropdown.DrawerItem>Texto</ButtonWithDropdown.DrawerItem>
        <ButtonWithDropdown.DrawerItem>Vídeo</ButtonWithDropdown.DrawerItem>
        <ButtonWithDropdown.DrawerItem>Imagem</ButtonWithDropdown.DrawerItem>
        <ButtonWithDropdown.DrawerItem>Audio</ButtonWithDropdown.DrawerItem>
      </ButtonWithDropdown>
      <ButtonWithDropdown>
        <ButtonWithDropdown.Text>
          Nova pergunta <Icons.CARET_DOWN size={28} className="pl-1" />
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
