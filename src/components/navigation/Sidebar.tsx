'use client';

import Image from 'next/image';
import Link from 'next/link';

interface sideBarProps {
	imageUrl: string;
	title: string;
	description: string;
}

// サイドバー
const Sidebar = ({ imageUrl, title, description }: sideBarProps) => {
	return (
		<div className="space-y-10">
			<div className="border flex flex-col items-center justify-center p-5 space-y-5">
				<Link href="/about">
					<Image
						src={imageUrl}
						width={120}
						height={120}
						alt="avatar"
						className="rounded-full"
						priority={false}
					/>
				</Link>
				<div className="font-bold text-xl">{title}</div>
				<div className="text-sm">{description}</div>
			</div>
		</div>
	);
};

export default Sidebar;
