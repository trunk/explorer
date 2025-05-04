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

