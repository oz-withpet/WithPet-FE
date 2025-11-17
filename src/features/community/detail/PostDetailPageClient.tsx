import PostDetailShell from "./PostDetailShell";
import { usePostDetailQuery } from "../api/usePostDetailQuery";

type Props = { id: string };

export default function PostDetailPageClient({ id }: Props) {
  const { data, isLoading, isError } = usePostDetailQuery({ id, comments_limit: 20 });

  if (isLoading) {
    return <div className="mx-auto w-main py-8">게시글을 불러오는 중입니다...</div>;
  }

  if (isError || !data) {
    return <div className="mx-auto w-main py-8">게시글을 불러오지 못했습니다.</div>;
  }

  return <PostDetailShell {...data.post} />;
}
