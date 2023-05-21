import { useQuery, useQueryClient, QueryClient } from "@tanstack/react-query"
import { Link } from "react-router-dom";
import { NewsItemclamped } from "../../components/NewsItemclamped";
import * as Loader from "react-loader-spinner"
import axios from "axios";
import Timeout from "await-timeout";
import { getAllNews } from "../../newsApi"

// const getAllNews = async () => {
//     const response = await fetch('https://localhost:7071/api/News/allNews');
//     if (!response.ok) {
//       throw new Error("Something went wrong.");
//     }
//     return await response.json();
// }

const NewsList = () => {
    const queryClient = useQueryClient()
    const { data, error, isLoading, isError } = useQuery(["allnews"], getAllNews, { })
    // const { data, error, isLoading, isError } = useQuery(
    //     ["allnews"],
    //     async () => {
    //         return Timeout.set(3000).then(() => getAllNews())
    //     },
    // )
    
    if(isLoading) {
        return (
            <div className="flex justify-center">
                {/* <Loader.ThreeDots color="#74adf2" height={30} /> */}
                {/* <Loader.ThreeDots color="red" radius='9' height="80" width="120" /> */}
                <Loader.ThreeCircles color="red" height="100" width="100" />
            </div>
    )}
    if(isError) {
        return <span>Error: {error.message}</span>
    }

    return(
        <div className="bg-slate-400">
            {
                data?.map(({author, title, content, id}) => (

                    // <div key={id} className='line-clamp-4 border-b-4 border-red-300'>
                    //     <span className="font-bold">{author}</span> -- <span className="font-semibold">{title}</span> -- 
                    //     <Link to={`/newsById/${id}`} >
                    //         <span className="italic">{content}</span>
                    //     </Link>
                    // </div>
                    <NewsItemclamped author={author} title={title} key={id} id={id} content={content} />
                ))
            }
        </div>
    )
}

export default NewsList
