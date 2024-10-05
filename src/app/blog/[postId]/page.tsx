import { format } from 'date-fns';
import parse from 'html-react-parser';
import Image from 'next/image';
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
		<>
			<div className="p-5 mx-auto sm:p-10 md:p-16 bg-gray-100 text-gray-800">
				<div className="flex flex-col mx-auto overflow-hidden rounded">
					{post.thumbnail ? (
						<div className="w-full h-60 sm:h-96 bg-gray-500 relative">
							<Image
								src={post.thumbnail?.url || ''}
								fill
								alt="thumbnail"
								className="object-cover"
								priority={false}
							/>
						</div>
					) : (
						''
					)}
					<div className="p-6 pb-12 m-4 mx-auto -mt-16 space-y-6 lg:max-w-screen-lg sm:px-10 sm:mx-12 lg:rounded-md bg-gray-50 relative">
						<div className="space-y-2">
							<div className="inline-block text-2xl font-semibold sm:text-3xl">
								{post.title}
							</div>
						</div>
						<div className="text-gray-800">{parse(post.content)}</div>
					</div>
				</div>
			</div>
		</>
	);
}
