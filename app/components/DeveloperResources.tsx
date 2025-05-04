'use client';

import { ArrowUpRight } from 'react-feather';

export function DeveloperResources() {
    return (
        <div className="">
            <div className="">

                <div className="w-full grid grid-cols-3 gap-3">
                    <div className="px-4 py-4 bg-white rounded-xl">
                        <a href="https://trunk.com/" target="_blank" rel="noreferrer" className="text-black hover:text-blue-300 flex justify-between">
                            Website
                            <ArrowUpRight className="opacity-30"/>
                        </a>
                    </div>
                    <div className="px-4 py-4 bg-white rounded-xl">
                        <a href="https://docs.trunk.com/" target="_blank" rel="noreferrer" className="text-black hover:text-blue-300 flex justify-between">
                            Docs
                            <ArrowUpRight className="opacity-30"/>
                        </a>
                    </div>
                    <div className="px-4 py-4 bg-white rounded-xl">
                        <a href="https://x.com/trunk_ai" target="_blank" rel="noreferrer" className="text-black hover:text-blue-300 flex justify-between">
                            Twitter
                            <ArrowUpRight className="opacity-30"/>
                        </a>
                    </div>

                </div>
            </div>
        </div>
    );
}

function ResourceCard({
    title,
    description,
    image,
    link,
    imageBackground,
}: {
    title: string;
    description: string;
    image: string;
    imageBackground?: string;
    link: string;
}) {
    return (
        <div className="flex flex-col" style={{ height: '200px', width: '250px' }}>
            <div className="w-full mb-3">
                <a href={link} target="_blank" rel="noopener noreferrer" className="hover:cursor-pointer">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                        src={image}
                        alt={`${title} preview`}
                        style={{
                            backgroundColor: imageBackground,
                            height: '120px',
                            objectFit: 'cover',
                            width: '250px',
                        }}
                    />
                </a>
            </div>
            <div className="flex flex-col">
                <p className="mb-1">{title}</p>
                <p className="text-muted mb-2 text-wrap line-clamp-3">{description}</p>
            </div>
        </div>
    );
}
