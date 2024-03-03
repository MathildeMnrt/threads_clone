import { fetchThreads } from "@/lib/actions/thread.action";
import User from "@/lib/models/user.model";
import { currentUser } from "@clerk/nextjs";
import ThreadCard from "@/components/cards/ThreadCard";


async function Home() {

  const result = await fetchThreads(1, 30);
  const user = await currentUser();
  if (!user) return null;

  return (
    <>
      <h1 className="head-text text-left">Home</h1>
        <section className="mt-9 flex flex-col gap-10">
          {result.posts.length === 0   ? (
            <p className="no-result">No threads found</p>
          ) : (
            <>
              {result.posts.map((post) => (
                <ThreadCard
                  key={post._id}
                  id={post._id}
                  currentUserId={user?.id || ''}
                  content={post.text}
                  author={post.author}
                  community={post.community}
                  createdAt={post.createdAt}
                  comments={post.children}
                  parentId={post.parentId}
                />
              ))}
            </>
          )}

        </section>


    </>
  );
}

export default Home;
