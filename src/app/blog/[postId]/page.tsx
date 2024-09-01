import parse from 'html-react-parser';
import { notFound } from 'next/navigation';
import { getDetail, getList } from '../../../lib/microcms';

// 開発環境の場合はキャッシュなし
export const revalidate = process.env.development ? 0 : false;

export async function generateStaticParams() {
	const { contents } = await getList();

	const paths = contents.map((post) => {
		return {
			postId: post.id,
		};
	});

	return [...paths];
}

export default async function StaticDetailPage({
	params: { postId },
}: {
	params: { postId: string };
}) {
	const post = await getDetail(postId);

	if (!post) {
		notFound();
	}

	return (
		<div>
			<h1>{post.title}</h1>
			<h2>{post.createdAt}</h2>
			<div>{parse(post.content)}</div>
		</div>
	);
}
