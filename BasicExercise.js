const axios = require("axios");

/**
 *
 * @param {array} users users with number of comments and posts
 * @param prop properties want to find
 * @returns {Object} User the with the most of the properties
 */
function theMostOfUser(users, prop) {
    let theMostUser = users[0];
    users.forEach((user) => {
        if (user[prop] > theMostUser[prop]) {
            theMostUser = user;
        }
    })
    return theMostUser;
}

/**
 *
 * @param path
 * @returns {Promise<any>}
 */
async function getApi(path) {
    try {
        const {data: response} = await axios.get("https://jsonplaceholder.typicode.com" + path);
        return response;
    } catch (error) {
        console.log(error);
    }
}

/**
 *
 * @param {string} postId ID of the post to be posted
 * @returns {Promise<any>}
 */
async function getPostWithComment(postId){
    const [post, commentOfPost] = await Promise.all([getApi(`/posts/${postId}`), getApi(`/posts/${postId}/comments`)]);
    return {...post, comments: commentOfPost}
}


// PURE FUNCTIONS

(async () => {
    const [users, posts, comments] = await Promise.all([getApi("/users"), getApi("/posts"), getApi("/comments")])

    // User with comments and posts, race condition
    const userWithComments = users.map((user) => {
        const userPosts = posts.filter(post => post.userId === user.id);
        const userComments = comments.filter(comment => comment.email === user.email);

        return {
            ...user,
            comments: userComments,
            posts: userPosts
        };
    })


    // user with number of comments and posts
    const userWithNumberOfCommentsAndPost = userWithComments.map((user) => {
        const postsCount = user.posts.length;
        const commentsCount = user.comments.length;

        return {
            ...user,
            comments: postsCount,
            posts: commentsCount
        };
    })

    // user with more than 3 comments
    const userWithMoreThanThreeComments = userWithNumberOfCommentsAndPost.filter((user) => user.comments > 3);

    // The most comments or posts user
    //1. Comments
    const userWithTheMostComments = theMostOfUser(userWithNumberOfCommentsAndPost, "comments")
    //2. Posts
    const userWithTheMostPosts = theMostOfUser(userWithNumberOfCommentsAndPost, "posts")

    // Sort By Post-Count Descending
    const userSortByPostCount =  userWithNumberOfCommentsAndPost.sort((a, b) => {
        const postA = a.posts;
        const postB = b.posts;
        return postB - postA;
    });


    //merge comments and posts id 1
    const post = await getPostWithComment('1');
})()