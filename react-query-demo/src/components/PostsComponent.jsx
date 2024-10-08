import { useQuery } from "react-query";

const fetchPosts = async () => {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts');
    if(!response.ok) {
        throw new Error('Network response was not ok');
    }
    return response.json();
}; 

const PostsComponent = () => {
    const {data, error, isLoading, isError, refetch, isFetching} = useQuery('posts', fetchPosts, {
        cacheTime: 1000 * 60 * 10,
        staleTime: 1000 * 60 * 5,
        refetchOnWindowFocus: false,
        keepPreviousData: true,

    });

    if(isLoading) {
        return <div>Loading...</div>

    }

    if(isError) {
        return <div>{error.message}</div>

    }

    return (
        <div>
            <h1>Posts</h1>
            {isFetching && <div>Updating...</div>}
            <ul>
                {data.map(post => (
                    <li key={post.id}>{post.title}</li>
                ))}
            </ul>
            <button onClick={() => refetch()}>Refetch Posts </button>
        </div>
    );


};
export default PostsComponent;