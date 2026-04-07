import { useParams } from "react-router-dom";
import { Main } from "../components/listing/detail/Main";

export function ListingDetailPage() {
  const { uuid } = useParams<{ uuid: string }>();

  if (!uuid) return null;

  return <Main uuid={uuid} />;
}
