'use client';

import { useState } from 'react';
import { AiOutlineSearch } from 'react-icons/ai';
import { BsFillMicFill } from 'react-icons/bs';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function HomeSearch() {

    const router = useRouter();
    const [searchText, setSearchText] = useState('');
    const [randomSearchLoading, setRandomSearchLoading] = useState(false);

    const onSearchHandler = (e : any) => {
        e.preventDefault();
        
        if (!searchText.trim()) {
            return;
        }
        router.push(`/search/web?searchTerm=${searchText}`);
    }

    const onRandomSearch = async () => {
        setRandomSearchLoading(true);
        const res = await fetch(`https://random-word-api.herokuapp.com/word`)
            .then(res => res.json())
            .then(data => data[0])
        if (!res) {
            return ;
        }
        setRandomSearchLoading(false);
        router.push(`/search/web?searchTerm=${res}`);
    }

    return (
        <>
            <form onSubmit={onSearchHandler} className="flex items-center w-full mt-5 mx-auto max-w-[90%] border border-gray-200 px-5 py-3 rounded-full hover:shadow-md transition-shadow focus-within:shadow-md sm:max-w-xl lg:max-w-2xl">
                <AiOutlineSearch className="text-xl text-gray-500 mr-3" />
                <input type="text" onChange={e => setSearchText(e.target.value)} value={searchText} className="focus:outline-none flex-grow" />
                <BsFillMicFill />
            </form>

            <div className="mt-5 flex flex-col space-y-2 sm:space-y-0 sm:space-x-4 just-center sm:flex-row">
                <button onClick={onSearchHandler} className="btn">Google Search</button>
                <button onClick={onRandomSearch} className="btn flex justify-center items-center">
                    {
                        randomSearchLoading ? (
                            <Image width="30" height="30" src="images/loading.svg" alt="Loading..."/>
                        ) : 'I am Feeling Lucky'
                    }
                </button>
            </div>
        </>
    )
}
