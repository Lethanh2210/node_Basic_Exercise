const axios = require("axios");


function theMostOfUser(users,prop){
    let theMostUser = users[0];
    users.forEach((user) => {
        if(user[prop] > theMostUser[prop]){
            theMostUser = user;
        }
    })
    return theMostUser;
}


async function getApi(path) {
    try {
        const {data: response} = await axios.get("https://jsonplaceholder.typicode.com/" + path);
        return response;
    } catch (error) {
        console.log(error);
    }
}

(async () => {
    const users = await getApi("users");
    const posts = await getApi("posts");
    const comments = await getApi("comments");

    // User with comments and posts
    users.forEach(user => {
        user.posts = [];
        user.comments = [];
        posts.forEach((post) => {
            if (post.userId === user.id) {
                user.posts.push(post);
            }
        })
        comments.forEach((comment) => {
            let checkComment = user.posts.filter((post) => comment.postId === post.id);
            if (checkComment.length > 0) {
                user.comments.push(comment)
            }
        })
    })

    // user with number of comments and posts
    const userWithNumberOfCommentsAndPost = users.map((user) => {
        user.posts = user.posts.length;
        user.comments = user.comments.length;
        return user;
    })

    // user with more than 3 comments
    const userWithMoreThanThreeComments = userWithNumberOfCommentsAndPost.filter((user) => user.comments > 3);

    // The most comments or posts user
    //1. Comments
    const userWithTheMostComments = theMostOfUser(users, "comments")
    //2. Posts
    const userWithTheMostPosts = theMostOfUser(users, "posts")

    // Sort By Post-Count Descending
    const userSortByPostCount =  users.sort((a, b) => {
        const postA = a.posts;
        const postB = b.posts;
        return postB - postA;
    });


    //merge comments and posts
    const [postsWithIdOne, commentOfPostIdOne] = await Promise.all([getApi("posts/1"), getApi("posts/1/comments")]);
    postsWithIdOne.comments = [...commentOfPostIdOne];
    console.log(postsWithIdOne);


})()

















