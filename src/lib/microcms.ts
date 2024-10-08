import { createClient } from 'microcms-js-sdk';
import type {
	MicroCMSDate,
	MicroCMSImage,
	MicroCMSQueries,
} from 'microcms-js-sdk';

//ブログの型定義
export type Blog = {
	id: string;
	title: string;
	content: string;
	thumbnail?: MicroCMSImage;
	eyecatch?: MicroCMSImage;
} & MicroCMSDate;

export type About = {
	id: string;
	content: string;
	profileImage: MicroCMSImage;
	author: string;
	profile: string;
} & MicroCMSDate;

if (!process.env.MICROCMS_SERVICE_DOMAIN) {
	throw new Error('MICROCMS_SERVICE_DOMAIN is required');
}

if (!process.env.MICROCMS_API_KEY) {
	throw new Error('MICROCMS_API_KEY is required');
}

// API取得用のクライアントを作成
export const client = createClient({
	serviceDomain: process.env.MICROCMS_SERVICE_DOMAIN,
	apiKey: process.env.MICROCMS_API_KEY,
});

// Aboutページデータ
export const getAbout = async (queries?: MicroCMSQueries) => {
	const aboutData = await client.getList<About>({
		endpoint: 'about',
		queries,
	});
	return aboutData;
};

// ブログ一覧を取得
export const getList = async (queries?: MicroCMSQueries) => {
	const listData = await client.getList<Blog>({
		endpoint: 'blogs',
		queries,
	});

	// データの取得が目視しやすいよう明示的に遅延効果を追加
	//await new Promise((resolve) => setTimeout(resolve, 3000));

	return listData;
};

// ブログの詳細を取得
export const getDetail = async (
	contentId: string,
	queries?: MicroCMSQueries,
) => {
	const detailData = await client.getListDetail<Blog>({
		endpoint: 'blogs',
		contentId,
		queries,
	});

	// データの取得が目視しやすいよう明示的に遅延効果を追加
	//await new Promise((resolve) => setTimeout(resolve, 3000));

	return detailData;
};
