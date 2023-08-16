import { Request, Response, NextFunction } from 'express';
import { BlogModel, ProfileModel } from '../models';
import { createResponse, defaultThumbnailUrl, uploadThumbnailImage } from '../utilities';

class BlogController {
  /* Handle Get Blog Global [GET] */
  async handleGetBlogGlobal(req: Request, res: Response, next: NextFunction) {
    const page = req.params.page || 1;
    const perPage = 5;
    try {
      const result = await BlogModel.find({ isDelete: false })
        .skip(perPage * parseInt(page.toString()) - perPage)
        .limit(perPage);
      next(createResponse({ blogs: result }));
    } catch (error) {
      next(error);
    }
  }

  /* Handle Get My Blog [GET] */
  async handleGetMyBlog(req: Request, res: Response, next: NextFunction) {
    const { _id } = res.locals;
    const page = req.params.page || 1;
    const perPage = 5;
    try {
      const resultFind = await ProfileModel.findOne({ auth_id: _id });
      const result = await BlogModel.find({ profile_id: resultFind?._id, isDelete: false })
        .skip(perPage * parseInt(page.toString()) - perPage)
        .limit(perPage);
      next(createResponse({ blogs: result }));
    } catch (error) {
      next(error);
    }
  }

  /* Handle Get Deleted Blog [GET] */
  async handleGetMyDeletedBlog(req: Request, res: Response, next: NextFunction) {
    const { _id } = res.locals;
    const page = req.params.page || 1;
    const perPage = 5;
    try {
      const resultFind = await ProfileModel.findOne({ auth_id: _id });
      const result = await BlogModel.find({ profile_id: resultFind?._id, isDelete: true })
        .skip(perPage * parseInt(page.toString()) - perPage)
        .limit(perPage);
      next(createResponse({ blogs: result }));
    } catch (error) {
      next(error);
    }
  }

  /* Handle Create Blog [POST] */
  async handleCreateBlog(req: Request, res: Response, next: NextFunction) {
    const thumbnail = req.file;
    const { _id } = res.locals;
    const { content } = req.body;
    try {
      const resultFind = await ProfileModel.findOne({ auth_id: _id });
      if (thumbnail) {
        const thumbnailHandled = await uploadThumbnailImage(thumbnail);
        const result = await BlogModel.create({
          profile_id: resultFind?._id,
          content: content,
          thumbnail: thumbnailHandled,
        });
        next(createResponse({ blog: result }));
      } else {
        const result = await BlogModel.create({
          profile_id: resultFind?._id,
          content: content,
          thumbnail: defaultThumbnailUrl,
        });
        next(createResponse({ blog: result }, 'Created this blog successfully'));
      }
    } catch (error) {
      next(error);
    }
  }

  /* Handle Edit Blog [PUT] */
  async handleEditBlog(req: Request, res: Response, next: NextFunction) {
    const thumbnail = req.file;
    const { blog_id } = req.params;
    const { _id } = res.locals;
    const { content } = req.body;
    try {
      const resultFindProfile = await ProfileModel.findOne({ auth_id: _id });
      const resultFindBlog = await BlogModel.findOne({ profile_id: resultFindProfile?._id, _id: blog_id });
      if (thumbnail) {
        const thumbnailHandled = await uploadThumbnailImage(thumbnail);
        if (content) {
          const result = await BlogModel.updateOne(
            { _id: resultFindBlog?._id },
            { thumbnail: thumbnailHandled, content: content },
          );
          next(createResponse({ blog: result }, 'Editted this blog successfully'));
        } else {
          const result = await BlogModel.updateOne(
            { _id: resultFindBlog?._id },
            { thumbnail: thumbnailHandled, content: resultFindBlog?.content },
          );
          next(createResponse({ blog: result }, 'Editted this blog successfully'));
        }
      } else {
        if (content) {
          const result = await BlogModel.updateOne(
            { _id: resultFindBlog?._id },
            { thumbnail: resultFindBlog?.thumbnail, content: content },
          );
          next(createResponse({ blog: result }, 'Editted this blog successfully'));
        } else {
          const result = await BlogModel.updateOne(
            { _id: resultFindBlog?._id },
            { thumbnail: resultFindBlog?.thumbnail, content: resultFindBlog?.content },
          );
          next(createResponse({ blog: result }, 'Editted this blog successfully'));
        }
      }
    } catch (error) {
      next(error);
    }
  }

  /* Handle Delete Blog [PATCH] */
  async handleDeleteBlog(req: Request, res: Response, next: NextFunction) {
    const { blog_id } = req.params;
    const { _id } = res.locals;
    try {
      const resultFindProfile = await ProfileModel.findOne({ auth_id: _id });
      const result = await BlogModel.updateOne(
        { _id: blog_id, profile_id: resultFindProfile?._id },
        { isDelete: true, deleteAt: new Date() },
      );
      next(createResponse({ blog: result }, 'Deleted this blog successfully'));
    } catch (error) {
      next(error);
    }
  }

  /* Handle Restore Blog [PATCH] */
  async handleRestoreBlog(req: Request, res: Response, next: NextFunction) {
    const { blog_id } = req.params;
    const { _id } = res.locals;
    try {
      const resultFindProfile = await ProfileModel.findOne({ auth_id: _id });
      const result = await BlogModel.updateOne(
        { _id: blog_id, profile_id: resultFindProfile?._id },
        { isDelete: false, deleteAt: null },
      );
      next(createResponse({ blog: result }, 'Restored this blog successfully'));
    } catch (error) {
      next(error);
    }
  }

  /* Handle Force Delete Blog [DELETE] */
  async handleForceDeleteBlog(req: Request, res: Response, next: NextFunction) {
    const { blog_id } = req.params;
    const { _id } = res.locals;
    try {
      const resultFindProfile = await ProfileModel.findOne({ auth_id: _id });
      const result = await BlogModel.deleteOne({ _id: blog_id, profile_id: resultFindProfile?._id });
      next(createResponse({ blog: result }, 'Force Deleted this blog successfully'));
    } catch (error) {
      next(error);
    }
  }
}

export default new BlogController();
