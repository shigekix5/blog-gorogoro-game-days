'use client';

import { cn } from '@/lib/utils';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const items = [
	{
		title: 'HOME',
		href: '/',
	},
	{
		title: 'ABOUT',
		href: '/about',
	},
];

// ナビゲーション
const Navigation = () => {
	const pathname = usePathname();

	return (
		<header>
			<div className="mx-auto max-w-screen-lg py-8">
				<Link href="/" className="font-bold text-5xl ">
					Gorogoro Game Days
				</Link>
			</div>

			<div className="bg-gray-100">
				<div className="mx-auto max-w-screen-lg">
					<div className="flex items-center justify-between text-sm font-bold">
						{items.map((item) => (
							<Link
								key={item.href}
								href={item.href}
								className={cn(
									'border-r border-l border-white py-3 text-center w-full  group relative inline-flex items-center justify-center overflow-hidden hover:text-white',
									pathname === item.href &&
										'bg-gradient-to-r from-cyan-500 to-blue-500 text-white',
								)}
							>
								<span className="duration-400 ease absolute left-0 top-1/2 block h-0 w-full opacity-100 transition-all group-hover:top-0 group-hover:h-full bg-gradient-to-r from-cyan-500 to-blue-500" />
								<span className="ease absolute right-0 flex h-10 w-10 translate-x-full transform items-center justify-start duration-500 group-hover:-translate-x-2">
									<svg
										role="img"
										aria-label="button"
										className="h-5 w-5"
										fill="none"
										stroke="currentColor"
										viewBox="0 0 24 24"
										xmlns="http://www.w3.org/2000/svg"
									>
										<title />
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth="2"
											d="M14 5l7 7m0 0l-7 7m7-7H3"
										/>
									</svg>
								</span>
								<span className="relative transform duration-700 group-hover:-translate-x-3">
									{item.title}
								</span>
							</Link>
						))}
					</div>
				</div>
			</div>
		</header>
	);
};

export default Navigation;
