import { useParams } from "react-router-dom";
import { Main } from "../components/listing/assets/Main";

export function ListingAssetsPage() {
  const { uuid } = useParams<{ uuid: string }>();

  if (!uuid) return null;

  return <Main key={uuid} uuid={uuid} />;
}
