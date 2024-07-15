
const posts = [ {id: 1, title: "Post 1"}, {id: 2, title: "Post 2"}, {id: 3, title: "Post 3"} ];

export const getAllPosts = ((req, res) => {
    const limit = parseInt(req.query.limit);  ///api/posts?limit=10

    if (!isNaN(limit) && limit > 0) {
        return res.status(200).json(posts.slice(0, limit));
    }

    res.status(200).json(posts);
})

export const getSinglePost = ((req, res, next) => {
    // console.log(req.params.id);  It is basically string so to convert it into integers we will use parseInt
    const id = parseInt(req.params.id);
    const post = posts.find(post => post.id === id);

    if (!post) {
        const error = new Error(`A post with id of ${id} was not found`);
        error.status = 404;
        return next(error);
    }

    res.status(200).json(post);
})

export const createPost = ((req, res, next) => {
    const newPost = { id: posts.length + 1, title: req.body.title };

    if (!newPost.title) {
        const error = new Error(`Please include a title`);
        error.status = 400;
        return next(error);
    }

    posts.push(newPost);
    res.status(201).json(posts);
})

export const updatePost = ((req, res, next) => {
    const id = parseInt(req.params.id);
    const post = posts.find(post => post.id === id);

    if (!post){
        const error = new Error(`A post with id of ${id} was not found`);
        error.status = 404;
        return next(error);
    }

    post.title = req.body.title;
    res.status(200).json(posts);
})

export const deletePost = ( (req, res) => {
    const id = parseInt(req.params.id);
    const post = posts.find(post => post.id === id);

    if (!post){
        const error = new Error(`A post with id of ${id} was not found`);
        error.status = 404;
        return next(error);
    }

    posts = posts.filter(post => post.id !== id);
    res.status(200).json(posts);
})