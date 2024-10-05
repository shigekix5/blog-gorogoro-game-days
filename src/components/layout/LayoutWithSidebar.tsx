import Sidebar from '@/components/navigation/Sidebar';
import type { ReactNode } from 'react';

interface LayoutWithSidebarProps {
	children: ReactNode;
	imageUrl: string;
	title: string;
	description: string;
}

// サイドバーレイアウト
const LayoutWithSidebar = async ({
	children,
	imageUrl,
	title,
	description,
}: LayoutWithSidebarProps) => {
	return (
		<div className="mx-auto max-w-screen-lg px-2 my-10">
			<div className="grid grid-cols-1 md:grid-cols-3 gap-5">
				<div className="col-span-1 md:col-span-2">{children}</div>
				<div className="col-span-1">
					<Sidebar
						imageUrl={imageUrl}
						title={title}
						description={description}
					/>
				</div>
			</div>
		</div>
	);
};

export default LayoutWithSidebar;
