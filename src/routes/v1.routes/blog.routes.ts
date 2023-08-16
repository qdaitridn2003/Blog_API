import express from 'express';
import { imageHandler, loginAuthorize } from '../../middlewares';
import { BlogController } from '../../controllers';

const blogRouter = express.Router();

blogRouter.use(loginAuthorize);

blogRouter.get('/:page', BlogController.handleGetBlogGlobal);

blogRouter.get('/me/:page', BlogController.handleGetMyBlog);

blogRouter.get('/me/deleted/:page', BlogController.handleGetMyDeletedBlog);

blogRouter.post('/add', imageHandler.single('thumbnail'), BlogController.handleCreateBlog);

blogRouter.put('/edit/:blog_id', imageHandler.single('thumbnail'), BlogController.handleCreateBlog);

blogRouter.patch('/del/:blog_id', BlogController.handleDeleteBlog);

blogRouter.patch('/restore/:blog_id', BlogController.handleRestoreBlog);

blogRouter.patch('/force-delete/:blog_id', BlogController.handleForceDeleteBlog);

export default blogRouter;
