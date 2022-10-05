const axios = require("axios")

const get10User = async () => {
    try {
        const {data:response} = await axios.get("https://jsonplaceholder.typicode.com/users");
        return response;
    }

    catch (error) {
        console.log(error);
    }
}
const getAllPosts = async () => {
    try {
        const {data:response} = await axios.get("https://jsonplaceholder.typicode.com/posts");
        return response;
    }

    catch (error) {
        console.log(error);
    }
}

const getAllComments = async () => {
    try {
        const {data:response} = await axios.get("https://jsonplaceholder.typicode.com/comments");
        return response;
    }

    catch (error) {
        console.log(error);
    }
}


// user with comments and posts
function userWithCommentsAndPosts(){
    Promise.all([ get10User(), getAllPosts(), getAllComments(),]).then((data) => {
        data[0].map(user =>{
            user.posts = [];
            user.comments = [];
            data[1].map((post) => {
                if(post.userId === user.id) {
                    user.posts.push(post);
                }
            })
            data[2].map((comment) => {
                let checkComment = user.posts.filter((post) => comment.postId === post.id);
                if(checkComment.length > 0) {
                    user.comments.push(comment)
                }
            })
        })
        console.log(data[0])
        return data[0];
    })
}

// user with number of comments and posts
function userWithNumberOfCommentsAndPosts(){
    Promise.all([ get10User(), getAllPosts(), getAllComments(),]).then((data) => {
        data[0].map(user =>{
            let userPosts = [];
            let userComments = [];
            user.posts = 0;
            user.comments = 0;
            data[1].map((post) => {
                if(post.userId === user.id) {
                    userPosts.push(post);
                    user.posts = userPosts.length;
                }
            })
            data[2].map((comment) => {
                let checkComment = userPosts.filter((post) => comment.postId === post.id);
                if(checkComment.length > 0) {

                    userComments.push(comment);
                    user.comments = userComments.length;
                }
            })
        })
        console.log(data[0])
        return data[0];
    })
}

// filter user with more than 3 comments
function userWithMoreThanThreeComments(){
    Promise.all([ get10User(), getAllPosts(), getAllComments(),]).then((data) => {
        data[0].map(user =>{
            let userPosts = [];
            let userComments = [];
            user.posts = 0;
            user.comments = 0;
            data[1].map((post) => {
                if(post.userId === user.id) {
                    userPosts.push(post);
                    user.posts = userPosts.length;
                }
            })
            data[2].map((comment) => {
                let checkComment = userPosts.filter((post) => comment.postId === post.id);
                if(checkComment.length > 0) {

                    userComments.push(comment);
                    user.comments = userComments.length;
                }
            })
        })
        let userMoreComments = data[0].filter((user) => user.comments > 3);
        console.log(userMoreComments)
        return userMoreComments;
    })
}

// Who is the user with the most comments / posts

function userWithTheMostComments(){
    Promise.all([ get10User(), getAllPosts(), getAllComments(),]).then((data) => {
        data[0].map(user =>{
            let userPosts = [];
            let userComments = [];
            user.posts = 0;
            user.comments = 0;
            data[1].map((post) => {
                if(post.userId === user.id) {
                    userPosts.push(post);
                    user.posts = userPosts.length;
                }
            })
            data[2].map((comment) => {
                let checkComment = userPosts.filter((post) => comment.postId === post.id);
                if(checkComment.length > 0) {

                    userComments.push(comment);
                    user.comments = userComments.length;
                }
            })
        })
        let userMostComment = data[0][0];

        data[0].map(user => {
            if(userMostComment.comments < user.comments) {
                userMostComment = user;
            }
        })
        console.log(userMostComment)
        return userMostComment;
    })
}

function userWithTheMostPosts(){
    Promise.all([ get10User(), getAllPosts(), getAllComments(),]).then((data) => {
        data[0].map(user =>{
            let userPosts = [];
            let userComments = [];
            user.posts = 0;
            user.comments = 0;
            data[1].map((post) => {
                if(post.userId === user.id) {
                    userPosts.push(post);
                    user.posts = userPosts.length;
                }
            })
            data[2].map((comment) => {
                let checkComment = userPosts.filter((post) => comment.postId === post.id);
                if(checkComment.length > 0) {

                    userComments.push(comment);
                    user.comments = userComments.length;
                }
            })
        })
        let userMostPost = data[0][0];

        data[0].map(user => {
            if(userMostPost.posts < user.posts) {
                userMostPost = user;
            }
        })
        console.log(userMostPost)
        return userMostPost;
    })
}


// Sort by PostCount Descending

function SortByPostCountDescending(){
    Promise.all([ get10User(), getAllPosts(), getAllComments(),]).then((data) => {
        data[0].map(user =>{
            let userPosts = [];
            let userComments = [];
            user.posts = 0;
            user.comments = 0;
            data[1].map((post) => {
                if(post.userId === user.id) {
                    userPosts.push(post);
                    user.posts = userPosts.length;
                }
            })
            data[2].map((comment) => {
                let checkComment = userPosts.filter((post) => comment.postId === post.id);
                if(checkComment.length > 0) {

                    userComments.push(comment);
                    user.comments = userComments.length;
                }
            })
        })
        let userMostPost = data[0][0];

        data[0].map(user => {
            if(userMostPost.posts < user.posts) {
                userMostPost = user;
            }
        })

        data[0].sort((a, b) => {
            const postA = a.posts;
            const postB = b.posts;
           return postB - postA;
        });
        console.log(data[0])
        return data[0];
    })
}



// Merge comment to post
const getPostById = async (id) =>{
    try {
        const {data:response} = await axios.get(`https://jsonplaceholder.typicode.com/posts/${id}`);
        return response;
    }

    catch (error) {
        console.log(error);
    }
}



const getCommentByPostId = async (id) =>{
    try {
        const {data:response} = await axios.get(`https://jsonplaceholder.typicode.com/posts/${id}/comments`);
        return response;
    }

    catch (error) {
        console.log(error);
    }
}


const mergeCommentToPost = (id) => {
    try{
        getPostById(id).then(post => {
            getCommentByPostId(id).then(comments => {
                post.comments = [...comments]
                console.log(post)
            })
        })
    }
    catch (error){
        console.log(error);
    }
}















