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
				<Link href="/" className="font-bold text-5xl">
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
									'border-r border-l border-white py-3 text-center w-full hover:bg-black hover:text-white',
									pathname === item.href && 'bg-black text-white',
								)}
							>
								{item.title}
							</Link>
						))}
					</div>
				</div>
			</div>
		</header>
	);
};

export default Navigation;
