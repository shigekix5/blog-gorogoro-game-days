import { Button } from '@/components/ui/button';
import { format } from 'date-fns';
import { JSDOM } from 'jsdom';
import Image from 'next/image';
import Link from 'next/link';
import { getList } from '../lib/microcms';

// 開発環境の場合はキャッシュなし
export const revalidate = process.env.development ? 0 : false;

export default async function StaticPage() {
	const { contents } = await getList();

	if (!contents || contents.length === 0) {
		return <h1>No contents</h1>;
	}

	// HTMLからテキストのみを取得
	const getTextFromHTML = (htmlText: string) => {
		const root = new JSDOM(htmlText);
		return root.window.document.getElementsByTagName('html')[0].textContent;
	};

	// 最新のコンテンツを1つ抜き出す
	const firstContents = contents.shift();

	return (
		<div>
			{/*
			<h1 className="mt-4 text-6xl font-bold leading-tight text-black sm:text-7xl">
				Gorogoro Game Days
			</h1>
			*/}
			<section className="bg-gray-100 text-gray-800">
				<div className="container py-6 mx-auto max-w-screen-lg space-y-6 sm:space-y-12">
					<Link href={`/blog/${firstContents?.id}`}>
						{/* 1つめの記事 */}
						<div className="block max-w-sm gap-3 mx-auto sm:max-w-full group hover:no-underline focus:no-underline lg:grid lg:grid-cols-12 bg-gray-50">
							<Image
								alt={firstContents?.title || ''}
								src={firstContents?.thumbnail?.url || ''}
								height={500}
								width={500}
								className="object-cover w-full h-64 rounded sm:h-96 lg:col-span-7 bg-gray-500"
								priority={true}
							/>
							<div className="p-6 space-y-2 lg:col-span-5">
								<h3 className="text-2xl font-semibold sm:text-4xl group-hover:underline group-focus:underline">
									{firstContents?.title}
								</h3>
								<span className="text-xs text-gray-600">
									{format(
										new Date(firstContents?.createdAt || ''),
										'yyy/MM/dd',
									)}
								</span>
								<div className="break-words">
									{getTextFromHTML(firstContents?.content || '')}
								</div>
							</div>
						</div>
					</Link>
					<div className="grid justify-center grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:max-w-fit">
						<ul>
							{contents.map((post) => {
								return (
									<li key={post.id}>
										<Link href={`/blog/${post.id}`}>
											<div className="max-w-sm mx-auto group hover:no-underline focus:no-underline bg-gray-50">
												<Image
													alt={firstContents?.title || ''}
													src={firstContents?.thumbnail?.url || ''}
													height={500}
													width={500}
													className="object-cover w-full rounded h-44 bg-gray-500"
													role="presentation"
													priority={true}
												/>
												<div className="p-6 space-y-2">
													<h3 className="text-2xl font-semibold group-hover:underline group-focus:underline">
														{post.title}
													</h3>
													<span className="text-xs text-gray-600">
														{format(
															new Date(post?.createdAt || ''),
															'yyy/MM/dd',
														)}
													</span>
													<div className="break-words h-fit-content overflow-hidden line-clamp-4">
														{getTextFromHTML(post.content)}
													</div>
												</div>
											</div>
										</Link>
									</li>
								);
							})}
						</ul>
					</div>
					<div className="flex justify-center">
						<Button>Load more posts...</Button>
					</div>
				</div>
			</section>
		</div>
	);
}
