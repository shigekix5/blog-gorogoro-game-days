import Loading from '@/app/loading';
import About from '@/components/about/About';
import LayoutWithSidebar from '@/components/layout/LayoutWithSidebar';
import { getAbout } from '@/lib/microcms';
import { Suspense } from 'react';

export const revalidate = process.env.development ? 0 : false;

// アバウトページ
const AboutPage = async () => {
	const about = await getAbout({
		orders: 'publishedAt',
		limit: 1,
	});
	const profileData = about.contents[0];

	return (
		<Suspense fallback={<Loading />}>
			<LayoutWithSidebar
				imageUrl={profileData.profileImage.url}
				title={profileData.author}
				description={profileData.profile}
			>
				<About content={profileData.content} />
			</LayoutWithSidebar>
		</Suspense>
	);
};

export default AboutPage;
