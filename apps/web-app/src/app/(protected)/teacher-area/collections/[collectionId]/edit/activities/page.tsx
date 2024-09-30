import { ActivityCardOwnership, Pagination } from "@components";
import { listActivitiesForOwnerByCollectionId } from "@endpoints";
import { Router } from "@infrastructure";

const pageSize = 1;

const Page = async ({ params: { collectionId }, searchParams }) => {
  const collectionIdNumber = Number(collectionId);

  const page = Number(searchParams.page) || 0;

  const data = await listActivitiesForOwnerByCollectionId(
    page,
    pageSize,
    collectionIdNumber
  );

  console.log(data);

  return (
    <div>
      {/* criar um botão que é um client component
      ele chama a api, recebe o retorno na api e redireciona p/ a página de editar atividade
      aí o botão fica num arquivo separado pra ser um client component */}
      {data.data.map((activity) => {
        return <ActivityCardOwnership activityVersion={activity} />;
      })}
      {/* <Client data={data} /> */}
      {
        <Pagination
          currentPage={page}
          path={Router.collectionActivities(collectionIdNumber)}
          totalRowCount={data.pagination.totalCount || 0}
          pageSize={pageSize}
        />
      }
    </div>
  );
};

export default Page;
