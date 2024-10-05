'use client';
import parse from 'html-react-parser';

interface AboutProps {
	content: string;
}

// アバウト
const About = ({ content }: AboutProps) => {
	return <div>{parse(content)}</div>;
};

export default About;
