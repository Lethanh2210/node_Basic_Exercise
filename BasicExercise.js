const axios = require("axios");


function theMostOfUser(users, prop) {
    let theMostUser = users[0];
    users.forEach((user) => {
        if (user[prop] > theMostUser[prop]) {
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

async function getPostWithComment(param){
    const [post, commentOfPost] = await Promise.all([getApi(`posts/${param}`), getApi(`posts/${param}/comments`)]);
    post.comments = [...commentOfPost];
    return post
}

(async () => {
    const [users, posts, comments] = await Promise.all([getApi("users"), getApi("posts"), getApi("comments")])

    // User with comments and posts
    users.map((user) => {
        user.posts = posts.filter(post => post.userId === user.id);
        user.comments = [];
        comments.forEach((comment) => {
            let checkComment = user.posts.filter((post) => comment.postId === post.id);
            if (checkComment.length > 0) {
                user.comments.push(comment)
            }
        })
        return user;
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


    //merge comments and posts id 1
    const post = await getPostWithComment(1);


})()

















