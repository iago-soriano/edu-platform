{
  /* <select
  className="p-3 m-1 rounded bg-surface1"
  name={"selectedCollectionId"}
  onChange={(e) => {
    const current = new URLSearchParams(Array.from(searchParams.entries()));
    const value = e.target.value.trim();
    const name = e.target.name;

    if (value === "0") {
      current.delete(name);
    } else {
      current.set(name, value);
    }

    const search = current.toString();
    const query = search ? `?${search}` : "";
    router.push(`${pathName}${query}`);
  }}
  placeholder="Selecionar coleção"
  value={searchParams.get("selectedCollectionId") || ""}
>
  <option key={0} value={0}>
    Todas
  </option>
  {collectionsQuery?.data?.isOwnerOf?.map((coll) => (
    <option key={coll.id} value={coll.id}>
      {coll.name}
    </option>
  ))}
</select>; */
}
